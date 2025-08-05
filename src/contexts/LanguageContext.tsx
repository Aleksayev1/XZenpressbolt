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
    // Navigation
    'nav.home': 'Início',
    'nav.acupressure': 'Acupressão',
    'nav.breathing': 'Respiração',
    'nav.premium': 'Premium',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',
    
    // Breathing Exercise
    'breathing.title': 'Técnica de Respiração 4-7-8',
    'breathing.inhale': 'Inspire',
    'breathing.hold': 'Segure',
    'breathing.exhale': 'Expire',
    'breathing.start': 'Iniciar Sessão',
    'breathing.stop': 'Parar',
    'breathing.reset': 'Reset',
    'breathing.totalTime': 'Tempo Total',
    
    // Chromotherapy
    'breathing.chromotherapy.title': 'Cromoterapia Integrada',
    'breathing.chromotherapy.description': 'Cada cor possui propriedades terapêuticas específicas que potencializam os benefícios da respiração 4-7-8',
    'breathing.chromotherapy.blue': 'Azul - Calma e Tranquilidade',
    'breathing.chromotherapy.blue.desc': 'Durante a inspiração, o azul promove relaxamento profundo e reduz a ansiedade.',
    'breathing.chromotherapy.green': 'Verde - Equilíbrio e Harmonia',
    'breathing.chromotherapy.green.desc': 'Na retenção, o verde equilibra o sistema nervoso e promove estabilidade emocional.',
    'breathing.chromotherapy.magenta': 'Magenta - Renovação e Energia',
    'breathing.chromotherapy.magenta.desc': 'Na expiração, o magenta facilita a liberação de tensões e renova a energia vital.',
    'breathing.chromotherapy.blue.short': 'Azul da Calma',
    'breathing.chromotherapy.green.short': 'Verde do Equilíbrio',
    'breathing.chromotherapy.magenta.short': 'Magenta da Renovação',
    
    // Benefits
    'breathing.benefits.title': 'Benefícios da Técnica 4-7-8',
    'breathing.benefits.stress': 'Reduz estresse e ansiedade',
    'breathing.benefits.sleep': 'Melhora qualidade do sono',
    'breathing.benefits.focus': 'Aumenta foco e concentração',
    'breathing.benefits.pressure': 'Regula pressão arterial',
    
    // Sounds
    'breathing.sounds.title': 'Sons Harmonizantes',
    'breathing.sounds.free.title': '🎵 Sons Gratuitos',
    'breathing.sounds.premium.title': '🎼 Sons Premium',
    'breathing.sounds.ocean': 'Sons do Mar',
    'breathing.sounds.ocean.desc': 'Ondas relaxantes do oceano',
    'breathing.sounds.rain': 'Chuva Suave',
    'breathing.sounds.rain.desc': 'Som calmante de chuva',
    'breathing.sounds.forest': 'Floresta',
    'breathing.sounds.fireplace': 'Lareira',
    'breathing.sounds.classical': 'Música Clássica',
    'breathing.sounds.mantras': 'Mantras',
    'breathing.sounds.more': '+ 46 mais',
    'breathing.sounds.play': 'Reproduzir',
    'breathing.sounds.pause': 'Pausar',
    'breathing.sounds.stop': 'Parar Tudo',
    'breathing.sounds.volume': 'Volume',
    'breathing.sounds.premium.desc': 'Desbloqueie nossa biblioteca completa com mais de 50 sons relaxantes e integração com Spotify Premium',
    'breathing.sounds.premium.upgrade': 'Fazer Upgrade',
    'breathing.sounds.premium.spotify': 'Spotify Premium',
    
    // Science
    'breathing.science.title': 'Base Científica da Técnica 4-7-8',
    'breathing.science.evidence': 'Evidências Científicas',
    'breathing.science.chromotherapy': 'Cromoterapia Científica',
    'breathing.science.parasympathetic': 'Ativa o sistema nervoso parassimpático',
    'breathing.science.cortisol': 'Reduz cortisol (hormônio do estresse)',
    'breathing.science.heartRate': 'Melhora variabilidade da frequência cardíaca',
    'breathing.science.gaba': 'Aumenta produção de GABA (neurotransmissor calmante)',
    'breathing.science.blue.effect': 'Azul: Reduz pressão arterial e frequência cardíaca',
    'breathing.science.green.effect': 'Verde: Equilibra sistema nervoso autônomo',
    'breathing.science.magenta.effect': 'Magenta: Estimula liberação de endorfinas',
    'breathing.science.melatonin': 'Cores influenciam produção de melatonina',
    
    // Phase details
    'breathing.phase': 'Fase',
    'breathing.phase.inhale.detail': 'Inspiração (4 segundos)',
    'breathing.phase.hold.detail': 'Retenção (7 segundos)',
    'breathing.phase.exhale.detail': 'Expiração (8 segundos)',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.acupressure': 'Acupressure',
    'nav.breathing': 'Breathing',
    'nav.premium': 'Premium',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Breathing Exercise
    'breathing.title': '4-7-8 Breathing Technique',
    'breathing.inhale': 'Inhale',
    'breathing.hold': 'Hold',
    'breathing.exhale': 'Exhale',
    'breathing.start': 'Start Session',
    'breathing.stop': 'Stop',
    'breathing.reset': 'Reset',
    'breathing.totalTime': 'Total Time',
    
    // Chromotherapy
    'breathing.chromotherapy.title': 'Integrated Chromotherapy',
    'breathing.chromotherapy.description': 'Each color has specific therapeutic properties that enhance the benefits of 4-7-8 breathing',
    'breathing.chromotherapy.blue': 'Blue - Calm and Tranquility',
    'breathing.chromotherapy.blue.desc': 'During inhalation, blue promotes deep relaxation and reduces anxiety.',
    'breathing.chromotherapy.green': 'Green - Balance and Harmony',
    'breathing.chromotherapy.green.desc': 'During retention, green balances the nervous system and promotes emotional stability.',
    'breathing.chromotherapy.magenta': 'Magenta - Renewal and Energy',
    'breathing.chromotherapy.magenta.desc': 'During exhalation, magenta facilitates tension release and renews vital energy.',
    'breathing.chromotherapy.blue.short': 'Blue of Calm',
    'breathing.chromotherapy.green.short': 'Green of Balance',
    'breathing.chromotherapy.magenta.short': 'Magenta of Renewal',
    
    // Benefits
    'breathing.benefits.title': 'Benefits of 4-7-8 Technique',
    'breathing.benefits.stress': 'Reduces stress and anxiety',
    'breathing.benefits.sleep': 'Improves sleep quality',
    'breathing.benefits.focus': 'Increases focus and concentration',
    'breathing.benefits.pressure': 'Regulates blood pressure',
    
    // Sounds
    'breathing.sounds.title': 'Harmonizing Sounds',
    'breathing.sounds.free.title': '🎵 Free Sounds',
    'breathing.sounds.premium.title': '🎼 Premium Sounds',
    'breathing.sounds.ocean': 'Ocean Sounds',
    'breathing.sounds.ocean.desc': 'Relaxing ocean waves',
    'breathing.sounds.rain': 'Gentle Rain',
    'breathing.sounds.rain.desc': 'Calming rain sound',
    'breathing.sounds.forest': 'Forest',
    'breathing.sounds.fireplace': 'Fireplace',
    'breathing.sounds.classical': 'Classical Music',
    'breathing.sounds.mantras': 'Mantras',
    'breathing.sounds.more': '+ 46 more',
    'breathing.sounds.play': 'Play',
    'breathing.sounds.pause': 'Pause',
    'breathing.sounds.stop': 'Stop All',
    'breathing.sounds.volume': 'Volume',
    'breathing.sounds.premium.desc': 'Unlock our complete library with over 50 relaxing sounds and Spotify Premium integration',
    'breathing.sounds.premium.upgrade': 'Upgrade Now',
    'breathing.sounds.premium.spotify': 'Spotify Premium',
    
    // Science
    'breathing.science.title': 'Scientific Basis of 4-7-8 Technique',
    'breathing.science.evidence': 'Scientific Evidence',
    'breathing.science.chromotherapy': 'Scientific Chromotherapy',
    'breathing.science.parasympathetic': 'Activates parasympathetic nervous system',
    'breathing.science.cortisol': 'Reduces cortisol (stress hormone)',
    'breathing.science.heartRate': 'Improves heart rate variability',
    'breathing.science.gaba': 'Increases GABA production (calming neurotransmitter)',
    'breathing.science.blue.effect': 'Blue: Reduces blood pressure and heart rate',
    'breathing.science.green.effect': 'Green: Balances autonomic nervous system',
    'breathing.science.magenta.effect': 'Magenta: Stimulates endorphin release',
    'breathing.science.melatonin': 'Colors influence melatonin production',
    
    // Phase details
    'breathing.phase': 'Phase',
    'breathing.phase.inhale.detail': 'Inhalation (4 seconds)',
    'breathing.phase.hold.detail': 'Retention (7 seconds)',
    'breathing.phase.exhale.detail': 'Exhalation (8 seconds)',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.acupressure': 'Acupresión',
    'nav.breathing': 'Respiración',
    'nav.premium': 'Premium',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    
    // Breathing Exercise
    'breathing.title': 'Técnica de Respiración 4-7-8',
    'breathing.inhale': 'Inhalar',
    'breathing.hold': 'Mantener',
    'breathing.exhale': 'Exhalar',
    'breathing.start': 'Iniciar Sesión',
    'breathing.stop': 'Parar',
    'breathing.reset': 'Reset',
    'breathing.totalTime': 'Tiempo Total',
    
    // Chromotherapy
    'breathing.chromotherapy.title': 'Cromoterapia Integrada',
    'breathing.chromotherapy.description': 'Cada color tiene propiedades terapéuticas específicas que potencian los beneficios de la respiración 4-7-8',
    'breathing.chromotherapy.blue': 'Azul - Calma y Tranquilidad',
    'breathing.chromotherapy.blue.desc': 'Durante la inhalación, el azul promueve relajación profunda y reduce la ansiedad.',
    'breathing.chromotherapy.green': 'Verde - Equilibrio y Armonía',
    'breathing.chromotherapy.green.desc': 'Durante la retención, el verde equilibra el sistema nervioso y promueve estabilidad emocional.',
    'breathing.chromotherapy.magenta': 'Magenta - Renovación y Energía',
    'breathing.chromotherapy.magenta.desc': 'Durante la exhalación, el magenta facilita la liberación de tensiones y renueva la energía vital.',
    'breathing.chromotherapy.blue.short': 'Azul de la Calma',
    'breathing.chromotherapy.green.short': 'Verde del Equilibrio',
    'breathing.chromotherapy.magenta.short': 'Magenta de la Renovación',
    
    // Benefits
    'breathing.benefits.title': 'Beneficios de la Técnica 4-7-8',
    'breathing.benefits.stress': 'Reduce estrés y ansiedad',
    'breathing.benefits.sleep': 'Mejora calidad del sueño',
    'breathing.benefits.focus': 'Aumenta enfoque y concentración',
    'breathing.benefits.pressure': 'Regula presión arterial',
    
    // Sounds
    'breathing.sounds.title': 'Sonidos Armonizantes',
    'breathing.sounds.free.title': '🎵 Sonidos Gratuitos',
    'breathing.sounds.premium.title': '🎼 Sonidos Premium',
    'breathing.sounds.ocean': 'Sonidos del Mar',
    'breathing.sounds.ocean.desc': 'Olas relajantes del océano',
    'breathing.sounds.rain': 'Lluvia Suave',
    'breathing.sounds.rain.desc': 'Sonido calmante de lluvia',
    'breathing.sounds.forest': 'Bosque',
    'breathing.sounds.fireplace': 'Chimenea',
    'breathing.sounds.classical': 'Música Clásica',
    'breathing.sounds.mantras': 'Mantras',
    'breathing.sounds.more': '+ 46 más',
    'breathing.sounds.play': 'Reproducir',
    'breathing.sounds.pause': 'Pausar',
    'breathing.sounds.stop': 'Parar Todo',
    'breathing.sounds.volume': 'Volumen',
    'breathing.sounds.premium.desc': 'Desbloquea nuestra biblioteca completa con más de 50 sonidos relajantes e integración con Spotify Premium',
    'breathing.sounds.premium.upgrade': 'Actualizar Ahora',
    'breathing.sounds.premium.spotify': 'Spotify Premium',
    
    // Science
    'breathing.science.title': 'Base Científica de la Técnica 4-7-8',
    'breathing.science.evidence': 'Evidencia Científica',
    'breathing.science.chromotherapy': 'Cromoterapia Científica',
    'breathing.science.parasympathetic': 'Activa el sistema nervioso parasimpático',
    'breathing.science.cortisol': 'Reduce cortisol (hormona del estrés)',
    'breathing.science.heartRate': 'Mejora variabilidad de frecuencia cardíaca',
    'breathing.science.gaba': 'Aumenta producción de GABA (neurotransmisor calmante)',
    'breathing.science.blue.effect': 'Azul: Reduce presión arterial y frecuencia cardíaca',
    'breathing.science.green.effect': 'Verde: Equilibra sistema nervioso autónomo',
    'breathing.science.magenta.effect': 'Magenta: Estimula liberación de endorfinas',
    'breathing.science.melatonin': 'Los colores influyen en la producción de melatonina',
    
    // Phase details
    'breathing.phase': 'Fase',
    'breathing.phase.inhale.detail': 'Inhalación (4 segundos)',
    'breathing.phase.hold.detail': 'Retención (7 segundos)',
    'breathing.phase.exhale.detail': 'Exhalación (8 segundos)',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.acupressure': 'Acupression',
    'nav.breathing': 'Respiration',
    'nav.premium': 'Premium',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',
    
    // Breathing Exercise
    'breathing.title': 'Technique de Respiration 4-7-8',
    'breathing.inhale': 'Inspirer',
    'breathing.hold': 'Retenir',
    'breathing.exhale': 'Expirer',
    'breathing.start': 'Commencer la Session',
    'breathing.stop': 'Arrêter',
    'breathing.reset': 'Reset',
    'breathing.totalTime': 'Temps Total',
    
    // Chromotherapy
    'breathing.chromotherapy.title': 'Chromothérapie Intégrée',
    'breathing.chromotherapy.description': 'Chaque couleur possède des propriétés thérapeutiques spécifiques qui potentialisent les bienfaits de la respiration 4-7-8',
    'breathing.chromotherapy.blue': 'Bleu - Calme et Tranquillité',
    'breathing.chromotherapy.blue.desc': 'Pendant l\'inspiration, le bleu favorise la relaxation profonde et réduit l\'anxiété.',
    'breathing.chromotherapy.green': 'Vert - Équilibre et Harmonie',
    'breathing.chromotherapy.green.desc': 'Pendant la rétention, le vert équilibre le système nerveux et favorise la stabilité émotionnelle.',
    'breathing.chromotherapy.magenta': 'Magenta - Renouveau et Énergie',
    'breathing.chromotherapy.magenta.desc': 'Pendant l\'expiration, le magenta facilite la libération des tensions et renouvelle l\'énergie vitale.',
    'breathing.chromotherapy.blue.short': 'Bleu du Calme',
    'breathing.chromotherapy.green.short': 'Vert de l\'Équilibre',
    'breathing.chromotherapy.magenta.short': 'Magenta du Renouveau',
    
    // Benefits
    'breathing.benefits.title': 'Bénéfices de la Technique 4-7-8',
    'breathing.benefits.stress': 'Réduit stress et anxiété',
    'breathing.benefits.sleep': 'Améliore qualité du sommeil',
    'breathing.benefits.focus': 'Augmente concentration et focus',
    'breathing.benefits.pressure': 'Régule tension artérielle',
    
    // Sounds
    'breathing.sounds.title': 'Sons Harmonisants',
    'breathing.sounds.free.title': '🎵 Sons Gratuits',
    'breathing.sounds.premium.title': '🎼 Sons Premium',
    'breathing.sounds.ocean': 'Sons de l\'Océan',
    'breathing.sounds.ocean.desc': 'Vagues relaxantes de l\'océan',
    'breathing.sounds.rain': 'Pluie Douce',
    'breathing.sounds.rain.desc': 'Son calmant de pluie',
    'breathing.sounds.forest': 'Forêt',
    'breathing.sounds.fireplace': 'Cheminée',
    'breathing.sounds.classical': 'Musique Classique',
    'breathing.sounds.mantras': 'Mantras',
    'breathing.sounds.more': '+ 46 de plus',
    'breathing.sounds.play': 'Jouer',
    'breathing.sounds.pause': 'Pause',
    'breathing.sounds.stop': 'Arrêter Tout',
    'breathing.sounds.volume': 'Volume',
    'breathing.sounds.premium.desc': 'Débloquez notre bibliothèque complète avec plus de 50 sons relaxants et intégration Spotify Premium',
    'breathing.sounds.premium.upgrade': 'Mettre à Niveau',
    'breathing.sounds.premium.spotify': 'Spotify Premium',
    
    // Science
    'breathing.science.title': 'Base Scientifique de la Technique 4-7-8',
    'breathing.science.evidence': 'Preuves Scientifiques',
    'breathing.science.chromotherapy': 'Chromothérapie Scientifique',
    'breathing.science.parasympathetic': 'Active le système nerveux parasympathique',
    'breathing.science.cortisol': 'Réduit le cortisol (hormone du stress)',
    'breathing.science.heartRate': 'Améliore la variabilité de la fréquence cardiaque',
    'breathing.science.gaba': 'Augmente la production de GABA (neurotransmetteur calmant)',
    'breathing.science.blue.effect': 'Bleu: Réduit tension artérielle et fréquence cardiaque',
    'breathing.science.green.effect': 'Vert: Équilibre système nerveux autonome',
    'breathing.science.magenta.effect': 'Magenta: Stimule libération d\'endorphines',
    'breathing.science.melatonin': 'Les couleurs influencent la production de mélatonine',
    
    // Phase details
    'breathing.phase': 'Phase',
    'breathing.phase.inhale.detail': 'Inspiration (4 secondes)',
    'breathing.phase.hold.detail': 'Rétention (7 secondes)',
    'breathing.phase.exhale.detail': 'Expiration (8 secondes)',
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
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return languages.find(lang => lang.code === savedLanguage) || languages[0];
  });

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