import {Weight} from "../../../types/Weight";

interface IWeightsHistorySummaryProps {
    weights: Weight[];
}

export function WeightsHistorySummary({weights}: IWeightsHistorySummaryProps) {

    const last5Weights: Weight[] = weights.length > 3 ? weights.slice(0,5) : weights;
    const last4Weights: Weight[] = weights.length > 3 ? weights.slice(0,4) : weights;

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
                    <h1 className="text-[#4B00FB] text-center ">No data available, click on Add Weight to start weight
                        tracking</h1>
                </div>
            );
        }
    }

    return (
        <div className="flex justify-center flex-col mt-5 w-[350]">
            <div className="flex justify-between pl-1 pr-1">
                <div className="text-[#4B00FB] text-[13px]">History</div>
                <div className="text-[#4B00FB] text-[13px]">See all</div>
            </div>
            {showMissingDataInfo()}
            {last4Weights.map((weight, index) => (
                <div
                    key={index}
                    className="flex justify-between w-[350] h-[55] mt-2"
                    style={{
                        background: "linear-gradient(91.99deg, rgba(75, 0, 251, 0.1) 7.67%, rgba(36, 0, 121, 0.1) 92.33%)",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "15px"
                    }}
                >
                    <div className="flex flex-col justify-center align-middle">
                        <h1 className="text-[#C8B1FF] text-[13px] pl-2">{new Date(weight.date).toLocaleDateString()}</h1>
                        <h1 className="text-[#4B00FB] text-[14px] pl-2 opacity-60">{convertTimestampToMinutesAndHours(weight.timestamp)}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-center">
                            {handleArrow(calculateDifference(weight.weight, last5Weights[index + 1]?.weight || weight.weight))}
                            <h1 className="">
                                {index < last5Weights.length - 1
                                    ? parseFloat(calculateDifference(weight.weight, last5Weights[index + 1].weight)).toFixed(1)
                                    : 0.0} KG
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <h1 className="text-[15px] pr-2">{weight.weight.toFixed(1)} KG</h1>
                    </div>
                </div>
            ))}
        </div>
    );
}