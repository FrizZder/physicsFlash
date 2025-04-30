import { PhysicsSection, FlashCard } from '../types';

// Интерфейс для данных о прогрессе
export interface CardProgress {
  id: string;
  viewed: boolean;
  mastered: boolean;
  lastViewed: number | null; // timestamp
  viewCount: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

// Интерфейс для общего прогресса пользователя
export interface UserProgress {
  cards: Record<string, CardProgress>; // ключ - id карточки
  sectionCompletionPercentage: Record<PhysicsSection, number>;
  totalCards: number;
  totalMastered: number;
  lastStudySession: number | null; // timestamp
  studyStreak: number; // кол-во дней подряд с занятиями
}

// Ключ для хранения в localStorage
const PROGRESS_STORAGE_KEY = 'physicsflash_user_progress';

// Инициализация пустого прогресса
const initializeEmptyProgress = (): UserProgress => ({
  cards: {},
  sectionCompletionPercentage: {
    [PhysicsSection.MECHANICS]: 0,
    [PhysicsSection.THERMODYNAMICS]: 0,
    [PhysicsSection.ELECTRODYNAMICS]: 0,
    [PhysicsSection.OPTICS]: 0,
    [PhysicsSection.QUANTUM]: 0,
    [PhysicsSection.ASTRONOMY]: 0,
  },
  totalCards: 0,
  totalMastered: 0,
  lastStudySession: null,
  studyStreak: 0
});

// Загрузка прогресса из localStorage
export const loadUserProgress = (): UserProgress => {
  const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!storedProgress) {
    return initializeEmptyProgress();
  }
  
  try {
    return JSON.parse(storedProgress);
  } catch (e) {
    console.error('Failed to parse stored progress', e);
    return initializeEmptyProgress();
  }
};

// Сохранение прогресса в localStorage
export const saveUserProgress = (progress: UserProgress): void => {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
};

// Обновление прогресса для одной карточки
export const updateCardProgress = (cardId: string, update: Partial<CardProgress>): void => {
  const progress = loadUserProgress();
  
  // Если карточка еще не отслеживается, создаем для нее запись
  if (!progress.cards[cardId]) {
    progress.cards[cardId] = {
      id: cardId,
      viewed: false,
      mastered: false,
      lastViewed: null,
      viewCount: 0,
      correctAnswers: 0,
      incorrectAnswers: 0
    };
  }
  
  // Обновляем запись
  progress.cards[cardId] = {
    ...progress.cards[cardId],
    ...update
  };
  
  // Обновляем общую статистику
  recalculateProgressStatistics(progress);
  
  // Сохраняем обновленный прогресс
  saveUserProgress(progress);
};

// Отметка карточки как просмотренной
export const markCardAsViewed = (cardId: string, cardSection: PhysicsSection): void => {
  const now = Date.now();
  
  updateCardProgress(cardId, {
    viewed: true,
    lastViewed: now,
    viewCount: (loadUserProgress().cards[cardId]?.viewCount || 0) + 1
  });
  
  // Обновляем время последней учебной сессии и счетчик дней
  updateStudyStreak(now);
};

// Отметка ответа пользователя (верно/неверно)
export const recordAnswer = (cardId: string, isCorrect: boolean): void => {
  const progress = loadUserProgress();
  const cardProgress = progress.cards[cardId] || { 
    id: cardId, 
    viewed: true, 
    mastered: false, 
    lastViewed: Date.now(),
    viewCount: 1,
    correctAnswers: 0,
    incorrectAnswers: 0
  };
  
  if (isCorrect) {
    cardProgress.correctAnswers += 1;
    
    // Если пользователь правильно ответил 3 раза подряд, отмечаем карточку как освоенную
    if (cardProgress.correctAnswers >= 3 && 
        cardProgress.correctAnswers > cardProgress.incorrectAnswers * 2) {
      cardProgress.mastered = true;
    }
  } else {
    cardProgress.incorrectAnswers += 1;
    
    // Если пользователь ошибся, сбрасываем статус "освоенной" карточки
    cardProgress.mastered = false;
  }
  
  progress.cards[cardId] = cardProgress;
  recalculateProgressStatistics(progress);
  saveUserProgress(progress);
};

// Обновление статистики учебных сессий и дней подряд
export const updateStudyStreak = (timestamp: number = Date.now()): void => {
  const progress = loadUserProgress();
  const lastSession = progress.lastStudySession;
  
  // Устанавливаем время последней сессии
  progress.lastStudySession = timestamp;
  
  if (!lastSession) {
    // Первая сессия
    progress.studyStreak = 1;
  } else {
    // Проверяем, была ли последняя сессия вчера или сегодня
    const lastSessionDate = new Date(lastSession);
    const currentDate = new Date(timestamp);
    
    const lastSessionDay = lastSessionDate.getDate();
    const currentDay = currentDate.getDate();
    const lastSessionMonth = lastSessionDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const lastSessionYear = lastSessionDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    
    // Если сессия была вчера, увеличиваем счетчик
    if (
      (currentDay - lastSessionDay === 1 && currentMonth === lastSessionMonth && currentYear === lastSessionYear) ||
      (currentDay === 1 && lastSessionDay >= 28 && currentMonth - lastSessionMonth === 1 && currentYear === lastSessionYear) ||
      (currentDay === 1 && lastSessionDay >= 28 && currentMonth === 0 && lastSessionMonth === 11 && currentYear - lastSessionYear === 1)
    ) {
      progress.studyStreak += 1;
    }
    // Если сессия была сегодня, счетчик не меняем
    else if (
      currentDay === lastSessionDay && 
      currentMonth === lastSessionMonth && 
      currentYear === lastSessionYear
    ) {
      // Ничего не делаем, счетчик остается прежним
    }
    // Иначе сбрасываем счетчик
    else {
      progress.studyStreak = 1;
    }
  }
  
  saveUserProgress(progress);
};

// Получение прогресса по разделу
export const getSectionProgress = (section: PhysicsSection): number => {
  return loadUserProgress().sectionCompletionPercentage[section] || 0;
};

// Получение общего прогресса
export const getOverallProgress = (): number => {
  const progress = loadUserProgress();
  if (progress.totalCards === 0) return 0;
  return Math.round((progress.totalMastered / progress.totalCards) * 100);
};

// Перерасчет статистики на основе прогресса по карточкам
export const recalculateProgressStatistics = (progress: UserProgress): void => {
  // Подсчет освоенных карточек по разделам
  const sectionCounts: Record<PhysicsSection, { mastered: number, total: number }> = {
    [PhysicsSection.MECHANICS]: { mastered: 0, total: 0 },
    [PhysicsSection.THERMODYNAMICS]: { mastered: 0, total: 0 },
    [PhysicsSection.ELECTRODYNAMICS]: { mastered: 0, total: 0 },
    [PhysicsSection.OPTICS]: { mastered: 0, total: 0 },
    [PhysicsSection.QUANTUM]: { mastered: 0, total: 0 },
    [PhysicsSection.ASTRONOMY]: { mastered: 0, total: 0 },
  };
  
  // Импортируем необходимые данные для расчета
  const { allFlashcards } = require('../data/flashcards/index');
  
  // Создание списка всех карточек с их разделами
  allFlashcards.forEach((card: FlashCard) => {
    const section = card.section as PhysicsSection;
    sectionCounts[section].total += 1;
    
    // Если карточка отмечена как освоенная, учитываем ее
    if (progress.cards[card.id]?.mastered) {
      sectionCounts[section].mastered += 1;
    }
  });
  
  // Обновляем проценты выполнения для каждого раздела
  Object.keys(sectionCounts).forEach(sectionKey => {
    const section = sectionKey as PhysicsSection;
    const { mastered, total } = sectionCounts[section];
    progress.sectionCompletionPercentage[section] = total > 0 
      ? Math.round((mastered / total) * 100) 
      : 0;
  });
  
  // Обновляем общую статистику
  progress.totalCards = allFlashcards.length;
  progress.totalMastered = Object.values(progress.cards)
    .filter(card => card.mastered)
    .length;
};

// Сброс прогресса пользователя
export const resetUserProgress = (): void => {
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
}; 