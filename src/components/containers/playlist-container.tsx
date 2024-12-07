import { fetchPlaylists } from "@/lib/data";
import Link from "next/link";
import AddSourceDialog from "../add-source-dialog";
import CreateButton from "../create-button";
import CreateFirstPlaylistCard from "../landing-page/create-first-playlist-card";
import PlaylistCard from "../playlist-card";
async function PlaylistContainer() {
  const playlists = await fetchPlaylists();

  return (
    <div>
    
      {!playlists.length ? (
        <CreateFirstPlaylistCard />
      ) : (
        <div>
          <div className="flex justify-between items-start mb-16">
            <h1 className="text-6xl font-medium">Playlists</h1>
            <AddSourceDialog trigger={<CreateButton />} />
          </div>
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-8">
            {playlists.map((playlist) => (
              <Link
                href={`/playlists?playlistId=${playlist.id}`}
                key={playlist.id}
              >
                <PlaylistCard playlist={playlist} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistContainer;
