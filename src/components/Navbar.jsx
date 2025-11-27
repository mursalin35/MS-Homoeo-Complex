"use client";

import { useState } from "react";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  const { user, logOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = (
    <>
      <li><Link href="/" className="hover:text-green-600">Home</Link></li>
      <li><Link href="/products" className="hover:text-green-600">Products</Link></li>
      <li><Link href="/about" className="hover:text-green-600">About Us</Link></li>
      <li><Link href="/contact" className="hover:text-green-600">Contact</Link></li>
    </>
  );

  const profileLinks = (
    <>
      <li><Link href="/add-product" className="flex items-center gap-1"><FaUser /> Add Product</Link></li>
      <li><Link href="/manage-products" className="flex items-center gap-1"><FaUser /> Manage-Products</Link></li>
    </>
  );

  return (
    <nav className="navbar backdrop-blur-lg border border-white/20 shadow-md px-4 md:px-8 h-18 mx-auto glass-card bg-[#E8FAF7] dark:bg-[#1a1c25] sticky top-0 z-50 flex items-center justify-between">
      {/* Left: Mobile menu toggle + Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">M.S Homoeo Complex</Link>
      </div>

      {/* Center: Desktop Menu */}
      <ul className="hidden md:flex menu menu-horizontal gap-8">
        {navLinks}
      </ul>

      {/* Right: Profile / Login */}
      <div className="relative">
        {user ? (
          <div className="relative">
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-9 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src={user.photoURL || "https://img.icons8.com/?size=100&id=0prbldgxVuTl&format=png&color=000000"}
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            {profileOpen && (
              <ul className="absolute right-0 mt-2 p-2 w-52 bg-base-100 shadow-md rounded-md z-50">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
                {profileLinks}
                <li>
                  <button
                    onClick={logOut}
                    className="btn btn-sm mt-2 text-white border-none bg-gradient-to-r from-[#632ee3] to-[#00b8b0] hover:opacity-90 w-full flex items-center justify-center gap-1"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="btn btn-sm text-white border-none bg-gradient-to-r from-[#632ee3] to-[#00b8b0] hover:opacity-90 flex items-center gap-1"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <ul className="absolute top-full left-0 w-full bg-base-100 shadow-md p-4 flex flex-col gap-2 md:hidden z-40">
          {navLinks}
        </ul>
      )}
    </nav>
  );
}
