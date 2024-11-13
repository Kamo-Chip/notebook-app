"use client";

import { fetchFromS3 } from "@/lib/s3";
import { PODCASTS_BUCKET } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TbRewindBackward15, TbRewindForward15 } from "react-icons/tb";
function AudioPlayer() {
  const searchParams = useSearchParams();
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);

  const [isDragging, setIsDragging] = useState(false);

  const fetchAudioUrl = async (podcastKey: string) => {
    const url = await fetchFromS3(podcastKey, PODCASTS_BUCKET);
    setAudioUrl(url);
    return url;
  };

  const setPlaying = (playing: boolean) => {
    setIsPlaying(playing);
    localStorage.setItem("isPlaying", `${playing}`);
    localStorage.setItem("podcastKey", searchParams.get("podcast") || "");
    window.dispatchEvent(new Event("isPlaying"));
  };

  const calculateTimeFromPosition = (e: any, rect: DOMRect) => {
    const clientX = e.clientX;
    const clickX = clientX - rect.left;
    return (clickX / rect.width) * duration;
  };

  const handleCircleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      const newTime = calculateTimeFromPosition(e, rect);
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const newTime = calculateTimeFromPosition(e, rect);
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement?.currentTime || 0);
    };

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioRef.current]);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current?.duration);
    }
  }, [currentTime]);

  useEffect(() => {
    const podcastKey = searchParams.get("podcast");
    if (podcastKey) {
      fetchAudioUrl(podcastKey);
    }
  }, [searchParams]);

  return (
    <div className=" absolute bottom-0 left-0 right-0 p-4 h-[69px] border-t flex flex-col">
      {!audioUrl && (
        <span className="m-auto text-gray-600">No podcast is playing</span>
      )}
      {audioUrl && (
        <>
          <audio
            src={audioUrl}
            className="hidden"
            id="audioPlayer"
            onPause={() => {
              setPlaying(false);
            }}
            onPlay={() => {
              setPlaying(true);
            }}
            ref={audioRef}
          />
          <div className="flex items-center gap-8">
            <div className="grid grid-cols-3 items-center w-fit gap-2 justify-items-center text-3xl">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime -= 15;
                  }
                }}
              >
                <TbRewindBackward15 />
              </button>

              {isPlaying ? (
                <button
                  onClick={() => {
                    audioRef.current?.pause();
                  }}
                >
                  <PauseIcon className="w-9 h-9" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioRef.current?.play();
                  }}
                >
                  <PlayIcon className="w-9 h-9" />
                </button>
              )}

              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime += 15;
                  }
                }}
              >
                <TbRewindForward15 />
              </button>
            </div>
            <div
              className="bg-primary/20 h-2 w-full cursor-pointer rounded-3xl"
              onMouseDown={handleProgressBarClick}
            >
              <div
                className="bg-primary h-2 relative rounded-3xl"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full bg-primary absolute right-[-8px] top-0 bottom-0 my-auto"
                  onMouseDown={handleCircleMouseDown}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AudioPlayer;
