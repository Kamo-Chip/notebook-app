"use client";

import { useState } from "react";
import UploadDocumentForm from "./forms/upload-document-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function Landing() {
  const [audioUrl, setAudioUrl] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      {audioUrl && <audio controls={true} src={audioUrl} className="w-full" />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {!audioUrl && <Button>Generate Podcast</Button>}
        </DialogTrigger>
        <DialogContent className="w-full">
          <UploadDocumentForm setAudioUrl={setAudioUrl} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Landing;
