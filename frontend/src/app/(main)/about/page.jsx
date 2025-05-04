'use client'
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShieldAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-teal-600 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black/30 blur-sm"></span>
              <span className="relative z-10 bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">
                About CyberAware
              </span>
            </span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Your trusted source for cybersecurity awareness, news, and education.
            We're on a mission to create a safer digital world for everyone.
          </p>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg className="w-full h-12 sm:h-16 fill-current text-indigo-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.77,70.92,127.07,62.3,171.36,65.1,275.68,71.65,252.55,78.26,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 relative inline-block">
            Stay Secure, Stay Updated
            <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-teal-500 to-indigo-400"></span>
          </h2>
          <p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-white">CyberAware</span>, your
            trusted source for the latest news, insights, and alerts on cybercrimes
            in Uttar Pradesh and beyond. We are dedicated to educating individuals
            and businesses about cybersecurity threats and safety measures through
            timely, accurate, and accessible information.
          </p>
        </div>

        {/* Who We Are & What We Do */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-8 border border-indigo-700/40 shadow-xl hover:shadow-teal-500/10 hover:border-indigo-600/40 transition-all duration-300">
            <div className="inline-block bg-indigo-800/50 p-4 rounded-full mb-6 text-teal-400">
              <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              CyberAware is a dedicated platform established to increase
              cybersecurity awareness among the general public. Our team consists of
              cybersecurity experts, researchers, and journalists who are passionate
              about creating a safer digital environment.
            </p>
            <p className="text-white/90 leading-relaxed">
              Founded in 2025, we've been at the forefront of delivering
              easy-to-understand cybersecurity news, alerts, and expert advice to
              help protect individuals and businesses from evolving digital threats.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-8 border border-indigo-700/40 shadow-xl hover:shadow-teal-500/10 hover:border-indigo-600/40 transition-all duration-300">
            <div className="inline-block bg-indigo-800/50 p-4 rounded-full mb-6 text-teal-400">
              <FontAwesomeIcon icon={faShieldAlt} className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
            <ul className="text-white/90 space-y-5">
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <div>
                  <span className="font-semibold text-white">
                    Cybercrime Awareness:
                  </span>
                  <p className="mt-1">
                    We report on the latest scams, frauds, and cyber threats
                    targeting citizens, providing timely warnings and preventive
                    measures.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <div>
                  <span className="font-semibold text-white">
                    Security Tips:
                  </span>
                  <p className="mt-1">
                    We educate users on best practices for staying safe online, from
                    password management to identifying phishing attempts.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <div>
                  <span className="font-semibold text-white">
                    News &amp; Alerts:
                  </span>
                  <p className="mt-1">
                    We provide real-time updates on cybersecurity incidents, data
                    breaches, and emerging threats affecting our region.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <div>
                  <span className="font-semibold text-white">
                    Community Support:
                  </span>
                  <p className="mt-1">
                    We work with local organizations to spread awareness and keep
                    communities safe from digital threats.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 rounded-xl p-10 mb-16 border border-indigo-700/20 backdrop-blur-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Our Mission &amp; Vision
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-indigo-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-6 border border-indigo-700/40 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-white/90">
                To empower every citizen with the knowledge and tools needed to
                navigate the digital world safely, through accessible and actionable
                cybersecurity information.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-6 border border-indigo-700/40 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-white/90">
                A digitally literate society where individuals and organizations are
                well-equipped to protect themselves against cyber threats and
                contribute to a safer internet for all.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-700 to-teal-600 rounded-xl p-10 text-white text-center border border-indigo-500/40 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Mission for a Safer Digital World
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Stay informed and help us build a safer digital space. Reach out to us for resources
            and follow us for the latest cybersecurity news and alerts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-indigo-700 hover:bg-indigo-100 px-8 py-3 rounded-lg shadow-md text-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/phishing_and_attacks"
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 px-8 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-300 border border-white/20"
            >
              Explore Cyber Threats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;