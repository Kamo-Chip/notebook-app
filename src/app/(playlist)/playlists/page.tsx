import CreatePodcastForm from "@/components/forms/create-podcast-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchPlaylistData } from "@/lib/data";
import { PlusIcon } from "@radix-ui/react-icons";

async function Page({
  searchParams,
}: {
  searchParams: { playlistId: string };
}) {
  const data = await fetchPlaylistData(searchParams.playlistId);
  const playlist = data[0];
  const sources = data[1];
  const podcasts = data[2];

  return (
    <div className="grid grid-cols-[1fr,7fr] w-full">
      <div className="bg-slate-100 h-screen">
        <span>Sources</span>
        {sources.map((source) => (
          <div key={source.id}>{source.title}</div>
        ))}
      </div>
      <div className="bg-white px-8 py-4 flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-lg">{playlist.title}</span>
            <span className="text-5xl">Podcasts</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {" "}
                <PlusIcon className="w-12 h-12" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create Podcast</DialogTitle>
              <CreatePodcastForm playlistId={playlist.id} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-6">
          {!podcasts.length && <p>No podcasts</p>}
          {podcasts.map((podcast) => (
            <Card key={podcast.id}>
              <CardContent>
                <CardTitle>{podcast.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
