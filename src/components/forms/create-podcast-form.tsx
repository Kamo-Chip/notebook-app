"use client";

import { createPodcast } from "@/lib/actions";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useFormStatusToast from "@/hooks/useFormStatusToast";

function CreatePodcastForm({
  playlistId,
  setOpen,
}: {
  playlistId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, action, pending] = useActionState(
    createPodcast.bind(null, playlistId),
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (state.status == "SUCCESS") setOpen(false);
  }, [state]);
  useFormStatusToast(state);

  return (
    <form action={action} className="flex flex-col gap-6">
      <div>
        <label htmlFor="title">Title</label>
        <Input type="text" name="title" />
      </div>
      <div>
        <label htmlFor="instructions">Instructions</label>
        <Textarea name="instructions" />
      </div>
      <Button type="submit" disabled={pending} className="mx-auto">
        {pending ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}

export default CreatePodcastForm;
