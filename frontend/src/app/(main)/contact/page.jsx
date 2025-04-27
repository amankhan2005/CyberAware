import React from 'react'

const Contact = () => {
  return (
    <div><div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-3xl text-center border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-6">
          Have questions or need assistance? Reach out to us!
        </p>
        <form className="space-y-6 text-left">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              id="name"
              placeholder="Enter your full name"
              required=""
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="email"
              id="email"
              placeholder="Enter your email"
              required=""
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="message"
            >
              Your Message
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              id="message"
              rows={4}
              placeholder="Type your message here..."
              required=""
              defaultValue={""}
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-700 transition w-full">
            Send Message
          </button>
        </form>
      </div>
    </div></div>
  )
}

export default Contact