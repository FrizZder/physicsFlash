import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>PhysicsFlash</FooterLogo>
          <FooterDescription>
            Платформа для интерактивного изучения физики с помощью карточек.
            Улучшайте знания и навыки в увлекательной и эффективной форме.
          </FooterDescription>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Навигация</FooterTitle>
          <FooterLinks>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/cards">Карточки</FooterLink>
            <FooterLink to="/favorites">Избранное</FooterLink>
            <FooterLink to="/stats">Статистика</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Разделы физики</FooterTitle>
          <FooterLinks>
            <FooterLink to="/section/Механика">Механика</FooterLink>
            <FooterLink to="/section/Термодинамика">Термодинамика</FooterLink>
            <FooterLink to="/section/Электродинамика">Электродинамика</FooterLink>
            <FooterLink to="/section/Оптика">Оптика</FooterLink>
            <FooterLink to="/section/Квантовая физика">Квантовая физика</FooterLink>
            <FooterLink to="/section/Астрономия">Астрономия</FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>© {currentYear} PhysicsFlash. Все права защищены.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

// Стилизованные компоненты
const FooterContainer = styled.footer`
  background-color: var(--card-color);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 0 0;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.h2`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  color: var(--light-text-color);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const FooterTitle = styled.h3`
  color: var(--text-color);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 40px;
    height: 2px;
    background-color: var(--primary-color);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: var(--light-text-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FooterBottom = styled.div`
  background-color: rgba(0, 0, 0, 0.02);
  padding: 1rem;
  margin-top: 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: var(--light-text-color);
  font-size: 0.8rem;
`;

export default Footer; 