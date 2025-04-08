import { Weight } from "../../../types/Weight";
import {useAverageWeeklyWeight} from "@/hooks/useWeights";

interface AverageWeightInfoProps {
    userId : string
    weights: Weight[]
}

export function AverageWeightInfo({ userId, weights}: AverageWeightInfoProps) {

    const {data: averageWeekWeights} = useAverageWeeklyWeight(userId);

    if(!averageWeekWeights){
        return null;
    }

    // Difference
    const thisWeek: string = averageWeekWeights.this_week_avg == null ? "0.0" : averageWeekWeights.this_week_avg.toString();
    const lastWeek: string = averageWeekWeights.last_week_avg == null ? "0.0" : averageWeekWeights.last_week_avg.toString();
    const difference: string = averageWeekWeights.difference == null ? "0.0" :averageWeekWeights.difference.toString();




    function handleArrow(difference: string) {
        if (weights.length >= 7) {
            if (parseFloat(difference) > 0) {
                return <img src="/arrows/green-up.png" alt="arrow-up" className="w-4 h-4 mt-0.5"/>;

            } else {
                return <img src="/arrows/red-down.png" alt="arrow-down" className="w-4 h-4 mt-0.5"/>;
            }

        }
    }

    return (
        <div className="flex justify-content-center text-sm gap-3 mt-5">
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[#4B00FB]">Last week average</h1>
                <h1 className="font-light text-center">{lastWeek !== "0.0" ? `${lastWeek} KG` : "No enough data"}</h1>
            </div>
            <div className="flex flex-col gap-1">
                <div>
                    <h1 className="font-bold text-[transparent]">Thi</h1>
                </div>
                <div className="flex flex-row gap-1">
                    {weights ? handleArrow(difference) : ""}
                    {weights.length >= 7 ? <h1 className="font-bold">{difference !== "0.0" ? `${difference} KG` : "No data"}</h1> : "0.0"}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[#4B00FB]">This week average</h1>
                <h1 className="font-light text-center">{thisWeek !== "0.0" ? `${thisWeek} KG` : "No data"}</h1>
            </div>
        </div>
    );
}
