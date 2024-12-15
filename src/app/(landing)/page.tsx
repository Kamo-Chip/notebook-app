import PlaylistContainer from "@/components/containers/playlist-container";
import ContainerSkeleton from "@/components/skeletons/container-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
export default async function Home() {
  return (
    <div className="flex flex-col pt-20">
      <Link href="script-only">
        <Button
          className="mb-20 w-fit absolute top-8 right-8 bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
          variant={"secondary"}
        >
          <span className="flex h-3 w-3 absolute left-0 top-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
          </span>
          Create episode from a custom script
        </Button>
        ]{" "}
      </Link>

      <Suspense
        fallback={
          <ContainerSkeleton
            hasHeading
            grid="grid grid-cols-3 xl:grid-cols-4"
          />
        }
      >
        <PlaylistContainer />
      </Suspense>
    </div>
  );
}
