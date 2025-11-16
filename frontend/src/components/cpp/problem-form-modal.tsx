'use client';

import { useState, useRef } from 'react';
import { Problem, CATEGORIES } from '@/src/lib/cpp/types';

interface ProblemFormModalProps {
  problem?: Problem;
  onClose: () => void;
  onSubmit: (problem: Problem | Omit<Problem, 'id'>) => void;
}

export default function ProblemFormModal({
  problem,
  onClose,
  onSubmit,
}: ProblemFormModalProps) {
  const [formData, setFormData] = useState({
    title: problem?.title || '',
    category: problem?.category || CATEGORIES[0],
    difficulty: problem?.difficulty || 'Medium' as const,
    notes: problem?.notes || '',
    code: problem?.code || '',
    imageUrl: problem?.imageUrl || '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a problem title');
      return;
    }

    const submitData = problem
      ? { ...problem, ...formData }
      : formData;

    onSubmit(submitData);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">
              {problem ? 'Edit Problem' : 'Add New Problem'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-muted-foreground hover:text-foreground smooth-transition"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Problem Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Binary Search Template"
                className="w-full px-3 py-2 glass rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 glass rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                  className="w-full px-3 py-2 glass rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Problem Image (Optional)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="glass rounded-lg p-4 cursor-pointer hover:bg-white/40 dark:hover:bg-white/10 smooth-transition text-center"
              >
                {formData.imageUrl ? (
                  <div className="space-y-2">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <p>📸 Click to upload an image</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Notes & Explanation
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add your notes and explanation here..."
                rows={4}
                className="w-full px-3 py-2 glass rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Code Solution
              </label>
              <textarea
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Paste your code solution here..."
                rows={6}
                className="w-full px-3 py-2 glass rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-xs resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium smooth-transition"
              style={{
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
              }}
            >
              {problem ? 'Update Problem' : 'Save Problem'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 glass hover:bg-white/40 dark:hover:bg-white/10 text-foreground rounded-lg font-medium smooth-transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

