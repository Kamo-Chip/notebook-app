"use client";
import { Dialogue } from "@/lib/types";
import { useState } from "react";
import CreateButton from "./create-button";
import CreatePodcastForm from "./forms/create-podcast-form";
import EditScriptForm from "./forms/edit-script-form";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

function CreatePodcastDialog({ playlistId }: { playlistId: string }) {
  const [open, setOpen] = useState(false);
  const [script, setScript] = useState<Dialogue[]>([]);
  const [title, setTitle] = useState("");
  const [linkToPodcast, setLinkToPodcast] = useState("");
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

        {script.length > 0 && !linkToPodcast && (
          <EditScriptForm
            playlistId={playlistId}
            setOpen={setOpen}
            script={script}
            setScript={setScript}
            title={title}
            setLinkToPodcast={setLinkToPodcast}
          />
        )}

        {linkToPodcast && (
          <div>
            <audio src={linkToPodcast} />
            <a href={linkToPodcast} target="_blank">Link to podcast</a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePodcastDialog;
