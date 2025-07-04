"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    ReferenceLine,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {Weight} from "../../../types/Weight";

// Chart configuration
const chartConfig = {
    weight: {
        label: "Weight (kg)",
        color: "hsl(270, 100%, 50%)",
    },
} satisfies ChartConfig;

interface GraphProps {
    name: string;
    weights: Weight[];
    targetWeight?: number;
}

// Function to format date as "DD/MM"
const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}`;
};

// Function to generate dynamic Y-axis ticks
const generateSmartTicks = (min: number, max: number) => {
    const range = max - min;
    let step = 1;

    // Dynamically adjust step size based on range
    if (range > 100) {
        step = 10;
    } else if (range > 50) {
        step = 5;
    } else if (range > 20) {
        step = 2;
    } else {
        step = 1;
    }

    const adjustedMin = Math.floor(min / step) * step;
    const adjustedMax = Math.ceil(max / step) * step;

    // Generate 5 evenly spaced ticks
    const ticks = [];
    for (let i = adjustedMin; i <= adjustedMax; i += step) {
        ticks.push(i);
    }

    // Ensure there are 5 ticks, adjusting if necessary
    while (ticks.length < 5) {
        ticks.push(ticks[ticks.length - 1] + step);
    }

    return ticks;
};

export function Graph({name, weights, targetWeight}: GraphProps) {
    // Get last 7 days of weights starting from the last weight
    const lastSevenDays = weights.slice(0, 7).reverse();

    const minWeight = Math.min(...lastSevenDays.map((data) => data.weight));
    const maxWeight = Math.max(...lastSevenDays.map((data) => data.weight));
    const average =
        lastSevenDays.reduce((acc, curr) => acc + curr.weight, 0) /
        lastSevenDays.length;

    const yAxisTicks = generateSmartTicks(minWeight - 0.5, maxWeight + 0.5);
    const firstDate = lastSevenDays[0]
        ? formatDate(new Date(lastSevenDays[0].date))
        : "N/A";
    const lastDate = lastSevenDays[lastSevenDays.length - 1]
        ? formatDate(new Date(lastSevenDays[lastSevenDays.length - 1].date))
        : "N/A";
    return (
        <Card className="bg-transparent text-white border-none">
            <CardHeader>
                <CardTitle>Hello, {name} - (working on phase)</CardTitle>
                <CardDescription>
                    <div className={"flex  justify-between "}>
                        <div>
                            <h1>
                                Phase - Bulking
                            </h1>
                            <h1>
                                Goal - {targetWeight} KG
                            </h1>
                        </div>
                        <div>
                            <h1>

                                {firstDate} - {lastDate}
                            </h1>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[200px]">
                    <LineChart
                        accessibilityLayer
                        data={lastSevenDays}
                        margin={{
                            top: 25,
                            right: 25,
                            left: 8,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.2)"/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tickFormatter={(date: Date) => formatDate(new Date(date))}
                            stroke="white"
                        />
                        <YAxis
                            dataKey="weight"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={25}
                            tickFormatter={(value) => `${value} kg`}
                            stroke="white"
                            domain={[yAxisTicks[0], yAxisTicks[yAxisTicks.length - 1]]}
                            ticks={yAxisTicks}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <ReferenceLine
                            y={average}
                            strokeDasharray="5 5"
                            stroke="rgba(255,255,255,0.5)"
                        />
                        {targetWeight !== undefined && (
                            <ReferenceLine
                                y={targetWeight}
                                stroke="green"
                                strokeDasharray="5 5"
                            />
                        )}
                        <Line
                            dataKey="weight"
                            type="monotone"
                            stroke="#4B00FB"
                            strokeWidth={2}
                            dot={{
                                fill: "hsl(270, 100%, 50%)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
