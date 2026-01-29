import React from 'react';
import { AlumniProfile } from '../../types';
import { GraduationCap, MapPin, UserPlus, MessageSquare } from 'lucide-react';

interface AlumniCardProps {
    alum: AlumniProfile;
}

export const AlumniCard: React.FC<AlumniCardProps> = ({ alum }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-brand-100 transition-all duration-300 flex flex-col justify-between h-full">
            <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                        <img 
                            src={alum.avatar} 
                            alt={alum.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Online"></div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 truncate leading-tight">{alum.name}</h3>
                        <p className="text-xs text-brand-600 font-medium truncate mt-0.5">{alum.profession}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md text-[10px] font-medium text-gray-600 border border-gray-100">
                                <GraduationCap className="w-3 h-3" /> {alum.batch}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 truncate max-w-[100px]" title={alum.location}>
                                <MapPin className="w-3 h-3 flex-shrink-0" /> {alum.location.split(',')[0]}
                            </span>
                        </div>
                    </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-50 mt-auto">
                <button 
                    onClick={() => alert('Connect Request Sent (Simulated)')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
                >
                    <UserPlus className="w-3 h-3" /> Connect
                </button>
                <button 
                    onClick={() => alert('Message Sent (Simulated)')}
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all"
                >
                    <MessageSquare className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};