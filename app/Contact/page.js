"use client"
import React, { useState } from 'react'

const ContactUs = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitted(false)
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      const result = await response.json()

      if (result.Success) {
        setSubmitted(true)
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setError(result.message || "Something went wrong")
      }
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-white'>
      <div className='container mx-auto px-4 py-12 sm:py-16 md:py-20 max-w-4xl'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>
          Contact <span className='text-purple-600'>Us</span>
        </h1>
        <p className='text-center text-gray-500 mt-4 max-w-2xl mx-auto'>
          Have a question, found a bug, or want to share feedback? We'd love to hear from you.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          <div className='bg-purple-50 p-6 rounded-lg'>
            <h3 className='font-bold text-lg'>Email</h3>
            <p className='text-gray-600 mt-2'>support@bitlinks.com</p>
          </div>
          <div className='bg-purple-50 p-6 rounded-lg'>
            <h3 className='font-bold text-lg'>Office</h3>
            <p className='text-gray-600 mt-2'>Kathmandu, Nepal</p>
          </div>
          <div className='bg-purple-50 p-6 rounded-lg'>
            <h3 className='font-bold text-lg'>Response Time</h3>
            <p className='text-gray-600 mt-2'>Within 24-48 hours</p>
          </div>
        </div>

        <div className='bg-purple-50 rounded-lg p-6 sm:p-8 md:p-10 mt-12'>
          <h2 className='text-2xl font-bold mb-6'>Send us a message</h2>

          {submitted && (
            <div className='bg-green-100 text-green-700 px-4 py-3 rounded-md mb-6'>
              Thanks! Your message has been saved.
            </div>
          )}

          {error && (
            <div className='bg-red-100 text-red-700 px-4 py-3 rounded-md mb-6'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Name'
                required
                className='px-4 py-3 rounded-md border border-gray-200 focus:outline-purple-600'
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
                required
                className='px-4 py-3 rounded-md border border-gray-200 focus:outline-purple-600'
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Your Message'
              required
              rows={5}
              className='px-4 py-3 rounded-md border border-gray-200 focus:outline-purple-600 resize-none'
            />
            <button
              type="submit"
              disabled={loading}
              className='bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg font-bold py-3 text-white self-start px-8 disabled:opacity-50'
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs