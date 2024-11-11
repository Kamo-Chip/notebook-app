import AudioPlayer from "@/components/audio-player";
import PodcastContainer from "@/components/containers/podcast-container";
import SourcesSidebar from "@/components/containers/sources-sidebar";
import CreatePodcastDialog from "@/components/create-podcast-dialog";
import ContainerSkeleton from "@/components/skeletons/container-skeleton";
import { fetchPlaylist } from "@/lib/data";
import { Suspense } from "react";

async function Page({
  searchParams,
}: {
  searchParams: { playlistId: string };
}) {
  const { playlistId } = await searchParams;
  const playlist = await fetchPlaylist(playlistId);

  return (
    <div className="grid grid-cols-[1fr,7fr] w-full">
      <SourcesSidebar playlistId={playlist.id} />
      <div className="bg-white px-8 py-4 flex flex-col relative">
        <div className="flex justify-between">
          <div className="flex flex-col mb-8 gap-2">
            <span className="text-5xl font-medium">Podcasts</span>
            <span className=" text-gray-600">{playlist.title}</span>
          </div>
          <CreatePodcastDialog playlistId={playlist.id} />
        </div>
        <Suspense fallback={<ContainerSkeleton />}>
          <PodcastContainer playlistId={playlist.id} />
        </Suspense>

        <AudioPlayer />
      </div>
    </div>
  );
}

export default Page;
