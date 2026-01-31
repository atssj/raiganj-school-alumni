import React, { memo } from 'react';
import { Clock, MapPin, Users, Share2, Facebook, Linkedin } from 'lucide-react';
import { Button } from '../../../shared/components';
import { EventItem } from '../../../shared/types';

interface EventCardProps {
  event: EventItem;
  onRsvp: (event: EventItem) => void;
  onShare: (platform: 'facebook' | 'linkedin', event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = memo(({ event, onRsvp, onShare }) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm group">
      <div className="h-48 overflow-hidden relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-lg text-center shadow-sm">
          <span className="block text-xs font-bold text-muted-foreground uppercase">DATE</span>
          <span className="block text-xl font-bold text-brand-600">{event.date}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{event.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{event.description}</p>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-500" /> TBD
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-500" /> {event.location}
          </div>
          <div className="flex items-center gap-2 font-medium text-brand-700">
            <Users className="w-4 h-4 text-brand-500" /> {event.goingCount} Going
          </div>
        </div>
        <Button className="w-full mb-4" onClick={() => onRsvp(event)}>
          RSVP Now
        </Button>

        <div className="flex items-center justify-center gap-4 pt-2 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </span>
          <button
            type="button"
            onClick={() => onShare('facebook', event)}
            className="text-muted-foreground hover:text-[#1877F2] transition-colors"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onShare('linkedin', event)}
            className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';
