import React, { useState } from 'react';
import { DonationWorkReport, DonationStats } from './types';
import { mockDonationWorkReports, mockDonationStats } from './data/mockReports';

type FilterStatus = 'all' | 'Completed' | 'In Progress' | 'Planned';
type FilterCategory = 'all' | DonationWorkReport['category'];

export const DonationWorkReports: React.FC = () => {
  const [reports, setReports] = useState<DonationWorkReport[]>(mockDonationWorkReports);
  const [stats] = useState<DonationStats>(mockDonationStats);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<DonationWorkReport | null>(null);

  const filteredReports = reports.filter((report) => {
    const statusMatch = statusFilter === 'all' || report.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || report.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleAddReport = (newReport: Omit<DonationWorkReport, 'id' | 'createdAt' | 'updatedAt'>) => {
    const report: DonationWorkReport = {
      ...newReport,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setReports([report, ...reports]);
    setIsFormOpen(false);
  };

  const handleDeleteReport = (id: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Donation Work Reports</h2>
          <p className="text-gray-600 mt-1">
            Track and share how donation funds are being utilized
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
        >
          + Add New Report
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Spent"
          value={`₹${stats.totalSpent.toLocaleString()}`}
          icon="💰"
        />
        <SummaryCard
          label="Projects"
          value={stats.totalProjects.toString()}
          icon="📊"
        />
        <SummaryCard
          label="Beneficiaries"
          value={stats.beneficiariesHelped.toString()}
          icon="👥"
        />
        <SummaryCard
          label="Pending"
          value={stats.pendingProjects.toString()}
          icon="⏳"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Education">Education</option>
            <option value="Medical">Medical</option>
            <option value="Community">Community</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onView={() => setSelectedReport(report)}
            onDelete={() => handleDeleteReport(report.id)}
          />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No reports found matching the selected filters.</p>
        </div>
      )}

      {/* Add Report Modal */}
      {isFormOpen && (
        <AddReportModal
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddReport}
        />
      )}

      {/* View Report Modal */}
      {selectedReport && (
        <ViewReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

// Sub-components
const SummaryCard: React.FC<{ label: string; value: string; icon: string }> = ({
  label,
  value,
  icon,
}) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3">
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const ReportCard: React.FC<{
  report: DonationWorkReport;
  onView: () => void;
  onDelete: () => void;
}> = ({ report, onView, onDelete }) => {
  const statusColors = {
    Completed: 'bg-green-100 text-green-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Planned: 'bg-yellow-100 text-yellow-700',
  };

  const categoryColors: Record<string, string> = {
    Infrastructure: 'bg-purple-100 text-purple-700',
    Education: 'bg-indigo-100 text-indigo-700',
    Medical: 'bg-rose-100 text-rose-700',
    Community: 'bg-orange-100 text-orange-700',
    Other: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {report.images.length > 0 && (
        <div className="h-40 overflow-hidden">
          <img
            src={report.images[0]}
            alt={report.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[report.status]}`}>
            {report.status}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[report.category]}`}>
            {report.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="space-y-1">
            <p className="text-gray-500">
              <span className="font-medium text-gray-700">₹{report.amountSpent.toLocaleString()}</span> spent
            </p>
            <p className="text-gray-500">
              <span className="font-medium text-gray-700">{report.beneficiaries}</span> beneficiaries
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onView}
              className="px-3 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            >
              View
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddReportModal: React.FC<{
  onClose: () => void;
  onSubmit: (report: Omit<DonationWorkReport, 'id' | 'createdAt' | 'updatedAt'>) => void;
}> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    amountSpent: 0,
    category: 'Education' as DonationWorkReport['category'],
    images: [] as string[],
    beneficiaries: 0,
    location: '',
    status: 'Planned' as DonationWorkReport['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Add New Donation Work Report</h3>
          <p className="text-gray-600 text-sm mt-1">Share details about fund utilization</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Describe the project and its impact..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Spent (₹)</label>
              <input
                type="number"
                required
                min={0}
                value={formData.amountSpent}
                onChange={(e) => setFormData({ ...formData, amountSpent: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as DonationWorkReport['category'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Community">Community</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DonationWorkReport['status'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Project location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiaries</label>
              <input
                type="number"
                required
                min={0}
                value={formData.beneficiaries}
                onChange={(e) => setFormData({ ...formData, beneficiaries: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Number of people helped"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              Add Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewReportModal: React.FC<{
  report: DonationWorkReport;
  onClose: () => void;
}> = ({ report, onClose }) => {
  const statusColors = {
    Completed: 'bg-green-100 text-green-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Planned: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{report.title}</h3>
            <p className="text-gray-500 text-sm">{report.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          {report.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {report.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${report.title} ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[report.status]}`}>
              {report.status}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{report.category}</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{report.description}</p>
          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="text-xs text-gray-500">Amount Spent</p>
              <p className="text-lg font-bold text-gray-900">₹{report.amountSpent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Beneficiaries</p>
              <p className="text-lg font-bold text-gray-900">{report.beneficiaries}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(report.date).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
