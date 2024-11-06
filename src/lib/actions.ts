"use server";

import fs from "fs";
import path from "path";
import { combineAudioFiles, generateAudioFromDialogue } from "./audio";
import { loadDocumentIntoPinecone } from "./pinecone";
import { fetchFromS3, uploadToS3 } from "./s3";
import { PODCASTS_BUCKET, SOURCES_BUCKET, SYSTEM_PROMPT } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { Dialogue } from "./types";
import { FormState, fromErrorToFormState, toFormState } from "./form-utils";
import { createPlaylist, createPodcastEpisode, createSource } from "./data";
import { getContext } from "./context";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEMO_S3_FILE = ""; // Set to empty when not testing 90b808ab-059d-457b-9fa6-cfc65457e47a.mp3

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

    await combineAudioFiles(audioFiles, finalPodcastPath);

    const podcastFile = fs.readFileSync(finalPodcastPath);

    await uploadToS3(podcastFile, fileNameAndExtension, PODCASTS_BUCKET);

    await createPodcastEpisode(title, playlistId, fileNameAndExtension, 3);

    const audioUrl = await fetchFromS3(
      DEMO_S3_FILE || fileNameAndExtension,
      PODCASTS_BUCKET
    );

    fs.unlinkSync(finalPodcastPath);

    return toFormState("SUCCESS", "Successfully create podcast", {
      url: audioUrl,
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }
};

export const processSources = async (sources: File[], formState: FormState) => {
  try {
    const { id: playlistId } = await createPlaylist("Plyalist");

    for (let i = 0; i < sources.length; i++) {
      const fileKey = `${sources[i].name}&&&${playlistId}`;
      await uploadToS3(sources[i], fileKey, SOURCES_BUCKET);
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

export const uploadDocument = async (
  formState: { url: string | null },
  formData: FormData
) => {
  const fields = Object.fromEntries(formData);
  const document: File = fields.document as File;
  const instructions: string = fields.instructions as string;
  const audioFiles: string[] = [];
  const fileNameAndExtension = `${uuidv4()}.mp3`;
  const finalPodcastPath = path.join(process.cwd(), fileNameAndExtension);

  try {
    // TODO: Make notebook name user generated
    const inputText = await getPodcastContext(document, "notebook-1");
    const script = await generateScript(inputText, instructions);

    await generateAudioFromDialogue(script, audioFiles);

    await combineAudioFiles(audioFiles, finalPodcastPath);

    const podcastFile = fs.readFileSync(finalPodcastPath);

    await uploadToS3(podcastFile, fileNameAndExtension, PODCASTS_BUCKET);

    const audioUrl = await fetchFromS3(
      DEMO_S3_FILE || fileNameAndExtension,
      PODCASTS_BUCKET
    );
    return { url: audioUrl };
  } catch (error) {
    console.log("Something went wrong: ", error);
    return { url: null };
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
