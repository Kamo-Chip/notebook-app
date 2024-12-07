"use client";
import { Playlist, Podcast } from "@/lib/types";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Dispatch, SetStateAction } from "react";

function DeletePodcastForm({
  deleteAction,
  setIsEditing,
  item,
}: {
  item: Playlist | Podcast;
  deleteAction: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <form action={deleteAction} className="grid grid-cols-1">
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
