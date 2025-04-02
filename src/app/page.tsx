"use client";

import LoginPage from "./login/page";
import { createClient } from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Loading} from "@/components/Loading";

export default function Home() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                router.push('/profile'); // Redirect only if session exists
            } else {
                setLoading(false); // Stop loading when no session is found
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

    if (loading) return <Loading/>; // Prevents flickering

    return (
        <div>
            <LoginPage />
        </div>
    );
}
