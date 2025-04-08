import { createClient } from './supabase/client';
import {Weight} from "../types/Weight";
import {sortWeights} from "./weightsUtil";
import {AverageWeightWeek} from "../types/AverageWeightWeek";


const supabase = createClient();

export const weights = {
    async getWeights(id: string) {
        const { data, error } = await supabase
            .from('weights')
            .select('*')
            .eq('profile_id', id)

        if (error) {
            throw error; // Ensure errors are thrown correctly to be handled by React Query
        }

        const sortedWeights : Weight[] = await sortWeights(data as Weight[]);

        return sortedWeights?.length
            ? data.map((weight: Weight) => ({
                ...weight,
                date: new Date(weight.date),
            }))
            : [];
    },

    async getAverageWeightInfo(profile_id : string): Promise<AverageWeightWeek> {
        const { data, error } = await supabase
            .from('weight_weekly_averages')
            .select('*')
            .eq('profile_id', profile_id)
            .single();

            if(error) {
                throw error;
            }

            return data;
    },


    async createWeight(weight: Partial<Weight>) {
        const { data, error } = await supabase
            .from('weights')
            .insert([weight])
            .select()
            .single();

        if (error) {
            throw error; // Ensure errors are thrown correctly to be handled by React Query
        }



        return data as Weight; // Ensure this matches your expected return type (Weight)
    },

    async updateWeight(weight: Partial<Weight>) {
        const { data, error } = await supabase
            .from('weights')
            .update(weight)
            .eq('id', weight.id)
            .select()
            .single();

        if (error) {
            throw error; // Ensure errors are thrown correctly to be handled by React Query
        }

        return data as Weight; // Ensure this matches your expected return type (Weight)
    },

    async deleteWeight(id: string) {
        const { error } = await supabase
            .from('weights')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw error; // Ensure errors are thrown correctly to be handled by React Query
        }
    }
}