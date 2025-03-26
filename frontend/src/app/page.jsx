import ImageSlider from '@/components/ImageSlider'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {

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
          {/* <a href="#" class="hover:text-gray-900">தமிழ்</a> | */}
          
        </div>
      </div>
      {/* Logo, Social Icons & Sign-In */}
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
          <a href="login.html" className="bg-red-500 text-white font-semibold flex items-center py-2 px-6 rounded-full hover:bg-red-600 transition-colors">
                <i className="fas fa-user-circle text-xl mr-1"></i> Sign in
            </a>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav className="bg-sky-400 text-white px-6 py-2 flex items-center justify-center">
        {/* Left Side: Hamburger Menu */}
        {/* Center: Navigation Links */}
        <div className="flex space-x-6">
          <a href="/landingpage" className="hover:text-gray-300 font-semibold">
            Home
          </a>
          <a href="/about" className="hover:text-gray-300 font-semibold">
            About
          </a>
          <a href="/contact" className="hover:text-gray-300 font-semibold">
            Contact Us
          </a>
          <a href="/cyber-threats" className="hover:text-gray-300 font-semibold">
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
          </a>
        </div>
        {/* Right Side: Search Icon */}}
      </nav>
      {/* Breaking News Banner */}
      <div className="bg-gray-100 py-2 px-6 flex justify-center items-center">
        <span className="bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full mr-4">
          Latest
        </span>
        <marquee
          behavior="scroll"
          direction="left"
          className="text-gray-800 font-semibold w-full max-w-5xl"
        >
          🚨 New Phishing Scam Targets Bank Customers | 🔒 Data Breach Exposes
          Millions of Users | ⚠️ Ransomware Attack on IT Firms | 🛡️ Cybersecurity
          Tips to Stay Safe Online | 📢 Government Issues New Cyber Laws
        </marquee>
      </div>
      <section className="relative flex items-center justify-center overflow-hidden shadow-lg">
        {/* Swiper Container */}
        <ImageSlider />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-red-600 border-b-2 border-gray-300 pb-2 mb-6">
          UTTAR PRADESH CYBER CRIME NEWS
        </h2>
        {/* Top Featured News from Uttar Pradesh Cyber Crime News */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Breaking News from Uttar Pradesh Cyber Crime News */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-red-600">
              ◎ UP Budget Allocates Funds for Cybersecurity
            </h3>
            <p className="text-gray-800 mt-2">
              {" "}
              The Uttar Pradesh government has announced a ₹8.08 lakh crore budget,
              including investments in an AI City and a Cybersecurity Research Park.
            </p>
            <img
              src=" https://bharatexpress.com/wp-content/uploads/2024/02/nirmala-sitharaman-CM-Yogi.webp"
              alt="Breaking News from Uttar Pradesh Cyber Crime News"
              className="mt-4 w-full rounded-lg"
            />
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
          {/* Right Column Top Story */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://www.aljazeera.com/wp-content/uploads/2022/10/AP22280461520286.jpg?resize=1200%2C675"
              alt="News from Uttar Pradesh Cyber Crime News"
              className="w-full rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3">
              UP Tops List of Rescued Cyber Scam Victims
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              UP and Maharashtra have the highest number of victims rescued from
              international cyber fraud syndicates...
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
        </div>
        {/* Bottom News from Uttar Pradesh Cyber Crime News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {/* News from Uttar Pradesh Cyber Crime News Card 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzDvl8QR9Km1bpqNiI0lCJvAUut4KBDrt8IA&s"
              alt="News from Uttar Pradesh Cyber Crime News"
              className="w-full rounded-lg"
            />
            <h3 className="text-md font-semibold mt-3">
              A Kanpur resident tricked a cyber fraudster into sending him ₹10,000,
              exposing an extortion attempt.'
            </h3>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
          {/* News from Uttar Pradesh Cyber Crime News Card 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src=" https://www.the420.in/wp-content/uploads/2024/06/Binod-Kumar-Singh-IPS.jpg"
              alt="News from Uttar Pradesh Cyber Crime News"
              className="w-full rounded-lg"
            />
            <h3 className="text-md font-semibold mt-3">
              'UP has established cyber police stations in all 18 police range
              districts to tackle online crimes.
            </h3>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
          {/* News from Uttar Pradesh Cyber Crime News Card 3 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLa97EMliZtZu9saQw-k6atU8vULmn5PsoCw&s"
              alt="News from Uttar Pradesh Cyber Crime News"
              className="w-full rounded-lg"
            />
            <h3 className="text-md font-semibold mt-3">
              Web Werks is launching a 20MW hyperscale data center in Noida to boost
              digital infrastructure.
            </h3>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
          {/* News from Uttar Pradesh Cyber Crime News Card 4 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="  https://media.licdn.com/dms/image/D5612AQFNXnM583H-3g/article-cover_image-shrink_720_1280/0/1721899765619?e=2147483647&v=beta&t=8VQaNQE1l2V_eJQ1A8NkklL93OnfBS5Yyfh5G9NaWTc"
              alt="News from Uttar Pradesh Cyber Crime News"
              className="w-full rounded-lg"
            />
            <h3 className="text-md font-semibold mt-3">
              The state is drafting a cybersecurity policy requiring all departments
              to appoint CISOs.
            </h3>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Large News Cards */}
          <div className="md:col-span-2 space-y-6">
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img
                src=" https://static.toiimg.com/thumb/msid-86871848,width-1070,height-580,imgsize-105384,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                alt="News"
                className="w-1/3 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Jharkhand Leads Uttar Pradesh in Hacking Cases
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {" "}
                  Jharkhand has emerged as a bigger hotspot for cybercrime than
                  Uttar Pradesh, with a higher number of hacking ..
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  by Aman Khan • 19 March 2025
                </p>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
                >
                  Read More →
                </a>
              </div>
            </div>
            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrz1ASB97WbBgnzQfhEwN1CS1Gu09IhEYZQCCg-xWhukW1N0-E-OtZM48PUXA4-0btp8&usqp=CAU"
                alt="News"
                className="w-1/3 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  How Hackers Are Targeting Banking Systems
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  A new wave of cyberattacks is affecting financial institutions
                  worldwide...
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  by CyberAware Team • 18 March 2025
                </p>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
                >
                  Read More →
                </a>
              </div>
            </div>
            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
              <img
                src="https://lh3.googleusercontent.com/proxy/mn62U_y8x9cNsNAdiJZlP6Bu94ULaxKQ_6AixOcSnsX6B1WTDgdgdDojj-Fa58kxp8vkM7kx0qXnuetE8Ug47Zn7tQ6MGqszJUrIHZaU19UzlRxLC655Sas8hnZ4mmZwPHDpEa4jXvgOWiWyXAsKJFy7K60jCsaatw"
                alt="News"
                className="w-1/3 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Protect Your Online Privacy in 2025
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Learn the best practices to keep your personal information safe
                  online...
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  by Awaish Khan • 18 March 2025
                </p>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 font-semibold mt-3 inline-block"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
          {/* Right Column: Smaller News Cards */}
          <div className="space-y-4">
            {/* Small News 1 */}
            <div className="flex items-start space-x-3">
              <img src="https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="News" className="rounded-lg size-20" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Major Phishing Attack on Social Media Users
                </h3>
                <p className="text-xs text-gray-500">12 March 2025</p>
              </div>
            </div>
            {/* Small News 2 */}
            <div className="flex items-start space-x-3">
              <img
                src="cyber-Aware\stock img\image-80x80.jpg"
                alt="News"
                className="rounded-lg"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  How Malicious Apps Are Sneaking into App Stores
                </h3>
                <p className="text-xs text-gray-500">12 March 2025</p>
              </div>
            </div>
            {/* Small News 3 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://source.unsplash.com/80x80/?ransomware"
                alt="News"
                className="rounded-lg"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Ransomware Attack Shuts Down Major Companies
                </h3>
                <p className="text-xs text-gray-500">13 March 2025</p>
              </div>
            </div>
            {/* Small News 4 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://source.unsplash.com/80x80/?hacker"
                alt="News"
                className="rounded-lg"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Ethical Hackers Expose Security Loopholes
                </h3>
                <p className="text-xs text-gray-500">14 March 2025</p>
              </div>
            </div>
            {/* Small News 5 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://source.unsplash.com/80x80/?network-security"
                alt="News"
                className="rounded-lg"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  New AI-Powered Cybersecurity Tools Released
                </h3>
                <p className="text-xs text-gray-500">15 March 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold">CyberAware</h2>
              <p className="text-gray-400 mt-2">
                Stay updated with the latest cybersecurity news, tips, and trends to
                keep yourself protected online.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h2 className="text-xl font-bold">Quick Links</h2>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Cybersecurity Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Privacy &amp; Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Media */}
            <div>
              <h2 className="text-xl font-bold">Follow Us</h2>
              <div className="flex mt-2 space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <i className="fab fa-facebook text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-sky-400">
                  <i className="fab fa-twitter text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-400">
                  <i className="fab fa-youtube text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400">
                  <i className="fab fa-instagram text-2xl" />
                </a>
              </div>
            </div>
          </div>
          {/* Divider */}
          <hr className="my-6 border-gray-700" />
          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            © 2025 CyberAware. All rights reserved.
          </div>
        </div>
      </footer>

      {/* FontAwesome for Icons */}
    </>
  )
}

export default Home