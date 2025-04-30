import { FlashCard, PhysicsSection } from '../types';
import { 
  allFlashcards, 
  mechanicsFlashcards, 
  thermodynamicsFlashcards, 
  electrodynamicsFlashcards, 
  opticsFlashcards, 
  quantumFlashcards, 
  astronomyFlashcards 
} from '../data/flashcards/index';

// Функция для получения всех карточек
export const getAllCards = (): FlashCard[] => {
  return allFlashcards;
};

// Функция для получения карточек по разделу
export const getCardsBySection = (section: PhysicsSection): FlashCard[] => {
  switch (section) {
    case PhysicsSection.MECHANICS:
      return mechanicsFlashcards;
    case PhysicsSection.THERMODYNAMICS:
      return thermodynamicsFlashcards;
    case PhysicsSection.ELECTRODYNAMICS:
      return electrodynamicsFlashcards;
    case PhysicsSection.OPTICS:
      return opticsFlashcards;
    case PhysicsSection.QUANTUM:
      return quantumFlashcards;
    case PhysicsSection.ASTRONOMY:
      return astronomyFlashcards;
    default:
      return allFlashcards;
  }
};

// Функция для получения карточек по подкатегории
export const getCardsBySubcategory = (subcategoryId: string): FlashCard[] => {
  return allFlashcards.filter(card => card.subcategory === subcategoryId);
};

// Функция для получения карточек по тегам
export const getCardsByTags = (tags: string[]): FlashCard[] => {
  return allFlashcards.filter(card => 
    tags.some(tag => card.tags?.includes(tag))
  );
};

// Функция для поиска карточек
export const searchCards = (query: string): FlashCard[] => {
  const lowerQuery = query.toLowerCase();
  return allFlashcards.filter(
    card => 
      card.question.toLowerCase().includes(lowerQuery) || 
      card.answer.toLowerCase().includes(lowerQuery) ||
      card.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}; 