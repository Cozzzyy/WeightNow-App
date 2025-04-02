import { createClient } from './supabase/client';


const supabase = createClient();


export type ProfileType =  {
    id: string;
    email: string;
    name: string;
}

export const profiles = {
    async createProfile(profile: Partial<ProfileType>) {
        const { data, error } = await supabase
            .from('profiles')
            .insert([profile])
            .select()
            .single();

        if (error) throw error;
        return data as ProfileType;
    },

}
