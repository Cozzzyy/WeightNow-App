import { createClient } from './supabase/client';
import type { User } from '@supabase/supabase-js';
import {profiles} from "./profiles";

const supabase = createClient();

export interface IUserLink {
    id: string;
    label: string;
    url: string;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar: string;
    created_at: Date;
    links: IUserLink[];
    provider: 'google' | 'github' | 'email';
}

export const users = {
    async getUser(id: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as IUser | null;
    },


    async captureUserDetails(authUser: User) {
        // Check if user already exists
        const existingUser = await this.getUser(authUser.id).catch(() => null);
        if (existingUser) return existingUser;


        // Create new user
        const newUser: Partial<IUser> = {
            id: authUser.id,
            email: authUser.email!,
            name: authUser.user_metadata.full_name || authUser.email!.split('@')[0],
        };

        return await profiles.createProfile(newUser);
    },
};