import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import DeletePodcastForm from "./forms/delete-podcast-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Playlist, Podcast } from "@/lib/types";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { EMPTY_FORM_STATE, FormState } from "@/lib/form-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import TooltipWrapper from "./wrappers/tooltip-wrapper";
import useFormStatusToast from "@/hooks/useFormStatusToast";
import { toast } from "sonner";

function DeletePodcastPopover({
  item,
  setIsEditing,
  isEditing,
  deleteAction,
}: {
  item: Playlist | Podcast;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  deleteAction: (item: any, formState: FormState) => Promise<FormState>;
}) {
  const [state, action, pending] = useActionState(
    deleteAction.bind(null, item),
    EMPTY_FORM_STATE
  );
  useFormStatusToast(state, pending);

  return (
    <DropdownMenu>
      <TooltipWrapper
        trigger={
          <DropdownMenuTrigger disabled={isEditing} asChild>
            <span
              className={clsx("cursor-pointer", {
                "text-gray-600/50": isEditing,
              })}
            >
              <EllipsisVerticalIcon className="w-8 h-8" />
            </span>
          </DropdownMenuTrigger>
        }
        content={isEditing ? "Save or cancel changes" : ""}
      />

      <DropdownMenuContent>
        <DeletePodcastForm
          item={item}
          setIsEditing={setIsEditing}
          deleteAction={action}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DeletePodcastPopover;
