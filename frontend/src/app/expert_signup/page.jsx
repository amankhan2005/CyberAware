'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ExpertSignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearsExperience: '',
    jobTitle: '',
    company: '',
    expertise: [],
    certifications: '',
    linkedIn: '',
    bio: '',  
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expertiseOptions = [
    'Network Security',
    'Cloud Security',
    'Application Security',
    'Penetration Testing',
    'Security Architecture',
    'Incident Response',
    'Risk Management',
    'Compliance',
    'Digital Forensics',
    'Malware Analysis'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleExpertiseChange = (area) => {
    const newExpertise = formData.expertise.includes(area)
      ? formData.expertise.filter(item => item !== area)
      : [...formData.expertise, area];
    
    setFormData({
      ...formData,
      expertise: newExpertise
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.yearsExperience) {
      newErrors.yearsExperience = 'Years of experience is required';
    }

    if (formData.expertise.length === 0) {
      newErrors.expertise = 'Please select at least one area of expertise';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Here we would normally make an API call to create the user account
      // Simulating API call with setTimeout
      setTimeout(() => {
        console.log('Form submitted successfully', formData);
        setIsSubmitting(false);
        router.push('/expert_login');
      }, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 to-black text-white">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">
              Join Our Cybersecurity Expert Network
            </span>
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Share your expertise, contribute insights, and help individuals and organizations improve their cybersecurity posture. 
            Fill out the form below to create your expert profile.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl border border-indigo-700/40 p-6 md:p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 relative inline-block">
                Personal Information
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-indigo-200 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.firstName ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-indigo-200 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.lastName ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.email ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedIn" className="block text-sm font-medium text-indigo-200 mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.password ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-200 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 relative inline-block">
                Professional Information
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Years of Experience */}
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium text-indigo-200 mb-1">
                    Years of Experience *
                  </label>
                  <select
                    id="yearsExperience"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.yearsExperience ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                  >
                    <option value="" className="bg-indigo-950">Select experience</option>
                    <option value="1-3" className="bg-indigo-950">1-3 years</option>
                    <option value="3-5" className="bg-indigo-950">3-5 years</option>
                    <option value="5-10" className="bg-indigo-950">5-10 years</option>
                    <option value="10+" className="bg-indigo-950">10+ years</option>
                  </select>
                  {errors.yearsExperience && <p className="mt-1 text-sm text-red-400">{errors.yearsExperience}</p>}
                </div>

                {/* Job Title */}
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-indigo-200 mb-1">
                    Current Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300"
                    placeholder="Security Engineer"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-indigo-200 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300"
                    placeholder="Acme Cybersecurity"
                  />
                </div>

                {/* Certifications */}
                <div>
                  <label htmlFor="certifications" className="block text-sm font-medium text-indigo-200 mb-1">
                    Certifications
                  </label>
                  <input
                    type="text"
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300"
                    placeholder="CISSP, CEH, CISM, etc."
                  />
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Areas of Expertise *
                </label>
                {errors.expertise && <p className="mb-2 text-sm text-red-400">{errors.expertise}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {expertiseOptions.map((area) => (
                    <div key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`expertise-${area}`}
                        checked={formData.expertise.includes(area)}
                        onChange={() => handleExpertiseChange(area)}
                        className="h-4 w-4 text-teal-500 focus:ring-teal-400 rounded bg-indigo-950 border-indigo-700"
                      />
                      <label htmlFor={`expertise-${area}`} className="ml-2 text-sm text-indigo-200">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label htmlFor="bio" className="block text-sm font-medium text-indigo-200 mb-1">
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300"
                  placeholder="Tell us about your experience, expertise, and what you're passionate about in the cybersecurity field..."
                ></textarea>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-teal-500 focus:ring-teal-400 rounded bg-indigo-950 border-indigo-700"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-indigo-200">
                    I agree to the <Link href="/terms" className="text-teal-400 hover:text-teal-300">Terms of Service</Link> and <Link href="/privacy" className="text-teal-400 hover:text-teal-300">Privacy Policy</Link>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                  <span className="relative flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Create Expert Account'
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-indigo-400 text-sm">
            Already have an expert account? <Link href="/expert_login" className="text-teal-400 hover:text-teal-300">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertSignupPage;
