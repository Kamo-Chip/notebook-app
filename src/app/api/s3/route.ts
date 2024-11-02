import { NextResponse } from "next/server";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = "podcastsb";
const REGION = "us-east-1";

const credentials = {
  accessKeyId: process.env.IAM_USER_KEY!,
  secretAccessKey: process.env.IAM_USER_SECRET!,
};

const s3 = new S3Client({
  credentials,
  region: REGION, // optional: default region for both GET and POST
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  
  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  const input = { Bucket: BUCKET, Key: key };

  const command = new GetObjectCommand(input);

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return NextResponse.json({ url });
}

export async function POST(req: Request) {
  const { key } = await req.json();

  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  const input = { Bucket: BUCKET, Key: key };

  const command = new PutObjectCommand(input);

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return NextResponse.json({ url });
}
