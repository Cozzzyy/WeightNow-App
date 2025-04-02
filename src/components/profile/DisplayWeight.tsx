import { Weight } from "../../../types/Weight";

interface DisplayWeightProps {
    weights: Weight[] | null;
}

export function DisplayWeight({ weights }: DisplayWeightProps) {
    const lastWeight: string = weights && weights.length > 0
        ? weights[weights.length - weights.length].weight.toFixed(1)
        : "0.0";

    return (
        <div className="flex justify-content-center text-5xl font-bold gap-2">
            <h1>
                {lastWeight}
            </h1>
            <h1>KG</h1>
        </div>
    );
}