import { CircularProgress } from "@nextui-org/react";
import { Card, CardContent } from "./card";

export const LoadingCard = () => {
  return (
    <div className="absolute inset-0 w-screen h-screen bg-black/80">
      <Card className="w-fit px-8 py-2 relative top-[40%] mx-auto">
        <CardContent className="pt-4">
          <CircularProgress
            classNames={{
              label: "text-xl font-medium text-foreground/70",
              svg: "w-12 h-12",
            }}
            color="primary"
            label="Loading..."
          />
        </CardContent>
      </Card>
    </div>
  );
};
