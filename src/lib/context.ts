import { RecordValues } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";
import { getPineconeClient } from "./pinecone";
import { convertToAscii } from "./utils";

export const getMatchesFromEmbeddings = async (
  embeddings: RecordValues,
  namespaceToAccess: string,
  topK: number,
  notebook: string
) => {
  try {
    const pinecone = getPineconeClient();

    const index = pinecone.index("notebook");
    const namespace = index.namespace(convertToAscii(namespaceToAccess));

    const queryResult = await namespace.query({
      topK: topK,
      vector: embeddings,
      includeMetadata: true,
      filter: { notebook: { $eq: notebook } },
    });

    return queryResult.matches || [];
  } catch (e: any) {
    console.log("Error querying embeddings: ", e.message);
    throw e;
  }
};

export const getContext = async (
  query: string,
  namespaceToAccess: string,
  notebook: string
) => {
  try {
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(
      queryEmbeddings,
      namespaceToAccess,
      3,
      notebook
    );

    console.log(matches);

    const qualifyingDocs = matches.filter(
      (match) => match.score && match.score > 0.7
    );

    let docs = qualifyingDocs.map((match) => match?.metadata?.text);
    return docs.join("\n").substring(0, 3000);
  } catch (e: any) {
    console.log("Error getting context: ", e.message);
    return [];
  }
};
