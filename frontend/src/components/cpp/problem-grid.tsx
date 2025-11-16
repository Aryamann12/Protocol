'use client';

import { Problem } from '@/src/lib/cpp/types';
import ProblemCard from './problem-card';

interface ProblemGridProps {
  problems: Problem[];
  onProblemClick: (problem: Problem) => void;
}

export default function ProblemGrid({ problems, onProblemClick }: ProblemGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {problems.length > 0 ? (
        problems.map(problem => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onClick={() => onProblemClick(problem)}
          />
        ))
      ) : (
        <div className="col-span-full py-12 text-center">
          <p className="text-muted-foreground text-lg">
            No problems yet. Click "Add Problem" to get started! 🚀
          </p>
        </div>
      )}
    </div>
  );
}

