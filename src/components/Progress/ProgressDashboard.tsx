import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PhysicsSection } from '../../types';
import ProgressBar from './ProgressBar';
import { getOverallProgress, getSectionProgress, loadUserProgress, UserProgress } from '../../services/progressService';

const ProgressDashboard: React.FC = () => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  
  useEffect(() => {
    // Загружаем прогресс пользователя при монтировании компонента
    const progress = loadUserProgress();
    setUserProgress(progress);
    
    // Обновляем данные при изменении localStorage
    const handleStorageChange = () => {
      const updatedProgress = loadUserProgress();
      setUserProgress(updatedProgress);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  if (!userProgress) {
    return <Loading>Загрузка прогресса...</Loading>;
  }
  
  const { studyStreak, totalCards, totalMastered } = userProgress;
  const overallProgress = getOverallProgress();
  
  // Форматирование даты последнего занятия
  const formatLastStudyDate = (timestamp: number | null): string => {
    if (!timestamp) return 'Нет данных';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Прогресс обучения</h2>
        <StreakBadge>
          <StreakIcon>🔥</StreakIcon> 
          <StreakCount>{studyStreak} {getDayWord(studyStreak)} подряд</StreakCount>
        </StreakBadge>
      </DashboardHeader>
      
      <OverallProgressSection>
        <ProgressSummary>
          <ProgressStat>
            <StatValue>{totalMastered}</StatValue>
            <StatLabel>освоено</StatLabel>
          </ProgressStat>
          <ProgressDivider />
          <ProgressStat>
            <StatValue>{totalCards}</StatValue>
            <StatLabel>всего</StatLabel>
          </ProgressStat>
          <ProgressDivider />
          <ProgressStat>
            <StatValue>{overallProgress}%</StatValue>
            <StatLabel>прогресс</StatLabel>
          </ProgressStat>
        </ProgressSummary>
        
        <ProgressBar 
          progress={overallProgress} 
          height={20} 
          label="Общий прогресс"
        />
      </OverallProgressSection>
      
      <SectionTitle>Прогресс по разделам</SectionTitle>
      <SectionsGrid>
        {Object.values(PhysicsSection).map(section => (
          <SectionProgressCard key={section}>
            <SectionName>{section}</SectionName>
            <ProgressBar 
              progress={getSectionProgress(section)} 
              height={8} 
              color={getSectionColor(section)}
            />
            <SectionStats>
              <SectionStatItem>
                {Math.round(userProgress.sectionCompletionPercentage[section] || 0)}% пройдено
              </SectionStatItem>
            </SectionStats>
          </SectionProgressCard>
        ))}
      </SectionsGrid>
      
      {userProgress.lastStudySession && (
        <LastStudy>
          <LastStudyIcon>📅</LastStudyIcon>
          <LastStudyText>
            Последнее занятие: {formatLastStudyDate(userProgress.lastStudySession)}
          </LastStudyText>
        </LastStudy>
      )}
    </DashboardContainer>
  );
};

// Вспомогательная функция для склонения слова "день"
const getDayWord = (count: number): string => {
  if (count === 1) return 'день';
  if (count >= 2 && count <= 4) return 'дня';
  return 'дней';
};

// Функция для назначения цвета секции
const getSectionColor = (section: PhysicsSection): string => {
  const colors = {
    [PhysicsSection.MECHANICS]: '#4A6BFF', // синий
    [PhysicsSection.THERMODYNAMICS]: '#FF5349', // красный
    [PhysicsSection.ELECTRODYNAMICS]: '#FFD700', // золотой
    [PhysicsSection.OPTICS]: '#9370DB', // пурпурный
    [PhysicsSection.QUANTUM]: '#00CED1', // бирюзовый
    [PhysicsSection.ASTRONOMY]: '#32CD32', // зеленый
  };
  
  return colors[section] || 'var(--primary-color)';
};

// Стилизованные компоненты
const DashboardContainer = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color);
  }
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const StreakBadge = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 83, 73, 0.1);
  color: #FF5349;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
`;

const StreakIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.2rem;
`;

const StreakCount = styled.span`
  font-size: 0.9rem;
`;

const OverallProgressSection = styled.div`
  margin-bottom: 2rem;
`;

const ProgressSummary = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  background-color: rgba(74, 107, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
`;

const ProgressStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--light-text-color);
`;

const ProgressDivider = styled.div`
  width: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 1.2rem;
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SectionProgressCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionName = styled.div`
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--text-color);
`;

const SectionStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const SectionStatItem = styled.span`
  font-size: 0.8rem;
  color: var(--light-text-color);
`;

const LastStudy = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--light-text-color);
`;

const LastStudyIcon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.2rem;
`;

const LastStudyText = styled.span`
  font-size: 0.9rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--light-text-color);
`;

export default ProgressDashboard; 