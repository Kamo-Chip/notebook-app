import { fetchPlaylists } from "@/lib/data";
import Link from "next/link";
import AddSourceDialog from "../add-source-dialog";
import CreateFirstPlaylistCard from "../landing-page/create-first-playlist-card";
import PlaylistCard from "../playlist-card";
import { Button } from "../ui/button";

async function PlaylistContainer() {
  const playlists = await fetchPlaylists();

  return (
    <div>
      {!playlists.length && <CreateFirstPlaylistCard />}
      <div className="flex justify-between items-start mb-16">
        <h2 className="text-5xl font-medium">Your Playlists 💿</h2>
        <AddSourceDialog trigger={<Button>Create new</Button>} />
      </div>
      <div className="grid grid-cols-4 gap-8">
        {playlists.map((playlist) => (
          <Link href={`/playlists?playlistId=${playlist.id}`} key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlaylistContainer;
