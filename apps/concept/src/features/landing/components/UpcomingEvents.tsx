import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Reveal } from '../../../shared/components';
import { ViewState } from '../../../shared/types';

interface UpcomingEventsProps {
  onNavigate: (view: ViewState) => void;
}

const EVENTS = [
  {
    id: 1,
    title: "Saraswati Puja Reunion",
    date: "Feb 14, 2026",
    time: "10:00 AM",
    location: "School Premises",
    desc: "The biggest day for every Vidya Chakra student. Come in your best ethnic wear and relive the puja vibes.",
    type: "Cultural"
  },
  {
    id: 2,
    title: "Annual Sports Meet",
    date: "Dec 20, 2026",
    time: "08:00 AM",
    location: "Raiganj Stadium",
    desc: "Cheer for your house! The legendary Red vs Blue rivalry continues. Alumni race included.",
    type: "Sports"
  },
  {
    id: 3,
    title: "Global Virtual Meetup",
    date: "Aug 15, 2026",
    time: "07:00 PM IST",
    location: "Zoom / Google Meet",
    desc: "Connecting alumni from USA, UK, Kolkata, and Bangalore. Raise a toast to independence and friendship.",
    type: "Virtual"
  }
];

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-32 bg-white relative">
       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-2">mark your calendars</h2>
            <p className="text-brand-600 font-medium">Don't miss the chance to reconnect.</p>
          </Reveal>
          <Reveal delay={100}>
            <button 
              onClick={() => onNavigate(ViewState.EVENTS)}
              className="text-gray-900 font-bold flex items-center gap-2 hover:gap-3 transition-all mt-4 md:mt-0"
            >
              View Full Calendar <ArrowRight className="w-5 h-5" />
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EVENTS.map((event, index) => (
            <Reveal key={event.id} delay={index * 100}>
                {/* Ticket Style Card */}
              <div className="group relative flex flex-col h-full bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-3xl">
                
                {/* Ticket Notch - Visual trick using radial gradients via mask or pseudo elements - Simplest is just visuals */}
                {/* Left Notch */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#F3F4F6] rounded-full z-20 border-r border-gray-200" />
                {/* Right Notch */}
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#F3F4F6] rounded-full z-20 border-l border-gray-200" />
                
                {/* Border Dashed Line */}
                <div className="absolute top-1/2 left-4 right-4 h-[1px] border-t-2 border-dashed border-gray-200 z-10" />

                {/* Top Half: Date & Type */}
                <div className="bg-brand-50 p-6 pb-8 relative">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-center min-w-[70px]">
                         <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">{event.date.split(" ")[0]}</span>
                         <span className="block text-2xl font-serif font-bold text-brand-900">{event.date.split(" ")[1].replace(",", "")}</span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-brand-900 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {event.type}
                      </span>
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-brand-700 transition-colors leading-tight">
                    {event.title}
                  </h3>
                </div>

                {/* Bottom Half: Details */}
                <div className="p-6 pt-8 bg-white flex-1 flex flex-col relative z-20">
                  <div className="space-y-3 mb-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-brand-400" />
                       <span className="font-medium">{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-brand-400" />
                       <span className="font-medium">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">
                    {event.desc}
                  </p>

                  <button className="mt-auto w-full py-3 rounded-xl border-2 border-brand-100 font-bold text-brand-700 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-colors uppercase tracking-widest text-xs">
                    Get Ticket
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
