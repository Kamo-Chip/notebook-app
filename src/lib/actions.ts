"use server";

import { sql } from "@vercel/postgres";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { combineAudioFiles, generateAudioFromDialogue } from "./audio";
import { getContext } from "./context";
import { createPlaylist, createPodcastEpisode, createSource } from "./data";
import { FormState, fromErrorToFormState, toFormState } from "./form-utils";
import { loadDocumentIntoPinecone } from "./pinecone";
import { fetchFromS3, uploadToS3 } from "./s3";
import { Dialogue } from "./types";
import { PODCASTS_BUCKET, SOURCES_BUCKET, SYSTEM_PROMPT } from "./utils";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEMO_S3_FILE = ""; // Set to empty when not testing 90b808ab-059d-457b-9fa6-cfc65457e47a.mp3

export const editPlaylistTitle = async (
  id: string,
  formState: FormState,
  formData: FormData
) => {
  try {
    const { title } = Object.fromEntries(formData.entries());

    await sql`
      UPDATE playlists
      SET title = ${title as string}
      WHERE id = ${id}
    `;

    revalidatePath("/");

    return toFormState("SUCCESS", "Successfully updated title");
  } catch (error) {
    console.error(error);
    return fromErrorToFormState(error);
  }
};

export const editPodcastTitle = async (
  id: string,
  formState: FormState,
  formData: FormData
) => {
  try {
    const { title } = Object.fromEntries(formData.entries());

    await sql`
      UPDATE podcasts
      SET title = ${title as string}
      WHERE id = ${id}
    `;

    revalidatePath("/");

    return toFormState("SUCCESS", "Successfully updated title");
  } catch (error) {
    console.error(error);
    return fromErrorToFormState(error);
  }
};

export const createPodcast = async (
  playlistId: string,
  formState: FormState,
  formData: FormData
) => {
  const audioFiles: string[] = [];
  const fileNameAndExtension = `${uuidv4()}.mp3`;
  const finalPodcastPath = path.join(process.cwd(), fileNameAndExtension);
  const fields = Object.fromEntries(formData.entries());
  const instructions = fields.instructions as string;
  const title = fields.title as string;
  try {
    // TODO : Add zod validation

    const context = await getContext(
      instructions as string,
      "notebooks",
      playlistId
    );

    const script = await generateScript(context, instructions);

    await generateAudioFromDialogue(script, audioFiles);

    const duration = await combineAudioFiles(audioFiles, finalPodcastPath);

    const podcastFile = fs.readFileSync(finalPodcastPath);

    await uploadToS3(podcastFile, fileNameAndExtension, PODCASTS_BUCKET, "audio/mpeg");

    console.log("Duration: ", duration);
    await createPodcastEpisode(
      title,
      playlistId,
      fileNameAndExtension,
      120
    );

    const audioUrl = await fetchFromS3(
      DEMO_S3_FILE || fileNameAndExtension,
      PODCASTS_BUCKET
    );

    fs.unlinkSync(finalPodcastPath);

    revalidatePath("/playlists");
    return toFormState("SUCCESS", "Successfully created podcast", {
      url: audioUrl,
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }
};

export const processSources = async (sources: File[], formState: FormState) => {
  try {
    const { id: playlistId } = await createPlaylist("Untitled Playlist");

    for (let i = 0; i < sources.length; i++) {
      const fileKey = `${playlistId}_${sources[i].name}`;
      await uploadToS3(sources[i], fileKey, SOURCES_BUCKET, "application/pdf");
      await createSource(sources[i].name, playlistId, fileKey);
    }

    for (let i = 0; i < sources.length; i++) {
      await getPodcastContext(sources[i], playlistId);
    }

    return toFormState("SUCCESS", "Successfully processed sources", {
      playlistId: playlistId,
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
    return fromErrorToFormState(error);
  }
};


const getPodcastContext = async (document: File, notebook: string) => {
  try {
    const result = await loadDocumentIntoPinecone(document, notebook);

    let text = "";
    result.forEach((page) => {
      page.forEach((chunk) => {
        text += chunk.metadata.text + "\n";
      });
    });
    return text;
  } catch (error) {
    console.error("Failed to get podcast context: ", error);
    throw new Error("Failed to get podcast context");
  }
};

const generateScript = async (
  inputText: string,
  instructions: string
): Promise<Dialogue[]> => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `<input_text>${inputText}</input_text>\n<user_instructions>${instructions}</user_instructions>`,
          },
        ],
      }),
    });

    const data = await response.json();
    const script = JSON.parse(data.choices[0].message.content);
    return script;
  } catch (error) {
    console.error("Failed to generate script: ", error);
    throw new Error("Failed to generate script");
  }
};
