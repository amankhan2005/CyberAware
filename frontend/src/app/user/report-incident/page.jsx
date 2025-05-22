'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle, faShieldAlt, faUserSecret, faLock, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

const ReportIncident = () => {

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation schema
    const validationSchema = Yup.object({
        incidentType: Yup.string().required('Please select the type of incident'),
        description: Yup.string()
            .required('Please provide a description')
            .min(50, 'Description must be at least 50 characters')
            .max(1000, 'Description must not exceed 1000 characters'),
        severity: Yup.string().required('Please select the severity level'),
        dateOccurred: Yup.date()
            .required('Please select when the incident occurred')
            .max(new Date(), 'Date cannot be in the future'),
        location: Yup.string().required('Please provide the location'),
        contactName: Yup.string().required('Please provide your name'),
        contactEmail: Yup.string()
            .email('Please enter a valid email')
            .required('Please provide your email'),
        contactPhone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
            .required('Please provide your phone number'),
        additionalInfo: Yup.string()
            .max(500, 'Additional information must not exceed 500 characters'),
    });

    const formik = useFormik({
        initialValues: {
            incidentType: '',
            description: '',
            severity: '',
            dateOccurred: '',
            location: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            additionalInfo: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await axios.post(`${API_BASE_URL}/incidents/report`, values);
                toast.success('Incident report submitted successfully!');
                formik.resetForm();
            } catch (error) {
                console.error('Error submitting incident report:', error);
                toast.error(error.response?.data?.message || 'Failed to submit incident report. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const incidentTypes = [
        { value: 'phishing', label: 'Phishing Attack', icon: faUserSecret },
        { value: 'malware', label: 'Malware Infection', icon: faShieldAlt },
        { value: 'data_breach', label: 'Data Breach', icon: faLock },
        { value: 'ransomware', label: 'Ransomware Attack', icon: faGlobe },
        { value: 'other', label: 'Other', icon: faExclamationTriangle },
    ];

    const severityLevels = [
        { value: 'low', label: 'Low - Minor impact, no data loss' },
        { value: 'medium', label: 'Medium - Some impact, limited data exposure' },
        { value: 'high', label: 'High - Significant impact, data breach' },
        { value: 'critical', label: 'Critical - Severe impact, major data breach' },
    ];


    useEffect(() => {
        const token = localStorage.getItem('user');
        if (!token) {
            router.push('/login');
        }
    }, []);    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white relative pt-6">
            {/* Subtle geometric pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-12 z-20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            Report a Cybersecurity Incident
                        </span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Help us protect the community by reporting cybersecurity incidents. Your report will be handled with confidentiality and urgency.
                    </p>
                </div>

                <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl p-8">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Incident Type */}
                        <div>
                            <label className="block text-sm font-medium text-indigo-200 mb-2">
                                Type of Incident *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {incidentTypes.map((type) => (
                                    <div
                                        key={type.value}
                                        className={`relative rounded-lg border p-4 cursor-pointer transition-all duration-200 ${formik.values.incidentType === type.value
                                                ? 'border-teal-500 bg-teal-500/10'
                                                : 'border-indigo-700/40 hover:border-teal-500/50'
                                            }`}
                                        onClick={() => formik.setFieldValue('incidentType', type.value)}
                                    >
                                        <input
                                            type="radio"
                                            name="incidentType"
                                            value={type.value}
                                            checked={formik.values.incidentType === type.value}
                                            onChange={formik.handleChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center space-x-3">
                                            <FontAwesomeIcon
                                                icon={type.icon}
                                                className={`w-5 h-5 ${formik.values.incidentType === type.value
                                                        ? 'text-teal-400'
                                                        : 'text-indigo-400'
                                                    }`}
                                            />
                                            <span className="text-white">{type.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {formik.touched.incidentType && formik.errors.incidentType && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.incidentType}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-indigo-200 mb-2">
                                Incident Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Please provide a detailed description of the incident..."
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.description}</p>
                            )}
                        </div>

                        {/* Severity and Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="severity" className="block text-sm font-medium text-indigo-200 mb-2">
                                    Severity Level *
                                </label>
                                <select
                                    id="severity"
                                    name="severity"
                                    value={formik.values.severity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                >
                                    <option value="">Select severity level</option>
                                    {severityLevels.map((level) => (
                                        <option key={level.value} value={level.value} className="bg-indigo-950">
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.severity && formik.errors.severity && (
                                    <p className="mt-1 text-sm text-red-400">{formik.errors.severity}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="dateOccurred" className="block text-sm font-medium text-indigo-200 mb-2">
                                    When did it occur? *
                                </label>
                                <input
                                    type="datetime-local"
                                    id="dateOccurred"
                                    name="dateOccurred"
                                    value={formik.values.dateOccurred}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                />
                                {formik.touched.dateOccurred && formik.errors.dateOccurred && (
                                    <p className="mt-1 text-sm text-red-400">{formik.errors.dateOccurred}</p>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-indigo-200 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="City, State, or Organization"
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            />
                            {formik.touched.location && formik.errors.location && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.location}</p>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-medium text-indigo-200 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="contactName"
                                    value={formik.values.contactName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                                />
                                {formik.touched.contactName && formik.errors.contactName && (
                                    <p className="mt-1 text-sm text-red-400">{formik.errors.contactName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="contactEmail" className="block text-sm font-medium text-indigo-200 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="contactEmail"
                                    name="contactEmail"
                                    value={formik.values.contactEmail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                                />
                                {formik.touched.contactEmail && formik.errors.contactEmail && (
                                    <p className="mt-1 text-sm text-red-400">{formik.errors.contactEmail}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-indigo-200 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                value={formik.values.contactPhone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="10-digit phone number"
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            />
                            {formik.touched.contactPhone && formik.errors.contactPhone && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.contactPhone}</p>
                            )}
                        </div>

                        {/* Additional Information */}
                        <div>
                            <label htmlFor="additionalInfo" className="block text-sm font-medium text-indigo-200 mb-2">
                                Additional Information
                            </label>
                            <textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                rows="3"
                                value={formik.values.additionalInfo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Any additional details that might help us understand the incident better..."
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            />
                            {formik.touched.additionalInfo && formik.errors.additionalInfo && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.additionalInfo}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
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
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Report'
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-teal-400 hover:text-teal-300 text-sm flex items-center justify-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReportIncident; 