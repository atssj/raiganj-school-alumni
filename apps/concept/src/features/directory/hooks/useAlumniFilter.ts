import { useState, useMemo } from 'react';
import { AlumniProfile } from '../../../shared/types';

export interface FilterState {
  searchTerm: string;
  selectedBatch: string;
  selectedProfession: string;
}

export interface FilterActions {
  setSearchTerm: (term: string) => void;
  setSelectedBatch: (batch: string) => void;
  setSelectedProfession: (profession: string) => void;
  resetFilters: () => void;
}

export const useAlumniFilter = (alumni: AlumniProfile[]): FilterState & FilterActions & {
  filteredAlumni: AlumniProfile[];
  batches: number[];
  professions: string[];
} => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');

  const batches = useMemo(
    () => [...new Set(alumni.map(a => a.batch))].sort((a, b) => b - a),
    [alumni]
  );

  const professions = useMemo(
    () => [...new Set(alumni.map(a => a.profession))].sort(),
    [alumni]
  );

  const filteredAlumni = useMemo(() => {
    return alumni.filter(a => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.profession.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBatch = selectedBatch ? a.batch.toString() === selectedBatch : true;
      const matchesProfession = selectedProfession ? a.profession === selectedProfession : true;

      return matchesSearch && matchesBatch && matchesProfession;
    });
  }, [alumni, searchTerm, selectedBatch, selectedProfession]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBatch('');
    setSelectedProfession('');
  };

  return {
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
  };
};
