"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Source } from "@/lib/types";

function DeleteSourceForm({
  source,
  deleteAction,
}: {
  source: Source;
  deleteAction: () => void;
}) {
  return (
    <form action={deleteAction}>
      <DropdownMenuItem asChild onClick={(e) => e.stopPropagation()}>
        <button type="submit" className="w-full cursor-pointer">
          Delete
        </button>
      </DropdownMenuItem>
    </form>
  );
}

export default DeleteSourceForm;
