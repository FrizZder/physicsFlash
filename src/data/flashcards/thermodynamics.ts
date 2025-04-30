import { FlashCard, PhysicsSection, DifficultyLevel } from '../../types';

export const thermodynamicsFlashcards: FlashCard[] = [
  // Теплота и температура
  {
    id: 'thermo-heat-1',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'heat',
    question: 'Что такое температура с точки зрения молекулярно-кинетической теории?',
    answer: 'Температура — физическая величина, характеризующая средний уровень кинетической энергии теплового движения частиц тела.',
    formula: 'E_\\text{к} = \\frac{3}{2} kT',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['температура', 'молекулярная физика', 'кинетическая энергия']
  },
  {
    id: 'thermo-heat-2',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'heat',
    question: 'Как связаны шкалы Цельсия и Кельвина?',
    answer: 'Шкала Кельвина — абсолютная шкала температур. Температура по Кельвину равна температуре по Цельсию плюс 273.15.',
    formula: 'T(K) = t(°C) + 273.15',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['температура', 'шкалы температур', 'абсолютный нуль']
  },
  {
    id: 'thermo-heat-3',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'heat',
    question: 'Что такое количество теплоты?',
    answer: 'Количество теплоты — физическая величина, характеризующая энергию, которую получает или отдает тело в процессе теплообмена без совершения работы.',
    formula: 'Q = cm(t_2 - t_1)',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['теплота', 'теплообмен', 'теплоемкость']
  },

  // Газовые законы
  {
    id: 'thermo-gas-1',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'gas-laws',
    question: 'Закон Бойля-Мариотта',
    answer: 'При постоянной температуре и неизменной массе идеального газа произведение давления газа на его объем постоянно.',
    formula: 'pV = \\text{const} \\quad (m, T = \\text{const})',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['газовые законы', 'идеальный газ', 'изотермический процесс']
  },
  {
    id: 'thermo-gas-2',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'gas-laws',
    question: 'Закон Гей-Люссака',
    answer: 'При постоянном давлении и неизменной массе идеального газа объем газа прямо пропорционален абсолютной температуре.',
    formula: '\\frac{V}{T} = \\text{const} \\quad (p, m = \\text{const})',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['газовые законы', 'идеальный газ', 'изобарный процесс']
  },
  {
    id: 'thermo-gas-3',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'gas-laws',
    question: 'Закон Шарля',
    answer: 'При постоянном объеме и неизменной массе идеального газа давление газа прямо пропорционально абсолютной температуре.',
    formula: '\\frac{p}{T} = \\text{const} \\quad (V, m = \\text{const})',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['газовые законы', 'идеальный газ', 'изохорный процесс']
  },
  {
    id: 'thermo-gas-4',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'gas-laws',
    question: 'Уравнение состояния идеального газа (уравнение Менделеева-Клапейрона)',
    answer: 'Уравнение, связывающее давление, объем, массу и температуру идеального газа.',
    formula: 'pV = \\frac{m}{M}RT',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['газовые законы', 'идеальный газ', 'уравнение состояния']
  },

  // Начала термодинамики
  {
    id: 'thermo-laws-1',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'thermo-laws',
    question: 'Первое начало термодинамики',
    answer: 'Количество теплоты, сообщенное системе, идет на изменение внутренней энергии системы и на совершение системой работы против внешних сил.',
    formula: 'Q = \\Delta U + A',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['термодинамика', 'первое начало', 'внутренняя энергия', 'работа']
  },
  {
    id: 'thermo-laws-2',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'thermo-laws',
    question: 'Второе начало термодинамики (формулировка Клаузиуса)',
    answer: 'Невозможен процесс, единственным результатом которого является передача теплоты от более холодного тела к более горячему.',
    formula: '\\Delta S \\geq 0',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['термодинамика', 'второе начало', 'энтропия', 'необратимость']
  },
  {
    id: 'thermo-laws-3',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'thermo-laws',
    question: 'КПД тепловой машины',
    answer: 'Коэффициент полезного действия тепловой машины равен отношению работы, совершенной машиной, к количеству теплоты, полученному от нагревателя.',
    formula: '\\eta = \\frac{A}{Q_1} = \\frac{Q_1 - Q_2}{Q_1} = 1 - \\frac{Q_2}{Q_1}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['термодинамика', 'КПД', 'тепловая машина', 'цикл Карно']
  },

  // Фазовые переходы
  {
    id: 'thermo-phase-1',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'phase-transitions',
    question: 'Что такое удельная теплота плавления?',
    answer: 'Удельная теплота плавления — физическая величина, равная количеству теплоты, которое необходимо сообщить единице массы вещества, чтобы при температуре плавления перевести его из твердого состояния в жидкое.',
    formula: 'Q = \\lambda m',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['фазовые переходы', 'плавление', 'кристаллизация']
  },
  {
    id: 'thermo-phase-2',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'phase-transitions',
    question: 'Что такое удельная теплота парообразования?',
    answer: 'Удельная теплота парообразования — физическая величина, равная количеству теплоты, которое необходимо сообщить единице массы жидкости, чтобы при температуре кипения перевести её в газообразное состояние.',
    formula: 'Q = Lm',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['фазовые переходы', 'испарение', 'кипение', 'конденсация']
  },

  // Энтропия и статистическая физика
  {
    id: 'thermo-entropy-1',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'entropy',
    question: 'Что такое энтропия в термодинамике?',
    answer: 'Энтропия — функция состояния термодинамической системы, изменение которой равно отношению количества теплоты, переданного системе, к температуре системы. Является мерой необратимого рассеяния энергии.',
    formula: '\\Delta S = \\int \\frac{\\delta Q}{T}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['термодинамика', 'энтропия', 'необратимость']
  },
  {
    id: 'thermo-entropy-2',
    section: PhysicsSection.THERMODYNAMICS,
    subcategory: 'entropy',
    question: 'Статистическое определение энтропии по Больцману',
    answer: 'Энтропия системы пропорциональна логарифму числа микросостояний, которыми может быть реализовано данное макросостояние системы.',
    formula: 'S = k \\ln W',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['статистическая физика', 'энтропия', 'микросостояния', 'Больцман']
  }
]; 