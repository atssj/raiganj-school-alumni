import React, { useState } from 'react';

interface AdminEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrations: number;
  maxCapacity: number;
}

const mockAdminEvents: AdminEvent[] = [
  {
    id: '1',
    title: 'Annual Alumni Reunion 2026',
    date: '2026-03-15',
    location: 'Raiganj School Campus',
    status: 'upcoming',
    registrations: 45,
    maxCapacity: 100,
  },
  {
    id: '2',
    title: 'Batch of 2015 Meetup',
    date: '2026-02-20',
    location: 'Kolkata',
    status: 'upcoming',
    registrations: 28,
    maxCapacity: 50,
  },
  {
    id: '3',
    title: 'Career Guidance Webinar',
    date: '2026-01-25',
    location: 'Online (Zoom)',
    status: 'completed',
    registrations: 120,
    maxCapacity: 200,
  },
];

export const AdminEvents: React.FC = () => {
  const [events] = useState<AdminEvent[]>(mockAdminEvents);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-600 mt-1">Create and manage alumni events and reunions</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors">
          + Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  event.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-700'
                    : event.status === 'ongoing'
                      ? 'bg-green-100 text-green-700'
                      : event.status === 'completed'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-red-100 text-red-700'
                }`}
              >
                {event.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{event.location}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="text-gray-900 font-medium">
                  {new Date(event.date).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Registrations</span>
                <span className="text-gray-900 font-medium">
                  {event.registrations} / {event.maxCapacity}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div
                  className="bg-brand-500 h-2 rounded-full transition-all"
                  style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
