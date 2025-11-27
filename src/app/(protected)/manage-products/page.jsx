"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("https://ms-homoeo-complex-server.vercel.app/products") // ✅ backend URL
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // DELETE product handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(
        `https://ms-homoeo-complex-server.vercel.app/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete product");

      // Remove deleted product from state
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* ====== Top Header Section ====== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">Manage Products</h1>
        <p className="text-gray-600 mt-1">
          Review, update and delete your homoeopathy products.
        </p>
      </div>

      {/* ====== Summary Cards (Top Info) ====== */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white shadow rounded-xl p-5 border border-green-100">
          <h3 className="text-2xl font-semibold text-green-700">
            {products.length}
          </h3>
          <p className="text-gray-600 text-sm">Total Products</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border border-green-100">
          <h3 className="text-2xl font-semibold text-green-700">Active</h3>
          <p className="text-gray-600 text-sm">
            All products are currently live
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border border-green-100">
          <h3 className="text-2xl font-semibold text-green-700">
            Last Updated
          </h3>
          <p className="text-gray-600 text-sm">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ====== Products Grid ====== */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-xl rounded-xl p-5 border border-green-100 hover:shadow-2xl transition"
          >
            {/* Image */}
            <div className="w-full h-40 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              {p.imageURL ? (
                <img
                  src={p.imageURL}
                  alt={p.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-green-700 font-semibold">No Image</span>
              )}
            </div>

            {/* Content */}
            <h2 className="text-lg font-bold text-green-700">{p.title}</h2>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {p.shortDesc}
            </p>

            {/* Price */}
            <p className="mt-3 font-medium text-gray-700">৳ {p.price}</p>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <Link
                href={`/products/${p._id}`}
                className="text-sm px-4 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition"
              >
                View
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                className="text-sm px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
