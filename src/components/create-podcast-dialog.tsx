"use client";
import { useEffect, useState } from "react";
import CreateButton from "./create-button";
import CreatePodcastForm from "./forms/create-podcast-form";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Dialogue } from "@/lib/types";
import EditScriptForm from "./forms/edit-script-form";

function CreatePodcastDialog({ playlistId }: { playlistId: string }) {
  const [open, setOpen] = useState(false);
  const [script, setScript] = useState<Dialogue[]>([]);
  const [title, setTitle] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-0 m-0 h-fit">
        <CreateButton />
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogTitle>
          {script.length > 0 ? "Edit script" : "Create Podcast"}
        </DialogTitle>
        {!script.length && (
          <CreatePodcastForm
            playlistId={playlistId}
            setScript={setScript}
            setTitle={setTitle}
          />
        )}

        {script.length > 0 && (
          <EditScriptForm
            playlistId={playlistId}
            setOpen={setOpen}
            script={script}
            setScript={setScript}
            title={title}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePodcastDialog;
