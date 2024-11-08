"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import CreatePodcastForm from "./forms/create-podcast-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

function CreatePodcastDialog({ playlistId }: { playlistId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-0 m-0 h-fit">
        <Button>
          <PlusIcon className="w-12 h-12" /> Create new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Podcast</DialogTitle>
        <CreatePodcastForm playlistId={playlistId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default CreatePodcastDialog;
