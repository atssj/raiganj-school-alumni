import React, { useState } from 'react';
import { HandHeart, Users, Mic, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface Role {
    id: string;
    title: string;
    icon: any;
    description: string;
    commitment: string;
}

const ROLES: Role[] = [
    {
        id: 'mentor',
        title: 'Student Mentor',
        icon: Users,
        description: 'Guide current class 10 & 12 students with career choices and exam preparation.',
        commitment: '2-3 hours / month'
    },
    {
        id: 'speaker',
        title: 'Guest Speaker',
        icon: Mic,
        description: 'Conduct a workshop or seminar on your field of expertise for students.',
        commitment: 'One-time event'
    },
    {
        id: 'organizer',
        title: 'Event Organizer',
        icon: Calendar,
        description: 'Help the committee plan and execute the Grand Winter Reunion and other meets.',
        commitment: 'Weekly meetings (Nov-Dec)'
    },
    {
        id: 'content',
        title: 'Content Contributor',
        icon: BookOpen,
        description: 'Write articles, alumni stories, or manage social media for the association.',
        commitment: 'Flexible'
    }
];

export const Volunteer: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000); // Reset for demo
        setSelectedRole(null);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Hero Section */}
            <div className="bg-brand-50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-6">
                        <HandHeart className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Volunteer Your Time</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        The greatest gift you can give is your time. Join hands with us to shape the future of our school and strengthen our community.
                    </p>
                </div>
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-300/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                
                {/* Roles List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-brand-600" /> Open Opportunities
                    </h3>
                    
                    {ROLES.map(role => (
                        <div 
                            key={role.id}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                                selectedRole === role.id 
                                ? 'border-brand-500 bg-brand-50 shadow-sm' 
                                : 'border-gray-100 bg-white hover:border-brand-200 hover:shadow-sm'
                            }`}
                            onClick={() => setSelectedRole(role.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl transition-colors ${
                                    selectedRole === role.id ? 'bg-brand-200 text-brand-800' : 'bg-gray-50 text-gray-600 group-hover:bg-brand-100 group-hover:text-brand-700'
                                }`}>
                                    <role.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{role.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{role.description}</p>
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                                        <Clock className="w-3 h-3" /> {role.commitment}
                                    </div>
                                </div>
                                <div className={`ml-auto self-center w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    selectedRole === role.id ? 'border-brand-600 bg-brand-600' : 'border-gray-300'
                                }`}>
                                    {selectedRole === role.id && <CheckCircle className="w-3 h-3 text-white" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Application Form */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-lg sticky top-8">
                    {isSubmitted ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Thank You!</h3>
                            <p className="text-gray-500">
                                We have received your interest. Our team will get in touch with you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">I'm Interested</h3>
                                <p className="text-gray-500 text-sm">
                                    {selectedRole 
                                        ? `Applying for: ${ROLES.find(r => r.id === selectedRole)?.title}` 
                                        : "Select a role from the left to get started."}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <input required type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Your Name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                        <input required type="email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="email@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                        <input required type="tel" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="+91..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Why do you want to volunteer?</label>
                                    <textarea required rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none" placeholder="Briefly describe your experience..."></textarea>
                                </div>
                            </div>

                            <Button disabled={!selectedRole} className="w-full py-3 text-lg">
                                Submit Application
                            </Button>
                            
                            {!selectedRole && (
                                <p className="text-center text-xs text-red-500 animate-pulse">
                                    * Please select a role first
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};