import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const translations: Record<string, Record<string, string>> = {
  pt: {
    'app.title': 'Bem-Estar Holístico',
    'nav.home': 'Início',
    'nav.acupressure': 'Acupressão',
    'nav.breathing': 'Respiração',
    'nav.premium': 'Premium',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',
    'hero.title': 'Transforme sua vida com terapias holísticas',
    'hero.subtitle': 'Acupressão, respiração 4-7-8, cromoterapia e sons harmonizantes em uma plataforma única',
    'breathing.title': 'Técnica de Respiração 4-7-8',
    'breathing.inhale': 'Inspire',
    'breathing.hold': 'Segure',
    'breathing.exhale': 'Expire',
    'breathing.start': 'Iniciar Sessão',
    'breathing.stop': 'Parar',
    'login.title': 'Entrar na sua conta',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.submit': 'Entrar',
    'login.forgot': 'Esqueceu a senha?',
    'premium.title': 'Área Premium',
    'premium.whatsapp': 'Consulta via WhatsApp',
    'premium.points': 'Pontos Específicos',
    'premium.upgrade': 'Fazer Upgrade',
    'acupressure.title': 'Acupressão & Cranioterapia',
    'acupressure.select': 'Selecione um Ponto',
    'acupressure.instructions': 'Como Aplicar',
  },
  en: {
    'app.title': 'Holistic Wellness',
    'nav.home': 'Home',
    'nav.acupressure': 'Acupressure',
    'nav.breathing': 'Breathing',
    'nav.premium': 'Premium',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'hero.title': 'Transform your life with holistic therapies',
    'hero.subtitle': 'Acupressure, 4-7-8 breathing, chromotherapy and harmonizing sounds in one platform',
    'breathing.title': '4-7-8 Breathing Technique',
    'breathing.inhale': 'Inhale',
    'breathing.hold': 'Hold',
    'breathing.exhale': 'Exhale',
    'breathing.start': 'Start Session',
    'breathing.stop': 'Stop',
    'login.title': 'Login to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'login.forgot': 'Forgot password?',
    'premium.title': 'Premium Area',
    'premium.whatsapp': 'WhatsApp Consultation',
    'premium.points': 'Specific Points',
    'premium.upgrade': 'Upgrade Now',
    'acupressure.title': 'Acupressure & Craniotherapy',
    'acupressure.select': 'Select a Point',
    'acupressure.instructions': 'How to Apply',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language.code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { languages };