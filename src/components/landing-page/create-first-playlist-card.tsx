import { caveat } from "@/app/fonts";
import AddSourceDialog from "../add-source-dialog";
import { Button } from "../ui/button";

function CreateFirstPlaylistCard() {
  return (
    <div className={`rounded-3xl p-6 flex flex-col gap-4 items-center`}>
      <div className="flex flex-col gap-4">
        <h1 className="text-8xl text-center font-medium whitespace-nowrap">
          Make Studying ✨
          <span className="animated-background bg-gradient-to-bl from-lime-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Fun
          </span>
          ✨
        </h1>
        <span className=" text-center text-xl mt-4">
          By creating byte sized podcasts from your notes
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full mt-0">
        <CreatePlaylistExplainerItem text={"Upload sources"} icon="📝" />
        <CreatePlaylistExplainerItem text={"Generate podcasts"} icon="🎙️" />
        <CreatePlaylistExplainerItem text={"Get smart"} icon="🧠" />
      </div>
      <AddSourceDialog
        trigger={
          <Button
            className={`w-fit text-3xl font-bold p-6 mt-16 relative ${caveat.className}`}
          >
            <span className="flex h-3 w-3 absolute left-0 top-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            Create playlist
          </Button>
        }
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
    <div className="flex flex-col items-center justify-center gap-4 text-center rounded-full w-60 h-60">
      <span className="text-8xl rounded-full w-fit p-2">{icon}</span>
      <span className={`text-3xl font-semibold ${caveat.className}`}>
        {text}
      </span>
    </div>
  );
};
export default CreateFirstPlaylistCard;
