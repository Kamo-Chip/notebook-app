import { deletePlaylistAction, editPlaylistTitle } from "@/lib/actions";
import { fetchPodcastCount, fetchSourceCount } from "@/lib/data";
import { Playlist } from "@/lib/types";
import { pluraliseItem } from "@/lib/utils";
import EditableCardHeader from "./editable-card-header";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";

async function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const { count: numSources } = await fetchSourceCount(playlist.id);
  const { count: numPodcasts } = await fetchPodcastCount(playlist.id);

  return (
    <Card>
      <CardContent className=" h-fit relative">
        <EditableCardHeader
          item={playlist}
          itemType="playlists"
          formAction={editPlaylistTitle}
          deleteAction={deletePlaylistAction}
        />
        <div className="mt-4">
          <Badge>
            {numPodcasts} {pluraliseItem(numPodcasts, "podcast")}
          </Badge>
        </div>
        <CardFooter className="mt-8 text-gray-600">
          {numSources} {pluraliseItem(numSources, "source")}
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default PlaylistCard;
