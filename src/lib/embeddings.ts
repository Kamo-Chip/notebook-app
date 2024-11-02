import { OpenAIApi, Configuration } from "openai-edge";
import md5 from "md5";
import { Document } from "@pinecone-database/doc-splitter";
import { PineconeRecord } from "@pinecone-database/pinecone";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}

export async function embedDocument(doc: Document, notebook: string) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
        notebook: notebook,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding document", error);
    throw error;
  }
}
