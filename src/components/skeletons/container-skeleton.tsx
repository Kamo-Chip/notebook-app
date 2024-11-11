import { Skeleton } from "../ui/skeleton";
import CardSkeleton from "./card-skeleton";

function ContainerSkeleton({ hasHeading }: { hasHeading?: boolean }) {
  return (
    <div>
      {hasHeading && (
        <div className="flex justify-between items-start mb-16">
          <Skeleton className="w-96 h-16 bg-slate-500/30" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map(() => (
          <CardSkeleton />
        ))}
      </div>
    </div>
  );
}

export default ContainerSkeleton;
