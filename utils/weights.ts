import { createClient } from './supabase/client';
import {Weight} from "../types/Weight";


const supabase = createClient();

export const weights = {
    async getWeights(id: string) {
        const { data, error } = await supabase
            .from('weights')
            .select('*')
            .eq('profile_id', id)              // Ensure this is the correct column

        if (error) {
            throw error; // Ensure errors are thrown correctly to be handled by React Query
        }

        return data as Weight[]; // Ensure this matches your expected return type (Weight[])
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
}