import { fetchPodcasts } from "@/lib/data";
import PodcastCard from "../podcast-card";

async function PodcastContainer({ playlistId }: { playlistId: string }) {
  const podcasts = await fetchPodcasts(playlistId);

  return (
    <div className="grid grid-cols-5 gap-8">
      {!podcasts.length && <p>No podcasts</p>}
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}

export default PodcastContainer;
