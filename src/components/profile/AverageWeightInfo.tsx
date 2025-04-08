import { Weight } from "../../../types/Weight";

interface AverageWeightInfoProps {
    weights: Weight[];
}

export function AverageWeightInfo({ weights }: AverageWeightInfoProps) {

    const getStartOfWeek = (date: Date, weekStartDay: number = 1): Date => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = (day < weekStartDay ? 7 : 0) + day - weekStartDay;
        d.setDate(d.getDate() - diff);
        d.setHours(0, 0, 0, 0); // Ensure the time is set to the start of the day
        return d;
    };

    const calculateWeeklyAverage = (weights: Weight[]) => {
        if (!weights || weights.length === 0) return { thisWeek: "0.0", lastWeek: "0.0" };

        // Convert string dates to Date objects
        const weightEntries = weights.map(w => ({ ...w, date: new Date(w.date) })).reverse();

        // Find the start of this and last week
        const today = new Date();
        const thisWeekStart = getStartOfWeek(today, 1); // Always start the week on Monday
        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(thisWeekStart.getDate() - 7);

        const thisWeekEnd = new Date(thisWeekStart);
        thisWeekEnd.setDate(thisWeekStart.getDate() + 6); // This week's last day

        // Filter weights properly into the correct week
        const thisWeekWeights = weightEntries.filter(w => w.date >= thisWeekStart && w.date <= thisWeekEnd);
        const lastWeekWeights = weightEntries.filter(w => w.date >= lastWeekStart && w.date < thisWeekStart);

        console.log("This week weights:", thisWeekWeights);

        // Calculate averages
        const average = (data: { weight: number }[]) =>
            data.length > 0 ? (data.reduce((acc, w) => acc + w.weight, 0) / data.length).toFixed(2) : "0.0";

        return {
            thisWeek: average(thisWeekWeights),
            lastWeek: average(lastWeekWeights)
        };
    };

    const { thisWeek, lastWeek } = calculateWeeklyAverage(weights!);

    // Difference
    const difference: string = thisWeek !== "0.0" && lastWeek !== "0.0"
        ? (parseFloat(thisWeek) - parseFloat(lastWeek)).toFixed(2)
        : "0.0";

    function handleArrow(difference: string) {
        if (weights!.length >= 7) {
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
                    <h1 className="font-bold">{difference !== "0.0" ? `${difference} KG` : "No data"}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[#4B00FB]">This week average</h1>
                <h1 className="font-light text-center">{thisWeek !== "0.0" ? `${thisWeek} KG` : "No data"}</h1>
            </div>
        </div>
    );
}
