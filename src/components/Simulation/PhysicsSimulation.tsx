import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

// Типы симуляций, которые поддерживает компонент
export enum SimulationType {
  PENDULUM = 'pendulum',
  PROJECTILE = 'projectile',
  COLLISION = 'collision',
  GRAVITY = 'gravity',
  WAVE = 'wave',
  ELECTRIC_FIELD = 'electric_field',
  SPRING = 'spring',
  IDEAL_GAS = 'ideal_gas'
}

interface PhysicsSimulationProps {
  type: SimulationType;
  width?: number;
  height?: number;
  parameters?: Record<string, any>;
}

const PhysicsSimulation: React.FC<PhysicsSimulationProps> = ({
  type,
  width = 400,
  height = 300,
  parameters = {}
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Очистка ресурсов Matter.js
  const cleanupMatter = () => {
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      if (renderRef.current.canvas) {
        renderRef.current.canvas.remove();
      }
      renderRef.current.textures = {};
    }

    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }
  };

  // Инициализация симуляции
  useEffect(() => {
    // Сначала убедимся, что предыдущая симуляция очищена
    cleanupMatter();

    // Короткая задержка перед созданием новой симуляции
    const initTimer = setTimeout(() => {
      if (!canvasRef.current) return;

      // Инициализация Matter.js
      const Engine = Matter.Engine;
      const Render = Matter.Render;
      const World = Matter.World;
      const Bodies = Matter.Bodies;
      const Body = Matter.Body;
      const Constraint = Matter.Constraint;
      const Vector = Matter.Vector;

      // Создаем физический движок с явными настройками
      const engine = Engine.create({
        gravity: { x: 0, y: 1, scale: 0.001 },
        positionIterations: 10,
        velocityIterations: 8
      });
      engineRef.current = engine;

      // Создаем рендерер с явными настройками
      const render = Render.create({
        element: canvasRef.current,
        engine: engine,
        options: {
          width,
          height,
          wireframes: false,
          background: '#f0f0f0',
          pixelRatio: window.devicePixelRatio || 1,
          hasBounds: false,
        }
      });
      renderRef.current = render;

      // Добавляем границы
      const wallThickness = 20;
      const walls = [
        // Нижняя стенка
        Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
        // Левая стенка
        Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
        // Правая стенка
        Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
        // Верхняя стенка
        Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true })
      ];

      World.add(engine.world, walls);

      // Создаем симуляцию в зависимости от выбранного типа
      switch (type) {
        case SimulationType.PENDULUM:
          createPendulumSimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.PROJECTILE:
          createProjectileSimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.COLLISION:
          createCollisionSimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.GRAVITY:
          createGravitySimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.WAVE:
          createWaveSimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.ELECTRIC_FIELD:
          createElectricFieldSimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.SPRING:
          createSpringSimulation(engine.world, width, height, parameters);
          break;
        case SimulationType.IDEAL_GAS:
          createIdealGasSimulation(engine.world, width, height, parameters);
          break;
        default:
          createCollisionSimulation(engine.world, width, height, parameters);
      }

      // Запускаем движок и рендерер с явным указанием частоты обновления
      Engine.run(engine);
      Render.run(render);

      // Явно вызываем обновление для запуска симуляции
      Matter.Runner.run(Matter.Runner.create(), engine);

      setIsInitialized(true);
      
      // Создаем функцию для маятника
      function createPendulumSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const pendulumLength = params.length || 150;
        const pendulumRadius = params.radius || 20;
        
        // Точка крепления маятника
        const anchor = { x: width / 2, y: height / 4 };
        
        // Создаем груз маятника
        const ball = Bodies.circle(width / 2 + pendulumLength / 2, height / 2, pendulumRadius, {
          density: 0.01,
          frictionAir: 0.001,
          restitution: 0.8,
          render: { fillStyle: '#4A6BFF' }
        });
        
        // Создаем крепление в виде ограничения
        const constraint = Constraint.create({
          pointA: anchor,
          bodyB: ball,
          length: pendulumLength,
          stiffness: 0.9,
          render: { 
            visible: true,
            lineWidth: 2,
            strokeStyle: '#444'
          }
        });
        
        // Добавляем начальный импульс
        Body.setVelocity(ball, { x: params.initialVelocity || 0.05, y: 0 });
        
        // Добавляем объекты в мир
        World.add(world, [ball, constraint]);
      }

      // Создаем функцию для баллистики
      function createProjectileSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const angle = params.angle || -Math.PI / 4; // Угол в радианах (45 градусов)
        const velocity = params.velocity || 0.2;
        const projectileRadius = params.radius || 15;
        
        // Создаем снаряд
        const projectile = Bodies.circle(50, height - 50, projectileRadius, {
          density: 0.002,
          frictionAir: 0.001,
          restitution: 0.6,
          render: { fillStyle: '#FF5349' }
        });
        
        // Устанавливаем начальную скорость
        const velocityVector = Vector.create(
          Math.cos(angle) * velocity,
          Math.sin(angle) * velocity
        );
        Body.setVelocity(projectile, velocityVector);
        
        // Добавляем снаряд в мир
        World.add(world, projectile);
        
        // Создаем платформу запуска
        const launcher = Bodies.rectangle(50, height - 20, 100, 20, {
          isStatic: true,
          angle: angle,
          render: { fillStyle: '#555' }
        });
        
        World.add(world, launcher);
      }

      // Создаем функцию для столкновений
      function createCollisionSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const ballCount = params.count || 10;
        const minRadius = params.minRadius || 10;
        const maxRadius = params.maxRadius || 30;
        
        // Создаем шары с разными массами
        for (let i = 0; i < ballCount; i++) {
          const radius = Math.random() * (maxRadius - minRadius) + minRadius;
          const ball = Bodies.circle(
            Math.random() * (width - 2 * maxRadius) + maxRadius,
            Math.random() * (height - 2 * maxRadius) + maxRadius,
            radius,
            {
              density: 0.01,
              frictionAir: 0.001,
              restitution: 0.8,
              render: {
                fillStyle: `hsl(${Math.random() * 360}, 80%, 60%)`
              }
            }
          );
          
          // Даем шарам начальную скорость
          Body.setVelocity(ball, {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1
          });
          
          World.add(world, ball);
        }
      }

      // Создаем функцию для гравитации
      function createGravitySimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        // Устанавливаем силу гравитации
        engine.gravity.y = params.gravity || 0.001;
        
        const centralBodyMass = params.centralMass || 50;
        const smallBodyRadius = params.smallRadius || 8;
        
        // Создаем центральное массивное тело
        const centralBody = Bodies.circle(width / 2, height / 2, centralBodyMass, {
          isStatic: true,
          render: { fillStyle: '#FFD700' }
        });
        
        World.add(world, centralBody);
        
        // Создаем меньшие тела, вращающиеся вокруг центрального
        const orbitCount = params.orbitCount || 5;
        for (let i = 0; i < orbitCount; i++) {
          const distance = 100 + i * 30;
          const angle = Math.random() * Math.PI * 2;
          const orbitingBody = Bodies.circle(
            width / 2 + Math.cos(angle) * distance,
            height / 2 + Math.sin(angle) * distance,
            smallBodyRadius,
            {
              density: 0.001,
              frictionAir: 0,
              render: { fillStyle: '#4A6BFF' }
            }
          );
          
          // Даем начальную скорость, перпендикулярную радиусу
          const speed = Math.sqrt(0.00001 * centralBodyMass / distance);
          Body.setVelocity(orbitingBody, {
            x: -Math.sin(angle) * speed,
            y: Math.cos(angle) * speed
          });
          
          World.add(world, orbitingBody);
        }
        
        // Добавляем гравитационное притяжение к центральному телу
        Matter.Events.on(engine, 'beforeUpdate', function() {
          const bodies = Matter.Composite.allBodies(world);
          
          for (let i = 0; i < bodies.length; i++) {
            const bodyA = bodies[i];
            if (bodyA === centralBody || bodyA.isStatic) continue;
            
            const force = Vector.sub(centralBody.position, bodyA.position);
            const distance = Vector.magnitude(force);
            
            if (distance === 0) continue;
            
            const normalizedForce = Vector.normalise(force);
            const strength = (0.00001 * centralBody.mass * bodyA.mass) / (distance * distance);
            
            Body.applyForce(bodyA, bodyA.position, {
              x: normalizedForce.x * strength,
              y: normalizedForce.y * strength
            });
          }
        });
      }

      // Создаем функцию для волн
      function createWaveSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const particleCount = params.particleCount || 20;
        const amplitude = params.amplitude || 50;
        const wavelength = params.wavelength || 0.1;
        const speed = params.speed || 0.05;
        
        const particles: Matter.Body[] = [];
        
        // Создаем частицы, формирующие волну
        for (let i = 0; i < particleCount; i++) {
          const x = width * 0.1 + (width * 0.8) * (i / (particleCount - 1));
          const particle = Bodies.circle(x, height / 2, 5, {
            isStatic: true,
            render: { fillStyle: '#9370DB' }
          });
          
          particles.push(particle);
          World.add(world, particle);
        }
        
        // Анимируем движение частиц для создания волны
        let time = 0;
        Matter.Events.on(engine, 'beforeUpdate', function() {
          time += speed;
          
          for (let i = 0; i < particles.length; i++) {
            const x = width * 0.1 + (width * 0.8) * (i / (particles.length - 1));
            const y = height / 2 + Math.sin(time + i * wavelength) * amplitude;
            
            Body.setPosition(particles[i], { x, y });
          }
        });
      }

      // Создаем функцию для электрического поля
      function createElectricFieldSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const chargeCount = params.chargeCount || 5;
        
        // Создаем заряженные частицы
        for (let i = 0; i < chargeCount; i++) {
          const isPositive = Math.random() > 0.5;
          const charge = Bodies.circle(
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * height * 0.8 + height * 0.1,
            15,
            {
              isStatic: false,
              frictionAir: 0.05,
              density: 0.001,
              render: {
                fillStyle: isPositive ? '#FF5349' : '#4A6BFF',
              },
              plugin: {
                charge: isPositive ? 1 : -1
              }
            }
          );
          
          World.add(world, charge);
        }
        
        // Добавляем электростатическое взаимодействие
        Matter.Events.on(engine, 'beforeUpdate', function() {
          const bodies = Matter.Composite.allBodies(world);
          
          for (let i = 0; i < bodies.length; i++) {
            const bodyA = bodies[i];
            if (!bodyA.plugin || bodyA.plugin.charge === undefined) continue;
            
            for (let j = i + 1; j < bodies.length; j++) {
              const bodyB = bodies[j];
              if (!bodyB.plugin || bodyB.plugin.charge === undefined) continue;
              
              const force = Vector.sub(bodyB.position, bodyA.position);
              const distance = Vector.magnitude(force);
              
              if (distance < 5 || distance > 200) continue;
              
              const normalizedForce = Vector.normalise(force);
              const strength = (0.0001 * bodyA.plugin.charge * bodyB.plugin.charge) / (distance * distance);
              
              Body.applyForce(bodyA, bodyA.position, {
                x: normalizedForce.x * strength,
                y: normalizedForce.y * strength
              });
              
              Body.applyForce(bodyB, bodyB.position, {
                x: -normalizedForce.x * strength,
                y: -normalizedForce.y * strength
              });
            }
          }
        });
      }

      // Создаем функцию для пружины
      function createSpringSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const springStiffness = params.stiffness || 0.001;
        const springLength = params.length || 100;
        
        // Создаем основание пружины
        const base = Bodies.rectangle(width / 2, height * 0.3, 50, 20, {
          isStatic: true,
          render: { fillStyle: '#555' }
        });
        
        // Создаем груз
        const weight = Bodies.rectangle(width / 2, height * 0.3 + springLength, 40, 40, {
          density: 0.01,
          frictionAir: 0.001,
          render: { fillStyle: '#FF5349' }
        });
        
        // Создаем пружину
        const spring = Constraint.create({
          bodyA: base,
          bodyB: weight,
          length: springLength,
          stiffness: springStiffness,
          damping: 0.05,
          render: {
            visible: true,
            anchors: false,
            lineWidth: 5,
            strokeStyle: '#32CD32'
          }
        });
        
        World.add(world, [base, weight, spring]);
        
        // Даем начальное возмущение
        if (params.initialDisplacement) {
          Body.setPosition(weight, {
            x: width / 2,
            y: height * 0.3 + springLength + params.initialDisplacement
          });
        }
      }

      // Создаем функцию для идеального газа
      function createIdealGasSimulation(world: Matter.World, width: number, height: number, params: Record<string, any>) {
        const particleCount = params.particleCount || 50;
        const particleRadius = params.radius || 5;
        const temperature = params.temperature || 0.1;
        
        // Создаем частицы газа
        for (let i = 0; i < particleCount; i++) {
          const particle = Bodies.circle(
            Math.random() * (width - 2 * particleRadius) + particleRadius,
            Math.random() * (height - 2 * particleRadius) + particleRadius,
            particleRadius,
            {
              density: 0.001,
              frictionAir: 0,
              restitution: 1,
              render: {
                fillStyle: `rgba(74, 107, 255, ${0.4 + Math.random() * 0.6})`
              }
            }
          );
          
          // Даем случайную скорость согласно температуре
          Body.setVelocity(particle, {
            x: (Math.random() - 0.5) * temperature,
            y: (Math.random() - 0.5) * temperature
          });
          
          World.add(world, particle);
        }
      }
    }, 100); // Задержка перед инициализацией

    // Очистка ресурсов при размонтировании компонента
    return () => {
      clearTimeout(initTimer);
      cleanupMatter();
    };
  }, [type, width, height, parameters]); // Зависимости компонента

  return (
    <SimulationContainer style={{ width, height }}>
      <SimulationCanvas ref={canvasRef} />
      <SimulationCaption>
        Симуляция: {getSimulationTitle(type)}
      </SimulationCaption>
      {!isInitialized && <LoadingOverlay>Загрузка симуляции...</LoadingOverlay>}
    </SimulationContainer>
  );
};

// Получаем человекочитаемое название симуляции
const getSimulationTitle = (type: SimulationType): string => {
  switch (type) {
    case SimulationType.PENDULUM:
      return 'Маятник';
    case SimulationType.PROJECTILE:
      return 'Баллистическая траектория';
    case SimulationType.COLLISION:
      return 'Столкновения и сохранение импульса';
    case SimulationType.GRAVITY:
      return 'Гравитационное поле';
    case SimulationType.WAVE:
      return 'Волновые процессы';
    case SimulationType.ELECTRIC_FIELD:
      return 'Электрическое поле';
    case SimulationType.SPRING:
      return 'Пружинная система';
    case SimulationType.IDEAL_GAS:
      return 'Идеальный газ';
    default:
      return 'Физическая симуляция';
  }
};

// Стилизованные компоненты
const SimulationContainer = styled.div`
  position: relative;
  margin: 1rem auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SimulationCanvas = styled.div`
  width: 100%;
  height: 100%;

  canvas {
    border-radius: 8px;
    display: block;
  }
`;

const SimulationCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  color: var(--primary-color);
  font-weight: bold;
`;

export default PhysicsSimulation; 