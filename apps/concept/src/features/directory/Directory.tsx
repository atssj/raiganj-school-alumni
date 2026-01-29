import React from 'react';
import { Search, Briefcase, X, GraduationCap, ChevronDown } from 'lucide-react';
import { AlumniCard } from './components/AlumniCard';
import { useAlumniFilter } from './hooks/useAlumniFilter';
import { MOCK_ALUMNI } from '../../data/mocks';

export const Directory: React.FC = () => {
  const {
    searchTerm,
    selectedBatch,
    selectedProfession,
    setSearchTerm,
    setSelectedBatch,
    setSelectedProfession,
    resetFilters,
    filteredAlumni,
    batches,
    professions,
  } = useAlumniFilter(MOCK_ALUMNI);

  const hasActiveFilters = searchTerm || selectedBatch || selectedProfession;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Alumni Directory</h2>
          <p className="text-gray-500 text-sm mt-1">Find and connect with fellow graduates.</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full self-start md:self-auto">
          Showing <strong>{filteredAlumni.length}</strong> members
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-2 sticky top-0 md:top-4 z-30 backdrop-blur-xl bg-white/90">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 px-1 md:px-0 scrollbar-hide items-center w-full md:w-auto -mx-1 md:mx-0 px-1">
          <FilterSelect
            icon={GraduationCap}
            value={selectedBatch}
            onChange={setSelectedBatch}
            options={batches.map(b => ({ value: b.toString(), label: b.toString() }))}
            placeholder="Batch: All"
          />

          <FilterSelect
            icon={Briefcase}
            value={selectedProfession}
            onChange={setSelectedProfession}
            options={professions.map(p => ({ value: p, label: p }))}
            placeholder="Role: All"
          />

          {hasActiveFilters && <ResetButton onClick={resetFilters} />}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAlumni.map(alum => (
          <AlumniCard key={alum.id} alum={alum} />
        ))}

        {filteredAlumni.length === 0 && <EmptyState onReset={resetFilters} />}
      </div>
    </div>
  );
};

// Sub-components
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="relative flex-1 w-full">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search by name, company..."
      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all text-base md:text-sm font-medium border-none"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

interface FilterSelectProps {
  icon: React.ElementType;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ icon: Icon, value, onChange, options, placeholder }) => (
  <div className="relative group min-w-[140px] flex-shrink-0">
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <Icon className="h-4 w-4 text-gray-500 group-hover:text-brand-600 transition-colors" />
    </div>
    <select
      className="w-full appearance-none pl-10 pr-8 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all border-none"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <ChevronDown className="h-4 w-4 text-gray-400" />
    </div>
  </div>
);

const ResetButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors flex-shrink-0 flex items-center gap-2"
  >
    <X className="w-4 h-4" /> Reset
  </button>
);

const EmptyState: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
      <Search className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-bold text-gray-900">No alumni found</h3>
    <p className="text-gray-500 mt-2 text-sm">Try adjusting your filters to find who you&apos;re looking for.</p>
    <button onClick={onReset} className="mt-4 text-brand-600 text-sm font-medium hover:underline">
      Clear all filters
    </button>
  </div>
);
