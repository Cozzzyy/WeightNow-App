"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, ReferenceLine } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Weight } from "../../../types/Weight"

// Chart configuration
const chartConfig = {
    weight: {
        label: "Weight (kg)",
        color: "hsl(270, 100%, 50%)",
    },
} satisfies ChartConfig

interface GraphProps {
    name: string;
    weights: Weight[] | null;
}

// Function to format date as "DD/MM"
const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
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

export function Graph({ name, weights }: GraphProps) {
    if (!weights || weights.length === 0) {
        return (
            <Card className="bg-transparent text-white border-none">
                <CardHeader>
                    <CardTitle>Hello, {name}</CardTitle>
                    <CardDescription>No data available</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full h-[200px]">
                        <LineChart
                            accessibilityLayer
                            data={[]}
                            margin={{
                                top: 30,
                                right: 18,
                                left: 2,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.2)" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                stroke="white"
                            />
                            <YAxis
                                dataKey="weight"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={25}
                                stroke="white"
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        );
    }
    console.log(weights);

    // Get last 7 days of weights starting from the last weight
    const lastSevenDays = weights.slice(0, 7).reverse();

    console.log(lastSevenDays);

    const minWeight = Math.min(...lastSevenDays.map(data => data.weight));
    const maxWeight = Math.max(...lastSevenDays.map(data => data.weight));
    const average = lastSevenDays.reduce((acc, curr) => acc + curr.weight, 0) / lastSevenDays.length;

    const yAxisTicks = generateSmartTicks(minWeight - 0.5, maxWeight + 0.5);
    const firstDate = formatDate(new Date(lastSevenDays[0]?.date));
    const lastDate = formatDate(new Date(lastSevenDays[lastSevenDays.length - 1]?.date));

    return (
        <Card className="bg-transparent text-white border-none">
            <CardHeader>
                <CardTitle>Hello, {name}</CardTitle>
                <CardDescription>{firstDate} - {lastDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[200px]">
                    <LineChart
                        accessibilityLayer
                        data={lastSevenDays}
                        margin={{
                            top: 30,
                            right: 18,
                            left: 2,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.2)" />
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
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <ReferenceLine
                            y={average}
                            strokeDasharray="5 5"
                            stroke="rgba(255,255,255,0.5)"
                        />
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
                            <LabelList
                                position="top"
                                offset={20}
                                className="fill-white"
                                fontSize={12}
                                formatter={(value: number) => `${value} kg`}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}