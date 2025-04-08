"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            <FaGithub className="text-xl" />
            Continuar con GitHub
          </button>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-xl text-red-500" />
            Continuar con Google
          </button>
        </div>
      </div>
    </div>
  );
}
