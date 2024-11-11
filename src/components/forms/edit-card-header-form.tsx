import useFormStatusToast from "@/hooks/useFormStatusToast";
import { EMPTY_FORM_STATE, FormState } from "@/lib/form-utils";
import { Playlist, Podcast } from "@/lib/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Dispatch, SetStateAction, useActionState } from "react";
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

  useFormStatusToast(state);

  return (
    <form className={clsx("flex")} action={action}>
      <Input
        defaultValue={item.title}
        className={clsx(
          "shadow-none font-medium tracking-tight text-4xl h-fit mr-4",
          {
            hidden: !isEditing,
          }
        )}
        id={item.id}
        name="title"
      />
      <div
        className={clsx("absolute bottom-6 right-6 flex gap-4", {
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
              `#${item.id}`
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
