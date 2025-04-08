import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Weight } from '../../types/Weight';
import { weights } from "../../utils/weights";
import {AverageWeightWeekDifference} from "../../types/AverageWeightWeekDifference";
import {AverageWeightWeek} from "../../types/AverageWeightWeek";

export function useWeights(id: string) {
    const queryClient = useQueryClient();

    const query = useQuery<Weight[], Error>({
        queryKey: ['weights', id],
        queryFn: () => weights.getWeights(id)
    });

    const addWeight = useMutation({
        mutationFn: (newWeight: Partial<Weight>) => weights.createWeight(newWeight),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weights', id] });
            queryClient.invalidateQueries({ queryKey: ['averageWeeklyWeights', id] })
        }
    });

    const updateWeight = useMutation({
        mutationFn: (weight: Partial<Weight>) => weights.updateWeight(weight),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weights', id] });
            queryClient.invalidateQueries({ queryKey: ['averageWeeklyWeights', id] })
        }
    });

    const deleteWeight = useMutation({
        mutationFn: (id: string) => weights.deleteWeight(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weights', id] });
            queryClient.invalidateQueries({ queryKey: ['averageWeeklyWeights', id] })
        }
    });

    return {
        ...query,
        addWeight: addWeight.mutate,
        updateWeight: updateWeight.mutate,
        deleteWeight: deleteWeight.mutate,
    };
}

export function useAverageWeeklyWeight(id: string){
    const query = useQuery<AverageWeightWeekDifference, Error>({
        queryKey: ['averageWeeklyWeights', id],
        queryFn: () => weights.getAverageWeightInfo(id)
    });

    return {
        ...query
    }
}

export function useAveragePerWeek(id: string){
    const query = useQuery<AverageWeightWeek[], Error>({
        queryKey: ['averageWeightWeek', id],
        queryFn: () => weights.getAverageWeightAllWeeks(id)
    });

    return {
        ...query
    }
}

