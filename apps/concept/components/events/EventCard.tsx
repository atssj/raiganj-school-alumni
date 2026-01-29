import React from 'react';
import { EventItem } from '../../types';
import { Button } from '../Button';
import { Clock, MapPin, Users, Share2, Facebook, Linkedin } from 'lucide-react';

interface EventCardProps {
    event: EventItem;
    onRsvp: (event: EventItem) => void;
    onShare: (platform: 'facebook' | 'linkedin', event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRsvp, onShare }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group">
            <div className="h-48 overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-center shadow-sm">
                    <span className="block text-xs font-bold text-gray-500 uppercase">DATE</span>
                    <span className="block text-xl font-bold text-brand-600">{event.date}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {event.description}
                </p>
                <div className="flex flex-col space-y-2 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-500"/> TBD
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-500"/> {event.location}
                    </div>
                    <div className="flex items-center gap-2 font-medium text-brand-700">
                        <Users className="w-4 h-4 text-brand-500"/> {event.goingCount} Going
                    </div>
                </div>
                <Button className="w-full mb-4" onClick={() => onRsvp(event)}>RSVP Now</Button>

                    <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-50">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Share
                    </span>
                    <button onClick={() => onShare('facebook', event)} className="text-gray-400 hover:text-[#1877F2] transition-colors">
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button onClick={() => onShare('linkedin', event)} className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};