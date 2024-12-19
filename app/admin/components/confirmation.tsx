import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React from "react";

type ConfirmationDialogType = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  description: string;
  callback: () => void;
  actionLabel: string;
  cancelLabel?: string;
};

const ConfirmationDialog = ({
  title,
  description,
  callback,
  isOpen,
  setIsOpen,
  cancelLabel = "Цуцлах",
  actionLabel,
}: ConfirmationDialogType) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={callback}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
