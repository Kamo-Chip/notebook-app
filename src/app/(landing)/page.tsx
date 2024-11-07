import PlaylistContainer from "@/components/containers/playlist-container";
import { Suspense } from "react";
export default async function Home() {
  return (
    <div className="flex flex-col pt-48">
      <Suspense fallback={<span>Loading...</span>}>
        <PlaylistContainer />
      </Suspense>
    </div>
  );
}
