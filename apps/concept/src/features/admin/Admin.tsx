import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDonationStats, mockAdminMembers } from './data/mockReports';
import { mockVolunteerRequests } from './data/mockVolunteerRequests';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const stats = mockDonationStats;
  const recentMembers = mockAdminMembers.slice(0, 3);
  const pendingVolunteers = mockVolunteerRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage alumni network and donation activities</p>
        </div>
        <span className="px-3 py-1 bg-brand-100 text-brand-700 text-sm font-medium rounded-full">
          Administrator
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="space-y-4">
          <StatCard
            title="Total Donations"
            value={`₹${stats.totalDonations.toLocaleString()}`}
            change="+12% from last year"
            trend="up"
          />
          <StatCard
            title="Available Funds"
            value={`₹${(stats.totalDonations - stats.totalSpent).toLocaleString()}`}
            change={`${Math.round(((stats.totalDonations - stats.totalSpent) / stats.totalDonations) * 100)}% remaining`}
          />
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <StatCard
            title="Beneficiaries"
            value={stats.beneficiariesHelped.toString()}
            change="People helped"
          />
          <StatCard
            title="Total Projects"
            value={stats.totalProjects.toString()}
            subtitle={`${stats.completedProjects} completed, ${stats.pendingProjects} pending`}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Donation Work Reports"
          description="Manage and post updates about fund utilization"
          icon="📝"
          onClick={() => navigate('/admin/donations')}
          color="bg-blue-50 hover:bg-blue-100"
        />
        <QuickActionCard
          title="Member Management"
          description="Review and manage alumni member accounts"
          icon="👥"
          onClick={() => navigate('/admin/members')}
          color="bg-purple-50 hover:bg-purple-100"
        />
        <QuickActionCard
          title="Event Management"
          description="Create and manage alumni events"
          icon="📅"
          onClick={() => navigate('/admin/events')}
          color="bg-orange-50 hover:bg-orange-100"
        />
      </div>

      {/* Volunteer Quick Action */}
      <QuickActionCard
        title="Volunteer Requests"
        description={`${pendingVolunteers} pending applications to review`}
        icon="🤝"
        onClick={() => navigate('/admin/volunteers')}
        color="bg-green-50 hover:bg-green-100"
      />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Members</h3>
            <button
              onClick={() => navigate('/admin/members')}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">Batch of {member.batch}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : member.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            <TaskItem
              title="Review new member applications"
              count={3}
              urgent
              onClick={() => navigate('/admin/members')}
            />
            <TaskItem
              title="Review volunteer requests"
              count={pendingVolunteers}
              urgent={pendingVolunteers > 0}
              onClick={() => navigate('/admin/volunteers')}
            />
            <TaskItem
              title="Update donation work reports"
              count={2}
              onClick={() => navigate('/admin/donations')}
            />
            <TaskItem
              title="Approve event proposals"
              count={1}
              onClick={() => navigate('/admin/events')}
            />
            <TaskItem
              title="Monthly donation report"
              due="Due in 3 days"
              onClick={() => navigate('/admin/donations')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, subtitle, trend }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    {change && (
      <p className={`text-xs mt-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
        {change}
      </p>
    )}
    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  color: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon, onClick, color }) => (
  <button
    onClick={onClick}
    className={`${color} rounded-xl p-5 text-left transition-all duration-200 border border-transparent hover:border-gray-200`}
  >
    <span className="text-3xl mb-3 block">{icon}</span>
    <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </button>
);

interface TaskItemProps {
  title: string;
  count?: number;
  due?: string;
  urgent?: boolean;
  onClick: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, count, due, urgent, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
  >
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${urgent ? 'bg-red-500' : 'bg-brand-500'}`} />
      <span className="text-sm text-gray-700">{title}</span>
    </div>
    {count !== undefined && (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
        {count}
      </span>
    )}
    {due && <span className="text-xs text-gray-500">{due}</span>}
  </button>
);
