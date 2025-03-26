import React from 'react'

const About = () => {
  return (
    <div>{/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">About CyberAware</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your trusted source for cybersecurity awareness, news, and education.
            We're on a mission to create a safer digital world for everyone.
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Stay Secure, Stay Updated
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-blue-600">CyberAware</span>, your
            trusted source for the latest news, insights, and alerts on cybercrimes
            in Uttar Pradesh and beyond. We are dedicated to educating individuals
            and businesses about cybersecurity threats and safety measures through
            timely, accurate, and accessible information.
          </p>
        </div>
        {/* Who We Are & What We Do */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="inline-block bg-blue-100 p-3 rounded-full mb-4">
              <i className="fas fa-users text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              CyberAware is a dedicated platform established to increase
              cybersecurity awareness among the general public. Our team consists of
              cybersecurity experts, researchers, and journalists who are passionate
              about creating a safer digital environment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2023, we've been at the forefront of delivering
              easy-to-understand cybersecurity news, alerts, and expert advice to
              help protect individuals and businesses from evolving digital threats.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="inline-block bg-blue-100 p-3 rounded-full mb-4">
              <i className="fas fa-shield-alt text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">What We Do</h2>
            <ul className="text-gray-700 space-y-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">
                  <i className="fas fa-check-circle" />
                </span>
                <div>
                  <span className="font-semibold text-blue-600">
                    Cybercrime Awareness:
                  </span>
                  <p>
                    We report on the latest scams, frauds, and cyber threats
                    targeting citizens, providing timely warnings and preventive
                    measures.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">
                  <i className="fas fa-check-circle" />
                </span>
                <div>
                  <span className="font-semibold text-blue-600">
                    Security Tips:
                  </span>
                  <p>
                    We educate users on best practices for staying safe online, from
                    password management to identifying phishing attempts.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">
                  <i className="fas fa-check-circle" />
                </span>
                <div>
                  <span className="font-semibold text-blue-600">
                    News &amp; Alerts:
                  </span>
                  <p>
                    We provide real-time updates on cybersecurity incidents, data
                    breaches, and emerging threats affecting our region.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">
                  <i className="fas fa-check-circle" />
                </span>
                <div>
                  <span className="font-semibold text-blue-600">
                    Community Support:
                  </span>
                  <p>
                    We work with local organizations to spread awareness and keep
                    communities safe from digital threats.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Our Mission & Vision */}
        <div className="bg-blue-50 rounded-xl p-10 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Our Mission &amp; Vision
            </h2>
            <p className="text-gray-600">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To empower every citizen with the knowledge and tools needed to
                navigate the digital world safely, through accessible and actionable
                cybersecurity information.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                A digitally literate society where individuals and organizations are
                well-equipped to protect themselves against cyber threats and
                contribute to a safer internet for all.
              </p>
            </div>
          </div>
        </div>
        {/* Our Team */}
        {/* <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Meet Our Team</h2>
            <p className="text-gray-600">The experts behind CyberAware</p>
          </div>
          <div className="grid  md:grid-cols-2 gap-8">
            <div className="bg-white  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300">
                <img
                  src= ""
                  alt="Arjun Sharma"
                  className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700">Awaish khan</h3>
                 
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300">
                <img
                  src=""
                  alt="Arjun Sharma"
                  className="w-full h-full object-cover"
                />
              </div>        
                    <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700">Aman khan</h3>
                     
              </div>
            </div>

          </div>
        </div> */}
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Mission for a Safer Digital World
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Stay informed and help us build a safer digital space. Subscribe to our
            updates and follow us for the latest cybersecurity news and alerts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg shadow-md text-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
            {/* <a
              href="#"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Subscribe
            </a> */}
          </div>
        </div>
      </div></div>
  )
}

export default About;