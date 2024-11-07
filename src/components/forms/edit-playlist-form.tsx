import { editPlaylistTitle } from "@/lib/actions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Playlist } from "@/lib/types";
import { Dispatch, SetStateAction, useActionState } from "react";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import clsx from "clsx";
import useFormStatusToast from "@/hooks/useFormStatusToast";

function EditPlaylistForm({
  playlist,
  setIsEditing,
  isEditing,
}: {
  playlist: Playlist;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
}) {
  const [state, action, pending] = useActionState(
    editPlaylistTitle.bind(null, playlist.id),
    EMPTY_FORM_STATE
  );

  useFormStatusToast(state);

  return (
    <form className={clsx("flex")} action={action}>
      <Input
        defaultValue={playlist.title}
        className={clsx(
          "shadow-none font-semibold tracking-tight text-4xl h-fit mr-4",
          { hidden: !isEditing }
        )}
        id="title"
        name="title"
      />
      <div
        className={clsx("absolute bottom-6 right-6 flex gap-4", {
          hidden: !isEditing,
        })}
      >
        <Button
          type="submit"
          onClick={() => setIsEditing(false)}
          className="bg-green-500/60 text-green-950"
        >
          <CheckIcon className="w-8 h-8 " />
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}
          className="bg-red-500/60 text-red-950"
        >
          <XMarkIcon className="w-8 h-8" />
        </Button>
      </div>
    </form>
  );
}

export default EditPlaylistForm;
