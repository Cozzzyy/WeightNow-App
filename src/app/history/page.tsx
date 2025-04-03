import {NavBar} from "@/components/navigation/NavBar";
import {History} from "@/app/history/History";
import {redirect} from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import {ProfileType} from "../../../utils/profiles";

export default async function HistoryPage() {
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
            <NavBar/>
            <History user={user}/>
        </div>
    );
}