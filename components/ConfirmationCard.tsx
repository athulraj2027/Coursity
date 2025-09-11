import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

type ConfirmationCardProps<T> = {
  onConfirm: (data: T) => void; // or (args: any) => void if it accepts params
  setIsConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>;
  question: string;
  data: T | null;
};

function ConfirmationCard<T>({
  onConfirm,
  setIsConfirmationVisible,
  question,
  data,
}: ConfirmationCardProps<T>) {
  return (
    <div className="fixed inset-0 text-center flex items-center justify-center bg-black/50 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirm?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{question}</p>
        </CardContent>
        <CardFooter className="flex gap-5 justify-end">
          <Button
            onClick={async () => {
              try {
                await onConfirm(data);
                setIsConfirmationVisible(false); // close only if successful
              } catch (error) {
                console.error("Confirmation failed:", error);
                // optionally show a toast or error message
              }
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsConfirmationVisible(false)}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ConfirmationCard;
