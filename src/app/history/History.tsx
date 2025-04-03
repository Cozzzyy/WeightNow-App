"use client";

import {ProfileType} from "../../../utils/profiles";
import {useWeights} from "@/hooks/useWeights";
import {Loading} from "@/components/Loading";
import {WeightsHistorySummary} from "@/components/profile/WeightsHistorySummary";
import {Weight} from "../../../types/Weight";
import {BackButton} from "@/components/buttons/BackButton";

interface IHistoryProps {
    user: ProfileType;
}

export function History({ user }: IHistoryProps) {
    const { data: weights, updateWeight, deleteWeight, isLoading } = useWeights(user.id);

    if(isLoading) {
        return (<Loading />);
    }

    if(!weights || weights.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">No History Available</h1>
                <p className="mt-4 text-gray-600">Please add some weights to see your history.</p>
            </div>
        );
    }

    // Ensure weights is always an array
    const weightsWithDate: Weight[] = weights?.length
        ? weights.map((weight: Weight) => ({
            ...weight,
            date: new Date(weight.date),
        }))
        : [];

    // Sort the weights
    const sortedWeights: Weight[] = weightsWithDate.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const dateComparison = dateB.getTime() - dateA.getTime(); // Reverse the comparison for dates
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return b.timestamp - a.timestamp; // Reverse the comparison for timestamps if dates are the same
    });

    function handleUpdateWeightAction(weight : Weight) {
        updateWeight(weight);
    }

    function deleteWeightAction(id: string) {
        deleteWeight(id);
    }

    return (
        <div className="flex items-center justify-center flex-col pl-4 pr-4 overflow-hidden">
            <WeightsHistorySummary weights={sortedWeights} handleUpdateWeightAction={handleUpdateWeightAction} deleteWeightAction={deleteWeightAction} />
            <BackButton/>
        </div>

    );
}