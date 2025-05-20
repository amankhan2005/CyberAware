 'use client';

import React, { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi'; // paperclip icon

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

    if (!validatePhone(formData.contact)) {
      alert('Please enter a valid phone number with minimum 10 digits.\nकृपया 10 अंकों का मान्य फोन नंबर दर्ज करें।');
      return;
    }

    if (!formData.attachment) {
      alert('Please upload an attachment.\nकृपया एक फ़ाइल अपलोड करें।');
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
      });

      if (res.ok) {
        alert('Incident reported successfully!\nघटना सफलतापूर्वक दर्ज कर ली गई!');
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
        alert('Error reporting incident\nघटना दर्ज करने में त्रुटि');
      }
    } catch (error) {
      alert('Network error!\nनेटवर्क समस्या!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Report an Incident / घटना दर्ज करें
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-semibold mb-1">Name / नाम</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name / अपना नाम लिखें"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Contact / संपर्क (Phone number)</label>
            <input
              type="tel"
              name="contact"
              placeholder="Phone number (10+ digits) / फोन नंबर"
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded h-32"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
              Attachment / फाइल अपलोड करें <FiPaperclip className="text-xl text-gray-600" />
            </label>
            <input
              type="file"
              name="attachment"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded mt-2 transition duration-300"
          >
            Submit / सबमिट करें
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
