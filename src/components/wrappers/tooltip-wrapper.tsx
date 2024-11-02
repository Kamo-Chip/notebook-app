import { PlusIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { sources } from "next/dist/compiled/webpack/webpack";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ReactNode } from "react";

function TooltipWrapper({
  trigger,
  content,
}: {
  trigger: ReactNode;
  content: ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        {content && <TooltipContent>{content}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipWrapper;
