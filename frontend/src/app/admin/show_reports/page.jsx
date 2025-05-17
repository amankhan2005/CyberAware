'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ShowReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedSeverity, setSelectedSeverity] = useState("");
    const [selectedSort, setSelectedSort] = useState("newest");
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reportsPerPage = 6;

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_BASE_URL}/incidents/all`);
                if (!response.ok) throw new Error("Failed to fetch reports");
                const data = await response.json();
                setReports(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleStatusUpdate = async (reportId, newStatus) => {
        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/incidents/${reportId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Failed to update status");
            
            setReports(reports.map(report => 
                report._id === reportId ? { ...report, status: newStatus } : report
            ));
            toast.success("Status updated successfully");
        } catch (err) {
            toast.error(err.message);
        }
    };    // Filter and sort reports
    const filteredReports = reports.filter(report => {
        const matchesSearch = searchTerm === "" || (
            (report.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (report.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (report.incidentType?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        
        const matchesStatus = !selectedStatus || report.status === selectedStatus;
        const matchesSeverity = !selectedSeverity || report.severity === selectedSeverity;
        
        return matchesSearch && matchesStatus && matchesSeverity;
    }).sort((a, b) => {
        if (selectedSort === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        if (selectedSort === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        if (selectedSort === "severity") return (b.severity || "low").localeCompare(a.severity || "low");
        return 0;
    });

    // Pagination logic
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getSeverityColor = (severity) => {
        switch (severity?.toLowerCase()) {
            case 'high': return 'text-red-400 bg-red-500/20';
            case 'medium': return 'text-yellow-400 bg-yellow-500/20';
            case 'low': return 'text-green-400 bg-green-500/20';
            default: return 'text-slate-400 bg-slate-500/20';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'resolved': return 'text-green-400 bg-green-500/20';
            case 'in_progress': return 'text-blue-400 bg-blue-500/20';
            case 'pending': return 'text-yellow-400 bg-yellow-500/20';
            default: return 'text-slate-400 bg-slate-500/20';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-red-500 bg-red-100/10 p-4 rounded-lg">
                Error: {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Incident Reports
                    </h1>
                    <div className="text-slate-400">
                        Total Reports: {filteredReports.length}
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-indigo-950/40 border border-indigo-800/30 rounded-lg px-4 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                    />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="bg-indigo-950/40 border border-indigo-800/30 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-teal-500/50"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <select
                        value={selectedSeverity}
                        onChange={(e) => setSelectedSeverity(e.target.value)}
                        className="bg-indigo-950/40 border border-indigo-800/30 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-teal-500/50"
                    >
                        <option value="">All Severities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        className="bg-indigo-950/40 border border-indigo-800/30 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-teal-500/50"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="severity">By Severity</option>
                    </select>
                </div>

                {/* Reports Grid */}
                {filteredReports.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-400 text-lg">No reports found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentReports.map((report) => (                            <div
                                key={report._id}
                                onClick={() => {
                                    setSelectedReport(report);
                                    setIsModalOpen(true);
                                }}
                                className="bg-indigo-950/40 backdrop-blur-sm border border-indigo-800/30 rounded-lg p-6 hover:bg-indigo-900/30 transition-colors cursor-pointer"
                            >
                                <div className="flex flex-col h-full">                                    
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-teal-400 font-semibold text-lg truncate max-w-[70%]">
                                            {report.title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getSeverityColor(report.severity)}`}>
                                            {report.severity || 'Unknown'} Severity
                                        </span>
                                    </div>
                                    <p className="text-slate-300 mb-4 line-clamp-3 text-sm">
                                        {report.description}
                                    </p>
                                    <div className="text-sm text-slate-400 space-y-2 mb-4">
                                        <p className="flex justify-between">
                                            <span className="font-medium">Type:</span> 
                                            <span className="truncate ml-2 text-right max-w-[70%]">{report.incidentType || 'Not specified'}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">Location:</span> 
                                            <span className="truncate ml-2 text-right max-w-[70%]">{report.location || 'Not specified'}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">Reported by:</span> 
                                            <span className="truncate ml-2 text-right max-w-[70%]">{report.contactName || 'Anonymous'}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">Date:</span> 
                                            <span className="whitespace-nowrap ml-2">{new Date(report.dateOccurred || report.createdAt).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-indigo-800/30">
                                        <div className="flex justify-between items-center">
                                            <select
                                                value={report.status || 'pending'}
                                                onChange={(e) => handleStatusUpdate(report._id, e.target.value)}
                                                className={`px-3 py-1 rounded text-sm ${getStatusColor(report.status)} border-0 focus:ring-2 focus:ring-teal-500`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                            <span className="text-xs text-slate-400">
                                                Updated: {new Date(report.updatedAt || report.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Detail Modal */}
                {isModalOpen && selectedReport && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-indigo-800/30">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold text-teal-400">
                                        {selectedReport.title}
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-slate-400 hover:text-slate-300"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="space-y-6">
                                    {/* Status and Severity */}
                                    <div className="flex items-center justify-between">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                                            Status: {selectedReport.status || 'Pending'}
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedReport.severity)}`}>
                                            {selectedReport.severity || 'Unknown'} Severity
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-slate-300 font-semibold mb-2">Description</h3>
                                        <p className="text-slate-400 whitespace-pre-wrap">
                                            {selectedReport.description}
                                        </p>
                                    </div>

                                    {/* Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-slate-300 font-semibold mb-1">Incident Type</h4>
                                                <p className="text-slate-400">{selectedReport.incidentType || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-slate-300 font-semibold mb-1">Location</h4>
                                                <p className="text-slate-400">{selectedReport.location || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-slate-300 font-semibold mb-1">Date Occurred</h4>
                                                <p className="text-slate-400">
                                                    {new Date(selectedReport.dateOccurred || selectedReport.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-slate-300 font-semibold mb-1">Reporter Information</h4>
                                                <p className="text-slate-400">Name: {selectedReport.contactName || 'Anonymous'}</p>
                                                <p className="text-slate-400">Email: {selectedReport.contactEmail || 'Not provided'}</p>
                                                <p className="text-slate-400">Phone: {selectedReport.contactPhone || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-slate-300 font-semibold mb-1">Additional Information</h4>
                                                <p className="text-slate-400 whitespace-pre-wrap">
                                                    {selectedReport.additionalInfo || 'No additional information provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Update */}
                                    <div className="border-t border-indigo-800/30 pt-6">
                                        <div className="flex items-center justify-between">
                                            <select
                                                value={selectedReport.status || 'pending'}
                                                onChange={(e) => {
                                                    handleStatusUpdate(selectedReport._id, e.target.value);
                                                    setSelectedReport({ ...selectedReport, status: e.target.value });
                                                }}
                                                className={`px-4 py-2 rounded text-sm ${getStatusColor(selectedReport.status)} border-0 focus:ring-2 focus:ring-teal-500`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                            <span className="text-sm text-slate-400">
                                                Last Updated: {new Date(selectedReport.updatedAt || selectedReport.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    currentPage === index + 1
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-indigo-950/40 text-slate-300 hover:bg-indigo-900/30'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowReportsPage;