"use client";

import useFormStatusToast from "@/hooks/useFormStatusToast";
import { createEpisode } from "@/lib/actions";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import { Dialogue } from "@/lib/types";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useActionState,
  useEffect,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Cross2Icon } from "@radix-ui/react-icons";

function EditScriptForm({
  playlistId,
  setOpen,
  script,
  setScript,
  title,
}: {
  playlistId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  script: Dialogue[];
  setScript: Dispatch<SetStateAction<Dialogue[]>>;
  title: string;
}) {
  const [state, action, pending] = useActionState(
    createEpisode.bind(null, playlistId, script, title),
    EMPTY_FORM_STATE
  );

  const updateDialogueItem = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    if (!e) return;

    const newScript: Dialogue[] = [];

    script.forEach((item, index) => {
      if (index === idx) {
        newScript.push({ speaker: item.speaker, text: e.target.value });
      } else {
        newScript.push(item);
      }
    });

    setScript(newScript);
  };

  const removeDialogueItem = (idx: number) => {
    const newScript = script.filter((_, index) => index !== idx);

    setScript(newScript);
  };

  const addDialogueItem = (e: any) => {
    e.preventDefault();

    setScript([
      ...script,
      {
        speaker:
          script[script.length - 1].speaker === "Samantha"
            ? "Mark"
            : "Samantha",
        text: "",
      },
    ]);
  };

  useEffect(() => {
    if (state.status === "SUCCESS") {
      setOpen(false);
      setScript([]);
    }
  }, [state]);

  useFormStatusToast(state);

  return (
    <form action={action} className="flex flex-col gap-6 mt-6">
      <Button onClick={addDialogueItem} className="w-fit absolute top-4 right-11">
        Add dialogue
      </Button>
      <div className="overflow-y-auto flex flex-col gap-8 max-h-96 pr-4">
        {script.map((item, idx) => (
          <div key={`${item}${idx}`} className="flex gap-2">
            <div className="grid grid-cols-[1fr,4fr] gap-4">
              <Input
                type="text"
                contentEditable={false}
                disabled={true}
                defaultValue={script[idx].speaker}
              />
              <Textarea
                value={script[idx].text}
                required
                onChange={(e) => updateDialogueItem(e, idx)}
              />
            </div>
            <Cross2Icon
              className="text-red-500 w-5 h-5 cursor-pointer"
              onClick={() => removeDialogueItem(idx)}
            />
          </div>
        ))}
      </div>

      <Button type="submit" disabled={pending} className="mx-auto">
        {pending ? "Generating podcast..." : "Create"}
      </Button>
    </form>
  );
}

export default EditScriptForm;
