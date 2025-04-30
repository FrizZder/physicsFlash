import { FlashCard, PhysicsSection, DifficultyLevel } from '../../types';

export const quantumFlashcards: FlashCard[] = [
  // Основы квантовой механики
  {
    id: 'quantum-basics-1',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-basics',
    question: 'Корпускулярно-волновой дуализм',
    answer: 'Принцип, согласно которому любая частица материи (например, электрон) проявляет как свойства частицы, так и свойства волны.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['квантовая механика', 'дуализм', 'микрочастицы']
  },
  {
    id: 'quantum-basics-2',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-basics',
    question: 'Волны де Бройля',
    answer: 'Волны, связанные с движением любой частицы, обладающей массой. Длина волны де Бройля связана с импульсом частицы.',
    formula: '\\lambda = \\frac{h}{p} = \\frac{h}{mv}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['квантовая механика', 'волны де Бройля', 'длина волны']
  },
  {
    id: 'quantum-basics-3',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-basics',
    question: 'Соотношение неопределенностей Гейзенберга',
    answer: 'Принцип, согласно которому невозможно одновременно с высокой точностью определить значения двух канонически сопряженных величин (например, координаты и импульса).',
    formula: '\\Delta x \\cdot \\Delta p_x \\geq \\frac{\\hbar}{2}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['квантовая механика', 'неопределенность', 'Гейзенберг']
  },
  {
    id: 'quantum-basics-4',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-basics',
    question: 'Волновая функция',
    answer: 'Функция, описывающая квантовое состояние системы и позволяющая определить вероятность обнаружения частицы в заданной точке пространства.',
    formula: 'P(x) = |\\Psi(x)|^2',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['квантовая механика', 'волновая функция', 'вероятность']
  },
  {
    id: 'quantum-basics-5',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-basics',
    question: 'Уравнение Шрёдингера',
    answer: 'Основное уравнение нерелятивистской квантовой механики, описывающее изменение состояния квантовой системы со временем.',
    formula: 'i\\hbar\\frac{\\partial\\Psi}{\\partial t} = \\hat{H}\\Psi',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['квантовая механика', 'уравнение Шрёдингера', 'волновая функция']
  },

  // Атомная физика
  {
    id: 'quantum-atoms-1',
    section: PhysicsSection.QUANTUM,
    subcategory: 'atoms',
    question: 'Постулаты Бора',
    answer: 'Система постулатов, описывающая поведение электронов в атоме. Основные положения: 1) электроны движутся по стационарным орбитам без излучения; 2) при переходе с одной орбиты на другую атом излучает или поглощает квант энергии.',
    formula: 'E_n - E_m = h\\nu',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['атомная физика', 'постулаты Бора', 'модель атома']
  },
  {
    id: 'quantum-atoms-2',
    section: PhysicsSection.QUANTUM,
    subcategory: 'atoms',
    question: 'Энергетические уровни атома водорода',
    answer: 'Дискретные значения энергии, которые может иметь электрон в атоме водорода согласно квантовой механике.',
    formula: 'E_n = -\\frac{13.6 \\text{ эВ}}{n^2}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['атомная физика', 'энергетические уровни', 'атом водорода']
  },
  {
    id: 'quantum-atoms-3',
    section: PhysicsSection.QUANTUM,
    subcategory: 'atoms',
    question: 'Спин электрона',
    answer: 'Собственный момент импульса электрона, не связанный с движением в пространстве. Спин электрона может принимать только два значения: +1/2 и -1/2.',
    formula: 's = \\frac{1}{2}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['атомная физика', 'спин', 'электрон', 'квантовое число']
  },

  // Ядерная физика
  {
    id: 'quantum-nuclear-1',
    section: PhysicsSection.QUANTUM,
    subcategory: 'nuclear',
    question: 'Состав атомного ядра',
    answer: 'Атомное ядро состоит из протонов и нейтронов (общее название — нуклоны). Число протонов определяет заряд ядра и химический элемент, число нейтронов определяет изотоп элемента.',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['ядерная физика', 'строение ядра', 'нуклоны']
  },
  {
    id: 'quantum-nuclear-2',
    section: PhysicsSection.QUANTUM,
    subcategory: 'nuclear',
    question: 'Дефект массы и энергия связи ядра',
    answer: 'Дефект массы — разница между суммой масс свободных нуклонов и массой ядра. Энергия связи — энергия, необходимая для расщепления ядра на отдельные нуклоны.',
    formula: '\\Delta m = Zm_p + Nm_n - M_{яд}, \\quad E_{св} = \\Delta m c^2',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['ядерная физика', 'дефект массы', 'энергия связи']
  },
  {
    id: 'quantum-nuclear-3',
    section: PhysicsSection.QUANTUM,
    subcategory: 'nuclear',
    question: 'Закон радиоактивного распада',
    answer: 'Закон, описывающий уменьшение со временем числа нераспавшихся ядер радиоактивного изотопа.',
    formula: 'N(t) = N_0 e^{-\\lambda t}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['ядерная физика', 'радиоактивность', 'распад']
  },
  {
    id: 'quantum-nuclear-4',
    section: PhysicsSection.QUANTUM,
    subcategory: 'nuclear',
    question: 'Период полураспада',
    answer: 'Время, за которое распадается половина исходного количества радиоактивных ядер.',
    formula: 'T_{1/2} = \\frac{\\ln 2}{\\lambda}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['ядерная физика', 'радиоактивность', 'период полураспада']
  },

  // Физика элементарных частиц
  {
    id: 'quantum-particles-1',
    section: PhysicsSection.QUANTUM,
    subcategory: 'particles',
    question: 'Фундаментальные взаимодействия в природе',
    answer: 'В современной физике выделяют четыре фундаментальных взаимодействия: гравитационное, электромагнитное, сильное и слабое.',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['элементарные частицы', 'взаимодействия', 'фундаментальные силы']
  },
  {
    id: 'quantum-particles-2',
    section: PhysicsSection.QUANTUM,
    subcategory: 'particles',
    question: 'Классификация элементарных частиц',
    answer: 'Элементарные частицы делятся на фермионы (частицы с полуцелым спином, подчиняются принципу запрета Паули) и бозоны (частицы с целым спином, не подчиняются принципу запрета Паули). Фермионы в свою очередь делятся на кварки и лептоны.',
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['элементарные частицы', 'фермионы', 'бозоны', 'кварки', 'лептоны']
  },
  {
    id: 'quantum-particles-3',
    section: PhysicsSection.QUANTUM,
    subcategory: 'particles',
    question: 'Стандартная модель',
    answer: 'Теория, описывающая электромагнитное, слабое и сильное взаимодействия всех элементарных частиц. Включает в себя 17 фундаментальных частиц: 6 кварков, 6 лептонов, 4 калибровочных бозона и бозон Хиггса.',
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['элементарные частицы', 'стандартная модель', 'фундаментальные частицы']
  },

  // Квантовая теория поля
  {
    id: 'quantum-field-1',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-field',
    question: 'Квантовая теория поля',
    answer: 'Теоретическая основа, описывающая поведение квантовых частиц и их взаимодействий в терминах квантовых полей. Объединяет принципы квантовой механики и специальной теории относительности.',
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['квантовая теория поля', 'квантовые поля', 'релятивистская квантовая механика']
  },
  {
    id: 'quantum-field-2',
    section: PhysicsSection.QUANTUM,
    subcategory: 'quantum-field',
    question: 'Квантовая электродинамика (КЭД)',
    answer: 'Квантовая теория поля, описывающая электромагнитное взаимодействие между заряженными частицами с помощью фотонов как квантов электромагнитного поля.',
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['квантовая теория поля', 'КЭД', 'электромагнитное взаимодействие', 'фотон']
  }
]; 