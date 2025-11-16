'use client';

export default function Header({ onAddClick }: { onAddClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/50 dark:bg-black/30 border-b border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              ⟨/⟩
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Coding Memo Decks
            </h1>
          </div>

          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium smooth-transition shadow-lg"
            style={{
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            }}
          >
            + Add Problem
          </button>
        </div>
      </div>
    </header>
  );
}

