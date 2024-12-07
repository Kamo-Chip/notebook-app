import AudioPlayer from "@/components/audio-player";
import PodcastContainer from "@/components/containers/podcast-container";
import SourcesSidebar, {
  SourcesSidebarLoading,
} from "@/components/containers/sources-sidebar";
import CreatePodcastDialog from "@/components/create-podcast-dialog";
import ContainerSkeleton from "@/components/skeletons/container-skeleton";
import { fetchPlaylist } from "@/lib/data";
import { Suspense } from "react";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ playlistId: string }>;
}) {
  const { playlistId } = await searchParams;
  const playlist = await fetchPlaylist(playlistId);

  return (
    <div className="grid grid-cols-[1fr,7fr] w-full">
      <Suspense fallback={<SourcesSidebarLoading />}>
        <SourcesSidebar playlistId={playlist.id} />
      </Suspense>

      <div className=" px-8 py-4 flex flex-col relative">
        <img src="/assets/mask-image.svg" className="mask-fade z-[-1]" />
        <div className="flex justify-between">
          <div className="flex flex-col mb-8 gap-2">
            <span className="text-5xl font-medium">Podcasts</span>
            <span className=" text-gray-600">{playlist.title}</span>
          </div>
          <CreatePodcastDialog playlistId={playlist.id} />
        </div>
        <Suspense
          fallback={
            <ContainerSkeleton grid="grid grid-cols-3 xl:grid-cols-5" />
          }
        >
          <PodcastContainer playlistId={playlist.id} />
        </Suspense>

        <AudioPlayer />
      </div>
    </div>
  );
}

export default Page;
