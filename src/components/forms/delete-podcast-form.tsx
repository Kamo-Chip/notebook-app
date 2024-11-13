"use client";
import useFormStatusToast from "@/hooks/useFormStatusToast";
import { EMPTY_FORM_STATE, FormState } from "@/lib/form-utils";
import { Playlist, Podcast } from "@/lib/types";
import { Dispatch, SetStateAction, useActionState } from "react";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

function DeletePodcastForm({
  deleteAction,
  setIsEditing,
  item,
}: {
  item: Playlist | Podcast;
  deleteAction: (item: any, formState: FormState) => Promise<FormState>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, action, pending] = useActionState(
    deleteAction.bind(null, item),
    EMPTY_FORM_STATE
  );

  useFormStatusToast(state);
  return (
    <form action={action} className="grid grid-cols-1">
      <DropdownMenuItem
        className="hover:bg-border rounded-md p-1 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        Edit title
      </DropdownMenuItem>
      <DropdownMenuItem
        className="hover:bg-border rounded-md p-1 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="submit">Delete</button>
      </DropdownMenuItem>
    </form>
  );
}

export default DeletePodcastForm;
