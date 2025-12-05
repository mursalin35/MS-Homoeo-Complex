"use client";

import { useState, useEffect, useRef } from "react";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // ---------- Close on outside click ----------
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }

      if (
        profileMenuRef.current && !profileMenuRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- Active Link Style ----------
  const activeClass = "text-green-700 font-semibold underline underline-offset-4";
  const normalClass = "hover:text-green-600";

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className={pathname === "/" ? activeClass : normalClass}
          onClick={() => setMobileOpen(false)}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/products"
          className={pathname === "/products" ? activeClass : normalClass}
          onClick={() => setMobileOpen(false)}
        >
          Products
        </Link>
      </li>

      <li>
        <Link
          href="/about"
          className={pathname === "/about" ? activeClass : normalClass}
          onClick={() => setMobileOpen(false)}
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          href="/contact"
          className={pathname === "/contact" ? activeClass : normalClass}
          onClick={() => setMobileOpen(false)}
        >
          Contact
        </Link>
      </li>
    </>
  );

  const profileLinks = (
    <>
    <li>
      <Link
        href="/add-product"
        className={pathname === "/add-product" ? activeClass : "flex items-center mt-2 gap-1 hover:text-green-600"}
        onClick={() => setProfileOpen(false)}
      >
         Add Product
      </Link>
    </li>

    <li>
      <Link
        href="/manage-products"
        className={pathname === "/manage-products" ? activeClass : "flex items-center mt-1 mb-4 gap-1 hover:text-green-600"}
        onClick={() => setProfileOpen(false)}
      >
         Manage-Products
      </Link>
    </li>
  </>
  );

  return (
    <nav className="navbar backdrop-blur-lg border border-green-200 shadow-md px-4 md:px-8 h-18 mx-auto bg-[#e8f8ee] dark:bg-[#1a1c25] sticky top-0 z-50 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/" className="text-2xl font-bold text-green-700">
          M.S Homoeo Complex
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex menu menu-horizontal -ms-40 gap-8">
        {navLinks}
      </ul>

      {/* Right: Profile */}
      <div className="relative" ref={profileMenuRef}>
        {user ? (
          <div>
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-9 rounded-full border-2 border-green-400 overflow-hidden">
                <img
                  src={
                    user.image ||
                    "https://img.icons8.com/?size=100&id=0prbldgxVuTl&format=png"
                  }
                  alt="User"
                />
              </div>
            </button>

            {profileOpen && (
              <ul className="absolute right-0 mt-1 p-3 min-w-52 bg-white shadow-md rounded-md z-50 border">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs mb-1">{user.email}</li>

                {profileLinks}

                <li>
                  <button
                    onClick={() => signOut()}
                    className="btn btn-sm mt-2 py-1 rounded-lg text-white border-none bg-gradient-to-r from-green-700 to-green-500 hover:opacity-90 w-full flex items-center justify-center gap-1"
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
            className="btn btn-sm px-6 py-2 rounded-lg text-white border-none bg-gradient-to-r from-green-700 to-green-500 hover:opacity-90 flex items-center gap-1"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <ul
          ref={mobileMenuRef}
          className="absolute mt-2 p-3 w-44 bg-white shadow-md rounded-md z-50 top-14 left-4 flex flex-col gap-2 border md:hidden"
        >
          {navLinks}
        </ul>
      )}
    </nav>
  );
}
