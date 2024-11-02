"use server";

import path from "path";
import { combineAudioFiles, generateAudioFromDialogue } from "./audio";
import { loadDocumentIntoPinecone } from "./pinecone";
import { fetchFromS3, uploadToS3 } from "./s3";
import { SYSTEM_PROMPT } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { Dialogue } from "./types";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEMO_S3_FILE = "90b808ab-059d-457b-9fa6-cfc65457e47a.mp3"; // Set to empty when not testing

export const uploadDocument = async (
  formState: { url: string | null },
  formData: FormData
) => {
  const fields = Object.fromEntries(formData);
  const document: File = fields.document as File;
  const instructions: string = fields.instructions as string;
  console.log(fields);
  const audioFiles: string[] = [];
  const fileNameAndExtension = `${uuidv4()}.mp3`;
  const finalPodcastPath = path.join(process.cwd(), fileNameAndExtension);

  try {
    // TODO: Make notebook name user generated
    // const inputText = await getPodcastContext(document, "notebook-1");
    // const script = await generateScript(inputText, instructions);

    // await generateAudioFromDialogue(script, audioFiles);

    // await combineAudioFiles(audioFiles, finalPodcastPath);

    // await uploadToS3(finalPodcastPath, fileNameAndExtension);

    const audioUrl = await fetchFromS3(DEMO_S3_FILE || fileNameAndExtension);
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
