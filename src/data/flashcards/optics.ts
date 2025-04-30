import { FlashCard, PhysicsSection, DifficultyLevel } from '../../types';

export const opticsFlashcards: FlashCard[] = [
  // Геометрическая оптика
  {
    id: 'optics-geometric-1',
    section: PhysicsSection.OPTICS,
    subcategory: 'geometric-optics',
    question: 'Закон прямолинейного распространения света',
    answer: 'В однородной среде свет распространяется прямолинейно.',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['геометрическая оптика', 'распространение света']
  },
  {
    id: 'optics-geometric-2',
    section: PhysicsSection.OPTICS,
    subcategory: 'geometric-optics',
    question: 'Закон отражения света',
    answer: 'Угол падения равен углу отражения, причем падающий луч, отраженный луч и перпендикуляр к границе раздела двух сред, восстановленный в точке падения луча, лежат в одной плоскости.',
    formula: '\\alpha = \\beta',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['геометрическая оптика', 'отражение света']
  },
  {
    id: 'optics-geometric-3',
    section: PhysicsSection.OPTICS,
    subcategory: 'geometric-optics',
    question: 'Закон преломления света (закон Снеллиуса)',
    answer: 'Отношение синуса угла падения к синусу угла преломления равно отношению показателей преломления сред, на границе которых происходит преломление.',
    formula: '\\frac{\\sin \\alpha}{\\sin \\gamma} = \\frac{n_2}{n_1}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['геометрическая оптика', 'преломление света', 'закон Снеллиуса']
  },
  {
    id: 'optics-geometric-4',
    section: PhysicsSection.OPTICS,
    subcategory: 'geometric-optics',
    question: 'Формула тонкой линзы',
    answer: 'Формула, связывающая фокусное расстояние линзы, расстояние от предмета до линзы и расстояние от линзы до изображения.',
    formula: '\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['геометрическая оптика', 'линзы', 'изображение']
  },
  {
    id: 'optics-geometric-5',
    section: PhysicsSection.OPTICS,
    subcategory: 'geometric-optics',
    question: 'Увеличение линзы',
    answer: 'Отношение размера изображения к размеру предмета равно отношению расстояния от линзы до изображения к расстоянию от предмета до линзы.',
    formula: '\\Gamma = \\frac{H\'}{H} = \\frac{f}{d}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['геометрическая оптика', 'линзы', 'увеличение']
  },

  // Волновая оптика
  {
    id: 'optics-wave-1',
    section: PhysicsSection.OPTICS,
    subcategory: 'wave-optics',
    question: 'Принцип Гюйгенса',
    answer: 'Каждая точка среды, до которой дошло возмущение, становится источником вторичных волн. Поверхность, огибающая эти вторичные волны, дает положение волнового фронта в следующий момент времени.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['волновая оптика', 'принцип Гюйгенса', 'волновой фронт']
  },
  {
    id: 'optics-wave-2',
    section: PhysicsSection.OPTICS,
    subcategory: 'wave-optics',
    question: 'Волновое уравнение',
    answer: 'Уравнение в частных производных, описывающее распространение волн.',
    formula: '\\frac{\\partial^2 E}{\\partial x^2} = \\frac{1}{v^2} \\frac{\\partial^2 E}{\\partial t^2}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['волновая оптика', 'волновое уравнение', 'распространение волн']
  },

  // Интерференция
  {
    id: 'optics-interference-1',
    section: PhysicsSection.OPTICS,
    subcategory: 'interference',
    question: 'Интерференция света',
    answer: 'Интерференция света — перераспределение интенсивности света в результате наложения когерентных световых волн. В точках, где волны усиливают друг друга, наблюдаются максимумы интенсивности, а в точках, где волны гасят друг друга, — минимумы.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['интерференция', 'когерентность', 'суперпозиция волн']
  },
  {
    id: 'optics-interference-2',
    section: PhysicsSection.OPTICS,
    subcategory: 'interference',
    question: 'Условие максимума интерференции',
    answer: 'Условие, при котором в данной точке наблюдается максимум интенсивности при интерференции двух волн.',
    formula: '\\Delta d = k\\lambda, \\quad k = 0, 1, 2, ...',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['интерференция', 'максимум интерференции', 'разность хода']
  },
  {
    id: 'optics-interference-3',
    section: PhysicsSection.OPTICS,
    subcategory: 'interference',
    question: 'Условие минимума интерференции',
    answer: 'Условие, при котором в данной точке наблюдается минимум интенсивности при интерференции двух волн.',
    formula: '\\Delta d = (k + \\frac{1}{2})\\lambda, \\quad k = 0, 1, 2, ...',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['интерференция', 'минимум интерференции', 'разность хода']
  },

  // Дифракция
  {
    id: 'optics-diffraction-1',
    section: PhysicsSection.OPTICS,
    subcategory: 'diffraction',
    question: 'Дифракция света',
    answer: 'Дифракция света — огибание светом препятствий и отклонение от прямолинейного распространения. Объясняется волновой природой света.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['дифракция', 'огибание волнами', 'принцип Гюйгенса-Френеля']
  },
  {
    id: 'optics-diffraction-2',
    section: PhysicsSection.OPTICS,
    subcategory: 'diffraction',
    question: 'Дифракционная решетка',
    answer: 'Дифракционная решетка — оптический прибор, представляющий собой периодическую структуру из большого числа регулярно расположенных штрихов (щелей), вызывающих дифракцию света.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['дифракция', 'дифракционная решетка', 'спектр']
  },
  {
    id: 'optics-diffraction-3',
    section: PhysicsSection.OPTICS,
    subcategory: 'diffraction',
    question: 'Условие главных максимумов дифракционной решетки',
    answer: 'Условие, определяющее направления, в которых при дифракции на решетке наблюдаются главные максимумы интенсивности.',
    formula: 'd \\sin \\varphi = k\\lambda, \\quad k = 0, \\pm 1, \\pm 2, ...',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['дифракция', 'дифракционная решетка', 'главные максимумы']
  },

  // Поляризация
  {
    id: 'optics-polarization-1',
    section: PhysicsSection.OPTICS,
    subcategory: 'polarization',
    question: 'Поляризация света',
    answer: 'Поляризация света — выделение световых колебаний, происходящих в одной определенной плоскости. Подтверждает поперечность световых волн.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['поляризация', 'поперечные волны', 'плоскость поляризации']
  },
  {
    id: 'optics-polarization-2',
    section: PhysicsSection.OPTICS,
    subcategory: 'polarization',
    question: 'Закон Малюса',
    answer: 'Закон, определяющий зависимость интенсивности света, прошедшего через два поляризатора, от угла между их плоскостями поляризации.',
    formula: 'I = I_0 \\cos^2 \\varphi',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['поляризация', 'закон Малюса', 'поляризаторы']
  },
  {
    id: 'optics-polarization-3',
    section: PhysicsSection.OPTICS,
    subcategory: 'polarization',
    question: 'Угол Брюстера',
    answer: 'Угол падения, при котором отраженный луч полностью поляризован в плоскости, перпендикулярной плоскости падения.',
    formula: '\\tg \\varphi_B = \\frac{n_2}{n_1}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['поляризация', 'угол Брюстера', 'отражение']
  }
]; 