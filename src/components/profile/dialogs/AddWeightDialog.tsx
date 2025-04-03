import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {DatePicker} from "@/components/date/DatePicker";
import {z} from "zod";
import {Weight} from "../../../../types/Weight";

interface AddWeightDialogProps {
    handleCloseDialogAction: () => void;
    open: boolean;
    addWeightAction?: (weight: number, date: Date) => void;
    editWeightAction?: (weight : Weight) => void;
    deleteWeightAction?: (id: string) => void;
    editMode?: boolean;
    selectedWeight?: Weight | null;
    firstWeight?: boolean;
}

// Zod schema for validating the weight
const weightSchema = z
    .number()
    .min(0, {message: "Weight cannot be negative."})
    .max(300, {message: "Weight cannot exceed 300kg."})
    .refine(val => /^[0-9]+(\.[0-9]{1})?$/.test(val.toString()), {
        message: "Weight must have at most one decimal place.",
    });

export function AddWeightDialog({
                                    handleCloseDialogAction,
                                    open,
                                    addWeightAction,
                                    editWeightAction,
                                    deleteWeightAction,
                                    editMode,
                                    selectedWeight,
                                    firstWeight,
                                }: AddWeightDialogProps) {
    const [weight, setWeight] = useState<string>(selectedWeight?.weight?.toString() || "");
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setWeight(selectedWeight?.weight?.toString() || ""); // Allow clearing input
    }, [selectedWeight]);

    useEffect(() => {
        setError(null); // Reset error when the dialog opens
    }, [open]);

    function handleDateChange(date: Date) {
        setDate(date);
    }

    function handleWeightChange(e: string): void {
        const inputValue = e.replace(",", "."); // Convert , to . immediately
        setWeight(inputValue);

        if (!inputValue) {
            setError(null); // Allow empty input
            return;
        }

        const parsedValue = parseFloat(inputValue);

        if (isNaN(parsedValue)) {
            setError("Invalid number format.");
            return;
        }

        const result = weightSchema.safeParse(parsedValue);
        if (!result.success) {
            setError(result.error.errors[0].message);
        } else {
            setError(null);
        }
    }

    function handleAddOrEditWeight() {
        if (error || !weight) return;

        const parsedWeight = parseFloat(weight);
        if (isNaN(parsedWeight)) {
            setError("Invalid number format.");
            return;
        }

        if (editMode && editWeightAction) {
            const updatedWeight: Weight = {
                id: selectedWeight!.id,
                weight: parsedWeight,
                date: date,
                timestamp: Date.now(),
            }
            editWeightAction(updatedWeight);
        } else if (addWeightAction) {
            addWeightAction(parsedWeight, date);
        }

        handleCloseDialogAction();
    }

    function handleDeleteWeight() {
        if (deleteWeightAction && selectedWeight) {
            deleteWeightAction(selectedWeight.id);
        }
        handleCloseDialogAction();
    }

    return (
        <Dialog open={open} onOpenChange={(open) => !open && handleCloseDialogAction()}>
            <DialogContent className="sm:max-w-[425px] border-none">
                <DialogHeader>
                    <DialogTitle>{editMode ? "Edit Weight" : "Add Weight"}</DialogTitle>
                    <DialogDescription>
                        {firstWeight
                            ? "Hey, looks like you didn't add any weights yet. Select a weight and press the button below to save it!"
                            : "Add your new weight, press the button below to save it!"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center flex-col gap-3">
                    <div className="flex justify-center items-center gap-2">
                        <Input
                            type="text"
                            inputMode="decimal"
                            className="text-center text-6xl h-20 w-32 p-0 border-none bg-transparent"
                            style={{
                                caretColor: "#4B00FB",
                                WebkitAppearance: "none",
                                MozAppearance: "textfield",
                            }}
                            value={weight} // Allow clearing
                            onChange={(e) => handleWeightChange(e.target.value)}
                        />
                        <span className="text-3xl text-muted-foreground">KG</span>
                    </div>
                    <DatePicker handleDateAction={handleDateChange}/>
                </div>
                <DialogFooter>
                    <Button
                        className="mt-7 font-bold"
                        style={{
                            background:
                                "linear-gradient(93.43deg, rgba(39, 0, 130, 0.66) 17.64%, rgba(67, 0, 223, 0.66) 84.63%)",
                            boxShadow: "-2px 4px 7.3px 6px rgba(0, 0, 0, 0.15)",
                        }}
                        onClick={handleAddOrEditWeight}
                        type="submit"
                        disabled={!weight || !!error} // Disable if empty or error
                    >
                        {editMode ? "Update Weight" : "Add your new weight"}
                    </Button>
                    {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
                </DialogFooter>
                {editMode && (
                    <h1 className="text-red-700 font-bold text-[15px] mt-2 text-center" onClick={handleDeleteWeight}>
                        Delete
                    </h1>
                )}

            </DialogContent>
        </Dialog>
    );
}
