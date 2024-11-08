"use client";

import { fetchFromS3 } from "@/lib/s3";
import { SOURCES_BUCKET } from "@/lib/utils";
import { useEffect, useState } from "react";

function DocumentViewer({ documentKey }: { documentKey: string }) {
  const [documentUrl, setDocumentUrl] = useState("");

  useEffect(() => {
    const fetchDocumentUrl = async () => {
      const url = await fetchFromS3(documentKey, SOURCES_BUCKET);
      console.log(documentKey);
      setDocumentUrl(url);
      return url;
    };
    //476_Hamill-1-55.pdf&&&8673068b-52fa-449a-937c-40cc69a2dbc1

    fetchDocumentUrl();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <iframe
        src={documentUrl}
        width="500"
        height="500"
        className="rounded-3xl  shadow-xl border"
      />
    </div>
  );
}

export default DocumentViewer;
