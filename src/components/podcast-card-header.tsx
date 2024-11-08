"use client";

import { Playlist } from "@/lib/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import EditPlaylistForm from "./forms/edit-playlist-form";
import { CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import TooltipWrapper from "./wrappers/tooltip-wrapper";

function PodcastCardHeader({ playlist }: { playlist: Playlist }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <CardHeader
      className="flex flex-row justify-between items-start"
      onClick={(e) => e.preventDefault()}
    >
      <div>
        {/* TODO: Add auto focus */}
        {!isEditing && (
          <CardTitle className="text-4xl">{playlist.title}</CardTitle>
        )}
        <EditPlaylistForm
          playlist={playlist}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />

        <p className="text-gray-600 mt-2">
          {format(new Date(playlist.created_at).toString(), "dd MMM yyyy")}
        </p>
      </div>
      <DropdownMenu>
        <TooltipWrapper
          trigger={
            <DropdownMenuTrigger disabled={isEditing}>
              <span
                className={clsx("cursor-pointer", {
                  "text-gray-600/50": isEditing,
                })}
              >
                <EllipsisHorizontalIcon className="w-8 h-8" />
              </span>
            </DropdownMenuTrigger>
          }
          content={isEditing ? "Save or cancel changes" : ""}
        />

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit title
          </DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
}

export default PodcastCardHeader;
