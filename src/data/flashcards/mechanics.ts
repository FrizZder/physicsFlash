import { FlashCard, PhysicsSection, DifficultyLevel } from '../../types';

export const mechanicsFlashcards: FlashCard[] = [
  // Кинематика
  {
    id: 'mechanics-kinematics-1',
    section: PhysicsSection.MECHANICS,
    subcategory: 'kinematics',
    question: 'Что такое мгновенная скорость?',
    answer: 'Мгновенная скорость — векторная физическая величина, характеризующая быстроту перемещения и направление движения тела в данный момент времени.',
    formula: '\\vec{v} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta \\vec{r}}{\\Delta t} = \\frac{d\\vec{r}}{dt}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['кинематика', 'скорость', 'производная']
  },
  {
    id: 'mechanics-kinematics-2',
    section: PhysicsSection.MECHANICS,
    subcategory: 'kinematics',
    question: 'Запишите формулу для расчета пути при равноускоренном движении.',
    answer: 'При равноускоренном движении путь рассчитывается по формуле:',
    formula: 's = v_0 t + \\frac{a t^2}{2}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['кинематика', 'равноускоренное движение', 'путь']
  },
  {
    id: 'mechanics-kinematics-3',
    section: PhysicsSection.MECHANICS,
    subcategory: 'kinematics',
    question: 'Что такое центростремительное ускорение?',
    answer: 'Центростремительное ускорение — ускорение, направленное к центру окружности при движении тела по окружности. Характеризует изменение направления вектора скорости.',
    formula: 'a_\\text{ц} = \\frac{v^2}{R} = \\omega^2 R',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['кинематика', 'криволинейное движение', 'ускорение']
  },

  // Динамика
  {
    id: 'mechanics-dynamics-1',
    section: PhysicsSection.MECHANICS,
    subcategory: 'dynamics',
    question: 'Сформулируйте второй закон Ньютона.',
    answer: 'Второй закон Ньютона: ускорение, приобретаемое материальной точкой, прямо пропорционально равнодействующей всех сил, приложенных к точке, и обратно пропорционально массе точки.',
    formula: '\\vec{F} = m \\vec{a} \\quad \\text{или} \\quad \\vec{a} = \\frac{\\vec{F}}{m}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['динамика', 'законы Ньютона', 'сила', 'ускорение']
  },
  {
    id: 'mechanics-dynamics-2',
    section: PhysicsSection.MECHANICS,
    subcategory: 'dynamics',
    question: 'Что такое импульс тела?',
    answer: 'Импульс тела (количество движения) — векторная физическая величина, равная произведению массы тела на его скорость и характеризующая меру механического движения тела.',
    formula: '\\vec{p} = m \\vec{v}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['динамика', 'импульс', 'количество движения']
  },
  {
    id: 'mechanics-dynamics-3',
    section: PhysicsSection.MECHANICS,
    subcategory: 'dynamics',
    question: 'Закон сохранения импульса',
    answer: 'В замкнутой системе тел векторная сумма импульсов всех тел, входящих в систему, остается постоянной при любых взаимодействиях тел этой системы между собой.',
    formula: '\\vec{p}_1 + \\vec{p}_2 + ... + \\vec{p}_n = \\text{const}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['динамика', 'импульс', 'законы сохранения']
  },

  // Статика
  {
    id: 'mechanics-statics-1',
    section: PhysicsSection.MECHANICS,
    subcategory: 'statics',
    question: 'Условия равновесия твердого тела',
    answer: 'Для равновесия твердого тела необходимо и достаточно, чтобы равнодействующая всех сил, приложенных к телу, и результирующий момент сил относительно любой оси равнялись нулю.',
    formula: '\\sum \\vec{F}_i = 0, \\quad \\sum \\vec{M}_i = 0',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['статика', 'равновесие', 'момент силы']
  },
  {
    id: 'mechanics-statics-2',
    section: PhysicsSection.MECHANICS,
    subcategory: 'statics',
    question: 'Что такое момент силы?',
    answer: 'Момент силы относительно оси — физическая величина, равная произведению силы на плечо и характеризующая вращательное действие силы на тело.',
    formula: 'M = F \\cdot d',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['статика', 'момент силы', 'вращение']
  },

  // Гидро- и аэромеханика
  {
    id: 'mechanics-fluid-1',
    section: PhysicsSection.MECHANICS,
    subcategory: 'fluid-mechanics',
    question: 'Закон Архимеда',
    answer: 'На тело, погруженное в жидкость (или газ), действует выталкивающая сила, равная весу жидкости (или газа), вытесненной телом.',
    formula: 'F_A = \\rho g V',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['гидростатика', 'закон Архимеда', 'плавание тел']
  },
  {
    id: 'mechanics-fluid-2',
    section: PhysicsSection.MECHANICS,
    subcategory: 'fluid-mechanics',
    question: 'Уравнение Бернулли',
    answer: 'Для стационарного течения идеальной жидкости сумма статического давления, динамического давления и потенциальной энергии единицы объема жидкости остается постоянной вдоль линии тока.',
    formula: 'p + \\rho g h + \\frac{\\rho v^2}{2} = \\text{const}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['гидродинамика', 'уравнение Бернулли', 'течение жидкости']
  },

  // Колебания
  {
    id: 'mechanics-oscillation-1',
    section: PhysicsSection.MECHANICS,
    subcategory: 'oscillation',
    question: 'Уравнение гармонических колебаний',
    answer: 'Гармонические колебания описываются уравнением, где x — смещение от положения равновесия, A — амплитуда, ω — циклическая частота, φ — начальная фаза.',
    formula: 'x = A \\sin(\\omega t + \\varphi)',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['колебания', 'гармонические колебания', 'амплитуда']
  },
  {
    id: 'mechanics-oscillation-2',
    section: PhysicsSection.MECHANICS,
    subcategory: 'oscillation',
    question: 'Период колебаний математического маятника',
    answer: 'Период колебаний математического маятника зависит от длины маятника и ускорения свободного падения.',
    formula: 'T = 2\\pi \\sqrt{\\frac{l}{g}}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['колебания', 'математический маятник', 'период']
  },

  // Волны
  {
    id: 'mechanics-waves-1',
    section: PhysicsSection.MECHANICS,
    subcategory: 'waves',
    question: 'Уравнение бегущей волны',
    answer: 'Уравнение плоской бегущей волны, где y — смещение точек среды, A — амплитуда, ω — циклическая частота, k — волновое число, x — координата, t — время.',
    formula: 'y = A \\sin(\\omega t - kx)',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['волны', 'бегущая волна', 'амплитуда']
  },
  {
    id: 'mechanics-waves-2',
    section: PhysicsSection.MECHANICS,
    subcategory: 'waves',
    question: 'Связь длины волны с частотой и скоростью',
    answer: 'Длина волны связана с частотой и скоростью распространения волны соотношением:',
    formula: '\\lambda = \\frac{v}{\\nu} = \\frac{2\\pi v}{\\omega}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['волны', 'длина волны', 'частота', 'скорость волны']
  }
]; 