"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least 1 uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least 1 lowercase letter.";
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setPasswordError(validationMessage);
      return;
    } else {
      setPasswordError("");
    }

    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, image: photo }),
        });

        if (res.ok) {
            toast.success("Account created successfully! 🎉");
            // Auto login
            try {
                await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });
                router.push("/");
            } catch (loginError) {
                console.error("Auto-login failed:", loginError);
                // Still redirect even if auto-login fails, or let user login manually
                router.push("/login");
            }
        } else {
            const data = await res.json();
            throw new Error(data.message || "Registration failed");
        }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    // Google sign in
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required className="w-full p-2 border rounded-md" />
          <input type="text" name="photo" placeholder="Photo URL" className="w-full p-2 border rounded-md" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded-md" />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded-md"
            />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Signup</button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border py-2 rounded-md">
          <FcGoogle /> Sign in with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-600 cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Register;
