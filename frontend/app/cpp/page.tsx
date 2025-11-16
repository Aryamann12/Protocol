'use client';

import { useState, useEffect } from 'react';
import Header from '@/src/components/cpp/header';
import CategoryFilter from '@/src/components/cpp/category-filter';
import ProblemGrid from '@/src/components/cpp/problem-grid';
import ProblemFormModal from '@/src/components/cpp/problem-form-modal';
import ProblemDetailModal from '@/src/components/cpp/problem-detail-modal';
import AuthGuard from '@/src/components/cpp/AuthGuard';
import { Problem, CATEGORIES } from '@/src/lib/cpp/types';
import * as api from '@/src/lib/cpp/api';

export default function CppPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getProblems();
      setProblems(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch problems');
      console.error('Error fetching problems:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddProblem = async (newProblem: Omit<Problem, 'id'>) => {
    try {
      const problem = await api.createProblem(newProblem);
      setProblems([...problems, problem]);
      setIsFormOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create problem');
    }
  };

  const handleEditProblem = async (updatedProblem: Problem) => {
    try {
      const problem = await api.updateProblem(updatedProblem.id, updatedProblem);
      setProblems(problems.map(p => (p.id === problem.id ? problem : p)));
      setEditingProblem(null);
      setIsFormOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update problem');
    }
  };

  const handleDeleteProblem = async (id: string) => {
    try {
      await api.deleteProblem(id);
      setProblems(problems.filter(p => p.id !== id));
      setSelectedProblem(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete problem');
    }
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 via-slate-900 to-blue-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Header onAddClick={() => {
            setEditingProblem(null);
            setIsFormOpen(true);
          }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
                {error}
              </div>
            )}

            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Loading problems...</p>
              </div>
            ) : (
              <ProblemGrid
                problems={filteredProblems}
                onProblemClick={setSelectedProblem}
              />
            )}
          </div>

          {isFormOpen && (
            <ProblemFormModal
              problem={editingProblem || undefined}
              onClose={() => {
                setIsFormOpen(false);
                setEditingProblem(null);
              }}
              onSubmit={editingProblem ? handleEditProblem : handleAddProblem}
            />
          )}

          {selectedProblem && (
            <ProblemDetailModal
              problem={selectedProblem}
              onClose={() => setSelectedProblem(null)}
              onEdit={() => {
                setEditingProblem(selectedProblem);
                setSelectedProblem(null);
                setIsFormOpen(true);
              }}
              onDelete={() => {
                handleDeleteProblem(selectedProblem.id);
              }}
            />
          )}
        </div>
      </main>
    </AuthGuard>
  );
}

