import { FlashCard, PhysicsSection, DifficultyLevel } from '../types';
import { SimulationType } from '../components/Simulation/PhysicsSimulation';

// Карточки с симуляциями
export const simulationCards: FlashCard[] = [
  // Механика
  {
    id: 'sim-mechanics-1',
    section: PhysicsSection.MECHANICS,
    question: 'Как движется маятник и от чего зависит его период?',
    answer: 'Математический маятник совершает гармонические колебания. Период колебаний зависит от длины маятника и ускорения свободного падения, но не зависит от массы и амплитуды (при малых колебаниях).',
    formula: 'T = 2\\pi\\sqrt{\\frac{L}{g}}',
    latexFormula: true,
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['маятник', 'колебания', 'период', 'механика'],
    simulationType: SimulationType.PENDULUM,
    simulationParameters: {
      length: 150,
      radius: 20,
      initialVelocity: 0.05
    }
  },
  {
    id: 'sim-mechanics-2',
    section: PhysicsSection.MECHANICS,
    question: 'Как описывается движение тела, брошенного под углом к горизонту?',
    answer: 'Тело, брошенное под углом к горизонту, движется по параболической траектории. Горизонтальная составляющая скорости остается постоянной, а вертикальная изменяется под действием силы тяжести.',
    formula: '\\begin{cases} x = v_0 \\cos(\\alpha) \\cdot t \\\\ y = v_0 \\sin(\\alpha) \\cdot t - \\frac{gt^2}{2} \\end{cases}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['баллистика', 'кинематика', 'траектория', 'парабола'],
    simulationType: SimulationType.PROJECTILE,
    simulationParameters: {
      angle: -Math.PI / 4,  // 45 градусов
      velocity: 0.2,
      radius: 15
    }
  },
  {
    id: 'sim-mechanics-3',
    section: PhysicsSection.MECHANICS,
    question: 'Что такое закон сохранения импульса и как он проявляется при столкновениях?',
    answer: 'Закон сохранения импульса гласит, что в замкнутой системе векторная сумма импульсов тел остается постоянной. При столкновениях тел сумма их импульсов до столкновения равна сумме импульсов после столкновения.',
    formula: '\\vec{p}_1 + \\vec{p}_2 = \\vec{p}_1\' + \\vec{p}_2\'',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['импульс', 'столкновения', 'сохранение', 'механика'],
    simulationType: SimulationType.COLLISION,
    simulationParameters: {
      count: 8,
      minRadius: 15,
      maxRadius: 30
    }
  },
  
  // Гравитация - сложный раздел механики
  {
    id: 'sim-mechanics-4',
    section: PhysicsSection.MECHANICS,
    question: 'Как формулируется закон всемирного тяготения и как он описывает движение планет?',
    answer: 'Закон всемирного тяготения Ньютона гласит, что сила притяжения между двумя телами прямо пропорциональна произведению их масс и обратно пропорциональна квадрату расстояния между ними. Этот закон объясняет эллиптические орбиты планет вокруг Солнца.',
    formula: 'F = G\\frac{m_1 m_2}{r^2}',
    latexFormula: true,
    difficulty: DifficultyLevel.ADVANCED,
    tags: ['гравитация', 'притяжение', 'орбиты', 'планеты'],
    simulationType: SimulationType.GRAVITY,
    simulationParameters: {
      centralMass: 50,
      orbitCount: 5,
      smallRadius: 8
    }
  },
  
  // Волны (физика колебаний)
  {
    id: 'sim-optics-1',
    section: PhysicsSection.OPTICS,
    question: 'Что такое механические волны и как они распространяются в среде?',
    answer: 'Механические волны - это колебания, распространяющиеся в упругой среде. При распространении волны частицы среды совершают колебания около положения равновесия, но не перемещаются вместе с волной. Волны переносят энергию без переноса вещества.',
    formula: 'y(x,t) = A \\sin(kx - \\omega t + \\phi_0)',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['волны', 'колебания', 'распространение', 'фаза'],
    simulationType: SimulationType.WAVE,
    simulationParameters: {
      amplitude: 50,
      wavelength: 0.1,
      speed: 0.05,
      particleCount: 30
    }
  },
  
  // Электродинамика
  {
    id: 'sim-electro-1',
    section: PhysicsSection.ELECTRODYNAMICS,
    question: 'Как взаимодействуют заряженные частицы согласно закону Кулона?',
    answer: 'Согласно закону Кулона, сила взаимодействия между двумя точечными зарядами прямо пропорциональна произведению модулей зарядов и обратно пропорциональна квадрату расстояния между ними. Одноименные заряды отталкиваются, разноименные - притягиваются.',
    formula: 'F = k\\frac{|q_1 q_2|}{r^2}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['электростатика', 'заряды', 'кулоновские силы'],
    simulationType: SimulationType.ELECTRIC_FIELD,
    simulationParameters: {
      chargeCount: 6
    }
  },
  
  // Термодинамика
  {
    id: 'sim-thermo-1',
    section: PhysicsSection.THERMODYNAMICS,
    question: 'Что такое идеальный газ и как описывается его поведение?',
    answer: 'Идеальный газ - это модель газа, в которой пренебрегают размерами молекул и взаимодействием между ними. Поведение идеального газа описывается уравнением Клапейрона-Менделеева, связывающим давление, объем и температуру.',
    formula: 'pV = nRT',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['газ', 'молекулы', 'давление', 'температура'],
    simulationType: SimulationType.IDEAL_GAS,
    simulationParameters: {
      particleCount: 50,
      temperature: 0.15,
      radius: 5
    }
  },
  
  // Механика - пружинные колебания
  {
    id: 'sim-mechanics-5',
    section: PhysicsSection.MECHANICS,
    question: 'Как описываются колебания пружинного маятника?',
    answer: 'Пружинный маятник совершает гармонические колебания под действием возвращающей силы упругости. Период колебаний зависит от жесткости пружины и массы груза, но не зависит от амплитуды (при малых колебаниях).',
    formula: 'T = 2\\pi\\sqrt{\\frac{m}{k}}',
    latexFormula: true,
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['колебания', 'пружина', 'гармонические колебания', 'закон Гука'],
    simulationType: SimulationType.SPRING,
    simulationParameters: {
      stiffness: 0.001,
      length: 100,
      initialDisplacement: 50
    }
  }
];

export default simulationCards; 