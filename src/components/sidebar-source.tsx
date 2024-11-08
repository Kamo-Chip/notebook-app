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

function SidebarSource({ source }: { source: Source }) {
  const [showEllipsis, setShowEllipsis] = useState(false);

  return (
    <div
      key={source.id}
      className="flex hover:bg-border p-2 rounded-3xl w-[226px]"
      //   onMouseOver={() => setShowEllipsis(true)}
      //   onMouseOut={() => setShowEllipsis(false)}
    >
      <Dialog>
        <DialogTrigger className="flex">
          <span className="flex">
            <DocumentIcon className="w-6 h-6" />
            <span className={clsx("truncate max-w-40")}>
              {source.title}dfsdfdsdsfsf
            </span>
          </span>

          {/* {showEllipsis && ( */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisHorizontalIcon className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* )} */}
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
