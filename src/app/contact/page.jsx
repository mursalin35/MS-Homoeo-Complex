export default function Contact() {
  return (
    <section className="bg-zinc-50 dark:bg-gray-900 min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          Contact Us
        </h1>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have questions about our products or need support, 
          feel free to reach out to us using the form below.
        </p>

        {/* Contact Form */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <form className="flex flex-col gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center text-gray-700 dark:text-gray-300">
          <p className="mb-2">📍 Address: 123 Homoeo Lane, Health City, Bangladesh</p>
          <p className="mb-2">📞 Phone: +880 1234 567890</p>
          <p>✉️ Email: support@mshomoeocomplex.com</p>
        </div>
      </div>
    </section>
  );
}
