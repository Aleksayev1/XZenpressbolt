import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.acupressure': 'Acupressão',
    'nav.breathing': 'Respiração',
    'nav.premium': 'Premium',
    'nav.corporate': 'Corporativo',
    'nav.blog': 'Blog',
    'nav.dashboard': 'Dashboard',
    'nav.sounds': 'Sons',
    'nav.progress': 'Progresso',
    'nav.personalization': 'Personalização',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',

    // Home Page
    'home.hero.title': 'XZenPress Wellness',
    'home.hero.subtitle': 'Plataforma completa de bem-estar integrativa com acupressão MTC, Craniopuntura, respiração 4-7-8 e cromoterapia avançada',
    'home.hero.startNow': 'Começar Agora',
    'home.hero.createAccount': 'Criar Conta',

    // Home Features
    'home.feature.acupressure.title': 'Acupressão MTC',
    'home.feature.acupressure.desc': '20 pontos terapêuticos da Medicina Tradicional Chinesa para alívio natural',
    'home.feature.breathing.title': 'Respiração 4-7-8',
    'home.feature.breathing.desc': 'Técnica científica de respiração com cromoterapia sincronizada',
    'home.feature.cranio.title': 'Craniopuntura',
    'home.feature.cranio.desc': 'Pontos especializados para sistema nervoso e função cerebral',
    'home.feature.chromotherapy.title': 'Cromoterapia Avançada',
    'home.feature.chromotherapy.desc': 'Cores terapêuticas sincronizadas com respiração para potencializar efeitos',
    'home.feature.sounds.title': 'Sons Harmonizantes',
    'home.feature.sounds.desc': 'Biblioteca de sons relaxantes com integração Spotify Premium',
    'home.feature.consultation.title': 'Consulta Especializada',
    'home.feature.consultation.desc': 'Atendimento personalizado via WhatsApp com profissional qualificado',

    'home.features.title': 'Recursos Terapêuticos',
    'home.features.subtitle': 'Combine técnicas milenares com tecnologia moderna para máximo bem-estar integrativo',

    'home.cta.title': 'Transforme sua Qualidade de Vida',
    'home.cta.subtitle': 'Junte-se a milhares de pessoas que já descobriram o poder das terapias integrativas',
    'home.cta.demo': 'Experimentar Grátis',
    'home.cta.corporate': 'Soluções Corporativas',

    'home.compliance.title': 'Compliance Legal Completo',
    'home.compliance.subtitle': 'Atendimento integral à legislação brasileira de saúde mental corporativa com abordagem integrativa',

    // Acupressure Page
    'acupressure.title': 'Pontos de Acupressão',
    'acupressure.subtitle': 'Medicina Tradicional Chinesa e Craniopuntura com terapia integrativa: acupressão + respiração + cromoterapia',
    'acupressure.categories.all': 'Todos os Pontos',
    'acupressure.categories.general': 'MTC Geral',
    'acupressure.categories.cranio': 'Craniopuntura',
    'acupressure.categories.septicemia': 'Septicemia',
    'acupressure.categories.atm': 'ATM',
    'acupressure.select.title': 'Selecione um Ponto',
    'acupressure.select.subtitle': 'Clique em um ponto para ver detalhes e iniciar a terapia integrada',
    'acupressure.timer.start': 'Iniciar Terapia Integrada',
    'acupressure.timer.active': 'Terapia em Andamento',
    'acupressure.timer.switch': 'Trocar para Este Ponto',

    // Breathing Exercise
    'breathing.title': 'Respiração 4-7-8 com Cromoterapia',
    'breathing.inhale': 'Inspire',
    'breathing.hold': 'Segure',
    'breathing.exhale': 'Expire',
    'breathing.start': 'Iniciar Respiração',
    'breathing.stop': 'Parar',
    'breathing.reset': 'Reiniciar',
    'breathing.totalTime': 'Tempo Total',
    'breathing.phase': 'Fase',
    'breathing.phase.inhale.detail': 'Inspiração com azul calmante',
    'breathing.phase.hold.detail': 'Retenção com verde equilibrante',
    'breathing.phase.exhale.detail': 'Expiração com roxo energizante',

    'breathing.chromotherapy.title': 'Cromoterapia Científica',
    'breathing.chromotherapy.description': 'Cores terapêuticas sincronizadas com cada fase da respiração para potencializar os efeitos',
    'breathing.chromotherapy.blue': 'Azul Calmante',
    'breathing.chromotherapy.blue.desc': 'Ativa o sistema parassimpático, reduz pressão arterial e promove relaxamento profundo',
    'breathing.chromotherapy.green': 'Verde Equilibrante',
    'breathing.chromotherapy.green.desc': 'Equilibra o sistema nervoso, harmoniza emoções e promove estabilidade',
    'breathing.chromotherapy.magenta': 'Roxo Energizante',
    'breathing.chromotherapy.magenta.desc': 'Estimula liberação de endorfinas e promove transformação energética',

    'breathing.benefits.title': 'Benefícios Comprovados',
    'breathing.benefits.stress': 'Reduz estresse e ansiedade',
    'breathing.benefits.sleep': 'Melhora qualidade do sono',
    'breathing.benefits.focus': 'Aumenta foco e concentração',
    'breathing.benefits.pressure': 'Reduz pressão arterial',

    'breathing.science.title': 'Base Científica',
    'breathing.science.evidence': 'Evidências Científicas',
    'breathing.science.parasympathetic': 'Ativa sistema parassimpático',
    'breathing.science.cortisol': 'Reduz níveis de cortisol',
    'breathing.science.heartRate': 'Melhora variabilidade cardíaca',
    'breathing.science.gaba': 'Aumenta produção de GABA',
    'breathing.science.chromotherapy': 'Cromoterapia Integrada',
    'breathing.science.blue.effect': 'Azul reduz pressão arterial',
    'breathing.science.green.effect': 'Verde equilibra sistema nervoso',
    'breathing.science.magenta.effect': 'Roxo estimula endorfinas',
    'breathing.science.melatonin': 'Melhora produção de melatonina',

    // Premium Page
    'premium.hero.title': 'Desbloqueie Todo o Potencial',
    'premium.hero.subtitle': 'Acesso completo a consultas especializadas e recursos exclusivos de medicina integrativa',
    'premium.hero.upgrade': 'Fazer Upgrade',
    'premium.hero.active': 'Premium Ativo',

    'premium.features.title': 'Recursos Premium',
    'premium.features.available': 'Disponível',
    'premium.features.coming': 'Em Breve',

    'premium.features.whatsapp.title': 'Consulta WhatsApp',
    'premium.features.whatsapp.description': 'Atendimento personalizado com profissional qualificado',
    'premium.features.whatsapp.benefit1': 'Profissional com 15+ anos de experiência',
    'premium.features.whatsapp.benefit2': 'Resposta prioritária em até 24h',
    'premium.features.whatsapp.benefit3': 'Formulário detalhado para casos complexos',
    'premium.features.whatsapp.benefit4': 'Acompanhamento contínuo do caso',

    'premium.features.points.title': 'Pontos Exclusivos',
    'premium.features.points.description': '11 pontos especializados para casos específicos',
    'premium.features.points.benefit1': 'Septicemia: 3 pontos para purificação',
    'premium.features.points.benefit2': 'ATM: 3 pontos para articulação',
    'premium.features.points.benefit3': 'Cranio: 3 pontos para sistema nervoso',
    'premium.features.points.benefit4': 'Neurologia: 2 pontos avançados',

    'premium.features.chromotherapy.title': 'Cromoterapia Avançada',
    'premium.features.chromotherapy.description': 'Sequências personalizadas de cores terapêuticas',
    'premium.features.chromotherapy.benefit1': 'Perfis adaptativos de cores',
    'premium.features.chromotherapy.benefit2': 'Sincronização com biofeedback',
    'premium.features.chromotherapy.benefit3': 'Sequências personalizadas',
    'premium.features.chromotherapy.benefit4': 'Cores baseadas no estado emocional',

    'premium.features.sounds.title': 'Biblioteca Completa',
    'premium.features.sounds.description': 'Mais de 50 sons + integração Spotify',
    'premium.features.sounds.benefit1': 'Frequências binaurais terapêuticas',
    'premium.features.sounds.benefit2': 'Integração completa com Spotify',
    'premium.features.sounds.benefit3': 'Sons de alta qualidade',
    'premium.features.sounds.benefit4': 'Playlists curadas por especialistas',

    'premium.features.ai.title': 'Recomendações IA',
    'premium.features.ai.description': 'Inteligência artificial personalizada',
    'premium.features.ai.benefit1': 'Análise de padrões comportamentais',
    'premium.features.ai.benefit2': 'Recomendações personalizadas',
    'premium.features.ai.benefit3': 'Otimização automática de sessões',
    'premium.features.ai.benefit4': 'Insights preditivos de bem-estar',

    'premium.features.offline.title': 'Modo Offline',
    'premium.features.offline.description': 'Funcionalidades completas sem internet',
    'premium.features.offline.benefit1': 'Sincronização automática',
    'premium.features.offline.benefit2': 'Cache inteligente de conteúdo',
    'premium.features.offline.benefit3': 'Sessões offline completas',
    'premium.features.offline.benefit4': 'Backup automático de dados',

    'premium.plans.title': 'Planos Premium',
    'premium.plans.subtitle': 'Escolha o plano ideal para suas necessidades',
    'premium.plans.popular': 'Mais Popular',
    'premium.plans.save': 'Economize',
    'premium.plans.choose': 'Escolher Plano',

    'premium.plans.monthly.name': 'Premium Mensal',
    'premium.plans.monthly.period': '/mês',
    'premium.plans.monthly.feature1': 'Todos os pontos premium',
    'premium.plans.monthly.feature2': 'Consulta WhatsApp',
    'premium.plans.monthly.feature3': 'Sons exclusivos',
    'premium.plans.monthly.feature4': 'Cromoterapia avançada',
    'premium.plans.monthly.feature5': 'Suporte prioritário',

    'premium.plans.annual.name': 'Premium Anual',
    'premium.plans.annual.period': '/ano',
    'premium.plans.annual.feature1': 'Tudo do plano mensal',
    'premium.plans.annual.feature2': '2 meses grátis',
    'premium.plans.annual.feature3': 'Recomendações IA',
    'premium.plans.annual.feature4': 'Analytics avançados',
    'premium.plans.annual.feature5': 'Consultoria trimestral',

    'premium.plans.lifetime.name': 'Premium Vitalício',
    'premium.plans.lifetime.period': 'pagamento único',
    'premium.plans.lifetime.feature1': 'Acesso vitalício',
    'premium.plans.lifetime.feature2': 'Todas as futuras atualizações',
    'premium.plans.lifetime.feature3': 'Suporte VIP',
    'premium.plans.lifetime.feature4': 'Consultoria ilimitada',
    'premium.plans.lifetime.feature5': 'Acesso beta a novos recursos',

    'premium.payment.title': 'Finalizar Pagamento',
    'premium.payment.methods': 'Métodos de Pagamento',
    'premium.payment.back': 'Voltar aos Planos',
    'premium.payment.pix': 'PIX',
    'premium.payment.pix.desc': 'Instantâneo e seguro',
    'premium.payment.pix.title': 'Pagamento via PIX',
    'premium.payment.credit': 'Cartão',
    'premium.payment.credit.desc': 'Visa, Master, Amex',
    'premium.payment.crypto': 'Crypto',
    'premium.payment.crypto.desc': 'Bitcoin, Ethereum',
    'premium.payment.crypto.title': 'Pagamento com Criptomoedas',

    'premium.testimonials.title': 'O que nossos usuários dizem',
    'premium.testimonials.maria': 'Transformou minha vida! A acupressão aliviou minhas dores crônicas em poucas semanas.',
    'premium.testimonials.joao': 'A respiração 4-7-8 me ajudou a controlar a ansiedade. Recomendo para todos!',
    'premium.testimonials.ana': 'Excelente para uso corporativo. Nossa equipe está muito mais relaxada e produtiva.',

    'premium.faq.title': 'Perguntas Frequentes',
    'premium.faq.q1': 'Posso cancelar a qualquer momento?',
    'premium.faq.a1': 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.',
    'premium.faq.q2': 'Os pontos premium são seguros?',
    'premium.faq.a2': 'Todos os pontos são baseados na Medicina Tradicional Chinesa com 15+ anos de experiência clínica.',
    'premium.faq.q3': 'Funciona offline?',
    'premium.faq.a3': 'Sim, a versão premium inclui modo offline completo com sincronização automática.',
    'premium.faq.q4': 'Há garantia de resultados?',
    'premium.faq.a4': 'Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos seu dinheiro.',

    // Corporate Page
    'corporate.hero.title': 'Soluções Corporativas',
    'corporate.hero.subtitle': 'Bem-estar integrativo para empresas com compliance legal completo',
    'corporate.plans.title': 'Planos Corporativos',
    'corporate.analytics.title': 'Analytics Empresariais',
    'corporate.roi.title': 'ROI Comprovado',
    'corporate.roi.subtitle': 'Resultados mensuráveis em bem-estar corporativo',
    'corporate.roi.stress': 'Redução no estresse',
    'corporate.roi.absences': 'Menos faltas',
    'corporate.roi.engagement': 'Maior engajamento',
    'corporate.roi.return': 'Retorno do investimento',

    // Login Page
    'login.welcome': 'Bem-vindo de volta',
    'login.createAccount': 'Criar Conta',
    'login.subtitle.login': 'Entre na sua conta para acessar todos os recursos',
    'login.subtitle.register': 'Crie sua conta e comece sua jornada de bem-estar',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.confirmPassword': 'Confirmar Senha',
    'login.name': 'Nome',
    'login.forgotPassword': 'Esqueci minha senha',
    'login.noAccount': 'Não tem conta? Cadastre-se',
    'login.hasAccount': 'Já tem conta? Entre',
    'login.demo.title': 'Modo Demonstração',
    'login.demo.desc': 'Use qualquer email válido + senha com 6+ caracteres',
    'login.reset.title': 'Recuperar Senha',
    'login.reset.subtitle': 'Digite seu email para receber instruções',
    'login.reset.send': 'Enviar Email',
    'login.reset.back': 'Voltar ao Login',

    // WhatsApp Consultation
    'whatsapp.back': 'Voltar',
    'whatsapp.consultation.title': 'Consulta Especializada',
    'whatsapp.consultation.description': 'Formulário detalhado para atendimento personalizado via WhatsApp',
    'whatsapp.features.specialized.title': 'Atendimento Especializado',
    'whatsapp.features.specialized.subtitle': 'Casos complexos que precisam de atenção individual',
    'whatsapp.features.specialized.professional': 'Profissional com 15+ anos de experiência',
    'whatsapp.features.fast.title': 'Resposta Rápida',
    'whatsapp.features.fast.subtitle': 'Prioridade máxima de resposta',
    'whatsapp.features.direct.title': 'WhatsApp Direto',
    'whatsapp.features.direct.subtitle': 'Comunicação direta e personalizada',
    'whatsapp.when.title': 'Quando Buscar Ajuda',
    'whatsapp.when.chronic': 'Dores crônicas que não melhoram',
    'whatsapp.when.neurological': 'Problemas neurológicos complexos',
    'whatsapp.when.nonresponsive': 'Casos que não respondem aos pontos básicos',
    'whatsapp.when.personalized': 'Necessidade de protocolo personalizado',
    'whatsapp.testimonial.text': 'Atendimento excepcional! Resolveu minha dor crônica em poucas sessões.',
    'whatsapp.testimonial.author': 'Maria S., São Paulo',
    'whatsapp.form.title': 'Formulário de Consulta',
    'whatsapp.form.subtitle': 'Preencha os dados abaixo para receber atendimento especializado',
    'whatsapp.form.name': 'Nome Completo',
    'whatsapp.form.name.placeholder': 'Seu nome completo',
    'whatsapp.form.email': 'Email',
    'whatsapp.form.email.placeholder': 'seu@email.com',
    'whatsapp.form.whatsapp': 'WhatsApp',
    'whatsapp.form.whatsapp.placeholder': '(11) 99999-9999',
    'whatsapp.form.urgency': 'Nível de Urgência',
    'whatsapp.form.urgency.select': 'Selecione a urgência',
    'whatsapp.form.urgency.low': 'Baixa - Consulta preventiva',
    'whatsapp.form.urgency.medium': 'Média - Desconforto moderado',
    'whatsapp.form.urgency.high': 'Alta - Dor significativa',
    'whatsapp.form.urgency.urgent': 'Urgente - Dor intensa',
    'whatsapp.form.medical.title': 'Informações Médicas',
    'whatsapp.form.medical.condition': 'Condição Principal',
    'whatsapp.form.medical.condition.placeholder': 'Ex: Enxaqueca crônica, ansiedade, dor nas costas',
    'whatsapp.form.medical.duration': 'Há quanto tempo tem os sintomas?',
    'whatsapp.form.medical.duration.placeholder': 'Ex: 2 anos, 6 meses, desde criança',
    'whatsapp.form.medical.symptoms': 'Descrição Detalhada dos Sintomas',
    'whatsapp.form.medical.symptoms.placeholder': 'Descreva em detalhes seus sintomas, quando aparecem, intensidade, etc.',
    'whatsapp.form.medical.treatments': 'Tratamentos Já Realizados',
    'whatsapp.form.medical.treatments.placeholder': 'Medicamentos, terapias, cirurgias, etc.',
    'whatsapp.form.medical.medications': 'Medicamentos Atuais',
    'whatsapp.form.medical.medications.placeholder': 'Liste todos os medicamentos que usa atualmente',
    'whatsapp.form.medical.schedule': 'Horário de Preferência',
    'whatsapp.form.medical.schedule.select': 'Selecione o melhor horário',
    'whatsapp.form.medical.schedule.morning': 'Manhã (8h-12h)',
    'whatsapp.form.medical.schedule.afternoon': 'Tarde (12h-18h)',
    'whatsapp.form.medical.schedule.evening': 'Noite (18h-22h)',
    'whatsapp.form.medical.schedule.anytime': 'Qualquer horário',
    'whatsapp.form.notice.title': 'Importante',
    'whatsapp.form.notice.text': 'Este formulário será enviado diretamente para nosso especialista via WhatsApp',
    'whatsapp.form.submit': 'Enviar para WhatsApp',
    'whatsapp.form.redirect': 'Você será redirecionado para o WhatsApp com sua mensagem pronta'
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.acupressure': 'Acupressure',
    'nav.breathing': 'Breathing',
    'nav.premium': 'Premium',
    'nav.corporate': 'Corporate',
    'nav.blog': 'Blog',
    'nav.dashboard': 'Dashboard',
    'nav.sounds': 'Sounds',
    'nav.progress': 'Progress',
    'nav.personalization': 'Personalization',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Home Page
    'home.hero.title': 'XZenPress Wellness',
    'home.hero.subtitle': 'Complete integrative wellness platform with TCM acupressure, Craniopuncture, 4-7-8 breathing and advanced chromotherapy',
    'home.hero.startNow': 'Start Now',
    'home.hero.createAccount': 'Create Account',

    // Home Features
    'home.feature.acupressure.title': 'TCM Acupressure',
    'home.feature.acupressure.desc': '20 therapeutic points from Traditional Chinese Medicine for natural relief',
    'home.feature.breathing.title': '4-7-8 Breathing',
    'home.feature.breathing.desc': 'Scientific breathing technique with synchronized chromotherapy',
    'home.feature.cranio.title': 'Craniopuncture',
    'home.feature.cranio.desc': 'Specialized points for nervous system and brain function',
    'home.feature.chromotherapy.title': 'Advanced Chromotherapy',
    'home.feature.chromotherapy.desc': 'Therapeutic colors synchronized with breathing to enhance effects',
    'home.feature.sounds.title': 'Harmonizing Sounds',
    'home.feature.sounds.desc': 'Relaxing sound library with Spotify Premium integration',
    'home.feature.consultation.title': 'Specialized Consultation',
    'home.feature.consultation.desc': 'Personalized care via WhatsApp with qualified professional',

    'home.features.title': 'Therapeutic Resources',
    'home.features.subtitle': 'Combine ancient techniques with modern technology for maximum integrative wellness',

    'home.cta.title': 'Transform Your Quality of Life',
    'home.cta.subtitle': 'Join thousands who have discovered the power of integrative therapies',
    'home.cta.demo': 'Try Free',
    'home.cta.corporate': 'Corporate Solutions',

    'home.compliance.title': 'Complete Legal Compliance',
    'home.compliance.subtitle': 'Full compliance with Brazilian corporate mental health legislation with integrative approach',

    // Breathing Exercise
    'breathing.title': '4-7-8 Breathing with Chromotherapy',
    'breathing.inhale': 'Inhale',
    'breathing.hold': 'Hold',
    'breathing.exhale': 'Exhale',
    'breathing.start': 'Start Breathing',
    'breathing.stop': 'Stop',
    'breathing.reset': 'Reset',
    'breathing.totalTime': 'Total Time'
  },

  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.acupressure': 'Acupresión',
    'nav.breathing': 'Respiración',
    'nav.premium': 'Premium',
    'nav.corporate': 'Corporativo',
    'nav.blog': 'Blog',
    'nav.dashboard': 'Panel',
    'nav.sounds': 'Sonidos',
    'nav.progress': 'Progreso',
    'nav.personalization': 'Personalización',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',

    // Home Page
    'home.hero.title': 'XZenPress Bienestar',
    'home.hero.subtitle': 'Plataforma completa de bienestar integrativo con acupresión MTC, Craniopuntura, respiración 4-7-8 y cromoterapia avanzada',
    'home.hero.startNow': 'Comenzar Ahora',
    'home.hero.createAccount': 'Crear Cuenta'
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]); // Português como padrão

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code as keyof typeof translations]?.[key as keyof typeof translations.pt];
    
    if (!translation) {
      console.warn(`🔍 Tradução não encontrada para: "${key}" no idioma: ${currentLanguage.code}`);
      // Fallback para português se não encontrar
      const fallback = translations.pt[key as keyof typeof translations.pt];
      return fallback || key;
    }
    
    return translation;
  };

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
  };

  // Carregar idioma salvo
  React.useEffect(() => {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) {
      const language = languages.find(lang => lang.code === saved);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};