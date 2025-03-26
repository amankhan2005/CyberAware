import ImageSlider from '@/components/ImageSlider'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from '@/components/Navbar';

const Home = () => {

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />

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
              src=" https://cdn.utkarsh.com/public/uploads/blog/2023/12/a5b01a7d-ec44-4bac-a72d-5a4b32ccec55-1703075957.webp"
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
              <img src="https://www.techadvisor.com/wp-content/uploads/2022/06/apps-on-google-play-fast-loose-privacy.jpg?quality=50&strip=all&w=1024" alt="News" className="rounded-lg size-20" />


              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  How Malicious Apps Are Sneaking into App Stores
                </h3>
                <p className="text-xs text-gray-500">12 March 2025</p>
              </div>
            </div>
            {/* Small News 3 */}
            <div className="flex items-start space-x-3">
              <img src="https://blogapp.bitdefender.com/hotforsecurity/content/images/size/w600/2023/10/bug-6844832_1920.png" alt="News" className="rounded-lg size-20" />

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Ransomware Attack Shuts Down Major Companies
                </h3>
                <p className="text-xs text-gray-500">13 March 2025</p>
              </div>
            </div>
            {/* Small News 4 */}
            <div className="flex items-start space-x-3">
              <img src=" https://agileblue.com/wp-content/uploads/2023/09/Shutterstock_1482108026.jpg" alt="News" className="rounded-lg size-20" />

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Ethical Hackers Expose Security Loopholes
                </h3>
                <p className="text-xs text-gray-500">14 March 2025</p>
              </div>
            </div>
            {/* Small News 5 */}
            <div className="flex items-start space-x-3">
              <img src="data:image/jpeg;base64,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" alt="News" className="rounded-lg size-20" />

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