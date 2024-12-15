import CreatePodcastDialog from "@/components/create-podcast-dialog";
import { defaultPlaylistId } from "@/lib/utils";

function Page() {
  return (
    <div>
      <CreatePodcastDialog playlistId={defaultPlaylistId} />
    </div>
  );
}

export default Page;
