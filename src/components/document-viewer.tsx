"use client";

import { useEffect, useState } from "react";

function DocumentViewer({ file }: { file: File }) {
  const [fileUrl, setFileUrl] = useState<string>();

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-center">
      <iframe src={fileUrl} width="500" height="500" className="rounded-3xl  shadow-xl border"/>
    </div>
  );
}

export default DocumentViewer;
