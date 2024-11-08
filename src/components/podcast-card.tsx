"use client";

import { Podcast } from "@/lib/types";
import { formatDuration } from "@/lib/utils";
import { PlayIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditableCardHeader from "./editable-card-header";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { editPodcastTitle } from "@/lib/actions";

function PodcastCard({ podcast }: { podcast: Podcast }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
            }}
          >
            <PlayIcon className="w-6 h-6" /> {formatDuration(podcast.length)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default PodcastCard;
