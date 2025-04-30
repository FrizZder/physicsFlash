import { SubCategory, PhysicsSection } from '../types';

export const subcategoriesData: SubCategory[] = [
  // Механика
  {
    id: 'kinematics',
    name: 'Кинематика',
    section: PhysicsSection.MECHANICS,
    description: 'Раздел о движении тел без учета причин, вызывающих это движение'
  },
  {
    id: 'dynamics',
    name: 'Динамика',
    section: PhysicsSection.MECHANICS,
    description: 'Раздел о движении тел под действием приложенных сил'
  },
  {
    id: 'statics',
    name: 'Статика',
    section: PhysicsSection.MECHANICS,
    description: 'Раздел об условиях равновесия тел под действием сил'
  },
  {
    id: 'fluid-mechanics',
    name: 'Гидро- и аэромеханика',
    section: PhysicsSection.MECHANICS,
    description: 'Изучение поведения жидкостей и газов в состоянии покоя и движения'
  },
  {
    id: 'oscillation',
    name: 'Колебания',
    section: PhysicsSection.MECHANICS,
    description: 'Изучение периодических движений и процессов'
  },
  {
    id: 'waves',
    name: 'Волны',
    section: PhysicsSection.MECHANICS,
    description: 'Изучение распространения возмущений в пространстве и времени'
  },

  // Термодинамика
  {
    id: 'heat',
    name: 'Теплота и температура',
    section: PhysicsSection.THERMODYNAMICS,
    description: 'Основные понятия и законы, связанные с тепловыми процессами'
  },
  {
    id: 'gas-laws',
    name: 'Газовые законы',
    section: PhysicsSection.THERMODYNAMICS,
    description: 'Законы, описывающие поведение идеального газа'
  },
  {
    id: 'thermo-laws',
    name: 'Начала термодинамики',
    section: PhysicsSection.THERMODYNAMICS,
    description: 'Фундаментальные принципы, управляющие тепловыми процессами'
  },
  {
    id: 'phase-transitions',
    name: 'Фазовые переходы',
    section: PhysicsSection.THERMODYNAMICS,
    description: 'Изменения агрегатного состояния вещества'
  },
  {
    id: 'entropy',
    name: 'Энтропия и статистическая физика',
    section: PhysicsSection.THERMODYNAMICS,
    description: 'Мера неупорядоченности системы и статистические законы'
  },

  // Электродинамика
  {
    id: 'electrostatics',
    name: 'Электростатика',
    section: PhysicsSection.ELECTRODYNAMICS,
    description: 'Взаимодействие неподвижных электрических зарядов'
  },
  {
    id: 'current',
    name: 'Постоянный ток',
    section: PhysicsSection.ELECTRODYNAMICS,
    description: 'Направленное движение заряженных частиц'
  },
  {
    id: 'magnetism',
    name: 'Магнетизм',
    section: PhysicsSection.ELECTRODYNAMICS,
    description: 'Явления, связанные с магнитным полем'
  },
  {
    id: 'em-induction',
    name: 'Электромагнитная индукция',
    section: PhysicsSection.ELECTRODYNAMICS,
    description: 'Явление возникновения электрического тока в замкнутом контуре при изменении магнитного потока'
  },
  {
    id: 'em-waves',
    name: 'Электромагнитные волны',
    section: PhysicsSection.ELECTRODYNAMICS,
    description: 'Распространение в пространстве изменяющегося электромагнитного поля'
  },

  // Оптика
  {
    id: 'geometric-optics',
    name: 'Геометрическая оптика',
    section: PhysicsSection.OPTICS,
    description: 'Распространение света в приближении световых лучей'
  },
  {
    id: 'wave-optics',
    name: 'Волновая оптика',
    section: PhysicsSection.OPTICS,
    description: 'Явления, объясняемые волновой природой света'
  },
  {
    id: 'interference',
    name: 'Интерференция',
    section: PhysicsSection.OPTICS,
    description: 'Наложение когерентных волн'
  },
  {
    id: 'diffraction',
    name: 'Дифракция',
    section: PhysicsSection.OPTICS,
    description: 'Огибание волнами препятствий'
  },
  {
    id: 'polarization',
    name: 'Поляризация',
    section: PhysicsSection.OPTICS,
    description: 'Ориентация колебаний в электромагнитной волне'
  },

  // Квантовая физика
  {
    id: 'quantum-basics',
    name: 'Основы квантовой механики',
    section: PhysicsSection.QUANTUM,
    description: 'Фундаментальные принципы и понятия квантовой механики'
  },
  {
    id: 'atoms',
    name: 'Атомная физика',
    section: PhysicsSection.QUANTUM,
    description: 'Строение и свойства атомов'
  },
  {
    id: 'nuclear',
    name: 'Ядерная физика',
    section: PhysicsSection.QUANTUM,
    description: 'Строение и свойства атомных ядер'
  },
  {
    id: 'particles',
    name: 'Физика элементарных частиц',
    section: PhysicsSection.QUANTUM,
    description: 'Изучение фундаментальных частиц и их взаимодействий'
  },
  {
    id: 'quantum-field',
    name: 'Квантовая теория поля',
    section: PhysicsSection.QUANTUM,
    description: 'Теория, объединяющая квантовую механику и специальную теорию относительности'
  },

  // Астрономия
  {
    id: 'solar-system',
    name: 'Солнечная система',
    section: PhysicsSection.ASTRONOMY,
    description: 'Планеты, их спутники и другие объекты, вращающиеся вокруг Солнца'
  },
  {
    id: 'stars',
    name: 'Звезды и их эволюция',
    section: PhysicsSection.ASTRONOMY,
    description: 'Строение, образование и жизненный цикл звезд'
  },
  {
    id: 'galaxies',
    name: 'Галактики',
    section: PhysicsSection.ASTRONOMY,
    description: 'Гигантские системы из звезд, газа, пыли и темной материи'
  },
  {
    id: 'cosmology',
    name: 'Космология',
    section: PhysicsSection.ASTRONOMY,
    description: 'Изучение Вселенной как целого, ее структуры, происхождения и эволюции'
  },
  {
    id: 'astrophysics',
    name: 'Астрофизика',
    section: PhysicsSection.ASTRONOMY,
    description: 'Применение физических законов к астрономическим объектам'
  }
]; 