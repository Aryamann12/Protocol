'use client';

import { Problem } from '@/src/lib/cpp/types';

interface ProblemDetailModalProps {
  problem: Problem;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProblemDetailModal({
  problem,
  onClose,
  onEdit,
  onDelete,
}: ProblemDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{problem.title}</h2>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 rounded-full text-sm font-medium">
                  {problem.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  problem.difficulty === 'Easy'
                    ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                    : problem.difficulty === 'Medium'
                    ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl text-muted-foreground hover:text-foreground smooth-transition"
            >
              ✕
            </button>
          </div>

          {problem.imageUrl && (
            <div className="relative h-80 rounded-xl overflow-hidden">
              <img
                src={problem.imageUrl || "/placeholder.svg"}
                alt={problem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Notes & Explanation</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{problem.notes}</p>
            </div>

            {problem.code && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Code Solution</h3>
                <pre className="code-block">
                  <code>{problem.code}</code>
                </pre>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t border-white/10">
            <button
              onClick={onEdit}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium smooth-transition"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this problem?')) {
                  onDelete();
                  onClose();
                }
              }}
              className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 rounded-lg font-medium smooth-transition border border-red-200 dark:border-red-800"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 glass hover:bg-white/40 dark:hover:bg-white/10 text-foreground rounded-lg font-medium smooth-transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

