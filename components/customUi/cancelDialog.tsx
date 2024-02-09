"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";

interface CancelDialogProps {
    handleCancel: () => void;
}

const CancelDialog = ({
    handleCancel
}: CancelDialogProps) => {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        type="button" // Change to button type
                        variant={"outline"}
                        className="ms-3"
                        size={"sm"}
                    >
                        Cancel
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[95vw] rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will cance quality that you want to add.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancel}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default CancelDialog;