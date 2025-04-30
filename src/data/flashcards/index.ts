import { mechanicsFlashcards } from './mechanics';
import { thermodynamicsFlashcards } from './thermodynamics';
import { electrodynamicsFlashcards } from './electrodynamics';
import { opticsFlashcards } from './optics';
import { quantumFlashcards } from './quantum';
import { astronomyFlashcards } from './astronomy';
import { simulationCards } from '../simulationCards';
import { FlashCard } from '../../types';

// Объединяем все карточки в один массив
export const allFlashcards: FlashCard[] = [
  ...mechanicsFlashcards,
  ...thermodynamicsFlashcards,
  ...electrodynamicsFlashcards,
  ...opticsFlashcards,
  ...quantumFlashcards,
  ...astronomyFlashcards,
  ...simulationCards
];

// Экспортируем каждый раздел отдельно для возможности его фильтрации
export {
  mechanicsFlashcards,
  thermodynamicsFlashcards,
  electrodynamicsFlashcards,
  opticsFlashcards,
  quantumFlashcards,
  astronomyFlashcards,
  simulationCards
}; 