import fs from "fs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const uploadToS3 = async (filePath: string, key: string) => {
  try {
    const s3Response = await fetch(`${BASE_URL}/api/s3`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: key }),
    });

    const s3Data = await s3Response.json();

    const podcastFile = fs.readFileSync(filePath);
    await fetch(s3Data.url, {
      method: "PUT",
      headers: {
        "Content-Type": "audio/mpeg",
      },
      body: podcastFile,
    });
  } catch (error) {
    console.error("Failed to upload to s3: ", error);
    throw new Error("Failed to upload to s3");
  }
};

export const fetchFromS3 = async (key: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/s3?key=${key}`, {
      method: "GET",
    });

    const data = await response.json();

    return data.url;
  } catch (error) {
    console.error("Failed to fetch from s3: ", error);
    throw new Error("Failed to fetch from s3");
  }
};
