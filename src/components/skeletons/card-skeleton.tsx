import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function CardSkeleton() {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4">
        <CardTitle>
          <Skeleton className=" h-14 bg-slate-500/30" />
        </CardTitle>
        <Skeleton className=" h-28 bg-slate-500/30" />
      </CardContent>
    </Card>
  );
}

export default CardSkeleton;
