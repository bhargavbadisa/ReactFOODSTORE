import React from 'react'
import './AboutUs.css'; 
function AboutUs() {
  return (
    <>
      <h1>This is AboutUs Page</h1>
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col lg:flex-row w-full max-w-6xl">
        
        {/* Left Section - Contact Info */}
        <div className="bg-cyan-900 text-white p-8 rounded-l-lg flex-1">
          <h2 className="text-2xl font-bold text-green-400 mb-6">Get in Touch</h2>
          <div className="space-y-4 text-lg">
            <p><span className="font-bold">📧 Email:</span> bhargavbadisa6424@gmail.com</p>
            <p><span className="font-bold">📞 Phone:</span> 6281022488</p>
            <p><span className="font-bold">📍 Address:</span> Kalagara Lakshimipuram,N.T.R District</p>
          </div>
          <div className="mt-8">
            <h3 className="text-green-400 font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#"><i className="fab fa-facebook text-white"></i></a>
              <a href="#"><i className="fab fa-instagram text-pink-500"></i></a>
              <a href="#"><i className="fab fa-twitter text-blue-400"></i></a>
            </div>
          </div>
        </div>

        {/* Right Section - Message Form */}
        <div className="p-8 flex-1">
          <h2 className="text-2xl font-bold text-cyan-900 mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded p-3"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded p-3"
              />
            </div>
            <div>
              <label className="block font-medium">Message</label>
              <textarea
                placeholder="Your message"
                className="w-full border rounded p-3 h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-900 text-white py-3 rounded hover:bg-cyan-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>

    </>
  )
}

export default AboutUs
