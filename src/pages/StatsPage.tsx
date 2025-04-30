import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressDashboard from '../components/Progress/ProgressDashboard';
import { resetUserProgress } from '../services/progressService';
import { PhysicsSection } from '../types';

const StatsPage: React.FC = () => {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  
  const handleResetProgress = () => {
    resetUserProgress();
    setResetModalOpen(false);
    // Перезагружаем страницу для обновления данных
    window.location.reload();
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Статистика и прогресс</h1>
        <PageDescription>
          Отслеживайте свой прогресс в изучении физики и просматривайте статистику по разделам.
        </PageDescription>
      </PageHeader>
      
      <ProgressDashboard />
      
      <SectionsInfoContainer>
        <SectionTitle>Информация о разделах</SectionTitle>
        
        <SectionsGrid>
          {Object.values(PhysicsSection).map(section => (
            <SectionCard key={section}>
              <SectionIcon>{getSectionIcon(section)}</SectionIcon>
              <SectionContent>
                <SectionName>{section}</SectionName>
                <SectionDescription>{getSectionDescription(section)}</SectionDescription>
              </SectionContent>
            </SectionCard>
          ))}
        </SectionsGrid>
      </SectionsInfoContainer>
      
      <ActionsContainer>
        <ActionButton onClick={() => setResetModalOpen(true)}>
          Сбросить прогресс
        </ActionButton>
      </ActionsContainer>
      
      {resetModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Сбросить прогресс?</ModalTitle>
            <ModalBody>
              Вы уверены, что хотите сбросить весь прогресс обучения? Это действие нельзя отменить.
            </ModalBody>
            <ModalActions>
              <CancelButton onClick={() => setResetModalOpen(false)}>
                Отмена
              </CancelButton>
              <ResetButton onClick={handleResetProgress}>
                Сбросить прогресс
              </ResetButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

// Вспомогательные функции
const getSectionIcon = (section: PhysicsSection): string => {
  const icons = {
    [PhysicsSection.MECHANICS]: '⚙️',
    [PhysicsSection.THERMODYNAMICS]: '🔥',
    [PhysicsSection.ELECTRODYNAMICS]: '⚡',
    [PhysicsSection.OPTICS]: '🔍',
    [PhysicsSection.QUANTUM]: '⚛️',
    [PhysicsSection.ASTRONOMY]: '🔭',
  };
  
  return icons[section] || '📚';
};

const getSectionDescription = (section: PhysicsSection): string => {
  const descriptions = {
    [PhysicsSection.MECHANICS]: 'Изучение движения и взаимодействия физических тел, включая законы Ньютона и механическую энергию.',
    [PhysicsSection.THERMODYNAMICS]: 'Исследование теплоты, температуры и энергетических превращений в физических системах.',
    [PhysicsSection.ELECTRODYNAMICS]: 'Изучение электромагнитных явлений и взаимодействий между заряженными частицами.',
    [PhysicsSection.OPTICS]: 'Раздел физики, посвященный изучению света, его свойств и взаимодействий с веществом.',
    [PhysicsSection.QUANTUM]: 'Основы квантовой механики, исследующей поведение материи и энергии на атомном и субатомном уровнях.',
    [PhysicsSection.ASTRONOMY]: 'Изучение небесных тел и явлений, происходящих за пределами атмосферы Земли.',
  };
  
  return descriptions[section] || 'Раздел физики';
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
`;

const SectionsInfoContainer = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-size: 1.3rem;
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

const SectionCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const SectionContent = styled.div`
  flex: 1;
`;

const SectionName = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-size: 1.1rem;
`;

const SectionDescription = styled.p`
  color: var(--light-text-color);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background-color: transparent;
  color: var(--error-color);
  border: 1px solid var(--error-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--error-color);
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 1.5rem;
`;

const ModalBody = styled.p`
  margin-bottom: 2rem;
  color: var(--light-text-color);
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: var(--light-text-color);
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResetButton = styled.button`
  background-color: var(--error-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

export default StatsPage; 