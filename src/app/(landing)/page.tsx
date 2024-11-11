import PlaylistContainer from "@/components/containers/playlist-container";
import ContainerSkeleton from "@/components/skeletons/container-skeleton";
import { Suspense } from "react";
export default async function Home() {
  return (
    <div className="flex flex-col pt-20">
      <Suspense fallback={<ContainerSkeleton hasHeading />}>
        <PlaylistContainer />
      </Suspense>
    </div>
  );
}
