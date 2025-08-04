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
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
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
  es: {
    'app.title': 'Bienestar Holístico',
    'nav.home': 'Inicio',
    'nav.acupressure': 'Acupresión',
    'nav.breathing': 'Respiración',
    'nav.premium': 'Premium',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    'hero.title': 'Transforma tu vida con terapias holísticas',
    'hero.subtitle': 'Acupresión, respiración 4-7-8, cromoterapia y sonidos armonizantes en una plataforma',
    'breathing.title': 'Técnica de Respiración 4-7-8',
    'breathing.inhale': 'Inhalar',
    'breathing.hold': 'Mantener',
    'breathing.exhale': 'Exhalar',
    'breathing.start': 'Iniciar Sesión',
    'breathing.stop': 'Parar',
    'login.title': 'Iniciar sesión en tu cuenta',
    'login.email': 'Correo',
    'login.password': 'Contraseña',
    'login.submit': 'Iniciar Sesión',
    'login.forgot': '¿Olvidaste tu contraseña?',
    'premium.title': 'Área Premium',
    'premium.whatsapp': 'Consulta por WhatsApp',
    'premium.points': 'Puntos Específicos',
    'premium.upgrade': 'Actualizar Ahora',
    'acupressure.title': 'Acupresión y Craneoterapia',
    'acupressure.select': 'Seleccionar un Punto',
    'acupressure.instructions': 'Cómo Aplicar',
  },
  fr: {
    'app.title': 'Bien-être Holistique',
    'nav.home': 'Accueil',
    'nav.acupressure': 'Acupression',
    'nav.breathing': 'Respiration',
    'nav.premium': 'Premium',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',
    'hero.title': 'Transformez votre vie avec les thérapies holistiques',
    'hero.subtitle': 'Acupression, respiration 4-7-8, chromothérapie et sons harmonisants sur une plateforme',
    'breathing.title': 'Technique de Respiration 4-7-8',
    'breathing.inhale': 'Inspirer',
    'breathing.hold': 'Retenir',
    'breathing.exhale': 'Expirer',
    'breathing.start': 'Commencer la Session',
    'breathing.stop': 'Arrêter',
    'login.title': 'Connectez-vous à votre compte',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.submit': 'Se connecter',
    'login.forgot': 'Mot de passe oublié?',
    'premium.title': 'Zone Premium',
    'premium.whatsapp': 'Consultation WhatsApp',
    'premium.points': 'Points Spécifiques',
    'premium.upgrade': 'Mettre à niveau',
    'acupressure.title': 'Acupression et Craniothérapie',
    'acupressure.select': 'Sélectionner un Point',
    'acupressure.instructions': 'Comment Appliquer',
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