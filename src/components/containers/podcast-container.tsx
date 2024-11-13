import { fetchPodcasts } from "@/lib/data";
import PodcastCard from "../podcast-card";
import clsx from "clsx";
import { FaPodcast } from "react-icons/fa";

async function PodcastContainer({ playlistId }: { playlistId: string }) {
  const podcasts = await fetchPodcasts(playlistId);

  return (
    <div
      className={clsx(
        { "grid grid-cols-3  xl:grid-cols-5 gap-8": podcasts.length > 0 },
        { "flex h-full": podcasts.length === 0 }
      )}
    >
      {!podcasts.length && (
        <div className="m-auto flex flex-col items-center text-gray-600/80 font-medium">
          <span>
            <FaPodcast size="2rem" />
          </span>
          <span>No podcasts</span>
          <span>{"Create podcasts and they'll show up here"}</span>
        </div>
      )}
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}

export default PodcastContainer;
