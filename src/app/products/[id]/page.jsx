import Link from "next/link";

export default async function ProductId({ params }) {
  const { id } = await params; // Next.js 16: params এখন Promise

  let product;
  try {
    const res = await fetch(`http://localhost:5000/products/${id}`, {
      cache: "no-store", // fresh data
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    product = await res.json();
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load product details: {err.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-16 px-6">
      <div className="container mx-auto max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            Product Details
          </h1>

          <Link
            href="/products"
            className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            ⬅ Back to Products
          </Link>
        </div>

        {/* Large Image / Banner */}
        <div className="w-full h-56 rounded-xl overflow-hidden mb-6">
          <img
            src={product.imageURL} // Correct MongoDB field
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Title */}
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          {product.title}
        </h2>

        {/* Meta Info: Price, Date, Priority, Product ID */}
        <div className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 flex gap-3">
          <p>• Price: ৳{product.price}</p>
          <p>{product.priority && <>• Priority: {product.priority}</>}</p>
          <p> {product.date && <>• Date: {product.date}</>}</p>
        </div>

        {/* Full Description */}
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {product.fullDesc}
        </p>
      </div>
    </div>
  );
}
