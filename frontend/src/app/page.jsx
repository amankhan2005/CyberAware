'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle, faShieldAlt, faLaptopCode, faUserLock, faQuoteLeft, faNewspaper, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Featured services
  const services = [
    {
      id: 1,
      title: 'Cyber Awareness Training',
      description: 'Interactive training programs to educate users about the latest cybersecurity threats and prevention methods.',
      icon: faUserLock,
      path: '/training'
    },
    {
      id: 2,
      title: 'Security Assessments',
      description: 'Comprehensive evaluation of your organization\'s security posture to identify vulnerabilities and recommend solutions.',
      icon: faShieldAlt,
      path: '/assessments'
    },
    {
      id: 3,
      title: 'Phishing Simulations',
      description: 'Realistic phishing simulations to test and improve your team\'s ability to recognize and respond to threats.',
      icon: faLaptopCode,
      path: '/phishing_and_attacks'
    }
  ];

  // India Cybersecurity News Slider
  const indiaNews = [
    {
      id: 1,
      title: 'CERT-In Issues Warning About Android Banking Malware',
      description: 'The Indian Computer Emergency Response Team (CERT-In) has issued a high-severity alert about a banking trojan targeting Indian Android users through fake apps.',
      date: 'June 15, 2024',
      source: 'Ministry of Electronics & IT',
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202310/malware-014557-16x9.jpg?VersionId=Mm9ikmBMHuXFfeZ7p.arrRWJfqfu5Nw1&size=690:388',
      fallbackImage: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202310/malware-014557-16x9.jpg?VersionId=Mm9ikmBMHuXFfeZ7p.arrRWJfqfu5Nw1&size=690:388'
    },
    {
      id: 2,
      title: 'UP Police Busts Major Cyber Fraud Ring in Noida',
      description: 'Uttar Pradesh police arrested 12 individuals involved in a sophisticated cyber fraud operation that targeted bank customers across northern India.',
      date: 'June 10, 2024',
      source: 'UP Cyber Police',
      image: '/images/cybersecurity-news-2.jpg',
      fallbackImage: 'https://th.bing.com/th/id/R.c03d285e10d8ee2ec8e8d9fc4a81db05?rik=aOYVWEanebe9lw&riu=http%3a%2f%2fimages.indianexpress.com%2f2016%2f05%2fup-cyber-crime.jpg&ehk=TOBsvpTWVKtT0T5ca%2bxDWime%2bwk77lQoDiuaBX%2bP97o%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      id: 3,
      title: 'India Announces National Cybersecurity Strategy 2023',
      description: 'The government has unveiled a comprehensive National Cybersecurity Strategy aimed at strengthening digital infrastructure and improving cyber resilience.',
      date: 'June 5, 2024',
      source: 'National Security Council',
      image: '/images/cybersecurity-news-3.jpg',
      fallbackImage: 'https://d25qcccc9wk2aa.cloudfront.net/public/uploads/blog/2023/10/fec1a6b1-d312-42d1-be30-b2ae3f382a04-1698247621.jpg'
    },
    {
      id: 4,
      title: 'Major Hospitals Face Ransomware Attacks in Delhi-NCR',
      description: 'Several hospitals in Delhi-NCR reported ransomware attacks that temporarily disrupted patient management systems and electronic health records.',
      date: 'May 30, 2024',
      source: 'National Health Authority',
      image: '/images/cybersecurity-news-4.jpg',
      fallbackImage: 'https://static.tnn.in/thumb/msid-95732231,updatedat-1669270462738,width-1280,height-720,resizemode-75/95732231.jpg'
    },
    {
      id: 5,
      title: 'India Ranks 3rd in Global Cyber Attack Incidents',
      description: 'A new cybersecurity report places India third globally in terms of cyber attack incidents, with finance and healthcare sectors most targeted.',
      date: 'May 25, 2024',
      source: 'Global Cyber Alliance',
      image: '/images/cybersecurity-news-5.jpg',
      fallbackImage: 'https://i.ndtvimg.com/i/2017-09/cyber-crime-generic-istock_650x400_81504427706.jpg?downsize=773:435'
    }
  ];

  // Latest news articles
  const news = [
    {
      id: 1,
      title: 'UP Budget Allocates Funds for Cybersecurity',
      preview: 'The Uttar Pradesh government has announced a ₹8.08 lakh crore budget, including investments in an AI City and a Cybersecurity Research Park.',
      image: 'https://bharatexpress.com/wp-content/uploads/2024/02/nirmala-sitharaman-CM-Yogi.webp',
      date: 'March 20, 2024',
      category: 'Government',
      path: '/news/1'
    },
    {
      id: 2,
      title: 'UP Tops List of Rescued Cyber Scam Victims',
      preview: 'UP and Maharashtra have the highest number of victims rescued from international cyber fraud syndicates.',
      image: 'https://www.aljazeera.com/wp-content/uploads/2022/10/AP22280461520286.jpg?resize=1200%2C675',
      date: 'March 18, 2024',
      category: 'Cyber Crime',
      path: '/news/2'
    },
    {
      id: 3,
      title: 'How Hackers Are Targeting Banking Systems',
      preview: 'A new wave of cyberattacks is affecting financial institutions worldwide, with sophisticated techniques bypassing traditional security.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrz1ASB97WbBgnzQfhEwN1CS1Gu09IhEYZQCCg-xWhukW1N0-E-OtZM48PUXA4-0btp8&usqp=CAU',
      date: 'March 15, 2024',
      category: 'Financial Security',
      path: '/news/3'
    }
  ];

  // Testimonials for slider
  const testimonials = [
    {
      id: 1,
      content: "The cybersecurity training provided by CyberAware has significantly improved our team's ability to identify and respond to threats. Highly recommended!",
      author: "Dr. Raj Mehta",
      position: "Cybersecurity Consultant & Former CISO"
    },
    {
      id: 2,
      content: "After implementing the security recommendations from CyberAware, we've seen a 70% reduction in phishing attempts that make it past our front-line defenses.",
      author: "Prof. Priya Sharma",
      position: "Information Security Researcher, IIT Delhi"
    },
    {
      id: 3,
      content: "The phishing simulation program opened our eyes to vulnerabilities we didn't know existed. The follow-up training has been invaluable.",
      author: "Vikram Singh",
      position: "Cyber Forensics Expert, National Cyber Cell"
    }
  ];

  // Testimonial slider state and controls
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // News slider state and controls
  const [currentNews, setCurrentNews] = useState(0);

  const nextNews = () => {
    setCurrentNews((prev) => (prev + 1) % indiaNews.length);
  };

  const prevNews = () => {
    setCurrentNews((prev) => (prev - 1 + indiaNews.length) % indiaNews.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextNews();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle image error
  const handleImageError = (e, fallbackSrc) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black">
      {/* Breaking News Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-2 px-6 text-white">
        <div className="max-w-7xl mx-auto flex items-center">
          <span className="bg-white text-red-600 px-3 py-1 text-sm font-bold rounded-full mr-4">
            ALERT
          </span>
          <marquee
            behavior="scroll"
            direction="left"
            className="font-medium"
          >
            🚨 New Phishing Scam Targets Bank Customers | 🔒 Data Breach Exposes Millions of Users | ⚠️ Ransomware Attack on IT Firms | 🛡️ Cybersecurity Tips to Stay Safe Online | 📢 Government Issues New Cyber Laws
          </marquee>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 opacity-5 bg-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black/30 blur-sm"></span>
                <span className="relative z-10 bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">
                  CyberAware: Protecting Your Digital Life
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
              Stay informed about the latest cybersecurity threats and learn how to protect yourself and your organization in an increasingly digital world.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/phishing_and_attacks" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 font-medium shadow-lg hover:shadow-teal-500/20">
                Explore Cyber Threats
              </Link>
              <Link href="/report-incident" className="px-6 py-3 bg-indigo-800 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
                Report an Incident
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg className="w-full h-12 sm:h-16 fill-current text-indigo-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.77,70.92,127.07,62.3,171.36,65.1,275.68,71.65,252.55,78.26,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* India Cybersecurity News Slider */}
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Cybersecurity News in India</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-indigo-400 mx-auto"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl">
            {/* News Slider */}
            <div className="relative">
              {indiaNews.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`transition-all duration-500 ${
                    index === currentNews ? 'opacity-100 transform translate-x-0' : 'opacity-0 absolute top-0 left-0 transform translate-x-full'
                  }`}
                >
                  <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl overflow-hidden border border-indigo-700/40 shadow-xl">
                    <div className="md:flex">
                      <div className="md:w-1/2 h-72 bg-indigo-800 relative">
                        <img 
                          src={item.fallbackImage} 
                          alt={item.title} 
                          className="h-full w-full object-cover"
                          onError={(e) => handleImageError(e, 'https://i.ibb.co/GdkrgVN/default-cybersec.jpg')}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          <FontAwesomeIcon icon={faNewspaper} className="text-teal-400 w-5 h-5" />
                          <span className="text-teal-300 text-sm ml-2">{item.date} • {item.source}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-indigo-200/80 mb-6">{item.description}</p>
                        <Link 
                          href="/news" 
                          className="text-teal-400 hover:text-teal-300 font-medium flex items-center text-sm group mt-auto"
                        >
                          Read Full Story 
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevNews}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-indigo-900/80 text-indigo-100 rounded-full p-2 hover:bg-indigo-800 transition-colors duration-200 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button 
              onClick={nextNews}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-900/80 text-indigo-100 rounded-full p-2 hover:bg-indigo-800 transition-colors duration-200 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {indiaNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNews(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentNews ? 'bg-teal-400' : 'bg-indigo-700'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Slider Section */}
      <div className="bg-gradient-to-br from-indigo-800 to-indigo-700 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Experts Say</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-indigo-400 mx-auto"></div>
          </div>
          
          <div className="relative overflow-hidden p-6 md:p-10 bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl border border-indigo-600/40 backdrop-blur-sm shadow-xl">
            <FontAwesomeIcon icon={faQuoteLeft} className="absolute top-6 left-6 text-teal-500/20 w-16 h-16" />
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`transition-opacity duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                  }`}
                >
                  <blockquote className="text-xl text-white italic mb-6 text-center">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="text-center">
                    <p className="font-bold text-teal-300">{testimonial.author}</p>
                    <p className="text-indigo-200/60 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-teal-400' : 'bg-indigo-700'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white relative inline-block">
              Latest Cybersecurity News
              <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-teal-500 to-indigo-400"></span>
            </h2>
            <Link 
              href="/news" 
              className="text-teal-400 hover:text-teal-300 font-medium flex items-center text-sm"
            >
              View All News 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          
          {/* Featured News */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl overflow-hidden border border-indigo-700/40 shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://bharatexpress.com/wp-content/uploads/2024/02/nirmala-sitharaman-CM-Yogi.webp" 
                  alt="UP Budget" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 m-4">
                  <span className="bg-indigo-900/80 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-indigo-200/60">March 20, 2024</span>
                  <span className="bg-indigo-900/30 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    Government
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">UP Budget Allocates Funds for Cybersecurity</h3>
                <p className="text-indigo-200/80 mb-4">
                  The Uttar Pradesh government has announced a ₹8.08 lakh crore budget, including investments in an AI City and a Cybersecurity Research Park.
                </p>
                <Link 
                  href="/news/1" 
                  className="text-teal-400 hover:text-teal-300 font-medium flex items-center text-sm group"
                >
                  Read Full Story 
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column News Stories */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl overflow-hidden border border-indigo-700/40 shadow-xl flex">
                <div className="w-1/3">
                  <img 
                    src="https://www.aljazeera.com/wp-content/uploads/2022/10/AP22280461520286.jpg?resize=1200%2C675" 
                    alt="Cyber Scam Victims" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-indigo-200/60">March 18, 2024</span>
                    <span className="bg-indigo-900/30 text-teal-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      Cyber Crime
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">UP Tops List of Rescued Cyber Scam Victims</h3>
                  <p className="text-indigo-200/80 text-sm mb-3 line-clamp-2">
                    UP and Maharashtra have the highest number of victims rescued from international cyber fraud syndicates.
                  </p>
                  <Link 
                    href="/news/2" 
                    className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl overflow-hidden border border-indigo-700/40 shadow-xl flex">
                <div className="w-1/3">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrz1ASB97WbBgnzQfhEwN1CS1Gu09IhEYZQCCg-xWhukW1N0-E-OtZM48PUXA4-0btp8&usqp=CAU" 
                    alt="Banking Systems" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-indigo-200/60">March 15, 2024</span>
                    <span className="bg-indigo-900/30 text-teal-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      Financial Security
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">How Hackers Are Targeting Banking Systems</h3>
                  <p className="text-indigo-200/80 text-sm mb-3 line-clamp-2">
                    A new wave of cyberattacks is affecting financial institutions worldwide with increasingly sophisticated techniques.
                  </p>
                  <Link 
                    href="/news/3" 
                    className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl overflow-hidden border border-indigo-700/40 shadow-xl flex">
                <div className="w-1/3">
                  <img 
                    src="https://cdn.utkarsh.com/public/uploads/blog/2023/12/a5b01a7d-ec44-4bac-a72d-5a4b32ccec55-1703075957.webp" 
                    alt="UP Cyber Police" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-indigo-200/60">March 12, 2024</span>
                    <span className="bg-indigo-900/30 text-teal-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      Law Enforcement
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">UP Establishes Cyber Police Stations Across Districts</h3>
                  <p className="text-indigo-200/80 text-sm mb-3 line-clamp-2">
                    UP has established cyber police stations in all 18 police range districts to tackle online crimes.
                  </p>
                  <Link 
                    href="/news/4" 
                    className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-6 rounded-xl border border-indigo-700/40 shadow-xl">
            <div className="text-teal-400 mb-2">
              <h3 className="text-xl font-bold text-white">70%</h3>
              <p className="text-indigo-200/80">Increase in Cyber Attacks in UP</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-6 rounded-xl border border-indigo-700/40 shadow-xl">
            <div className="text-teal-400 mb-2">
              <h3 className="text-xl font-bold text-white">₹1,800 Crore</h3>
              <p className="text-indigo-200/80">Financial Losses to Cybercrime in India</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-6 rounded-xl border border-indigo-700/40 shadow-xl">
            <div className="text-teal-400 mb-2">
              <h3 className="text-xl font-bold text-white">85%</h3>
              <p className="text-indigo-200/80">Of Breaches Involve Human Element</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 