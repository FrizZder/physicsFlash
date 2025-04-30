import { FlashCard, PhysicsSection, DifficultyLevel } from '../../types';

export const electrodynamicsFlashcards: FlashCard[] = [
  // Электростатика
  {
    id: 'electro-static-1',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'electrostatics',
    question: 'Закон Кулона',
    answer: 'Сила взаимодействия двух точечных неподвижных зарядов в вакууме прямо пропорциональна произведению модулей зарядов и обратно пропорциональна квадрату расстояния между ними.',
    formula: 'F = k\\frac{|q_1| \\cdot |q_2|}{r^2}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['электростатика', 'закон Кулона', 'электрический заряд']
  },
  {
    id: 'electro-static-2',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'electrostatics',
    question: 'Напряженность электрического поля',
    answer: 'Напряженность электрического поля — векторная физическая величина, характеризующая электрическое поле и равная отношению силы, действующей на пробный заряд, к величине этого заряда.',
    formula: '\\vec{E} = \\frac{\\vec{F}}{q_0}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['электростатика', 'электрическое поле', 'напряженность']
  },
  {
    id: 'electro-static-3',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'electrostatics',
    question: 'Потенциал электрического поля',
    answer: 'Потенциал электрического поля — скалярная физическая величина, характеризующая потенциальную энергию единичного положительного заряда в данной точке электрического поля.',
    formula: '\\varphi = \\frac{W_п}{q_0}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['электростатика', 'электрическое поле', 'потенциал']
  },
  {
    id: 'electro-static-4',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'electrostatics',
    question: 'Связь напряженности и потенциала',
    answer: 'Напряженность электрического поля равна отрицательному градиенту потенциала этого поля.',
    formula: '\\vec{E} = -\\text{grad}\\varphi = -\\frac{d\\varphi}{d\\vec{r}}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['электростатика', 'напряженность', 'потенциал', 'градиент']
  },

  // Постоянный ток
  {
    id: 'electro-current-1',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'current',
    question: 'Закон Ома для участка цепи',
    answer: 'Сила тока на участке цепи прямо пропорциональна напряжению на концах этого участка и обратно пропорциональна его сопротивлению.',
    formula: 'I = \\frac{U}{R}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['электрический ток', 'закон Ома', 'сопротивление']
  },
  {
    id: 'electro-current-2',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'current',
    question: 'Закон Ома для полной цепи',
    answer: 'Сила тока в замкнутой цепи прямо пропорциональна ЭДС источника и обратно пропорциональна сумме внешнего и внутреннего сопротивлений цепи.',
    formula: 'I = \\frac{\\mathcal{E}}{R + r}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['электрический ток', 'закон Ома', 'ЭДС', 'полная цепь']
  },
  {
    id: 'electro-current-3',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'current',
    question: 'Закон Джоуля-Ленца',
    answer: 'Количество теплоты, выделяемое проводником с током, равно произведению квадрата силы тока, сопротивления проводника и времени прохождения тока.',
    formula: 'Q = I^2Rt',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['электрический ток', 'тепловое действие тока', 'мощность тока']
  },

  // Магнетизм
  {
    id: 'electro-magnet-1',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'magnetism',
    question: 'Сила Ампера',
    answer: 'Сила, действующая на проводник с током в магнитном поле, прямо пропорциональна силе тока, длине проводника и синусу угла между направлением тока и вектором магнитной индукции.',
    formula: 'F_A = IBl\\sin\\alpha',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['магнетизм', 'сила Ампера', 'магнитное поле', 'проводник с током']
  },
  {
    id: 'electro-magnet-2',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'magnetism',
    question: 'Сила Лоренца',
    answer: 'Сила, действующая на движущуюся заряженную частицу в магнитном поле, прямо пропорциональна заряду частицы, ее скорости, магнитной индукции поля и синусу угла между векторами скорости и магнитной индукции.',
    formula: 'F_L = qvB\\sin\\alpha',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['магнетизм', 'сила Лоренца', 'магнитное поле', 'заряженная частица']
  },
  {
    id: 'electro-magnet-3',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'magnetism',
    question: 'Закон Био-Савара-Лапласа',
    answer: 'Закон, определяющий магнитную индукцию поля, создаваемого элементом проводника с током.',
    formula: 'd\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I [d\\vec{l} \\times \\vec{r}]}{r^3}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['магнетизм', 'закон Био-Савара-Лапласа', 'магнитное поле тока']
  },

  // Электромагнитная индукция
  {
    id: 'electro-induction-1',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'em-induction',
    question: 'Закон электромагнитной индукции Фарадея',
    answer: 'ЭДС индукции в замкнутом контуре численно равна и противоположна по знаку скорости изменения магнитного потока через поверхность, ограниченную этим контуром.',
    formula: '\\mathcal{E}_i = -\\frac{d\\Phi}{dt}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['электромагнитная индукция', 'закон Фарадея', 'ЭДС индукции']
  },
  {
    id: 'electro-induction-2',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'em-induction',
    question: 'Самоиндукция и индуктивность',
    answer: 'Самоиндукция — явление возникновения ЭДС индукции в проводнике при изменении силы тока в нем. Индуктивность — коэффициент пропорциональности между магнитным потоком и силой тока.',
    formula: '\\mathcal{E}_s = -L\\frac{dI}{dt}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['электромагнитная индукция', 'самоиндукция', 'индуктивность']
  },

  // Электромагнитные волны
  {
    id: 'electro-waves-1',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'em-waves',
    question: 'Уравнения Максвелла (словесная формулировка)',
    answer: 'Система уравнений, описывающая основные закономерности электромагнитного поля: 1) Поток электрического поля через замкнутую поверхность пропорционален заряду внутри поверхности; 2) Магнитное поле не имеет источников; 3) Вихревое электрическое поле порождается изменяющимся магнитным полем; 4) Вихревое магнитное поле порождается электрическим током и изменяющимся электрическим полем.',
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['электромагнитные волны', 'уравнения Максвелла', 'электромагнитное поле']
  },
  {
    id: 'electro-waves-2',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'em-waves',
    question: 'Скорость распространения электромагнитных волн в вакууме',
    answer: 'Скорость распространения электромагнитных волн в вакууме равна скорости света.',
    formula: 'c = \\frac{1}{\\sqrt{\\varepsilon_0\\mu_0}} \\approx 3 \\cdot 10^8 \\text{ м/с}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['электромагнитные волны', 'скорость света', 'вакуум']
  },
  {
    id: 'electro-waves-3',
    section: PhysicsSection.ELECTRODYNAMICS,
    subcategory: 'em-waves',
    question: 'Шкала электромагнитных волн',
    answer: 'Шкала электромагнитных волн (в порядке возрастания частоты): радиоволны, микроволны, инфракрасное излучение, видимый свет, ультрафиолетовое излучение, рентгеновское излучение, гамма-излучение.',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['электромагнитные волны', 'шкала электромагнитных волн', 'спектр']
  }
]; 