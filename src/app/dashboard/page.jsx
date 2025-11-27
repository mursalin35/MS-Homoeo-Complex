"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect safely
    }
  }, [user, router]);

  if (!user) {
    // user না থাকলে temporarily null return করো
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName || user.email}</h1>
    </div>
  );
}
