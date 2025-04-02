"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { DatePicker } from "@/components/date/DatePicker";

interface AddWeightDialogProps {
    handleCloseDialog: () => void;
    open: boolean;
    addWeight: (weight: number, date: Date) => void;
    lastWeight: number;
}

export function AddWeightDialog({ handleCloseDialog, open, addWeight, lastWeight }: AddWeightDialogProps) {
    const [weight, setWeight] = useState(lastWeight);
    const [date, setDate] = useState(new Date());

    function handleDateChange(date: Date) {
        setDate(date);
    }

    function checkWeight() {
        if (weight < 0) {
            setWeight(0);
        }

        if (weight > 300) {
            setWeight(0);
        }

        if (isNaN(weight)) {
            setWeight(0);
        }
    }

    function handleAddWeight() {
        checkWeight();
        addWeight(weight, date);
        handleCloseDialog();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (!open) handleCloseDialog();
            }}
        >
            <DialogContent className="sm:max-w-[425px] border-none">
                <DialogHeader>
                    <DialogTitle>Add Weight</DialogTitle>
                    <DialogDescription>
                        You can add here your new weight. Press the button below to save it.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center flex-col gap-3">
                    <div className="flex justify-center items-center gap-2">
                        <Input
                            type="number"
                            step="0.1"
                            min="0"
                            className="text-center text-6xl h-20 w-32 p-0 border-none  bg-transparent"
                            style={{
                                caretColor: '#4B00FB',
                                WebkitAppearance: 'none',
                                MozAppearance: 'textfield'
                            }}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                            defaultValue={lastWeight}
                        />
                        <span className="text-3xl text-muted-foreground">KG</span>
                    </div>
                    <DatePicker handleDateAction={handleDateChange} />
                </div>
                <DialogFooter>
                    <Button
                        className="mt-7 font-bold"
                        style={{
                            background: 'linear-gradient(93.43deg, rgba(39, 0, 130, 0.66) 17.64%, rgba(67, 0, 223, 0.66) 84.63%)',
                            boxShadow: '-2px 4px 7.3px 6px rgba(0, 0, 0, 0.15)'
                        }}
                        onClick={handleAddWeight} type="submit">Add your new weight</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}