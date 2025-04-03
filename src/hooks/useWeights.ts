import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Weight } from '../../types/Weight';
import { weights } from "../../utils/weights";

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
        }
    });

    const updateWeight = useMutation({
        mutationFn: (weight: Partial<Weight>) => weights.updateWeight(weight),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weights', id] });
        }
    });

    const deleteWeight = useMutation({
        mutationFn: (id: string) => weights.deleteWeight(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weights', id] });
        }
    });

    return {
        ...query,
        addWeight: addWeight.mutate,
        updateWeight: updateWeight.mutate,
        deleteWeight: deleteWeight.mutate,
    };
}