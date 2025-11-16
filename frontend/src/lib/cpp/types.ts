export const CATEGORIES = [
  'Binary Search',
  'Dynamic Programming',
  'Graphs',
  'Arrays',
  'Strings',
  'Trees',
  'Sorting',
  'Other',
];

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  notes: string;
  code: string;
  imageUrl?: string;
}

