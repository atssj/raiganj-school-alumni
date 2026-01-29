import React, { useState, useMemo } from 'react';
import { Search, Briefcase, X, GraduationCap, Filter, ChevronDown } from 'lucide-react';
import { AlumniCard } from './directory/AlumniCard';
import { MOCK_ALUMNI } from '../data/mocks';

export const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedProfession, setSelectedProfession] = useState<string>('');

  // Extract unique values for filters
  const batches = useMemo(() => [...new Set(MOCK_ALUMNI.map(a => a.batch))].sort((a, b) => b - a), []);
  const professions = useMemo(() => [...new Set(MOCK_ALUMNI.map(a => a.profession))].sort(), []);

  const filtered = useMemo(() => {
    return MOCK_ALUMNI.filter(a => {
      const matchesSearch = 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.profession.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBatch = selectedBatch ? a.batch.toString() === selectedBatch : true;
      const matchesProfession = selectedProfession ? a.profession === selectedProfession : true;

      return matchesSearch && matchesBatch && matchesProfession;
    });
  }, [searchTerm, selectedBatch, selectedProfession]);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1">
            <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Alumni Directory</h2>
            <p className="text-gray-500 text-sm mt-1">Find and connect with fellow graduates.</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full self-start md:self-auto">
            Showing <strong>{filtered.length}</strong> members
        </div>
      </div>

      {/* UX Driven Filter Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-2 sticky top-0 md:top-4 z-30 backdrop-blur-xl bg-white/90">
        <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Search by name, company..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all text-base md:text-sm font-medium border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 px-1 md:px-0 scrollbar-hide items-center w-full md:w-auto -mx-1 md:mx-0 px-1">
            {/* Batch Filter Pill */}
            <div className="relative group min-w-[140px] flex-shrink-0">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-4 w-4 text-gray-500 group-hover:text-brand-600 transition-colors" />
                    </div>
                    <select 
                    className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all border-none"
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                    <option value="">Batch: All</option>
                    {batches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
            </div>

            {/* Profession Filter Pill */}
            <div className="relative group min-w-[150px] flex-shrink-0">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Briefcase className="h-4 w-4 text-gray-500 group-hover:text-brand-600 transition-colors" />
                    </div>
                    <select 
                    className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all border-none"
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value)}
                    >
                    <option value="">Role: All</option>
                    {professions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
            </div>

            {(selectedBatch || selectedProfession || searchTerm) && (
                <button 
                    onClick={() => { setSearchTerm(''); setSelectedBatch(''); setSelectedProfession(''); }}
                    className="px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors flex-shrink-0 flex items-center gap-2"
                >
                    <X className="w-4 h-4" /> Reset
                </button>
            )}
        </div>
      </div>

      {/* Grid - Compact Business Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((alum) => (
            <AlumniCard key={alum.id} alum={alum} />
        ))}

        {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No alumni found</h3>
                <p className="text-gray-500 mt-2 text-sm">Try adjusting your filters to find who you're looking for.</p>
                <button 
                    onClick={() => { setSearchTerm(''); setSelectedBatch(''); setSelectedProfession(''); }}
                    className="mt-4 text-brand-600 text-sm font-medium hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};