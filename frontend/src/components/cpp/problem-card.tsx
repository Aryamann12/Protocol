'use client';

import { Problem } from '@/src/lib/cpp/types';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400',
  Medium: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400',
  Hard: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400',
};

export default function ProblemCard({ problem, onClick }: ProblemCardProps) {
  return (
    <div
      onClick={onClick}
      className="glass-card cursor-pointer hover:shadow-2xl hover:scale-105 smooth-transition rounded-xl p-5 group"
    >
      {problem.imageUrl && (
        <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
          <img
            src={problem.imageUrl || "/placeholder.svg"}
            alt={problem.title}
            className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
          />
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            {problem.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

        <span className="inline-block px-2 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 rounded text-xs font-medium">
          {problem.category}
        </span>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {problem.notes}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
        <span>Click to view details →</span>
      </div>
    </div>
  );
}

