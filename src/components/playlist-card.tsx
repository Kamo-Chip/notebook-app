import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchPodcastCount, fetchSourceCount } from "@/lib/data";
import { Playlist } from "@/lib/types";
import { pluraliseItem } from "@/lib/utils";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import PlaylistCardHeader from "./editable-card-header";
import EditableCardHeader from "./editable-card-header";
import { editPlaylistTitle } from "@/lib/actions";

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
