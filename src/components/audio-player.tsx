"use client";

import { fetchFromS3 } from "@/lib/s3";
import { PODCASTS_BUCKET } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function AudioPlayer() {
  const searchParams = useSearchParams();
  const [audioUrl, setAudioUrl] = useState("");

  const fetchAudioUrl = async (podcastKey: string) => {
    const url = await fetchFromS3(podcastKey, PODCASTS_BUCKET);
    console.log(url);
    setAudioUrl(url);
    return url;
  };
  useEffect(() => {
    const podcastKey = searchParams.get("podcast");
    if (podcastKey) {
      fetchAudioUrl(podcastKey);
    }
  }, [searchParams]);

  return (
    <div className=" absolute bottom-0 left-0 right-0 p-4 h-[86px] border-t flex">
      {!audioUrl && <span className="m-auto text-gray-600">No podcast is playing</span>}
      {audioUrl && <audio src={audioUrl} controls autoPlay className="w-full bg-transparent" id="audioPlayer"/>}
    </div>
  );
}

export default AudioPlayer;
