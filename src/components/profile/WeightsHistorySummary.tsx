import {Weight} from "../../../types/Weight";
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {useState} from "react";
import {AddWeightDialog} from "@/components/profile/dialogs/AddWeightDialog";

interface IWeightsHistorySummaryProps {
    weights: Weight[];
    handleUpdateWeightAction?: (weight: { weight: number; date: Date }) => void;
    deleteWeightAction?: (id: string) => void;
}

export function WeightsHistorySummary({
                                          weights,
                                          handleUpdateWeightAction,
                                          deleteWeightAction
                                      }: IWeightsHistorySummaryProps) {
    const router = useRouter();
    const currentPath = usePathname();
    const [selectedWeightIndex, setSelectedWeightIndex] = useState<number | null>(null); // Track selected weight index
    const [editMode, setEditMode] = useState(false); // Track edit mode
    const last5Weights: Weight[] = (weights.length > 3 && currentPath === "/profile") ? weights.slice(0, 5) : weights;
    const last4Weights: Weight[] = (weights.length > 3 && currentPath === "/profile") ? weights.slice(0, 4) : weights;

    function convertTimestampToMinutesAndHours(timestamp: number) {
        const date = new Date(timestamp);
        const minutes = date.getMinutes();
        const hours = date.getHours();
        return `${hours}:${minutes}`;
    }

    function calculateDifference(weight1: number, weight2: number) {
        return (weight1 - weight2).toFixed(1);
    }

    function handleArrow(difference: string) {
        if (parseFloat(difference) === 0) {
            return null;
        }
        if (parseFloat(difference) > 0) {
            return <img src="/arrows/green-up.png" alt="arrow-up" className="w-4 h-4 mt-0.5"/>;
        } else {
            return <img src="/arrows/red-down.png" alt="arrow-down" className="w-5 h-5 mt-0.5"/>;
        }
    }

    function showMissingDataInfo() {
        if (!weights || weights.length === 0) {
            return (
                <div className="flex justify-center m-10">
                    <h1 className="text-[#4B00FB] text-center">
                        No data available, click on Add Weight to start weight tracking
                    </h1>
                </div>
            );
        }
    }

    function handleNavigateToHistory() {
        router.push("/history");
    }

    function showSeeAllButton() {
        if (currentPath === "/history") {
            return null;
        }

        return (
            <div className="text-[#4B00FB] text-[13px]" onClick={handleNavigateToHistory}>See all</div>
        );
    }

    function showHistoryTitle() {
        if (currentPath === "/history") {
            return (
                <div>
                    <h1 className="text-[#4B00FB] text-[25px] mb-1">History</h1>
                    <h1 className="text-[#C8B1FF] text-[15px] opacity-65">If you want to change the date or a weight just simply
                        click on them.</h1>
                </div>

            );
        }

        return (
            <div className="text-[#4B00FB] text-[13px]">History</div>
        );
    }

    function handleEditWeight(index: number) {
        if (currentPath === "/history") {
            setEditMode(true); // Set edit mode
            setSelectedWeightIndex(index); // Set the selected index
        }
    }

    function handleDeleteWeightAction(id: string) {
        if (deleteWeightAction) {
            deleteWeightAction(id);
        }
    }

    function handleCloseDialog() {
        if (currentPath === "/history") {
            setSelectedWeightIndex(null); // Close the dialog
            setEditMode(false); // Reset edit mode
        }
    }

    return (
        <div className="flex justify-center flex-col mt-5 w-[350]">
            <div className="flex justify-between pl-1 pr-1">
                {showHistoryTitle()}
                {showSeeAllButton()}
            </div>
            {showMissingDataInfo()}
            {last4Weights.map((weight, index) => (
                <div
                    key={index}
                    className="flex justify-between w-[350] h-[55] mt-2"
                    style={{
                        background: "linear-gradient(91.99deg, rgba(75, 0, 251, 0.1) 7.67%, rgba(36, 0, 121, 0.1) 92.33%)",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "15px",
                    }}
                >
                    <div className="flex flex-col justify-center align-middle" onClick={() => handleEditWeight(index)}>
                        <h1 className="text-[#C8B1FF] text-[14px] pl-2">{new Date(weight.date).toLocaleDateString()}</h1>
                        <h1 className="text-[#4B00FB] text-[14px] pl-2 opacity-90">{convertTimestampToMinutesAndHours(weight.timestamp)}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-center">
                            {weights.length > 1 ? (
                                <>
                                    {handleArrow(calculateDifference(weight.weight, last5Weights[index + 1]?.weight || weight.weight))}
                                    <h1 className="">
                                        {index < last5Weights.length - 1
                                            ? parseFloat(calculateDifference(weight.weight, last5Weights[index + 1].weight)).toFixed(1)
                                            : 0.0}{" "}
                                        KG
                                    </h1>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center align-middle" onClick={() => handleEditWeight(index)}>
                        <h1 className="text-[15px] pr-2">{weight.weight.toFixed(1)} KG</h1>
                    </div>
                    {selectedWeightIndex === index && (
                        <AddWeightDialog handleCloseDialogAction={handleCloseDialog}
                                         editWeightAction={handleUpdateWeightAction}
                                         deleteWeightAction={handleDeleteWeightAction} open={true}
                                         selectedWeight={weight} editMode={editMode}/>
                    )}
                </div>
            ))}
        </div>
    );
}
