"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import TooltipWrapper from "./wrappers/tooltip-wrapper";
import { processSources } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
const MAX_SOURCES = 3;
export const DropZone = () => {
  const [sources, setSources] = useState<File[]>([]);
  const router = useRouter();
  const [state, action, pending] = useActionState(
    processSources.bind(null, sources),
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (state.status === "SUCCESS" && state.data?.playlistId!) {
      router.push(`/playlists?playlistId=${state.data.playlistId}`);
    }
  }, [state]);
  return (
    <form className="flex flex-col gap-6" action={action}>
      {sources.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {sources.map((file) => (
            <div
              key={file.name}
              className="bg-border rounded-3xl p-2 flex items-center gap-2 max-w-60 justify-between"
            >
              <span className="truncate text-sm text-gray-700">
                {file.name}
              </span>
              <Cross2Icon
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setSources(
                    sources.filter((source) => source.name !== file.name)
                  );
                }}
              />
            </div>
          ))}
          <TooltipWrapper
            trigger={
              <label
                htmlFor="document"
                className={clsx(
                  "border-2 border-dashed rounded-3xl p-2 flex items-center justify-between gap-2 cursor-pointer text-gray-700",
                  {
                    "bg-secondary text-gray-700/50":
                      sources.length === MAX_SOURCES,
                  }
                )}
              >
                <span className="text-sm text-center">Add more</span>
                <PlusIcon className="w-4 h-4" />
              </label>
            }
            content={
              sources.length === MAX_SOURCES ? (
                <p>Cannot add more than {MAX_SOURCES} sources</p>
              ) : null
            }
          />
        </div>
      ) : (
        <div className="w-full border-2 border-dashed rounded-lg h-full flex flex-col items-center p-6">
          <span className="bg-border rounded-full flex items-center justify-center w-fit h-fit p-4">
            <ArrowUpTrayIcon className="h-10 w-10 text-gray-700" />
          </span>

          <span className="text-xl font-medium mt-2">Upload sources</span>
          <div className="text-gray-700 flex flex-col items-center">
            <label htmlFor="document" className="cursor-pointer">
              <span className="text-blue-500">Choose file</span> to upload
            </label>
            <span className="mt-4">
              Supported file types: PDF, .txt, Markdown
            </span>
          </div>
        </div>
      )}

      <input
        type="file"
        accept="application/pdf"
        id="document"
        multiple
        name="document"
        disabled={sources.length === MAX_SOURCES}
        className="hidden"
        onChange={(e) => {
          const { files } = e.target;
          const sourcesToAdd = [];
          if (files) {
            for (let i = 0; i < files.length; i++) {
              if (
                !sources
                  .map((source) => source.name)
                  .find((name) => name === files[i].name)
              ) {
                sourcesToAdd.push(files[i]);
              }
            }
            setSources([...sources, ...sourcesToAdd]);
          }
        }}
      />
      {sources.length > 0 && (
        <Button className="mx-auto" type="submit" disabled={pending}>
          {pending ? "Loading..." : "Create Playlist"}
        </Button>
      )}
    </form>
  );
};
