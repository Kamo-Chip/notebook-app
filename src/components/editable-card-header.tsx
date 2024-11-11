"use client";

import { Playlist, Podcast } from "@/lib/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import EditCardHeaderForm from "./forms/edit-card-header-form";
import { CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import TooltipWrapper from "./wrappers/tooltip-wrapper";
import { FormState } from "@/lib/form-utils";

function EditableCardHeader({
  item,
  itemType,
  formAction,
}: {
  item: Playlist | Podcast;
  itemType: string;
  formAction: (
    id: string,
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <CardHeader
      className="flex flex-row justify-between items-start mb-8"
      onClick={(e) => {
        if (isEditing) e.preventDefault();
      }}
    >
      <div>
        {/* TODO: Add auto focus */}
        {!isEditing && <CardTitle className="text-4xl truncate max-w-[280px]">{item.title}</CardTitle>}
        <EditCardHeaderForm
          item={item}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          itemType={itemType}
          formAction={formAction}
        />

        <p className="text-gray-600 mt-2">
          {format(new Date(item.created_at).toString(), "dd MMM yyyy")}
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

export default EditableCardHeader;
