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
    'breathing.phase.inhale': 'Inspire (Azul da Calma)',
    'breathing.phase.hold': 'Segure (Verde do Equilíbrio)',
    'breathing.phase.exhale': 'Expire (Magenta da Renovação)',
    'breathing.chromotherapy.title': 'Cromoterapia Integrada',
    'breathing.chromotherapy.blue': 'Azul - Calma e Tranquilidade',
    'breathing.chromotherapy.blue.desc': 'Durante a inspiração, o azul promove relaxamento profundo e reduz a ansiedade.',
    'breathing.chromotherapy.green': 'Verde - Equilíbrio e Harmonia',
    'breathing.chromotherapy.green.desc': 'Na retenção, o verde equilibra o sistema nervoso e promove estabilidade emocional.',
    'breathing.chromotherapy.magenta': 'Magenta - Renovação e Energia',
    'breathing.chromotherapy.magenta.desc': 'Na expiração, o magenta facilita a liberação de tensões e renova a energia vital.',
    'breathing.benefits.title': 'Benefícios da Técnica 4-7-8',
    'breathing.benefits.stress': 'Reduz estresse e ansiedade',
    'breathing.benefits.sleep': 'Melhora qualidade do sono',
    'breathing.benefits.focus': 'Aumenta foco e concentração',
    'breathing.benefits.pressure': 'Regula pressão arterial',
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
    'breathing.phase.inhale': 'Inhale (Blue of Calm)',
    'breathing.phase.hold': 'Hold (Green of Balance)',
    'breathing.phase.exhale': 'Exhale (Magenta of Renewal)',
    'breathing.chromotherapy.title': 'Integrated Chromotherapy',
    'breathing.chromotherapy.blue': 'Blue - Calm and Tranquility',
    'breathing.chromotherapy.blue.desc': 'During inhalation, blue promotes deep relaxation and reduces anxiety.',
    'breathing.chromotherapy.green': 'Green - Balance and Harmony',
    'breathing.chromotherapy.green.desc': 'During retention, green balances the nervous system and promotes emotional stability.',
    'breathing.chromotherapy.magenta': 'Magenta - Renewal and Energy',
    'breathing.chromotherapy.magenta.desc': 'During exhalation, magenta facilitates tension release and renews vital energy.',
    'breathing.benefits.title': 'Benefits of 4-7-8 Technique',
    'breathing.benefits.stress': 'Reduces stress and anxiety',
    'breathing.benefits.sleep': 'Improves sleep quality',
    'breathing.benefits.focus': 'Increases focus and concentration',
    'breathing.benefits.pressure': 'Regulates blood pressure',
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