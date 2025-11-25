"use client";
import Link from "next/link";
import { useState } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  // const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-700">
              M.S Homoeo Complex
            </Link>
          </div>
          

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <Link href="/products" className="hover:text-green-600">Products</Link>
            <Link href="/about" className="hover:text-green-600">About Us</Link>
            <Link href="/contact" className="hover:text-green-600">Contact</Link>

            {/* Authentication Buttons (Commented for now) */}
            {/*
            {!session ? (
              <button
                onClick={() => signIn("google")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Login / Register
              </button>
            ) : (
              <div className="relative group">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  {session.user.name}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href="/add-product" className="block px-4 py-2 hover:bg-gray-100">Add Product</Link>
                  <Link href="/manage-products" className="block px-4 py-2 hover:bg-gray-100">Manage Products</Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
            */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow">
          <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100">Home</Link>
          <Link href="/products" className="block px-3 py-2 rounded hover:bg-gray-100">Products</Link>
          <Link href="/about" className="block px-3 py-2 rounded hover:bg-gray-100">About Us</Link>
          <Link href="/contact" className="block px-3 py-2 rounded hover:bg-gray-100">Contact</Link>

          {/* Authentication Buttons (Commented for now) */}
          {/*
          {!session ? (
            <button
              onClick={() => signIn("google")}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Login / Register
            </button>
          ) : (
            <>
              <Link href="/add-product" className="block px-3 py-2 rounded hover:bg-gray-100">Add Product</Link>
              <Link href="/manage-products" className="block px-3 py-2 rounded hover:bg-gray-100">Manage Products</Link>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
          */}
        </div>
      )}
    </nav>
  );
}
