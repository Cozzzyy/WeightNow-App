"use client";

import {ProfileType} from "../../../utils/profiles";
import {Graph} from "@/components/profile/LineChart";
import {DisplayWeight} from "@/components/profile/DisplayWeight";
import {Weight, WeightCreate} from "../../../types/Weight";
import {AverageWeightInfo} from "@/components/profile/AverageWeightInfo";
import {useWeights} from "@/hooks/useWeights";
import {Loading} from "@/components/Loading";
import {AddWeightButton} from "@/components/buttons/AddWeightButton";
import {AddWeightDialog} from "@/components/profile/dialogs/AddWeightDialog";
import {useState} from "react";
import {WeightsHistorySummary} from "@/components/profile/WeightsHistorySummary";


interface IProfileProps {
    user: ProfileType;
}

export default function Profile({ user }: IProfileProps) {
    const { data: weights, isLoading, addWeight } = useWeights(user.id);
    const [openAddWeightDialog, setOpenAddWeightDialog] = useState(false);

    if (isLoading) {
        return <Loading />;
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

    console.log(sortedWeights);


    // Get the last weight (if available)
    const lastWeight: Weight | null = sortedWeights.length ? sortedWeights[sortedWeights.length - 1] : null;

    function handleOpenDialog() {
        setOpenAddWeightDialog(true);
    }

    function handleCloseDialog() {
        setOpenAddWeightDialog(false);
    }

    function handleAddWeight(weight: number, date: Date) {
        const newWeight: WeightCreate = {
            weight,
            date: date.toDateString(),
            profile_id: user.id,
            timestamp: Date.now(),
        };
        addWeight(newWeight);
    }

    return (
        <div className="flex items-center justify-center flex-col pl-4 pr-4 overflow-hidden">
            <Graph name={user.name} weights={sortedWeights} />
            <DisplayWeight weights={sortedWeights} />
            <AverageWeightInfo weights={sortedWeights} />
            <WeightsHistorySummary weights={sortedWeights} />
            <AddWeightButton handleOpenDialog={handleOpenDialog} />
            <AddWeightDialog
                handleCloseDialog={handleCloseDialog}
                open={openAddWeightDialog}
                addWeight={handleAddWeight}
                lastWeight={lastWeight ? lastWeight.weight : 0}
            />
        </div>
    );
}