import { Weight } from "../../../types/Weight";

interface AverageWeightInfoProps {
    weights: Weight[] | null;
}

export function AverageWeightInfo({ weights }: AverageWeightInfoProps) {

    // Calculate the last 7 days' average (this week)
    const thisWeekAverage: string = weights && weights.length > 0
        ? (weights.slice(-7).reduce((acc, weight) => acc + weight.weight, 0) / weights.slice(-7).length).toFixed(1)
        : "0.0";

    // Calculate the previous 7 days' average (last week)
    const lastWeekAverage: string = weights?.slice(-14, -7).length === 7
        ? (weights.slice(-14, -7).reduce((acc, weight) => acc + weight.weight, 0) / 7).toFixed(1)
        : "0.0";

    // Difference
    const difference: string = thisWeekAverage !== "0.0" && lastWeekAverage !== "0.0"
        ? (parseFloat(thisWeekAverage) - parseFloat(lastWeekAverage)).toFixed(1)
        : "0.0";

    function handleArrow(difference: string) {
        if(weights !== null && weights.length > 14) {
            if (parseFloat(difference) > 0) {
                return <img src="/arrows/green-up.png" alt="arrow-up" className="w-4 h-4 mt-0.5"/>;
            } else {
                return <img src="/arrows/red-down.png" alt="arrow-down" className="w-4 h-4 mt-0.5"/>;
            }
        }
    }

    return (
        <div className="flex justify-content-center text-sm gap-5 mt-5">
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[#4B00FB]">Last week average</h1>
                <h1 className="font-light text-center">{lastWeekAverage !== "0.0" ? `${lastWeekAverage} KG` : "No enough data"}</h1>
            </div>
            <div className="flex flex-col gap-1">
                <div>
                    <h1 className="font-bold text-[transparent]">Thi</h1>
                </div>
                <div className="flex flex-row gap-1">
                    {weights? handleArrow(difference) : ""}
                    <h1 className="font-bold">{difference !== "0.0" ? `${difference} KG` : "No data"}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[#4B00FB]">This week average</h1>
                <h1 className="font-light text-center">{thisWeekAverage !== "0.0" ? `${thisWeekAverage} KG` : "No data"}</h1>
            </div>
        </div>
    );
}