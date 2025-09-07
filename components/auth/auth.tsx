"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
	const [loading, setLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [message, setMessage] = useState<string>("");

	const handleAuthAction = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		const authMethod = isLogin
			? supabase.auth.signInWithPassword
			: supabase.auth.signUp;
		const { error } = await authMethod({ email, password });

		if (error) setMessage(error.message);
		if (!error && !isLogin)
			setMessage("Check your email for the verification link!");

		setLoading(false);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
			<div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
				<h1 className="text-3xl font-bold text-center text-indigo-400">
					Welcome to AuraSphere
				</h1>
				<form className="space-y-6" onSubmit={handleAuthAction}>
					<div>
						<label className="block text-sm font-medium text-gray-300">
							Email
						</label>
						<input
							type="email"
							required
							className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300">
							Password
						</label>
						<input
							type="password"
							required
							className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
					>
						{loading
							? "Loading..."
							: isLogin
							? "Log In"
							: "Sign Up"}
					</button>
				</form>
				{message && (
					<p className="text-center text-sm text-red-400">
						{message}
					</p>
				)}
				<p className="text-sm text-center text-gray-400">
					{isLogin
						? "Don't have an account?"
						: "Already have an account?"}
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="ml-1 font-medium text-indigo-400 hover:underline"
					>
						{isLogin ? "Sign Up" : "Log In"}
					</button>
				</p>
			</div>
		</div>
	);
}
