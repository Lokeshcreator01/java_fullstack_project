import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await api.get('/tickets');
            setTickets(response.data);
        } catch (error) {
            console.error("Failed to fetch tickets", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (ticketId, newStatus) => {
        try {
            await api.put(`/tickets/${ticketId}/status?status=${newStatus}`);
            fetchTickets(); // Refresh after update
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update ticket status.");
        }
    };

    const getSeverityBadge = (level) => {
        const styles = {
            'LOW': 'bg-green-100 text-green-800',
            'MEDIUM': 'bg-blue-100 text-blue-800',
            'HIGH': 'bg-orange-100 text-orange-800',
            'CRITICAL': 'bg-red-100 text-red-800'
        };
        return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[level]}`}>{level}</span>;
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading admin view...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
                    <p className="mt-1 text-sm text-gray-500">Monitor and manage all system incidents globally.</p>
                </div>
                <div className="bg-primary-50 px-4 py-2 rounded-lg border border-primary-100">
                    <span className="text-primary-700 font-semibold text-lg">{tickets.length}</span>
                    <span className="text-primary-600 text-sm ml-2">Total Tickets</span>
                </div>
            </div>

            <div className="card overflow-hidden !p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Ticket Details</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tickets.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                                        No tickets found in the system.
                                    </td>
                                </tr>
                            ) : (
                                tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{ticket.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                                            <div className="text-sm text-gray-500 mt-1 line-clamp-1 max-w-xs">{ticket.description}</div>
                                            <div className="text-xs text-gray-400 mt-1">{new Date(ticket.createdDate).toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs uppercase">
                                                    {ticket.reporter?.username?.substring(0, 2) || 'UK'}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{ticket.reporter?.username || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getSeverityBadge(ticket.severity)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <select
                                                value={ticket.status}
                                                onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                                                className={`text-sm rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500
                          ${ticket.status === 'OPEN' ? 'bg-white' : ''}
                          ${ticket.status === 'IN_PROGRESS' ? 'bg-yellow-50 text-yellow-800' : ''}
                          ${ticket.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-800' : ''}
                        `}
                                            >
                                                <option value="OPEN">Open</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="RESOLVED">Resolved</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
