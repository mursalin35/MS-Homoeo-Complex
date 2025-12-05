"use client";

import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    setPasswordError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
          setPasswordError("Invalid credentials");
          toast.error("Login failed");
      } else {
        toast.success("Login successful!");
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    // Google sign in usually redirects to provider
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 sm:px-6">
      <title>Login</title>
      <div className="bg-white/90 dark:bg-[#2C2C3A]/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full sm:w-8/12 md:w-6/12 lg:w-4/12 border border-[#DAD7FF]/60 dark:border-[#3D3A64]">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#632ee3] to-[#00b8b0] bg-clip-text text-transparent">
          <span className="text-[#1F1F2E] dark:text-[#EDEBFF]">Login</span> Page
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:outline-none focus:ring-2 focus:ring-[#632EE3] dark:bg-[#1F1F2E] text-[#1F1F2E] dark:text-[#EDEBFF] placeholder-gray-500 transition"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-[#D3D0FA] dark:border-[#3D3A64] rounded-md focus:outline-none focus:ring-2 focus:ring-[#632EE3] dark:bg-[#1F1F2E] text-[#1F1F2E] dark:text-[#EDEBFF] placeholder-gray-500 transition"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-[#B0B3C6]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#632EE3] to-[#4CB5AE] text-white py-3 rounded-md hover:opacity-90 transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-sm dark:text-[#B0B3C6] text-gray-600">
          <Link href="/auth/forget-password">
            <span className="text-[#632EE3] dark:text-[#00E0C6] cursor-pointer hover:underline">Forgot Password?</span>
          </Link>
        </p>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300 dark:bg-[#4A4A5A]"></div>
          <span className="mx-2 text-gray-500 dark:text-[#B0B3C6] text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-[#4A4A5A]"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-[#D3D0FA] dark:border-[#3D3A64] py-3 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A3A4A] transition"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        <p className="text-center mt-5 text-sm dark:text-[#B0B3C6] text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register">
            <span className="text-[#632EE3] dark:text-[#00E0C6] cursor-pointer hover:underline ml-1">
              Register
            </span>
          </Link>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
