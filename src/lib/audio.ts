"use server";

import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { Dialogue } from "./types";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const FEMALE_VOICE_ID = "SAz9YHcvj6GT2YYXdXww";
const MALE_VOICE_ID = "bIHbv24MWmeRgasZH58o";

export const generateAudio = async (text: string, voiceId: string) => {
  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error generating audio: ${response.statusText}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error(`Failed to generate audio for this string: ${text}: `, error);
    throw new Error(`Failed to generate audio for this string: ${text}`);
  }
};

export const generateAudioFromDialogue = async (
  script: Dialogue[],
  audioFiles: string[]
) => {
  try {
    for (const [index, line] of script.entries()) {
      const voiceId =
        line.speaker === "Samantha" ? FEMALE_VOICE_ID : MALE_VOICE_ID;
      const audioData = await generateAudio(line.text, voiceId);

      const audioPath = path.join(process.cwd(), `temp_audio_${index}.mp3`);
      fs.writeFileSync(audioPath, Buffer.from(audioData));
      audioFiles.push(audioPath);
      console.log(`Audio generated and saved for: ${line.speaker}`);
    }
  } catch (error) {
    console.error("Failed to generate audio from dialogue: ", error);
    throw new Error("Failed to generate audio from dialogue");
  }
};

// Function to combine audio files using ffmpeg
export const combineAudioFiles = async (
  audioFiles: string[],
  outputFilePath: string
): Promise<number> => {
  const ffmpegCommand = ffmpeg();

  audioFiles.forEach((file) => ffmpegCommand.input(file));

  return new Promise((resolve, reject) => {
    ffmpegCommand
      .on("end", () => {
        audioFiles.forEach((file) => fs.unlinkSync(file));
        // Get the duration of the combined file
        ffmpeg.ffprobe(outputFilePath, (err, metadata) => {
          if (err) {
            return reject(err);
          }
          const duration = metadata.format.duration;
          console.log("Duration: ", duration);
          resolve(duration || 0);
        });
      })
      .on("error", (err) => reject(err))
      .mergeToFile(outputFilePath, "");
  });
};
