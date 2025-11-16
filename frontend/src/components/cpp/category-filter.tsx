'use client';

import { CATEGORIES } from '@/src/lib/cpp/types';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {['All', ...CATEGORIES].map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap smooth-transition ${
              selectedCategory === category
                ? 'glass-card bg-gradient-to-r from-cyan-500/80 to-blue-500/80 text-white'
                : 'glass hover:bg-white/40 dark:hover:bg-white/10 text-foreground'
            }`}
            style={selectedCategory === category ? {
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            } : undefined}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg glass bg-white/60 dark:bg-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 smooth-transition"
        />
        <svg
          className="absolute right-3 top-3 w-5 h-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}

