import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gray-200 text-gray-600 text-sm py-2 px-6 flex justify-between items-center">
                <span>{currentDate}</span>
                <div className="space-x-2">
                    <a href="#" className="hover:text-gray-900">English</a>|
                    <a href="#" className="hover:text-gray-900">हिंदी</a>
                </div>
            </div>
            <div className="bg-white py-4 px-6 flex items-center justify-between">
                {/* Logo Centered */}
                <div className="flex-1 flex  justify-center">
                    <span className="text-sky-600 text-3xl font-bold">CYBERAWARE</span>
                    <span className="text-gray-600 font-semibold text-sm ml-2">
                        Stay Secure, Stay Updated
                    </span>
                </div>
                {/* Social Media Icons & Sign-In */}
                <div className="flex space-x-4 items-center">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        <FontAwesomeIcon icon={faGoogle} className="text-xl" />
                    </a>
                    <a href="/login" className="bg-red-500 text-white font-semibold flex items-center py-2 px-6 rounded-full hover:bg-red-600 transition-colors">
                        <i className="fas fa-user-circle text-xl mr-1"></i> Sign in
                    </a>
                </div>
            </div>
            {/* Navigation Bar */}
            <nav className="bg-sky-400 text-white px-6 py-2 flex items-center justify-center">
                {/* Left Side: Hamburger Menu */}
                {/* Center: Navigation Links */}
                <div className="flex space-x-6">
                    <a href="/" className="hover:text-gray-300 font-semibold">
                        Home
                    </a>
                    <a href="/about" className="hover:text-gray-300 font-semibold">
                        About
                    </a>
                    <a href="/contact" className="hover:text-gray-300 font-semibold">
                        Contact Us
                    </a>
                    {/* <a href="/cyber-threats" className="hover:text-gray-300 font-semibold">
                        Cyber Threats
                    </a>
                    <a href="/data-breaches" className="hover:text-gray-300 font-semibold">
                        Data Breaches
                    </a>
                    <a href="/phishing-alerts" className="hover:text-gray-300 font-semibold">
                        Phishing Alerts
                    </a>
                    <a href="/privacy-security" className="hover:text-gray-300 font-semibold">
                        Privacy &amp; Security
                    </a>
                    <a href="/hacking-news" className="hover:text-gray-300 font-semibold">
                        Hacking News
                    </a>
                    <a href="/subscribe" className="hover:text-gray-300 font-semibold">
                        Subscribe
                    </a> */}
                </div>
                {/* Right Side: Search Icon */}
            </nav>
        </>
    )
}
export default Navbar;