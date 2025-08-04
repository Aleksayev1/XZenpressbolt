import React from 'react';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { AcupressurePage } from './components/AcupressurePage';
import { BreathingExercise } from './components/BreathingExercise';
import { PremiumPage } from './components/PremiumPage';
import { LoginPage } from './components/LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'acupressure':
        return <AcupressurePage />;
      case 'breathing':
        return <BreathingExercise />;
      case 'premium':
        return <PremiumPage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
