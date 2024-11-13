"use client";

import { uploadDocument } from "@/lib/actions";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import DocumentViewer from "../document-viewer";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
function UploadDocumentForm({
  setAudioUrl,
  setOpen,
}: {
  setAudioUrl: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, action] = useActionState(uploadDocument, {
    url: null,
  });

  useEffect(() => {
    if (state.url) {
      setAudioUrl(state.url);
      setOpen(false);
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center">
      <form action={action}>
        <Dropzone />
      </form>
    </div>
  );
}

const Dropzone = () => {
  const [uploadedDocument, setUploadedDocument] = useState<File>();
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col">
      {uploadedDocument && (
        <div>
          <h2 className="text-2xl mb-4">Source</h2>
          <DocumentViewer file={uploadedDocument} />
        </div>
      )}

      <div
        className={clsx(
          "flex-col",
          { "flex ": !uploadedDocument },
          { "hidden ": uploadedDocument }
        )}
      >
        <h2 className="text-2xl mb-2">Add Source</h2>
        <span className="text-sm mb-6">
          Sources let NotebookLM base its responses on the information that
          matters most to you.
        </span>
        <div className="w-full border-2 border-dashed rounded-3xl h-full flex flex-col items-center p-6">
          <span className="bg-secondary rounded-lg flex items-center justify-center w-fit h-fit p-2">
            <ArrowUpTrayIcon className="h-16 w-16 text-gray-400" />
          </span>

          <span>Upload sources</span>
          <label htmlFor="document">
            <span className="text-blue-500">Choose file</span> to upload
          </label>
          <span>Supported file types: PDF, .txt, Markdown</span>
          <input
            type="file"
            accept="application/pdf"
            id="document"
            name="document"
            className="hidden"
            onChange={(e) => {
              const { files } = e.target;
              if (files) {
                setUploadedDocument(files[0]);
              }
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <label htmlFor="instructions">Instructions (Optional)</label>
        <span className="text-sm mb-6">
          Specify what to focus on, emphasise, leave out, etc.{" "}
        </span>
        <Textarea name="instructions" id="instructions" />
      </div>
      {uploadedDocument && (
        <Button className="mt-8 w-fit mx-auto">
          {pending ? "Loading..." : "Generate"}
        </Button>
      )}
    </div>
  );
};
export default UploadDocumentForm;
