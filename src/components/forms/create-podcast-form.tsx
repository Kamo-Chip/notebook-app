"use client";

import { createScript } from "@/lib/actions";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useFormStatusToast from "@/hooks/useFormStatusToast";
import { Dialogue } from "@/lib/types";

function CreateScriptForm({
  playlistId,
  setScript,
  setTitle,
}: {
  playlistId: string;
  setScript: Dispatch<SetStateAction<Dialogue[]>>;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  const [state, action, pending] = useActionState(
    createScript.bind(null, playlistId),
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (state.status == "SUCCESS") {
      setTitle(state.data.title);
      setScript(state.data.script);
    }
  }, [state]);

  useFormStatusToast(state);

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">
          Title<span className="text-red-500">*</span>
        </label>
        <Input type="text" name="title" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="instructions">
          Instructions<span className="text-red-500">*</span>
        </label>
        <Textarea name="instructions" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="numSpeakers">
          Number of Speakers<span className="text-red-500">*</span>
        </label>
        <Input
          type="number"
          min={1}
          max={2}
          name="numSpeakers"
          required
          defaultValue={2}
        />
      </div>
      <Button type="submit" disabled={pending} className="mx-auto">
        {pending ? "Generating script..." : "Create"}
      </Button>
    </form>
  );
}

export default CreateScriptForm;
