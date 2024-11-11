"use client";

import { Podcast } from "@/lib/types";
import { formatDuration } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditableCardHeader from "./editable-card-header";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { editPodcastTitle } from "@/lib/actions";
import { useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

function PodcastCard({ podcast }: { podcast: Podcast }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const audioPlayer: HTMLAudioElement | null =
    document.querySelector("#audioPlayer");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log(searchParams.get("podcast"));
    console.log(podcast.id);
    if (searchParams.get("podcast") === podcast.key) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [searchParams]);

  return (
    <Card key={podcast.id}>
      <CardContent className="relative flex flex-col h-full">
        <EditableCardHeader
          item={podcast}
          itemType="podcasts"
          formAction={editPodcastTitle}
        />
        <div className="mt-auto">
          <Badge
            className="cursor-pointer"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("podcast", podcast.key);
              replace(`${pathname}?${params.toString()}`);
              if (isPlaying) {
                audioPlayer?.pause();
              } else {
                audioPlayer?.play();
              }
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" fill="white" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
            <span className="ml-2">{formatDuration(podcast.length)}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default PodcastCard;
