import { AverageWeightWeek } from "../../../types/AverageWeightWeek";

interface IWeekCardProps {
    AvgWeightWeek: AverageWeightWeek[];
}

export function WeekCard({ AvgWeightWeek }: IWeekCardProps) {

    function calculateWeightDifference(current: number, previous: number): string {
        if (previous === 0) {
            return "0.00"; // Or some other appropriate value when there's no previous weight
        }

        const difference = current - previous;
        const formattedDifference = difference.toFixed(2);
        return difference > 0 ? `${formattedDifference}` : formattedDifference;
    }

    function handleArrow(difference: string) {
        if (parseFloat(difference) === 0) {
            return null;
        }
        if (parseFloat(difference) > 0) {
            return (
                <img src="/arrows/green-up.png" alt="arrow-up" className="w-4 h-4 mt-0.5"/>
            );
        } else {
            return (
                <img src="/arrows/red-down.png" alt="arrow-down" className="w-5 h-5 mt-0.5"/>
            );
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {AvgWeightWeek.map((week, index) => {
                const previousWeek = AvgWeightWeek[index + 1];
                const difference = previousWeek
                    ? calculateWeightDifference(week.weekly_avg, previousWeek.weekly_avg)
                    : "0.00";

                return (
                    <div
                        key={index}
                        className="flex justify-between w-[350] h-[55] mt-2"
                        style={{
                            background:
                                "linear-gradient(91.99deg, rgba(75, 0, 251, 0.1) 7.67%, rgba(36, 0, 121, 0.1) 92.33%)",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "15px",
                        }}
                    >
                        <div className="flex flex-col justify-center align-middle">
                            <h1 className="text-[#C8B1FF] text-[14px] pl-2">{week.week_label}</h1>
                            <h1 className="text-[#4B00FB] text-[14px] pl-2 opacity-90">
                                {week.week_start} - {week.week_end}
                            </h1>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            {handleArrow(difference)}
                            <div className="flex flex-row justify-center items-center">
                                <h1 className="">{difference} KG</h1>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <h1 className="text-[15px] pr-2">{week.weekly_avg.toFixed(2)} KG</h1>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
