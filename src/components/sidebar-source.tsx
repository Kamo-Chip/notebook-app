"use client";

import { Source } from "@/lib/types";
import {
  DocumentIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import DocumentViewer from "./document-viewer";
import { useState } from "react";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteSourceAction } from "@/lib/actions";
import DeleteSourceForm from "./forms/delete-source-form";

function SidebarSource({ source }: { source: Source }) {
  return (
    <div
      key={source.id}
      className="flex hover:bg-border p-2 rounded-3xl w-[226px]"
    >
      <Dialog>
        <DialogTrigger className="flex justify-between w-full">
          <span className="flex">
            <span className={clsx("truncate max-w-40")}>{source.title}</span>
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisHorizontalIcon className="w-6 h-6 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DeleteSourceForm source={source} />
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
