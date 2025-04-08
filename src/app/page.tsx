"use client";

import LoginPage from "./login/page";
import { createClient } from "../../utils/supabase/client";
import { useEffect} from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                router.push('/profile'); // Redirect only if session exists
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                router.push('/profile'); // Redirect when user logs in
            }
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, [router, supabase.auth]);

    return (
        <div>
            <LoginPage />
        </div>
    );
}
