import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FlashCard, PhysicsSection } from '../types';
import { getAllCards } from '../services/cardService';

const FavoritesPage: React.FC = () => {
  // В реальном приложении список избранных карточек должен храниться в localStorage или на сервере
  // Здесь мы просто симулируем это с помощью useState
  const [favoriteCards, setFavoriteCards] = useState<FlashCard[]>([]);
  const [activeSection, setActiveSection] = useState<PhysicsSection | 'all'>('all');

  // Для демонстрации добавим несколько карточек в избранное
  useEffect(() => {
    // Имитация загрузки избранных карточек из localStorage
    const savedFavorites = localStorage.getItem('favoriteCards');
    const allCards = getAllCards();
    
    if (savedFavorites) {
      try {
        const favoriteIds = JSON.parse(savedFavorites) as string[];
        const favorites = allCards.filter(card => favoriteIds.includes(card.id));
        setFavoriteCards(favorites);
      } catch (e) {
        console.error('Ошибка при загрузке избранных карточек', e);
        // Для демонстрации используем первые несколько карточек
        setFavoriteCards(allCards.slice(0, 3));
      }
    } else {
      // Для демонстрации используем первые несколько карточек
      setFavoriteCards(allCards.slice(0, 3));
      
      // Сохраняем в localStorage для последующих посещений
      localStorage.setItem('favoriteCards', JSON.stringify(allCards.slice(0, 3).map(card => card.id)));
    }
  }, []);

  // Фильтрация карточек по разделу
  const filteredCards = activeSection === 'all'
    ? favoriteCards
    : favoriteCards.filter(card => card.section === activeSection);

  // Удаление карточки из избранного
  const removeFromFavorites = (cardId: string) => {
    const updatedFavorites = favoriteCards.filter(card => card.id !== cardId);
    setFavoriteCards(updatedFavorites);
    
    // Обновляем localStorage
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites.map(card => card.id)));
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Избранные карточки</h1>
        <PageDescription>
          Здесь собраны все карточки, которые вы отметили как избранные для быстрого доступа и повторения.
        </PageDescription>
      </PageHeader>

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
            <FilterButton
              key={section}
              isActive={activeSection === section}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </FilterButton>
          ))}
        </FilterButtons>
      </FilterContainer>

      {filteredCards.length > 0 ? (
        <CardsGrid>
          {filteredCards.map(card => (
            <FavoriteCard key={card.id}>
              <CardSection>{card.section}</CardSection>
              <CardQuestion>{card.question}</CardQuestion>
              <CardPreview>
                {card.formula ? (
                  <Formula>{card.formula}</Formula>
                ) : (
                  <AnswerPreview>{card.answer.substring(0, 100)}...</AnswerPreview>
                )}
              </CardPreview>
              <CardActions>
                <RemoveButton onClick={() => removeFromFavorites(card.id)}>
                  Удалить из избранного
                </RemoveButton>
                <ViewButton to={`/section/${card.section}?card=${card.id}`}>
                  Перейти к карточке
                </ViewButton>
              </CardActions>
            </FavoriteCard>
          ))}
        </CardsGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>У вас пока нет избранных карточек</EmptyStateTitle>
          <EmptyStateDescription>
            Добавляйте карточки в избранное, нажимая на звездочку при просмотре карточек.
          </EmptyStateDescription>
          <PrimaryButton to="/cards">Перейти к карточкам</PrimaryButton>
        </EmptyState>
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FavoriteCard = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardSection = styled.span`
  background-color: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  align-self: flex-start;
  margin-bottom: 1rem;
`;

const CardQuestion = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const CardPreview = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
`;

const AnswerPreview = styled.p`
  color: var(--light-text-color);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Formula = styled.div`
  font-family: 'Times New Roman', serif;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  color: var(--text-color);
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const RemoveButton = styled.button`
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

const ViewButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--card-color);
  border-radius: 10px;
  box-shadow: var(--shadow);
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const EmptyStateDescription = styled.p`
  color: var(--light-text-color);
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

export default FavoritesPage; 