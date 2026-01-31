import { useState, useMemo, useDeferredValue, useCallback, TransitionStartFunction } from 'react';
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

export const useAlumniFilter = (
  alumni: AlumniProfile[],
  startTransition?: TransitionStartFunction
): FilterState & FilterActions & {
  filteredAlumni: AlumniProfile[];
  batches: number[];
  professions: string[];
} => {
  const [searchTerm, setSearchTermState] = useState('');
  const [selectedBatch, setSelectedBatchState] = useState('');
  const [selectedProfession, setSelectedProfessionState] = useState('');
  
  // Use deferred value for smoother typing experience
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Wrap state updates in transitions for non-urgent updates
  const setSearchTerm = useCallback((term: string) => {
    if (startTransition) {
      startTransition(() => {
        setSearchTermState(term);
      });
    } else {
      setSearchTermState(term);
    }
  }, [startTransition]);

  const setSelectedBatch = useCallback((batch: string) => {
    if (startTransition) {
      startTransition(() => {
        setSelectedBatchState(batch);
      });
    } else {
      setSelectedBatchState(batch);
    }
  }, [startTransition]);

  const setSelectedProfession = useCallback((profession: string) => {
    if (startTransition) {
      startTransition(() => {
        setSelectedProfessionState(profession);
      });
    } else {
      setSelectedProfessionState(profession);
    }
  }, [startTransition]);

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
        a.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        a.location.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        a.profession.toLowerCase().includes(deferredSearchTerm.toLowerCase());

      const matchesBatch = selectedBatch ? a.batch.toString() === selectedBatch : true;
      const matchesProfession = selectedProfession ? a.profession === selectedProfession : true;

      return matchesSearch && matchesBatch && matchesProfession;
    });
  }, [alumni, deferredSearchTerm, selectedBatch, selectedProfession]);

  const resetFilters = useCallback(() => {
    if (startTransition) {
      startTransition(() => {
        setSearchTermState('');
        setSelectedBatchState('');
        setSelectedProfessionState('');
      });
    } else {
      setSearchTermState('');
      setSelectedBatchState('');
      setSelectedProfessionState('');
    }
  }, [startTransition]);

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
