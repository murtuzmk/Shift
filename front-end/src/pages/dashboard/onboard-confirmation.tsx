import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type OnboardConfirmationProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OnboardConfirmation = ({
  open,
  onOpenChange,
}: OnboardConfirmationProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-64 md:w-80 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center md:text-2xl">
            You're all set up!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Explore the app or jump right into your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center sm:flex-col-reverse">
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
