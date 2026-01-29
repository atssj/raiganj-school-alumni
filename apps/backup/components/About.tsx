
import React from 'react';
import { Target, Compass, Award, BookOpen, Clock } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <div className="space-y-12 animate-fade-in pb-12">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 shadow-md">
                <img 
                    src="https://images.unsplash.com/photo-1592280771800-bcf9fe950d62?q=80&w=2000&auto=format&fit=crop" 
                    alt="School Building" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">Our Legacy</h1>
                    <p className="text-brand-100 text-lg md:text-xl max-w-2xl font-light">
                        Shaping minds and building character in the heart of Raiganj since 1952.
                    </p>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                        <Compass className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed flex-1">
                        To be a beacon of educational excellence in North Bengal, nurturing global citizens who foster innovation, integrity, and social responsibility while staying rooted in their cultural heritage.
                    </p>
                </div>

                <div className="bg-brand-900 p-8 rounded-3xl border border-brand-800 shadow-sm flex flex-col h-full relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-300 mb-6 relative z-10">
                        <Target className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-4 relative z-10">Our Mission</h2>
                    <p className="text-brand-100 leading-relaxed flex-1 relative z-10">
                        To empower students with holistic education that balances academic rigor with co-curricular growth. We strive to create an inclusive environment that encourages critical thinking, empathy, and lifelong learning.
                    </p>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Core Values</h2>
                    <div className="w-24 h-1 bg-brand-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm border border-gray-100">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                        <p className="text-gray-500 text-sm">Striving for the highest standards in everything we do.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm border border-gray-100">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Knowledge</h3>
                        <p className="text-gray-500 text-sm">Pursuing truth and understanding through rigorous inquiry.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm border border-gray-100">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tradition</h3>
                        <p className="text-gray-500 text-sm">Honoring our rich history while embracing the future.</p>
                    </div>
                </div>
            </div>

            {/* History Timeline */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Journey Through Time</h2>
                <div className="relative border-l-2 border-brand-200 ml-4 md:ml-1/2 md:translate-x-[-1px] space-y-12">
                    
                    {/* 1952 */}
                    <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                         <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-600 border-4 border-white shadow-sm md:left-1/2 md:translate-x-[-50%]"></div>
                         <div className="md:w-[45%] md:text-right md:pr-12">
                            <span className="text-brand-600 font-bold tracking-widest text-sm">1952</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">Foundation Stone</h3>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                The school was established in a small building near the river Kulik with just 50 students and 5 teachers.
                            </p>
                         </div>
                         <div className="hidden md:block md:w-[45%]"></div>
                    </div>

                    {/* 1980 */}
                    <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                         <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-200 border-4 border-white shadow-sm md:left-1/2 md:translate-x-[-50%] group-hover:bg-brand-600 transition-colors"></div>
                         <div className="hidden md:block md:w-[45%]"></div>
                         <div className="md:w-[45%] md:pl-12">
                            <span className="text-brand-600 font-bold tracking-widest text-sm">1980</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">New Campus Inaugurated</h3>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                Moved to the current sprawling campus at College Para, introducing modern science laboratories.
                            </p>
                         </div>
                    </div>

                    {/* 2002 */}
                    <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                         <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-200 border-4 border-white shadow-sm md:left-1/2 md:translate-x-[-50%] group-hover:bg-brand-600 transition-colors"></div>
                         <div className="md:w-[45%] md:text-right md:pr-12">
                            <span className="text-brand-600 font-bold tracking-widest text-sm">2002</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">Golden Jubilee</h3>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                Celebrated 50 glorious years of excellence. The Alumni Association was formally registered this year.
                            </p>
                         </div>
                         <div className="hidden md:block md:w-[45%]"></div>
                    </div>

                     {/* 2023 */}
                     <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
                         <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-brand-200 border-4 border-white shadow-sm md:left-1/2 md:translate-x-[-50%] group-hover:bg-brand-600 transition-colors"></div>
                         <div className="hidden md:block md:w-[45%]"></div>
                         <div className="md:w-[45%] md:pl-12">
                            <span className="text-brand-600 font-bold tracking-widest text-sm">2023</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">Digital Transformation</h3>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                Launch of smart classrooms and this dedicated Alumni Digital Platform.
                            </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Principal's Message */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg mt-12">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                        <img 
                            src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400&auto=format&fit=crop" 
                            alt="Principal" 
                            className="w-full h-full object-cover rounded-2xl shadow-md"
                        />
                    </div>
                    <div>
                         <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">From the Principal's Desk</h2>
                         <p className="text-brand-600 font-medium mb-4">Mr. S. K. Das, M.Sc, B.Ed</p>
                         <div className="text-gray-600 space-y-4 italic leading-relaxed relative">
                            <span className="absolute -top-4 -left-2 text-6xl text-brand-100 font-serif -z-10">“</span>
                            <p>
                                "It gives me immense pride to see our alumni shining across the globe. You are the true ambassadors of our institution. 
                                This platform is a bridge to connect your past with our present. I invite you all to come back, mentor the current generation, 
                                and keep the flag of বিদ্যাচক্র প্রাক্তনী সমিতি flying high."
                            </p>
                            <p>
                                The school has grown leaps and bounds, but our core values remain unchanged. We look forward to your continued support."
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
