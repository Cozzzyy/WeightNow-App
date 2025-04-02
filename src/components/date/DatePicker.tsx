"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";

interface DatePickerProps {
    handleDateAction: (date: Date) => void;
}

export function DatePicker( {handleDateAction}: DatePickerProps) {
    const [date, setDate] = useState(new Date());

    function handleDateChange(date: Date) {
        setDate(date);
        handleDateAction(date);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] border-gray-800 justify-start text-left font-normal"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && handleDateChange(date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
