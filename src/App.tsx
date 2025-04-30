import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Navigation/Header';
import Footer from './components/Navigation/Footer';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import FavoritesPage from './pages/FavoritesPage';
import StatsPage from './pages/StatsPage';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/section/:section" element={<CardsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default App;
