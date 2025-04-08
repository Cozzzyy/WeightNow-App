import Profile from './Profile';
import { NavBar } from "@/components/navigation/NavBar";
import { ProfileType } from "../../../utils/profiles";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: currentSession } = await supabase.auth.getUser();

    if (!currentSession) {
        redirect('/login');
    }

    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq("id", currentSession.user?.id)
        .single();

    const user = data as ProfileType;


    return (
        <div>
            <NavBar />
            <Profile user={user} />
        </div>
    );
}
