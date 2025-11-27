"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    price: "",
    date: "",
    priority: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(
        "https://ms-homoeo-complex-server.vercel.app/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Product added successfully!");
        setForm({
          title: "",
          shortDesc: "",
          fullDesc: "",
          price: "",
          date: "",
          priority: "",
          imageURL: "",
        });
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-500 mb-6">
          Fill the form to create a new homoeopathy product.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          {/* Short description */}
          <div>
            <label className="block font-semibold mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          {/* Full description */}
          <div>
            <label className="block font-semibold mb-1">Full Description</label>
            <textarea
              name="fullDesc"
              value={form.fullDesc}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="imageURL"
              value={form.imageURL}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
