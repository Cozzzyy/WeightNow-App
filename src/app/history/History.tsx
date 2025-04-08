"use client";

import {ProfileType} from "../../../utils/profiles";
import {useAveragePerWeek, useWeights} from "@/hooks/useWeights";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {WeightsHistorySummary} from "@/components/profile/WeightsHistorySummary";
import {Weight} from "../../../types/Weight";
import {BackButton} from "@/components/buttons/BackButton";
import {useState} from "react";
import {WeekCard} from "@/components/history/WeekCard";

interface IHistoryProps {
    user: ProfileType;
}

export function History({ user }: IHistoryProps) {
    const { data: weights, updateWeight, deleteWeight, isLoading } = useWeights(user.id);
    const { data: averageWeeklyWeights } = useAveragePerWeek(user.id);
    const [showType, setShowType] = useState("day");

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
            <div className="flex items-center justify-between w-full">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-[#4B00FB] text-[25px]">History</h1>
                        <select
                            className="bg-transparent border h-[30] border-[#4B00FB] text-[#4B00FB] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#4B00FB]"
                            value={showType}
                            onChange={(e) => handleShowType(e.target.value)}
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                    <h1 className="text-[#C8B1FF] text-[15px] opacity-65 mb-2">
                        If you want to change the date or a weight just simply click on
                        them.
                    </h1>
                </div>
            </div>
            {showType === "day" && (
            <WeightsHistorySummary weights={weights} handleUpdateWeightAction={handleUpdateWeightAction} deleteWeightAction={deleteWeightAction} handleShowType={handleShowType} />
            )}
            {showType === "week" && (
                <WeekCard AvgWeightWeek={averageWeeklyWeights} />
                )}
            <BackButton/>
        </div>

    );
}