"use client";
import { auth } from "../../../utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router for App Router
import { getAuthError } from "../../../utils/authErrors";
import { toast, Toaster } from "sonner";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Validation Error: Passwords do not match');
            return;
        }

        try {
            setIsLoading(true);
            await auth.signUp(email, password);
            toast.success('Please check your email to verify your account.');
            router.push('/login');
        } catch (error) {
            const { message } = getAuthError(error);
            toast.error(`Account Creation Error: ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 pb-15">
            <div className="w-full max-w-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-4 gap-2">
                    <h1 className="text-5xl text-[#4B00FB] font-bold text-center mb-4">WEIGHT</h1>
                    <h1 className="text-5xl font-bold text-center mb-4 italic text-[transparent] bg-clip-text"
                        style={{ WebkitTextStroke: "1px white" }}>
                        NOW
                    </h1>
                </div>
                <h2 className="text-1xl font-semibold mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
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
                    <div>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                Signing Up...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
}
