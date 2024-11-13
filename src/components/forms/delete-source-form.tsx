"use client";

import { deleteSourceAction } from "@/lib/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useActionState } from "react";
import { Source } from "@/lib/types";
import { EMPTY_FORM_STATE } from "@/lib/form-utils";
import useFormStatusToast from "@/hooks/useFormStatusToast";

function DeleteSourceForm({ source }: { source: Source }) {
  const [state, action, pending] = useActionState(
    deleteSourceAction.bind(null, source),
    EMPTY_FORM_STATE
  );

  useFormStatusToast(state);

  return (
    <form action={action}>
      <DropdownMenuItem asChild onClick={(e) => e.stopPropagation()}>
        <button type="submit">Delete</button>
      </DropdownMenuItem>
    </form>
  );
}

export default DeleteSourceForm;
