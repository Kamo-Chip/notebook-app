import { ReactNode } from "react";
import { DropZone } from "./drop-zone";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

function CreatePlaylistDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Source</DialogTitle>
        <DialogDescription>
          Sources are the documents used to generate the podcast
        </DialogDescription>
        <DropZone />
      </DialogContent>
    </Dialog>
  );
}

export default CreatePlaylistDialog;
