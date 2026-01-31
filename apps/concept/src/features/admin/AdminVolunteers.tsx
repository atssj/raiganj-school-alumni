import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, Clock, HandHeart, Search } from 'lucide-react';
import { Button } from '../../shared/components';
import { VolunteerRequest } from './types';
import { mockVolunteerRequests } from './data/mockVolunteerRequests';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

export const AdminVolunteers: React.FC = () => {
  const [requests, setRequests] = useState<VolunteerRequest[]>(mockVolunteerRequests);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch =
      req.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: 'approved', reviewedAt: new Date().toISOString() }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: 'rejected', reviewedAt: new Date().toISOString() }
          : req
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Requests</h2>
          <p className="text-gray-600 mt-1">Review and manage alumni volunteer applications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Requests" value={stats.total} icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard
          title="Pending Review"
          value={stats.pending}
          icon={Clock}
          color="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          color="bg-green-50 text-green-600"
        />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="bg-red-50 text-red-600" />
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {(['all', 'pending', 'approved', 'rejected'] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                  filter === status
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <HandHeart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No volunteer requests found</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onApprove={() => handleApprove(request.id)}
              onReject={() => handleReject(request.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  </div>
);

interface RequestCardProps {
  request: VolunteerRequest;
  onApprove: () => void;
  onReject: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onApprove, onReject }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
            {request.applicantName.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{request.applicantName}</h3>
              <p className="text-sm text-gray-500">
                Batch of {request.batch} • {request.email}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize w-fit ${statusColors[request.status]}`}>
              {request.status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium">
              <HandHeart className="w-4 h-4" />
              {request.roleTitle}
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              Submitted {new Date(request.submittedAt).toLocaleDateString()}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{request.message}</p>

          {/* Actions */}
          {request.status === 'pending' && (
            <div className="mt-4 flex gap-3">
              <Button
                onClick={onApprove}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
              <Button
                onClick={onReject}
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
            </div>
          )}

          {request.status !== 'pending' && request.reviewedAt && (
            <p className="mt-3 text-xs text-gray-400">
              {request.status === 'approved' ? 'Approved' : 'Rejected'} on{' '}
              {new Date(request.reviewedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
