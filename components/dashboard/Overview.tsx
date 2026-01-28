import React from 'react';
import { ViewState, AlumniProfile } from '../../types';
import { Button } from '../Button';

interface OverviewProps {
    currentUser: AlumniProfile;
    onChangeView: (view: ViewState) => void;
}

export const Overview: React.FC<OverviewProps> = ({ currentUser, onChangeView }) => {
    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
                    <p className="text-brand-100 text-sm md:text-base max-w-lg">There are 3 upcoming reunions this winter in Raiganj. Connect with your batchmates now.</p>
                    <Button variant="white" className="mt-6 w-full md:w-auto" onClick={() => onChangeView(ViewState.DIRECTORY)}>
                        Find Batchmates
                    </Button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900">Recent Joinees</h3>
                        <button className="text-xs text-brand-600 font-medium" onClick={() => onChangeView(ViewState.DIRECTORY)}>View All</button>
                        </div>
                        <div className="space-y-4">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                    <img src={`https://picsum.photos/200/200?random=${i}`} className="w-full h-full object-cover" alt="Alumnus" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Alumnus Name {i}</p>
                                    <p className="text-xs text-gray-500">Batch of 200{i}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900">School News</h3>
                        </div>
                        <div className="space-y-4">
                        <div className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <span className="text-xs font-bold text-brand-600 uppercase">Oct 12</span>
                            <p className="text-sm font-medium text-gray-800 mt-1">New Science Block Inauguration Ceremony held today.</p>
                        </div>
                        <div className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <span className="text-xs font-bold text-brand-600 uppercase">Oct 05</span>
                            <p className="text-sm font-medium text-gray-800 mt-1">School Football Team wins district championship.</p>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
};