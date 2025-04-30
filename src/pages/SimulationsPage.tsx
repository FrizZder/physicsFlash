import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { simulationCards } from '../data/simulationCards';
import PhysicsSimulation, { SimulationType } from '../components/Simulation/PhysicsSimulation';
import { FlashCard, PhysicsSection } from '../types';

const SimulationsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<PhysicsSection | 'all'>('all');
  const [selectedSimulation, setSelectedSimulation] = useState<FlashCard | null>(null);
  
  // Фильтрация карточек по разделу
  const filteredCards = activeSection === 'all' 
    ? simulationCards 
    : simulationCards.filter(card => card.section === activeSection);
  
  // Группировка карточек по типу симуляции
  const groupedByType = filteredCards.reduce((groups, card) => {
    const type = card.simulationType as SimulationType;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(card);
    return groups;
  }, {} as Record<SimulationType, FlashCard[]>);
  
  // Обработчик выбора симуляции
  const handleSelectSimulation = (card: FlashCard) => {
    setSelectedSimulation(card);
    // Прокручиваем к верху страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Интерактивные симуляции</h1>
        <PageDescription>
          Изучайте физические явления с помощью интерактивных симуляций. Выберите раздел и исследуйте визуализации физических законов и процессов.
        </PageDescription>
      </PageHeader>
      
      {selectedSimulation && (
        <SelectedSimulationContainer>
          <SimulationHeader>
            <h2>{selectedSimulation.question}</h2>
            <CloseButton onClick={() => setSelectedSimulation(null)}>✕</CloseButton>
          </SimulationHeader>
          
          <SimulationWrapper>
            <PhysicsSimulation 
              type={selectedSimulation.simulationType as SimulationType}
              width={Math.min(window.innerWidth - 60, 800)}
              height={400}
              parameters={selectedSimulation.simulationParameters || {}}
            />
          </SimulationWrapper>
          
          <SimulationDescription>
            <p>{selectedSimulation.answer}</p>
            {selectedSimulation.formula && (
              <FormulaBox>
                <FormulaLabel>Формула:</FormulaLabel>
                <Formula>{selectedSimulation.formula}</Formula>
              </FormulaBox>
            )}
            <TagsContainer>
              {selectedSimulation.tags.map(tag => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </TagsContainer>
          </SimulationDescription>
          
          <LinkToCard to={`/section/${selectedSimulation.section}?card=${selectedSimulation.id}`}>
            Перейти к карточке &rarr;
          </LinkToCard>
        </SelectedSimulationContainer>
      )}
      
      <FilterContainer>
        <FilterLabel>Фильтр по разделу:</FilterLabel>
        <FilterButtons>
          <FilterButton
            isActive={activeSection === 'all'}
            onClick={() => setActiveSection('all')}
          >
            Все разделы
          </FilterButton>
          {Object.values(PhysicsSection).map(section => (
            simulationCards.some(card => card.section === section) && (
              <FilterButton
                key={section}
                isActive={activeSection === section}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </FilterButton>
            )
          ))}
        </FilterButtons>
      </FilterContainer>
      
      {Object.keys(groupedByType).length > 0 ? (
        Object.entries(groupedByType).map(([type, cards]) => (
          <SimulationTypeSection key={type}>
            <TypeTitle>{getSimulationTypeTitle(type as SimulationType)}</TypeTitle>
            <SimulationsGrid>
              {cards.map(card => (
                <SimulationCard key={card.id} onClick={() => handleSelectSimulation(card)}>
                  <CardSection>{card.section}</CardSection>
                  <CardTitle>{card.question}</CardTitle>
                  <CardPreview>
                    <PhysicsSimulation 
                      type={card.simulationType as SimulationType}
                      width={300}
                      height={180}
                      parameters={card.simulationParameters || {}}
                    />
                  </CardPreview>
                  <ViewButton>Открыть симуляцию</ViewButton>
                </SimulationCard>
              ))}
            </SimulationsGrid>
          </SimulationTypeSection>
        ))
      ) : (
        <EmptyState>
          <h3>Симуляции не найдены</h3>
          <p>Выберите другой раздел или просмотрите все доступные симуляции.</p>
        </EmptyState>
      )}
    </PageContainer>
  );
};

// Функция для получения заголовка типа симуляции
const getSimulationTypeTitle = (type: SimulationType): string => {
  switch (type) {
    case SimulationType.PENDULUM:
      return 'Маятник и колебания';
    case SimulationType.PROJECTILE:
      return 'Баллистическое движение';
    case SimulationType.COLLISION:
      return 'Столкновения и импульс';
    case SimulationType.GRAVITY:
      return 'Гравитация и орбиты';
    case SimulationType.WAVE:
      return 'Волны и колебания';
    case SimulationType.ELECTRIC_FIELD:
      return 'Электрические поля';
    case SimulationType.SPRING:
      return 'Пружины и осцилляторы';
    case SimulationType.IDEAL_GAS:
      return 'Газовые законы и термодинамика';
    default:
      return 'Физические симуляции';
  }
};

// Стилизованные компоненты
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
`;

const PageDescription = styled.p`
  color: var(--light-text-color);
  font-size: 1.1rem;
  line-height: 1.5;
  max-width: 800px;
`;

const FilterContainer = styled.div`
  background-color: var(--card-color);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterLabel = styled.span`
  font-weight: 500;
  color: var(--text-color);
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? 'var(--primary-color)' : 'rgba(74, 107, 255, 0.1)')};
  color: ${(props) => (props.isActive ? 'white' : 'var(--primary-color)')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.isActive ? 'var(--secondary-color)' : 'rgba(74, 107, 255, 0.2)')};
  }
`;

const SimulationTypeSection = styled.section`
  margin-bottom: 3rem;
`;

const TypeTitle = styled.h2`
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: var(--primary-color);
  }
`;

const SimulationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SimulationCard = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardSection = styled.div`
  background-color: var(--primary-color);
  color: white;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 0 0 10px 0;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardTitle = styled.h3`
  padding: 1rem;
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.4;
  min-height: 70px;
  display: flex;
  align-items: center;
`;

const CardPreview = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: rgba(74, 107, 255, 0.1);
  color: var(--primary-color);
  border: none;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(74, 107, 255, 0.2);
  }
`;

const SelectedSimulationContainer = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
`;

const SimulationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color);
    flex: 1;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--light-text-color);
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: var(--error-color);
  }
`;

const SimulationWrapper = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
`;

const SimulationDescription = styled.div`
  margin: 1.5rem 0;
  
  p {
    line-height: 1.6;
    color: var(--text-color);
    margin-bottom: 1rem;
  }
`;

const FormulaBox = styled.div`
  background-color: rgba(74, 107, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

const FormulaLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Formula = styled.div`
  font-family: 'Times New Roman', serif;
  font-size: 1.2rem;
  color: var(--text-color);
  text-align: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background-color: rgba(74, 107, 255, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const LinkToCard = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  p {
    color: var(--light-text-color);
  }
`;

export default SimulationsPage; 