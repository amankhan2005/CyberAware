'use client';

import React, { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import toast from 'react-hot-toast';

const indiaData = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Korba"],
  "Goa": ["Panaji", "Margao"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Gurgaon", "Faridabad", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysore", "Mangalore"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Kohima"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Punjab": ["Amritsar", "Ludhiana", "Chandigarh"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
  "Uttarakhand": ["Dehradun", "Haridwar"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi"]
};

const ReportIncident = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    state: '',
    district: '',
    description: '',
    attachment: null,
  });

  const [districts, setDistricts] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'state') {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: '',
      }));
      setDistricts(value ? indiaData[value] : []);
    } else if (name === 'attachment') {
      setFormData((prev) => ({
        ...prev,
        attachment: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.contact)) {      toast.error('Please enter a valid phone number with minimum 10 digits');
      return;
    }

    if (!formData.attachment) {
      toast.error('Please upload an attachment');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('contact', formData.contact);
      data.append('state', formData.state);
      data.append('district', formData.district);
      data.append('description', formData.description);
      data.append('attachment', formData.attachment);

      const res = await fetch('/api/report', {
        method: 'POST',
        body: data,
      });      if (res.ok) {
        toast.success('Incident reported successfully!');
        setFormData({
          name: '',
          contact: '',
          state: '',
          district: '',
          description: '',
          attachment: null,
        });
        setDistricts([]);
      } else {
        toast.error('Error reporting incident');
      }
    } catch (error) {
      toast.error('Network error!');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-12 z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Report an Incident
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Help us protect the community by reporting cybersecurity incidents. Your report will be handled with confidentiality and urgency.
          </p>
        </div>

        <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-semibold mb-1">Name / नाम</label>
            <input
              type="text"
              name="name"              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Contact / संपर्क (Phone number)</label>
            <input
              type="tel"
              name="contact"              placeholder="Phone number (10+ digits)"
              className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10,}"
              title="Phone number must be at least 10 digits"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">State / राज्य</label>
            <select
              name="state"
              className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">-- Select State / राज्य चुनें --</option>
              {Object.keys(indiaData).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">District / जिला</label>
            <select
              name="district"
              className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
              value={formData.district}
              onChange={handleChange}
              disabled={!districts.length}
              required
            >
              <option value="">-- Select District / जिला चुनें --</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description / विवरण</label>
            <textarea
              name="description"
              placeholder="Explain what happened / क्या हुआ बताएं"
              className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300 min-h-[8rem] resize-y"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 flex items-center gap-2">
              Attachment / फाइल अपलोड करें <FiPaperclip className="text-xl" />
            </label>
            <div className="relative">
              <input
                type="file"
                name="attachment"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold hover:from-teal-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-indigo-500/50 outline-none"
          >
            Submit / सबमिट करें
          </button>
        </form>      </div>
      </div>
    </div>
  );
};

export default ReportIncident;
