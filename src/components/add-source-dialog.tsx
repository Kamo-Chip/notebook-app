"use client";

import { ReactNode, useState } from "react";
import { DropZone } from "./drop-zone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function AddSourceDialog({
  trigger,
  playlistId,
}: {
  trigger: ReactNode;
  playlistId?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Source</DialogTitle>
        <DialogDescription>
          Sources are the documents used to generate the podcast
        </DialogDescription>
        <DropZone playlistId={playlistId} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default AddSourceDialog;
