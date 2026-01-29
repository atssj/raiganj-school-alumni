import React, { useState } from 'react';
import { AlumniProfile } from '../types';
import { Button } from './Button';
import { Camera, Save, MapPin, Briefcase, GraduationCap, User } from 'lucide-react';

interface ProfileProps {
  user: AlumniProfile;
  onUpdate: (updatedUser: AlumniProfile) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState<AlumniProfile>(user);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-fade-in pb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900">My Profile</h2>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col items-center">
                     <div className="relative group cursor-pointer">
                        <img 
                            src={formData.avatar} 
                            alt="Profile" 
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Camera className="w-8 h-8"/>
                        </div>
                     </div>
                     <p className="mt-4 text-xs text-gray-500">Click to upload new photo (Simulated)</p>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                             <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
                                />
                             </div>
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Batch Year</label>
                             <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="number" 
                                    value={formData.batch}
                                    onChange={(e) => setFormData({...formData, batch: parseInt(e.target.value) || 0})}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
                                />
                             </div>
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                             <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    value={formData.profession}
                                    onChange={(e) => setFormData({...formData, profession: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
                                />
                             </div>
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">Current City</label>
                             <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
                                />
                             </div>
                        </div>
                         <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                             <input 
                                    type="text" 
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm text-gray-600 transition-all text-base md:text-sm"
                                    placeholder="https://..."
                                />
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                         {successMsg ? (
                             <span className="text-green-600 font-medium text-sm animate-fade-in flex items-center gap-2">
                                <Save className="w-4 h-4"/> {successMsg}
                             </span>
                         ) : <span></span>}
                         <Button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2">
                             Save Changes
                         </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};