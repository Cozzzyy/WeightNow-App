import Profile from './Profile';
import { NavBar } from "@/components/navigation/NavBar";
import { ProfileType } from "../../../utils/profiles";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation"; // ✅ Correct import for redirection in Server Components

export default async function ProfilePage() {
    const supabase = await createClient();
    const currentSession = await supabase.auth.getSession();

    if (!currentSession.data.session) { // ✅ Check for actual session, not the object itself
        redirect('/login'); // ✅ Correct way to redirect in a Server Component
    }

    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq("id", currentSession.data.session.user.id)
        .single();

    const user = data as ProfileType;

    return (
        <div>
            <NavBar />
            <Profile user={user} />
        </div>
    );
}
