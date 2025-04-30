import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PhysicsSection } from '../../types';
import { getOverallProgress } from '../../services/progressService';
import ProgressBar from '../Progress/ProgressBar';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setOverallProgress(getOverallProgress());
    
    // Обновляем прогресс при навигации
    const updateProgress = () => {
      setOverallProgress(getOverallProgress());
    };
    
    window.addEventListener('storage', updateProgress);
    return () => {
      window.removeEventListener('storage', updateProgress);
    };
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/">
          <Logo>PhysicsFlash</Logo>
        </Link>
        <Tagline>Изучайте физику с помощью интерактивных карточек</Tagline>
      </LogoContainer>

      <MobileMenuButton onClick={toggleMenu}>
        <MenuIcon>☰</MenuIcon>
      </MobileMenuButton>

      <Navigation isOpen={isMenuOpen}>
        <NavLinks>
          <NavItem isActive={isActive('/')}>
            <NavLink to="/" onClick={closeMenu}>
              Главная
            </NavLink>
          </NavItem>
          <NavItem isActive={isActive('/cards')}>
            <NavLink to="/cards" onClick={closeMenu}>
              Карточки
            </NavLink>
          </NavItem>
          <NavItem isActive={isActive('/favorites')}>
            <NavLink to="/favorites" onClick={closeMenu}>
              Избранное
            </NavLink>
          </NavItem>
          <NavItem isActive={isActive('/stats')}>
            <NavLink to="/stats" onClick={closeMenu}>
              Статистика
              {overallProgress > 0 && (
                <ProgressIndicator>
                  <ProgressValue>{overallProgress}%</ProgressValue>
                </ProgressIndicator>
              )}
            </NavLink>
          </NavItem>
        </NavLinks>

        <SearchAndSettings>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Поиск по карточкам..."
              aria-label="Поиск по карточкам"
            />
            <SearchButton aria-label="Начать поиск">🔍</SearchButton>
          </SearchContainer>

          <DarkModeToggle
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Переключиться на светлую тему' : 'Переключиться на тёмную тему'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </DarkModeToggle>
        </SearchAndSettings>
      </Navigation>

      <SectionNav>
        <SectionList>
          {Object.values(PhysicsSection).map((section) => (
            <SectionItem key={section}>
              <SectionLink to={`/section/${section}`}>
                {section}
              </SectionLink>
            </SectionItem>
          ))}
        </SectionList>
      </SectionNav>
      
      {/* Полоса общего прогресса */}
      <ProgressContainer>
        <ProgressBar progress={overallProgress} height={4} showPercentage={false} />
      </ProgressContainer>
    </HeaderContainer>
  );
};

// Стилизованные компоненты
const HeaderContainer = styled.header`
  background-color: var(--card-color);
  box-shadow: var(--shadow);
  padding: 1rem 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Logo = styled.h1`
  color: var(--primary-color);
  font-size: 2rem;
  margin: 0;
`;

const Tagline = styled.p`
  color: var(--light-text-color);
  font-size: 0.9rem;
  margin: 0;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
`;

const MenuIcon = styled.span`
  font-size: 1.5rem;
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    width: 100%;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
`;

const NavItem = styled.li<{ isActive: boolean }>`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    opacity: ${(props) => (props.isActive ? '1' : '0')};
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem 0;
    
    &::after {
      bottom: 0;
    }
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SearchAndSettings = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.9rem;
  width: 200px;
  background-color: var(--background-color);
  color: var(--text-color);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--light-text-color);
  cursor: pointer;
`;

const DarkModeToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-color);
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(15deg);
  }
`;

const SectionNav = styled.div`
  margin-top: 1rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 3px;
  }
`;

const SectionList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

const SectionItem = styled.li`
  white-space: nowrap;
`;

const SectionLink = styled(Link)`
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  background-color: rgba(74, 107, 255, 0.1);
  color: var(--primary-color);
  font-size: 0.9rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(74, 107, 255, 0.2);
  }
`;

// Добавляем новые стили для индикатора прогресса
const ProgressIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.6rem;
  font-weight: bold;
  margin-left: 5px;
  position: relative;
  top: -1px;
`;

const ProgressValue = styled.span`
  display: block;
  text-align: center;
`;

const ProgressContainer = styled.div`
  width: 100%;
  padding: 0;
  overflow: hidden;
  margin-top: 5px;
`;

export default Header; 