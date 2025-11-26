export default function AboutUs() {
  return (
    <section className="bg-zinc-50 dark:bg-gray-900 min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          About M.S Homoeo Complex
        </h1>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          At M.S Homoeo Complex, we are dedicated to providing authentic homoeopathy remedies for every health need. 
          Our mission is to make high-quality, trusted, and affordable products accessible to everyone.
        </p>

        {/* Our Story */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              M.S Homoeo Complex started with a vision to bring genuine homoeopathy products to your doorstep. 
              We work with trusted brands and ensure that each product meets strict quality standards. 
              Our team is passionate about health and wellness and believes in the power of natural remedies.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-f3db28c4d0f2?auto=format&fit=crop&w=800&q=80" 
              alt="Our Story" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
              <h3 className="font-bold text-lg text-green-700 mb-2">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every product is carefully checked to ensure premium quality and authenticity.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
              <h3 className="font-bold text-lg text-green-700 mb-2">Trust</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We collaborate with trusted brands and ensure safe and effective remedies for all.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition">
              <h3 className="font-bold text-lg text-green-700 mb-2">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Affordable pricing and easy online access make natural remedies available to everyone.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6">
            Ready to explore our authentic homoeopathy products?
          </p>
          <a 
            href="/items"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Browse Products
          </a>
        </div>
      </div>
    </section>
  );
}
