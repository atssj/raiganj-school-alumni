import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Sparkles, Plus, X, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { suggestEventIdeas } from '../services/geminiService';
import { EventItem } from '../types';
import { EventCard } from './events/EventCard';
import { INITIAL_EVENTS } from '../data/mocks';

const SEASONS = ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'];

export const Events: React.FC = () => {
    const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
    const [aiIdeas, setAiIdeas] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('Winter');
    const [isCreating, setIsCreating] = useState(false);

    // RSVP Modal State
    const [rsvpModal, setRsvpModal] = useState<{ isOpen: boolean, event: EventItem | null, step: 'confirm' | 'success' }>({
        isOpen: false,
        event: null,
        step: 'confirm'
    });

    // Form State
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        location: '',
        description: ''
    });

    useEffect(() => {
        handleGetIdeas(selectedSeason);
    }, []);

    const handleGetIdeas = async (season: string) => {
        setLoading(true);
        const ideas = await suggestEventIdeas(season);
        setAiIdeas(ideas);
        setLoading(false);
    }

    const onSeasonChange = (season: string) => {
        setSelectedSeason(season);
        handleGetIdeas(season);
    }

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        const event: EventItem = {
            id: Date.now().toString(),
            title: newEvent.title,
            date: newEvent.date,
            location: newEvent.location,
            description: newEvent.description,
            image: `https://picsum.photos/800/400?event=${Date.now()}`,
            goingCount: 0
        };
        setEvents([event, ...events]);
        setIsCreating(false);
        setNewEvent({ title: '', date: '', location: '', description: '' });
    };

    const handleRsvpClick = (event: EventItem) => {
        setRsvpModal({ isOpen: true, event, step: 'confirm' });
    };

    const confirmRsvp = () => {
        // Simulate API call and increment count
        setTimeout(() => {
             if (rsvpModal.event) {
                 setEvents(prev => prev.map(e => 
                    e.id === rsvpModal.event!.id ? { ...e, goingCount: e.goingCount + 1 } : e
                 ));
             }
             setRsvpModal(prev => ({ ...prev, step: 'success' }));
        }, 500);
    };

    const closeRsvpModal = () => {
        setRsvpModal({ isOpen: false, event: null, step: 'confirm' });
    };

    const shareEvent = (platform: 'facebook' | 'linkedin', event: EventItem) => {
        const url = encodeURIComponent(window.location.href); 
        const text = encodeURIComponent(`Join me at ${event.title} in Raiganj!`);
        let shareUrl = '';
        
        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        } else if (platform === 'linkedin') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

  return (
    <div className="space-y-6 md:space-y-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Upcoming Gatherings</h2>
            <p className="text-gray-500 mt-1">Join us for upcoming reunions and social events.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Host an Event
        </Button>
      </div>

      {isCreating && (
          <div className="bg-white p-6 rounded-2xl border border-brand-200 shadow-lg animate-fade-in relative z-10">
              <button 
                onClick={() => setIsCreating(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                  <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Host a New Event</h3>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                            placeholder="e.g. Batch of 2010 Lunch"
                            value={newEvent.title}
                            onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date (Display Text)</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                            placeholder="e.g. Dec 24"
                            value={newEvent.date}
                            onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                          />
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="e.g. Hotel Vinayak, Raiganj"
                        value={newEvent.location}
                        onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="Describe the event..."
                        value={newEvent.description}
                        onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                      />
                  </div>
                  <div className="flex justify-end gap-3 flex-col sm:flex-row">
                      <Button type="button" variant="ghost" onClick={() => setIsCreating(false)} className="w-full sm:w-auto">Cancel</Button>
                      <Button type="submit" className="w-full sm:w-auto">Publish Event</Button>
                  </div>
              </form>
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-6">
            {events.map(event => (
                <EventCard 
                    key={event.id} 
                    event={event} 
                    onRsvp={handleRsvpClick} 
                    onShare={shareEvent} 
                />
            ))}
        </div>

        {/* AI Suggestions Sidebar */}
        <div className="h-fit bg-brand-50 rounded-2xl p-6 border border-brand-100 flex flex-col order-first lg:order-last">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-brand-100 rounded-lg">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                </div>
                <h3 className="font-bold text-brand-900 text-sm tracking-wide">AI Event Planner</h3>
            </div>
            
            <p className="text-xs text-brand-700 mb-4">
                Select a season to get unique reunion ideas tailored for Raiganj.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {SEASONS.map((season) => (
                    <button
                        key={season}
                        onClick={() => onSeasonChange(season)}
                        disabled={loading}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                            selectedSeason === season
                                ? 'bg-brand-600 text-white shadow-md transform scale-105'
                                : 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-100'
                        }`}
                    >
                        {season}
                    </button>
                ))}
            </div>

            <div className="flex-1">
                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-12 bg-brand-100 rounded-xl"></div>
                        <div className="h-12 bg-brand-100 rounded-xl"></div>
                        <div className="h-12 bg-brand-100 rounded-xl"></div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {aiIdeas.map((idea, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-brand-100 hover:border-brand-300 transition-colors cursor-default">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px] font-bold mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <p className="text-gray-800 text-sm leading-snug">{idea}</p>
                                </div>
                            </div>
                        ))}
                        {aiIdeas.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Select a season to see ideas.</p>}
                    </div>
                )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-brand-100/50 text-center">
                <p className="text-[10px] text-brand-400 uppercase tracking-widest font-semibold">
                    Powered by Gemini 
                </p>
            </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpModal.isOpen && rsvpModal.event && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" onClick={closeRsvpModal}></div>
                <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-up p-8 text-center" onClick={(e) => e.stopPropagation()}>
                    {rsvpModal.step === 'confirm' ? (
                        <>
                            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600 shadow-sm border border-brand-100">
                                <CalendarIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Confirm RSVP</h3>
                            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                                Are you sure you want to attend <strong className="text-gray-900 block mt-1">{rsvpModal.event.title}</strong>?
                            </p>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={closeRsvpModal}>Cancel</Button>
                                <Button className="flex-1" onClick={confirmRsvp}>Yes, I'm In</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm border border-green-100 animate-scale-up">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">You're on the list!</h3>
                            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                                We've marked your attendance for <strong className="text-gray-900 block mt-1">{rsvpModal.event.title}</strong>. See you there!
                            </p>
                            <Button className="w-full" onClick={closeRsvpModal}>Done</Button>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};