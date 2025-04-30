import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PhysicsSection } from '../types';

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Изучайте физику интерактивно</HeroTitle>
          <HeroSubtitle>
            PhysicsFlash помогает улучшить понимание физики с помощью интерактивных карточек
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton to="/cards">Начать обучение</PrimaryButton>
          </HeroButtons>
        </HeroContent>
        <HeroImage>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4a6bff"
              d="M46.5,-72.3C60.9,-65.3,73.5,-54.1,79.8,-40.1C86.2,-26.1,86.2,-9.2,83.4,6.5C80.6,22.2,74.8,36.6,65.1,48.7C55.3,60.8,41.5,70.5,26.7,75.3C11.9,80.1,-3.9,80,-18.6,75.5C-33.2,71,-46.7,62.1,-58.1,50.4C-69.5,38.6,-78.7,24,-81.6,8.2C-84.5,-7.6,-81.1,-24.8,-72.5,-38.6C-63.9,-52.4,-50.1,-62.9,-36,-68.8C-21.8,-74.8,-7.3,-76.3,7.7,-77.4C22.6,-78.4,32.1,-79.2,46.5,-72.3Z"
              transform="translate(100 100)"
            />
          </svg>
          <PhysicsImage src="https://cdn-icons-png.flaticon.com/512/1753/1753755.png" alt="Physics concept" />
        </HeroImage>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Что вы найдете в PhysicsFlash</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📚</FeatureIcon>
            <FeatureTitle>Карточки по всем разделам</FeatureTitle>
            <FeatureDescription>
              Более 90 карточек, охватывающих ключевые понятия и формулы по всем разделам физики
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🎮</FeatureIcon>
            <FeatureTitle>Режимы обучения</FeatureTitle>
            <FeatureDescription>
              Обучайтесь последовательно, проверяйте знания в режиме теста или играйте для увлекательного запоминания
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Отслеживание прогресса</FeatureTitle>
            <FeatureDescription>
              Анализируйте свой прогресс и фокусируйтесь на сложных темах для эффективного обучения
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <SectionsSection>
        <SectionTitle>Выберите раздел для изучения</SectionTitle>
        <SectionsGrid>
          {Object.values(PhysicsSection).map((section) => (
            <SectionCard key={section} to={`/section/${section}`}>
              <SectionIcon>{getSectionIcon(section)}</SectionIcon>
              <SectionCardTitle>{section}</SectionCardTitle>
              <SectionCardDescription>{getSectionDescription(section)}</SectionCardDescription>
            </SectionCard>
          ))}
        </SectionsGrid>
      </SectionsSection>

      <CTASection>
        <CTAContent>
          <CTATitle>Готовы начать?</CTATitle>
          <CTADescription>
            Присоединяйтесь к тысячам студентов, которые уже улучшили свои знания по физике с помощью PhysicsFlash
          </CTADescription>
          <PrimaryButton to="/cards">Начать бесплатно</PrimaryButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  );
};

// Вспомогательные функции
const getSectionIcon = (section: PhysicsSection): string => {
  switch (section) {
    case PhysicsSection.MECHANICS:
      return '🔄';
    case PhysicsSection.THERMODYNAMICS:
      return '🔥';
    case PhysicsSection.ELECTRODYNAMICS:
      return '⚡';
    case PhysicsSection.OPTICS:
      return '🔍';
    case PhysicsSection.QUANTUM:
      return '🔬';
    case PhysicsSection.ASTRONOMY:
      return '🔭';
    default:
      return '📘';
  }
};

const getSectionDescription = (section: PhysicsSection): string => {
  switch (section) {
    case PhysicsSection.MECHANICS:
      return 'Изучите основные законы движения, силы, энергию и импульс';
    case PhysicsSection.THERMODYNAMICS:
      return 'Теплота, температура, энтропия и основные начала термодинамики';
    case PhysicsSection.ELECTRODYNAMICS:
      return 'Электричество, магнетизм и электромагнитное взаимодействие';
    case PhysicsSection.OPTICS:
      return 'Природа света, отражение, преломление и волновые свойства';
    case PhysicsSection.QUANTUM:
      return 'Квантовая механика, волны материи и вероятностная природа';
    case PhysicsSection.ASTRONOMY:
      return 'Изучение космических объектов, их движения и структуры Вселенной';
    default:
      return '';
  }
};

// Стилизованные компоненты
const HomeContainer = styled.div`
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 0;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--light-text-color);
  margin-bottom: 2rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
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

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: rgba(74, 107, 255, 0.1);
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(74, 107, 255, 0.2);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  position: relative;
  
  svg {
    width: 100%;
    height: auto;
    max-width: 400px;
  }
`;

const PhysicsImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--text-color);
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: var(--card-color);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const FeatureDescription = styled.p`
  color: var(--light-text-color);
  line-height: 1.6;
`;

const SectionsSection = styled.section`
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SectionCard = styled(Link)`
  background-color: var(--card-color);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SectionCardTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const SectionCardDescription = styled.p`
  color: var(--light-text-color);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const CTASection = styled.section`
  background-color: rgba(74, 107, 255, 0.05);
  padding: 4rem 0;
  margin: 4rem 0;
  border-radius: 10px;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  color: var(--light-text-color);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export default HomePage; 