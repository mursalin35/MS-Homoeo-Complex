"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);

    const url = `http://localhost:5000/products?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  // Auto fetch on search/filter change
  useEffect(() => {
    fetchProducts();
  }, [search, sort]);

  return (
    <section className="container mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800">
        Our Homoeopathy Products
      </h1>

      <p className="mt-2 text-gray-600 max-w-xl">
        Explore authentic & trusted homoeopathic medicines.
      </p>

      {/* Search + Filter */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow"
        >
          <option value="">Filter by price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:-translate-y-1"
          >
            <img
              src={product.imageURL}
              alt={product.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700">
                {product.title}
              </h3>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.shortDesc}
              </p>

              <p className="mt-3 font-bold text-green-800">
                ৳ {product.price}
              </p>

              <Link
                href={`/products/${product._id}`}
                className="inline-block mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
