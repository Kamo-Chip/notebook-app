import { DropZone } from "../drop-zone";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function CreateFirstPlaylistCard() {
  return (
    <div className="border rounded-3xl shadow-md p-6 flex flex-col gap-16 items-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-4xl text-center">Create your first playlist</h3>
        <span className=" text-gray-700 text-center text-xl">
          A playlist is a collection of podcasts sharing the same sources
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full">
        <CreatePlaylistExplainerItem text={"Upload sources"} icon="📑" />
        <CreatePlaylistExplainerItem text={"Create podcasts"} icon="🎙️" />
        <CreatePlaylistExplainerItem text={"Get smart"} icon="🧠" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit text-lg font-medium">Create</Button>
        </DialogTrigger>
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


const CreatePlaylistExplainerItem = ({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="text-7xl rounded-full bg-gradient-to-tr from-cyan-500 to-lime-500 w-fit p-7">
        {icon}
      </span>
      <span className="text-xl font-medium">{text}</span>
      <span className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
        lacinia purus.
      </span>
    </div>
  );
};
export default CreateFirstPlaylistCard;
