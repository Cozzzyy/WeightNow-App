import { Weight } from "../../../types/Weight";

interface DisplayWeightProps {
    weights: Weight[];
    handleOpenDialog: () => void;
}

export function DisplayWeight({ weights, handleOpenDialog }: DisplayWeightProps) {
    const lastWeight: string = weights[weights.length - weights.length].weight.toFixed(1);

    return (
        <div className="flex justify-content-center text-5xl font-bold gap-2 cursor-default" onClick={handleOpenDialog}>
            <h1>
                {lastWeight}
            </h1>
            <h1>KG</h1>
        </div>
    );
}