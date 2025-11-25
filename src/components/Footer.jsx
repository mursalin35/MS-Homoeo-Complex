import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">M.S Homoeo Complex</h2>
          <p>Your trusted homeopathy pharmacy in town. Quality medicines & care.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul>
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact Info</h3>
          <p>123 Main Street, Dhaka, Bangladesh</p>
          <p>Phone: +880 1234 567890</p>
          <p>Email: info@mshomoeo.com</p>
        </div>
      </div>

      <div className="bg-green-800 text-center py-4">
        &copy; {new Date().getFullYear()} M.S Homoeo Complex. All rights reserved.
      </div>
    </footer>
  )
}
