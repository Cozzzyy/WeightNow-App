"use client";

import {ProfileType} from "../../../utils/profiles";
import {Graph} from "@/components/profile/LineChart";
import {DisplayWeight} from "@/components/profile/DisplayWeight";
import {Weight, WeightCreate} from "../../../types/Weight";
import {AverageWeightInfo} from "@/components/profile/AverageWeightInfo";
import {useWeights} from "@/hooks/useWeights";
import {LoadingSpinner} from "@/components/LoadingSpinner";
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


    useEffect(() => {
        if (!isLoading && (!weights || weights.length === 0)) {
            setOpenAddWeightDialog(true);
        }
    }, [weights, isLoading]);


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if(!weights || weights.length === 0) {
        return (
            <div className="flex items-center justify-center flex-col pl-4 pr-4 mt-10 overflow-hidden">
                <h1 className="text-1xl text-center">
                    No weights found for {user.name}. Please add your first weight!
                </h1>
                <AddWeightButton handleOpenDialog={handleOpenDialog} />
                <AddWeightDialog handleCloseDialogAction={handleCloseDialog} open={openAddWeightDialog} addWeightAction={handleAddWeight}/>
            </div>
        )
    }

    const lastWeight: Weight = weights[weights.length - 1];

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
            <Graph name={user.name} weights={weights} targetWeight={92} />
            <DisplayWeight weights={weights} handleOpenDialog={handleOpenDialog} />
            <AverageWeightInfo weights={weights} userId={user.id} />
            <WeightsHistorySummary weights={weights} />
            <AddWeightButton handleOpenDialog={handleOpenDialog} />
            <AddWeightDialog
                handleCloseDialogAction={handleCloseDialog}
                open={openAddWeightDialog}
                addWeightAction={handleAddWeight}
                selectedWeight={lastWeight}
            />
        </div>
    );
}