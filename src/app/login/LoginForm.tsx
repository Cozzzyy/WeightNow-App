"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import
import { getAuthError } from "../../../utils/authErrors";
import { toast, Toaster } from "sonner";
import { auth } from "../../../utils/auth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await auth.signIn(email, password);
            router.push("/profile");
            router.refresh();
        } catch (error) {
            console.error("Auth error:", error);
            const { message } = getAuthError(error);
            toast.error(`Authentication Error: ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 pb-15">
            <div className="w-full max-w-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-4 gap-2">
                    <h1 className="text-5xl text-[#4B00FB] font-bold text-center mb-4">WEIGHT</h1>
                    <h1
                        className="text-5xl font-bold text-center mb-4 italic text-[transparent] bg-clip-text"
                        style={{ WebkitTextStroke: "1px white" }}
                    >
                        NOW
                    </h1>
                </div>
                <h2 className="text-1xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 h-14 border border-[#4B00FB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pt-1 px-3 py-2 h-14 border border-[#4B00FB] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-1 bg-gradient-to-r from-[#270082] to-[#5B2DC7] text-white font-semibold py-2 rounded-md hover:from-[#5B2DC7] hover:to-[#270082] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
                <div className="flex justify-center text-center gap-2 mt-2 text-sm">
                    <h4>Don&#39;t have an account?</h4>
                    <Link href={"/register"}>
                        <h4 className="text-[#4B00FB] font-semibold">Sign up</h4>
                    </Link>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
