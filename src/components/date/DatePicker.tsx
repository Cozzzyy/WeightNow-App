"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
    handleDateAction: (date: Date) => void;
}

export function DatePicker({ handleDateAction }: DatePickerProps) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    function handleDateChange(selectedDate: Date) {
        setDate(selectedDate);
        handleDateAction(selectedDate);
        setOpen(false); // Close after selection
    }

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] border-gray-800 justify-start text-left font-normal"
                    )}
                    onClick={() => setOpen(!open)} // Ensure it opens on mobile
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0 z-50" // Ensure it's on top
                align="start"
                sideOffset={8} // Space from trigger
            >
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && handleDateChange(date)}
                    initialFocus
                    className="block touch-manipulation" // Ensure mobile touch works
                />
            </PopoverContent>
        </Popover>
    );
}
