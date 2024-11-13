"use client";

import { FormState } from "@/lib/form-utils";
import { Playlist, Podcast } from "@/lib/types";
import { format } from "date-fns";
import { useState } from "react";
import DeletePodcastPopover from "./delete-podcast-popover";
import EditCardHeaderForm from "./forms/edit-card-header-form";
import { CardHeader, CardTitle } from "./ui/card";

function EditableCardHeader({
  item,
  itemType,
  formAction,
  deleteAction,
}: {
  item: Playlist | Podcast;
  itemType: string;
  deleteAction: (item: any, formState: FormState) => Promise<FormState>;
  formAction: (
    id: string,
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <CardHeader
      className="flex flex-row justify-between items-start mb-8"
      onClick={(e) => {
        if (isEditing || open) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div className="flex-1 max-w-[90%]">
        {/* TODO: Add auto focus */}
        {!isEditing && (
          <CardTitle className="text-3xl truncate">{item.title}</CardTitle>
        )}
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

      <DeletePodcastPopover
        item={item}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        deleteAction={deleteAction}
      />
    </CardHeader>
  );
}

export default EditableCardHeader;
