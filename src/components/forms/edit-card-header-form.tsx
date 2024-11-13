"use client";

import useFormStatusToast from "@/hooks/useFormStatusToast";
import { EMPTY_FORM_STATE, FormState } from "@/lib/form-utils";
import { Playlist, Podcast } from "@/lib/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function EditCardHeaderForm({
  item,
  setIsEditing,
  isEditing,
  itemType,
  formAction,
}: {
  item: Playlist | Podcast;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  itemType: string;
  formAction: (
    id: string,
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}) {
  const [state, action, pending] = useActionState(
    formAction.bind(null, item.id),
    EMPTY_FORM_STATE
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useFormStatusToast(state);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <form className={clsx("flex")} action={action} autoFocus>
      <Input
        defaultValue={item.title}
        className={clsx(
          "shadow-none font-medium tracking-tight text-3xl h-fit w-full",
          {
            hidden: !isEditing,
          }
        )}
        id={`header-${item.id}`}
        name="title"
        ref={inputRef}
      />
      <div
        className={clsx("absolute bottom-4 right-4 flex gap-2", {
          hidden: !isEditing,
        })}
      >
        <Button
          type="submit"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(false);
          }}
          className="bg-green-500/60 text-green-950"
        >
          <CheckIcon className="w-8 h-8 " />
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
            const input: HTMLInputElement = document.querySelector(
              `#header-${item.id}`
            )!;
            input.value = item.title;
          }}
          className="bg-red-500/60 text-red-950"
        >
          <XMarkIcon className="w-8 h-8" />
        </Button>
      </div>
    </form>
  );
}

export default EditCardHeaderForm;
