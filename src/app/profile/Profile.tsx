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
import {useEffect, useState} from "react";
import {WeightsHistorySummary} from "@/components/profile/WeightsHistorySummary";



interface IProfileProps {
    user: ProfileType;
}

export default function Profile({ user }: IProfileProps) {
    const { data: weights, isLoading, addWeight } = useWeights(user.id);
    const [openAddWeightDialog, setOpenAddWeightDialog] = useState(false);
    const [firstWeight, setFirstWeight] = useState(true);


    useEffect(() => {
        if(weights && weights.length === 0) {
            setOpenAddWeightDialog(true);
        }
        if(weights && weights.length > 0) {
            setFirstWeight(false);
        }
    }, [weights]);

    if (isLoading) {
        return <Loading />;
    }


    // Get the last weight (if available)
    const lastWeight: Weight | null = weights?.length ? weights[weights.length - 1] : null;

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
            <Graph name={user.name} weights={weights} />
            <DisplayWeight weights={weights} handleOpenDialog={handleOpenDialog} />
            <AverageWeightInfo weights={weights} />
            <WeightsHistorySummary weights={weights} />
            <AddWeightButton handleOpenDialog={handleOpenDialog} />
            <AddWeightDialog
                handleCloseDialogAction={handleCloseDialog}
                open={openAddWeightDialog}
                addWeightAction={handleAddWeight}
                selectedWeight={lastWeight}
                firstWeight={firstWeight}
            />
        </div>
    );
}