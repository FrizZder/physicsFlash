import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FlashCard as FlashCardType, DifficultyLevel } from '../../types';
import MathFormula from '../Formula/MathFormula';
import { markCardAsViewed, recordAnswer } from '../../services/progressService';
import PhysicsSimulation, { SimulationType } from '../Simulation/PhysicsSimulation';

interface FlashCardProps {
  card: FlashCardType;
  onNext: () => void;
  onPrev: () => void;
  totalCards: number;
  currentIndex: number;
  markCorrect?: () => void;
  markIncorrect?: () => void;
  showControls?: boolean;
  isTestMode?: boolean;
}

// Стилизованные компоненты - предварительные объявления для использования внутри FlashCard
const CardImage = styled.img`
  max-width: 100%;
  max-height: 180px;
  margin: 10px 0;
  border-radius: 8px;
  object-fit: contain;
`;

const SimulationButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const FlashCard: React.FC<FlashCardProps> = ({
  card,
  onNext,
  onPrev,
  totalCards,
  currentIndex,
  markCorrect,
  markIncorrect,
  showControls = true,
  isTestMode = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSimulationVisible, setIsSimulationVisible] = useState(false);
  const simulationIdRef = useRef(Date.now());

  // Отмечаем карточку как просмотренную при первом рендере
  useEffect(() => {
    markCardAsViewed(card.id, card.section);
  }, [card.id, card.section]);

  const handleFlip = () => {
    if (!isSimulationVisible) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Обработчики для тестового режима с учетом прогресса
  const handleCorrect = () => {
    if (markCorrect) {
      recordAnswer(card.id, true);
      markCorrect();
    }
  };

  const handleIncorrect = () => {
    if (markIncorrect) {
      recordAnswer(card.id, false);
      markIncorrect();
    }
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.BEGINNER:
        return 'var(--success-color)';
      case DifficultyLevel.INTERMEDIATE:
        return '#ff9800';
      case DifficultyLevel.ADVANCED:
        return 'var(--error-color)';
      default:
        return 'var(--primary-color)';
    }
  };

  // Функция для отображения формулы
  const renderFormula = () => {
    if (!card.formula) return null;
    
    if (card.latexFormula) {
      return <MathFormula formula={card.formula} displayMode={true} />;
    } else {
      return <Formula>{card.formula}</Formula>;
    }
  };

  // Обработчик кнопки "Запустить симуляцию"
  const toggleSimulation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем переворот карточки
    // Генерируем новый ID при активации симуляции для полного пересоздания
    if (!isSimulationVisible) {
      simulationIdRef.current = Date.now();
    }
    setIsSimulationVisible(!isSimulationVisible);
  };

  // Отображение симуляции
  const renderSimulation = () => {
    if (!card.simulationType || !isSimulationVisible) return null;
    
    return (
      <SimulationContainer>
        <PhysicsSimulation 
          key={`simulation-${card.id}-${simulationIdRef.current}`}
          type={card.simulationType as SimulationType} 
          width={350} 
          height={280} 
          parameters={card.simulationParameters || {}} 
        />
      </SimulationContainer>
    );
  };

  return (
    <CardContainer>
      <CardInner isFlipped={isFlipped} onClick={handleFlip}>
        <CardFace>
          {card.simulationType && (
            <SimulationButton onClick={toggleSimulation}>
              {isSimulationVisible ? 'Скрыть симуляцию' : 'Запустить симуляцию'}
            </SimulationButton>
          )}
          
          {isSimulationVisible ? (
            renderSimulation()
          ) : (
            <>
              <CardHeader>
                <SectionTag>{card.section}</SectionTag>
                <DifficultyTag color={getDifficultyColor(card.difficulty)}>
                  {card.difficulty}
                </DifficultyTag>
              </CardHeader>
              <CardContent>
                <CardQuestion>{card.question}</CardQuestion>
                {card.imageUrl && (
                  <CardImage src={card.imageUrl} alt="Изображение к вопросу" />
                )}
              </CardContent>
              <CardFooter>
                <TagsContainer>
                  {card.tags.map((tag, index) => (
                    <Tag key={index}>#{tag}</Tag>
                  ))}
                </TagsContainer>
                <BookmarkButton
                  isBookmarked={isBookmarked}
                  onClick={handleBookmark}
                  aria-label={isBookmarked ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  {isBookmarked ? '★' : '☆'}
                </BookmarkButton>
              </CardFooter>
              <FlipHint>Нажмите, чтобы увидеть ответ</FlipHint>
            </>
          )}
        </CardFace>
        <CardBack>
          {card.simulationType && (
            <SimulationButton onClick={toggleSimulation}>
              {isSimulationVisible ? 'Скрыть симуляцию' : 'Запустить симуляцию'}
            </SimulationButton>
          )}
          
          {isSimulationVisible ? (
            renderSimulation()
          ) : (
            <>
              <CardHeader>
                <SectionTag>{card.section}</SectionTag>
                <DifficultyTag color={getDifficultyColor(card.difficulty)}>
                  {card.difficulty}
                </DifficultyTag>
              </CardHeader>
              <CardContent>
                <CardAnswer>{card.answer}</CardAnswer>
                {renderFormula()}
                {card.imageUrl && (
                  <CardImage src={card.imageUrl} alt="Изображение к ответу" />
                )}
              </CardContent>
              <CardFooter>
                {isTestMode && (
                  <TestControls>
                    <AnswerButton onClick={handleCorrect} correct>
                      Знаю
                    </AnswerButton>
                    <AnswerButton onClick={handleIncorrect} correct={false}>
                      Не знаю
                    </AnswerButton>
                  </TestControls>
                )}
                <BookmarkButton
                  isBookmarked={isBookmarked}
                  onClick={handleBookmark}
                  aria-label={isBookmarked ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  {isBookmarked ? '★' : '☆'}
                </BookmarkButton>
              </CardFooter>
              <FlipHint>Нажмите, чтобы вернуться к вопросу</FlipHint>
            </>
          )}
        </CardBack>
      </CardInner>

      {showControls && (
        <CardControls>
          <NavigationButton onClick={onPrev} disabled={currentIndex === 0}>
            &larr; Назад
          </NavigationButton>
          <CardCounter>
            {currentIndex + 1} из {totalCards}
          </CardCounter>
          <NavigationButton
            onClick={onNext}
            disabled={currentIndex === totalCards - 1}
          >
            Вперед &rarr;
          </NavigationButton>
        </CardControls>
      )}
    </CardContainer>
  );
};

// Стилизованные компоненты
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 400px;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--card-color);
  box-shadow: var(--shadow);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTag = styled.span`
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
`;

const DifficultyTag = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CardQuestion = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CardAnswer = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Formula = styled.div`
  font-family: 'Times New Roman', serif;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background-color: rgba(74, 107, 255, 0.1);
  color: var(--primary-color);
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
`;

const BookmarkButton = styled.button<{ isBookmarked: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  color: ${(props) => (props.isBookmarked ? '#FFD700' : 'var(--light-text-color)')};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${(props) => (props.isBookmarked ? '#FFD700' : 'var(--primary-color)')};
  }
`;

const FlipHint = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: var(--light-text-color);
`;

const CardControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
`;

const NavigationButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: var(--light-text-color);
    cursor: not-allowed;
  }
`;

const CardCounter = styled.span`
  font-size: 14px;
  color: var(--light-text-color);
`;

const TestControls = styled.div`
  display: flex;
  gap: 10px;
`;

const AnswerButton = styled.button<{ correct: boolean }>`
  background-color: ${(props) => (props.correct ? 'var(--success-color)' : 'var(--error-color)')};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const SimulationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: var(--card-color);
  border-radius: 12px;
`;

export default FlashCard; 