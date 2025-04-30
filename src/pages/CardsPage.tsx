import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import FlashCard from '../components/Card/FlashCard';
import { FlashCard as FlashCardType, DifficultyLevel, StudyMode, PhysicsSection } from '../types';
import { getAllCards, getCardsBySection } from '../services/cardService';

// React Router v6 типизация для параметров URL
type CardsPageParams = {
  section?: string;
};

const CardsPage: React.FC = () => {
  const { section } = useParams<keyof CardsPageParams>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCards, setFilteredCards] = useState<FlashCardType[]>([]);
  const [studyMode, setStudyMode] = useState<StudyMode>(StudyMode.LEARNING);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [gameTimer, setGameTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState({ total: 0, correct: 0, accuracy: 0 });

  // Фильтрация карточек по разделу и сложности
  useEffect(() => {
    let cards: FlashCardType[] = [];
    
    if (section) {
      cards = getCardsBySection(section as PhysicsSection);
    } else {
      cards = getAllCards();
    }
    
    if (difficultyFilter !== 'all') {
      cards = cards.filter(
        (card) => card.difficulty === difficultyFilter
      );
    }
    
    // Перемешиваем карточки в режиме тестирования или игры
    if (studyMode === StudyMode.TESTING || studyMode === StudyMode.GAME) {
      cards = shuffleArray(cards);
    }
    
    setFilteredCards(cards);
    setCurrentIndex(0);
    setIsTestCompleted(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  }, [section, difficultyFilter, studyMode]);

  // Таймер для игрового режима
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (studyMode === StudyMode.GAME && isGameActive) {
      interval = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [studyMode, isGameActive]);

  // Проверка завершения теста
  useEffect(() => {
    if (studyMode === StudyMode.TESTING) {
      const totalAnswered = correctAnswers + incorrectAnswers;
      
      if (totalAnswered > 0 && totalAnswered === filteredCards.length) {
        const accuracy = Math.round((correctAnswers / totalAnswered) * 100);
        setTestResults({
          total: totalAnswered,
          correct: correctAnswers,
          accuracy: accuracy
        });
        setIsTestCompleted(true);
      }
    }
  }, [correctAnswers, incorrectAnswers, filteredCards.length, studyMode]);

  // Функция для случайного перемешивания карточек
  const shuffleArray = (array: FlashCardType[]): FlashCardType[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleNextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
    handleNextCard();
  };

  const handleIncorrectAnswer = () => {
    setIncorrectAnswers(incorrectAnswers + 1);
    handleNextCard();
  };

  const startGame = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setGameTimer(0);
    setIsGameActive(true);
    setCurrentIndex(0);
  };

  const restartTest = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setCurrentIndex(0);
    setIsTestCompleted(false);
    
    // Перемешиваем карточки для нового теста
    setFilteredCards(shuffleArray([...filteredCards]));
  };

  const changeStudyMode = (mode: StudyMode) => {
    setStudyMode(mode);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setGameTimer(0);
    setIsGameActive(mode === StudyMode.GAME);
    setIsTestCompleted(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PageContainer>
      <ControlPanel>
        <ControlGroup>
          <ControlLabel>Режим изучения:</ControlLabel>
          <ButtonGroup>
            {Object.values(StudyMode).map((mode) => (
              <ModeButton
                key={mode}
                isActive={studyMode === mode}
                onClick={() => changeStudyMode(mode)}
              >
                {mode}
              </ModeButton>
            ))}
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ControlLabel>Сложность:</ControlLabel>
          <ButtonGroup>
            <ModeButton
              isActive={difficultyFilter === 'all'}
              onClick={() => setDifficultyFilter('all')}
            >
              Все
            </ModeButton>
            {Object.values(DifficultyLevel).map((difficulty) => (
              <ModeButton
                key={difficulty}
                isActive={difficultyFilter === difficulty}
                onClick={() => setDifficultyFilter(difficulty)}
              >
                {difficulty}
              </ModeButton>
            ))}
          </ButtonGroup>
        </ControlGroup>

        {studyMode === StudyMode.GAME && (
          <GameControls>
            <GameStats>
              <StatItem>
                <StatLabel>Время:</StatLabel>
                <StatValue>{formatTime(gameTimer)}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Правильно:</StatLabel>
                <StatValue>{correctAnswers}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Неправильно:</StatLabel>
                <StatValue>{incorrectAnswers}</StatValue>
              </StatItem>
            </GameStats>
            {!isGameActive && (
              <StartGameButton onClick={startGame}>
                Начать игру
              </StartGameButton>
            )}
          </GameControls>
        )}

        {studyMode === StudyMode.TESTING && (
          <TestStats>
            <StatItem>
              <StatLabel>Правильно:</StatLabel>
              <StatValue>{correctAnswers}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Неправильно:</StatLabel>
              <StatValue>{incorrectAnswers}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Осталось:</StatLabel>
              <StatValue>{filteredCards.length - (correctAnswers + incorrectAnswers)}</StatValue>
            </StatItem>
          </TestStats>
        )}
      </ControlPanel>

      {isTestCompleted ? (
        <TestResultsContainer>
          <h2>Тест завершен!</h2>
          <ResultsStats>
            <ResultStat>
              <ResultValue>{testResults.correct}</ResultValue>
              <ResultLabel>правильных ответов</ResultLabel>
            </ResultStat>
            <ResultStat>
              <ResultValue>{testResults.total - testResults.correct}</ResultValue>
              <ResultLabel>ошибок</ResultLabel>
            </ResultStat>
            <ResultStat>
              <ResultValue>{testResults.accuracy}%</ResultValue>
              <ResultLabel>точность</ResultLabel>
            </ResultStat>
          </ResultsStats>
          <ResultMessage>
            {testResults.accuracy >= 90 ? '🎉 Отлично! Вы почти в совершенстве знаете эту тему.' :
             testResults.accuracy >= 70 ? '👍 Хороший результат! Продолжайте учиться.' :
             testResults.accuracy >= 50 ? '🙂 Неплохо, но есть к чему стремиться.' :
             '📚 Стоит повторить материал и попробовать снова.'}
          </ResultMessage>
          <RestartTestButton onClick={restartTest}>
            Пройти тест заново
          </RestartTestButton>
        </TestResultsContainer>
      ) : filteredCards.length > 0 ? (
        <CardContainer>
          <FlashCard
            card={filteredCards[currentIndex]}
            onNext={handleNextCard}
            onPrev={handlePrevCard}
            totalCards={filteredCards.length}
            currentIndex={currentIndex}
            markCorrect={studyMode !== StudyMode.LEARNING ? handleCorrectAnswer : undefined}
            markIncorrect={studyMode !== StudyMode.LEARNING ? handleIncorrectAnswer : undefined}
            isTestMode={studyMode !== StudyMode.LEARNING}
          />
        </CardContainer>
      ) : (
        <NoCardsMessage>
          <h2>Карточки не найдены</h2>
          <p>Попробуйте изменить раздел или уровень сложности.</p>
        </NoCardsMessage>
      )}
    </PageContainer>
  );
};

// Стилизованные компоненты
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ControlPanel = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ModeButton = styled.button<{ isActive: boolean }>`
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

const GameControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameStats = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const TestStats = styled(GameStats)``;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatLabel = styled.span`
  color: var(--light-text-color);
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1rem;
`;

const StartGameButton = styled.button`
  background-color: var(--success-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NoCardsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  
  h2 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  p {
    color: var(--light-text-color);
  }
`;

// Новые стилизованные компоненты для результатов теста
const TestResultsContainer = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  text-align: center;
  
  h2 {
    margin-bottom: 1.5rem;
    color: var(--text-color);
    font-size: 1.8rem;
  }
`;

const ResultsStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: rgba(74, 107, 255, 0.05);
  border-radius: 8px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ResultStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const ResultLabel = styled.div`
  color: var(--light-text-color);
  font-size: 1rem;
`;

const ResultMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  line-height: 1.5;
`;

const RestartTestButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

export default CardsPage; 