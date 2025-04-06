import {Weight} from "../types/Weight";

export async function sortWeights(weights: Weight[]): Promise<Weight[]> {
    return weights.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const dateComparison = dateB.getTime() - dateA.getTime(); // Reverse the comparison for dates
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return b.timestamp - a.timestamp; // Reverse the comparison for timestamps if dates are the same
    });
}