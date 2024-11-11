import AddSourceDialog from "../add-source-dialog";
import { Button } from "../ui/button";

function CreateFirstPlaylistCard() {
  return (
    <div className=" rounded-3xl p-6 flex flex-col gap-12 items-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-8xl text-center font-medium whitespace-nowrap">
          Create your first playlist
        </h3>
        <span className=" text-center text-xl mt-4">
          Create byte-sized podcasts from your notes
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full mt-10">
        <CreatePlaylistExplainerItem text={"Upload sources"} icon="📝" />
        <CreatePlaylistExplainerItem text={"Create podcasts"} icon="🎙️" />
        <CreatePlaylistExplainerItem text={"Get smart"} icon="🧠" />
      </div>
      <AddSourceDialog
        trigger={<Button className="w-fit text-2xl font-medium p-6">Create</Button>}
      />
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
      <span className="text-8xl rounded-full w-fit p-2">
        {icon}
      </span>
      <span className="text-xl">{text}</span>
      {/* <span className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
        lacinia purus.
      </span> */}
    </div>
  );
};
export default CreateFirstPlaylistCard;
