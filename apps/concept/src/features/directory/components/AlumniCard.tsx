import React, { memo } from 'react';
import { GraduationCap, MapPin, UserPlus, MessageSquare } from 'lucide-react';
import { AlumniProfile } from '../../../shared/types';

interface AlumniCardProps {
  alum: AlumniProfile;
}

export const AlumniCard: React.FC<AlumniCardProps> = memo(({ alum }) => {
  const handleConnect = () => {
    alert('Connect Request Sent (Simulated)');
  };

  const handleMessage = () => {
    alert('Message Sent (Simulated)');
  };

  return (
    <div className="group bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-brand-100 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={alum.avatar}
            alt={alum.name}
            className="w-12 h-12 rounded-xl object-cover border border-border shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full"
            title="Online"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-card-foreground truncate leading-tight">{alum.name}</h3>
          <p className="text-xs text-brand-600 font-medium truncate mt-0.5">{alum.profession}</p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded-md text-[10px] font-medium text-muted-foreground border border-border">
              <GraduationCap className="w-3 h-3" /> {alum.batch}
            </span>
            <span
              className="inline-flex items-center gap-1 text-[10px] text-muted-foreground truncate max-w-25"
              title={alum.location}
            >
              <MapPin className="w-3 h-3 shrink-0" /> {alum.location.split(',')[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-border mt-auto">
        <button
          type="button"
          onClick={handleConnect}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
        >
          <UserPlus className="w-3 h-3" /> Connect
        </button>
        <button
          type="button"
          onClick={handleMessage}
          className="flex items-center justify-center px-3 py-2 rounded-lg bg-card border border-input text-card-foreground text-xs font-medium hover:bg-muted hover:border-border active:scale-95 transition-all"
          title="Send Message"
          aria-label="Send Message"
        >
          <MessageSquare className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
});

AlumniCard.displayName = 'AlumniCard';
