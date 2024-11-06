"use client";

import { createPodcast } from "@/lib/actions";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function CreatePodcastForm({ playlistId }: { playlistId: string }) {
  const [state, action, pending] = useActionState(
    createPodcast.bind(null, playlistId),
    EMPTY_FORM_STATE
  );
  return (
    <form action={action}>
      <label htmlFor="title">Title</label>
      <Input type="text" name="title" />
      <label htmlFor="instructions">Instructions</label>
      <Textarea name="instructions" />
      <Button type="submit" disabled={pending}>
        Create
      </Button>
    </form>
  );
}

export default CreatePodcastForm;
