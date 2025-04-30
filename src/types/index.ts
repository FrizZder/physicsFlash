// Типы данных для проекта PhysicsFlash
import { SimulationType } from '../components/Simulation/PhysicsSimulation';

// Перечисление разделов физики
export enum PhysicsSection {
  MECHANICS = 'Механика',
  THERMODYNAMICS = 'Термодинамика',
  ELECTRODYNAMICS = 'Электродинамика',
  OPTICS = 'Оптика',
  QUANTUM = 'Квантовая физика',
  ASTRONOMY = 'Астрономия'
}

// Уровень сложности карточки
export enum DifficultyLevel {
  BEGINNER = 'Начальный',
  INTERMEDIATE = 'Средний',
  ADVANCED = 'Продвинутый'
}

// Подкатегории для разделов физики
export interface SubCategory {
  id: string;
  name: string;
  section: PhysicsSection;
  description: string;
}

// Модель тега
export interface Tag {
  id: string;
  name: string;
  count: number; // Для отображения популярности
}

// Тип для карточки
export interface FlashCard {
  id: string;
  section: PhysicsSection;
  subcategory?: string; // ID подкатегории
  question: string;
  answer: string;
  formula?: string; // Формула в формате LaTeX
  latexFormula?: boolean; // Флаг, указывающий на использование LaTeX
  difficulty: DifficultyLevel;
  tags: string[];
  imageUrl?: string; // URL изображения для карточки
  videoUrl?: string; // URL видео для визуализации
  simulationType?: SimulationType; // Тип физической симуляции
  simulationParameters?: Record<string, any>; // Параметры для настройки симуляции
  isUserCreated?: boolean; // Флаг, указывающий на создание карточки пользователем
  createdAt?: Date; // Дата создания
  updatedAt?: Date; // Дата обновления
}

// Режимы изучения
export enum StudyMode {
  LEARNING = 'Обучение',
  TESTING = 'Тестирование',
  GAME = 'Игра',
  SPACED_REPETITION = 'Интервальное повторение' // Новый режим
}

// Статистика пользователя
export interface UserStats {
  cardsStudied: number;
  correctAnswers: number;
  totalTime: number;
  favoriteCards: string[]; // ID избранных карточек
  lastSection?: PhysicsSection;
  // Новые поля
  lastStudied?: Date;
  studyStreak?: number; // Серия дней изучения
  masteredCards?: string[]; // ID освоенных карточек
  cardProgress?: Record<string, CardProgress>; // Прогресс по каждой карточке
}

// Прогресс изучения карточки
export interface CardProgress {
  correctCount: number;
  incorrectCount: number;
  lastReviewed?: Date;
  nextReviewDate?: Date; // Для интервального повторения
  easeFactor?: number; // Множитель для интервального повторения
  interval?: number; // Интервал для повторения в днях
} 