"use client";

import {ProfileType} from "../../../utils/profiles";
import {useAveragePerWeek, useWeights} from "@/hooks/useWeights";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {WeightsHistorySummary} from "@/components/profile/WeightsHistorySummary";
import {Weight} from "../../../types/Weight";
import {BackButton} from "@/components/buttons/BackButton";
import {useEffect, useRef, useState} from "react";
import {WeekCard} from "@/components/history/WeekCard";

interface IHistoryProps {
    user: ProfileType;
}

export function History({ user }: IHistoryProps) {
    const { data: weights, updateWeight, deleteWeight, isLoading } = useWeights(user.id);
    const { data: averageWeeklyWeights } = useAveragePerWeek(user.id);
    const [showType, setShowType] = useState("day");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if(isLoading) {
        return (<LoadingSpinner />);
    }

    if(!weights || weights.length === 0 || !averageWeeklyWeights || averageWeeklyWeights.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">No History Available</h1>
                <p className="mt-4 text-gray-600">Please add some weights to see your history.</p>
            </div>
        );
    }

    function handleUpdateWeightAction(weight : Weight) {
        updateWeight(weight);
    }

    function deleteWeightAction(id: string) {
        deleteWeight(id);
    }

    function handleShowType(type: string) {
        setShowType(type);
    }

    return (
        <div className="flex items-center justify-center flex-col pl-4 pr-4 overflow-hidden mt-5">
            <div className="flex flex-col w-full">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-[#4B00FB] text-[25px]">History</h1>
                        <div className="relative mt-2.5" ref={dropdownRef}>
                            {/* SVG Icon Button */}                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" className="size-6 text-[#4B00FB]">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"/>
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-24 bg-white border border-[#4B00FB] rounded-md shadow-lg z-10 text-sm text-[#4B00FB]">
                                    {["day", "week", "month"].map((type) => (
                                        <div
                                            key={type}
                                            onClick={() => {
                                                handleShowType(type);
                                                setDropdownOpen(false);
                                            }}
                                            className={`px-4 py-2 cursor-pointer hover:bg-[#4B00FB] hover:text-white ${
                                                showType === type ? "bg-[#EDE6FF]" : ""
                                            }`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {showType === "day" && (
                        <h1 className="text-[#C8B1FF] text-[15px] opacity-65 mb-2">
                            If you want to change the date or a weight just simply click on
                            them.
                        </h1>)}
                </div>
            </div>
            {showType === "day" && (
                <WeightsHistorySummary weights={weights} handleUpdateWeightAction={handleUpdateWeightAction}
                                       deleteWeightAction={deleteWeightAction} />
            )}
            {showType === "week" && (
                <WeekCard AvgWeightWeek={averageWeeklyWeights} />
                )}
            <BackButton/>
        </div>

    );
}