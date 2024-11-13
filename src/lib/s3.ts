const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const uploadToS3 = async (
  file: File | Buffer<ArrayBufferLike>,
  key: string,
  bucket: string,
  contentType: "audio/mpeg" | "application/pdf"
) => {
  try {
    const s3Response = await fetch(`${BASE_URL}/api/s3`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: key, bucket: bucket }),
    });

    const s3Data = await s3Response.json();

    await fetch(s3Data.url, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
      },
      body: file,
    });
  } catch (error) {
    console.error("Failed to upload to s3: ", error);
    throw new Error("Failed to upload to s3");
  }
};

export const fetchFromS3 = async (key: string, bucket: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/s3?key=${key}&bucket=${bucket}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    return data.url;
  } catch (error) {
    console.error("Failed to fetch from s3: ", error);
    throw new Error("Failed to fetch from s3");
  }
};

export const deleteFromS3 = async (key: string, bucket: string) => {
  try {
    await fetch(`${BASE_URL}/api/s3`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: key, bucket: bucket }),
    });
  } catch (error) {
    console.error("Failed to delete from s3: ", error);
    throw new Error("Failed to delete from s3");
  }
};
