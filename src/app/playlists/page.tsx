import { DropZone } from "@/components/drop-zone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Page({
  searchParams,
}: {
  searchParams: { p: string; creating: string };
}) {
  return (
    <div>
      <Dialog defaultOpen={searchParams.creating === "true"}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Source</DialogTitle>
          <DialogDescription>
            Sources are the documents used to generate the podcast
          </DialogDescription>
          <DropZone />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Page;
