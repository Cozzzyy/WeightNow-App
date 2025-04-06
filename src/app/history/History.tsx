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

    function handleUpdateWeightAction(weight : Weight) {
        updateWeight(weight);
    }

    function deleteWeightAction(id: string) {
        deleteWeight(id);
    }

    return (
        <div className="flex items-center justify-center flex-col pl-4 pr-4 overflow-hidden">
            <WeightsHistorySummary weights={weights} handleUpdateWeightAction={handleUpdateWeightAction} deleteWeightAction={deleteWeightAction} />
            <BackButton/>
        </div>

    );
}