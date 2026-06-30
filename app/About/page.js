import React from 'react'

const About = () => {
  return (
    <section className="py-12 bg-white min">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-purple-600">BitLink</span>
          </h2>
          <p className="text-lg text-gray-600">
            BitLink is a modern URL shortener that transforms long links into short, memorable URLs.
            Perfect for social media, marketing campaigns, and anywhere you share links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Core Feature 1 */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              
              <h3 className="text-lg font-semibold">Simple Shortening</h3>
            </div>
            <p className="text-gray-700">
              Convert long URLs to short links in seconds with our easy-to-use platform.
            </p>
          </div>

          {/* Core Feature 2 */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              
              <h3 className="text-lg font-semibold">Link Analytics</h3>
            </div>
            <p className="text-gray-700">
              Track clicks, locations, and referral sources to understand your audience.
            </p>
          </div>

          {/* Core Feature 3 */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
             
              <h3 className="text-lg font-semibold">Secure & Reliable</h3>
            </div>
            <p className="text-gray-700">
              HTTPS encryption ensures all your links and data remain protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
