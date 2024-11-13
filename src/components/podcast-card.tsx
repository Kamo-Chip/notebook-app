"use client";

import { deletePodcastAction, editPodcastTitle } from "@/lib/actions";
import { Podcast } from "@/lib/types";
import { formatDuration } from "@/lib/utils";
import { PlayIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditableCardHeader from "./editable-card-header";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

function PodcastCard({ podcast }: { podcast: Podcast }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const audioPlayer: HTMLAudioElement | null =
    document.querySelector("#audioPlayer") || null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setPlaying = () => {
    if (isPlaying) {
      audioPlayer?.pause();
    } else {
      audioPlayer?.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const listenToLocalStorageChange = () => {
      const isPlayingStorage = localStorage.getItem("isPlaying") === "true";
      const isMatch = localStorage.getItem("podcastKey") === podcast.key;

      if (isMatch && isPlayingStorage) {
        setIsPlaying(true);
      } else if (isMatch && !isPlayingStorage) {
        setIsPlaying(false);
      }
    };

    window.addEventListener("isPlaying", listenToLocalStorageChange);
    // return () =>
    //   window.removeEventListener("isPlaying", listenToLocalStorageChange);
  }, []);

  useEffect(() => {
    if (searchParams.get("podcast") === podcast.key) {
      try {
        setTimeout(() => {
          audioPlayer?.play();
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log("failed");
        console.log(error);
      }
    } else {
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <Card key={podcast.id}>
      <CardContent className="relative flex flex-col h-full">
        <EditableCardHeader
          item={podcast}
          itemType="podcasts"
          formAction={editPodcastTitle}
          deleteAction={deletePodcastAction}
        />
        <div className="mt-auto">
          <Badge
            className="cursor-pointer"
            onClick={() => {
              if (podcast.key !== searchParams.get("podcast")) {
                setIsLoading(true);
                const params = new URLSearchParams(searchParams);
                params.set("podcast", podcast.key);
                replace(`${pathname}?${params.toString()}`);
              } else {
                setPlaying();
              }
            }}
          >
            {!isLoading ? (
              isPlaying ? (
                <img src="/assets/bars.svg" className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )
            ) : (
              <img src="/assets/bars-loading.svg" className="w-6 h-6" />
            )}

            <span className="ml-2">{formatDuration(podcast.length)}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default PodcastCard;
