import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('LOW');
    const [submitError, setSubmitError] = useState('');

    const { user } = useAuth();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            // Since it's user dashboard, we should ideally fetch only their tickets.
            // But we mapped ALL to GET /api/tickets in backend (for now).
            const response = await api.get('/tickets');

            // Filter the tickets if your backend returns everything 
            // Replace with actual reporting logic based on how backend responds.
            const myTickets = response.data.filter(t => t.reporter?.id === user?.id);
            setTickets(myTickets);
        } catch (error) {
            console.error("Failed to fetch tickets", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!title || !description) {
            setSubmitError('Title and description are required.');
            return;
        }

        try {
            await api.post(`/tickets?reporterId=${user.id}`, {
                title,
                description,
                severity
            });
            setTitle('');
            setDescription('');
            setSeverity('LOW');
            fetchTickets(); // Refresh list
        } catch (error) {
            console.error("Failed to create ticket", error);
            setSubmitError('Failed to create ticket. Please try again.');
        }
    };

    const getSeverityBadge = (level) => {
        const styles = {
            'LOW': 'bg-green-100 text-green-800 border-green-200',
            'MEDIUM': 'bg-blue-100 text-blue-800 border-blue-200',
            'HIGH': 'bg-orange-100 text-orange-800 border-orange-200',
            'CRITICAL': 'bg-red-100 text-red-800 border-red-200'
        };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[level]}`}>{level}</span>;
    };

    const getStatusBadge = (status) => {
        const styles = {
            'OPEN': 'bg-gray-100 text-gray-800 border-gray-200',
            'IN_PROGRESS': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'RESOLVED': 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>{status.replace('_', ' ')}</span>;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
                <p className="mt-1 text-sm text-gray-500">View and manage the incidents you have reported.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Ticket List Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Reported Incidents</h2>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading tickets...</div>
                    ) : tickets.length === 0 ? (
                        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-500">
                            No tickets reported yet.
                        </div>
                    ) : (
                        tickets.map((ticket) => (
                            <div key={ticket.id} className="card hover:shadow-lg transition-shadow duration-200 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                                    <div className="flex gap-2">
                                        {getSeverityBadge(ticket.severity)}
                                        {getStatusBadge(ticket.status)}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ticket.description}</p>
                                <div className="text-xs text-gray-400">
                                    Reported on {new Date(ticket.createdDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Submit Form Section */}
                <div className="lg:col-span-1">
                    <div className="card sticky top-24">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Submit New Ticket</h2>

                        <form onSubmit={handleCreateTicket} className="space-y-4">
                            {submitError && (
                                <div className="bg-red-50 text-red-700 p-3 rounded text-sm font-medium">
                                    {submitError}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input-field"
                                    placeholder="Brief summary of issue"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="input-field resize-none"
                                    placeholder="Provide detailed information..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                                <select
                                    value={severity}
                                    onChange={(e) => setSeverity(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full btn-primary mt-4">
                                Submit Ticket
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
