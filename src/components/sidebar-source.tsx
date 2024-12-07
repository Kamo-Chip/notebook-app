"use client";

import { Source } from "@/lib/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import DocumentViewer from "./document-viewer";
import DeleteSourceForm from "./forms/delete-source-form";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useFormStatusToast from "@/hooks/useFormStatusToast";
import { deleteSourceAction } from "@/lib/actions";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import { useActionState } from "react";

function SidebarSource({ source }: { source: Source }) {
  const [state, action, pending] = useActionState(
    deleteSourceAction.bind(null, source),
    EMPTY_FORM_STATE
  );

  useFormStatusToast(state);

  return (
    <div
      key={source.id}
      className={clsx("flex hover:bg-border p-2 rounded-3xl w-[226px]", {
        "animate-pulse": pending,
      })}
    >
      <Dialog>
        <DialogTrigger className="flex justify-between w-full">
          <span className={clsx("truncate max-w-40 text-sm font-medium")}>
            {source.title.replaceAll(".pdf", "")}{" "}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger disabled={pending}>
              <EllipsisHorizontalIcon className="w-6 h-6 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DeleteSourceForm source={source} deleteAction={action} />
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Document</DialogTitle>
          <DocumentViewer documentKey={source.key} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SidebarSource;
