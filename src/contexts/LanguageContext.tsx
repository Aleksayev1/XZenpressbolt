import React, { createContext, useContext, useState } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

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

// Translations object
const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.acupressure': 'Acupressão',
    'nav.breathing': 'Respiração',
    'nav.premium': 'Premium',
    'nav.corporate': 'Corporativo',
    'nav.login': 'Entrar',
    'nav.logout': 'Sair',

    // Home page
    'home.hero.title': 'Bem-estar Holístico',
    'home.hero.subtitle': 'Acupressão MTC, respiração 4-7-8, cromoterapia e sons harmonizantes para transformar sua qualidade de vida',
    'home.hero.startNow': 'Começar Agora',
    'home.hero.createAccount': 'Criar Conta',

    'home.features.title': 'Recursos Disponíveis',
    'home.features.subtitle': 'Técnicas milenares combinadas com tecnologia moderna',

    'home.feature.acupressure.title': 'Acupressão MTC',
    'home.feature.acupressure.desc': 'Pontos terapêuticos da Medicina Tradicional Chinesa',
    'home.feature.cranio.title': 'Craniopuntura',
    'home.feature.cranio.desc': 'Técnicas cranianas para otimização cerebral',
    'home.feature.breathing.title': 'Respiração 4-7-8',
    'home.feature.breathing.desc': 'Técnica científica para redução do estresse',
    'home.feature.chromotherapy.title': 'Cromoterapia',
    'home.feature.chromotherapy.desc': 'Cores terapêuticas para equilíbrio energético',
    'home.feature.sounds.title': 'Sons Harmonizantes',
    'home.feature.sounds.desc': 'Biblioteca de sons + integração Spotify',
    'home.feature.consultation.title': 'Consulta WhatsApp',

    'home.cta.title': 'Transforme sua Empresa',
    'home.cta.subtitle': 'Soluções corporativas para bem-estar dos funcionários',
    'home.cta.demo': 'Ver Demonstração',
    'home.cta.corporate': 'Soluções Corporativas',

    'home.compliance.title': 'Compliance Legal Empresarial',
    'home.compliance.subtitle': 'Atendimento integral às novas regulamentações de saúde mental no trabalho',

    'home.wellness.title': 'Selo de Empresa Promotora da Saúde Mental',
    'home.wellness.desc': 'Certificação oficial para empresas que investem no bem-estar dos colaboradores',

    // Login page
    'login.welcome': 'Bem-vindo de volta',
    'login.createAccount': 'Criar Conta',
    'login.subtitle.login': 'Entre na sua conta para continuar',
    'login.subtitle.register': 'Crie sua conta e comece sua jornada',
    'login.name': 'Nome',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.confirmPassword': 'Confirmar Senha',
    'login.forgotPassword': 'Esqueci minha senha',
    'login.noAccount': 'Não tem conta? Cadastre-se',
    'login.hasAccount': 'Já tem conta? Entre',
    'login.demo.title': 'Demonstração',
    'login.demo.desc': 'Use qualquer email válido + senha com 6+ caracteres',

    'login.reset.title': 'Recuperar Senha',
    'login.reset.subtitle': 'Digite seu email para receber instruções',
    'login.reset.send': 'Enviar',
    'login.reset.back': 'Voltar ao login',

    // Breathing page
    'breathing.title': 'Respiração 4-7-8',
    'breathing.inhale': 'Inspire',
    'breathing.hold': 'Segure',
    'breathing.exhale': 'Expire',
    'breathing.start': 'Iniciar',
    'breathing.stop': 'Parar',
    'breathing.reset': 'Reiniciar',
    'breathing.totalTime': 'Tempo Total',

    'breathing.chromotherapy.title': 'Cromoterapia Integrada',
    'breathing.chromotherapy.description': 'As cores mudam automaticamente para potencializar os efeitos da respiração',
    'breathing.chromotherapy.blue': 'Azul Calmante',
    'breathing.chromotherapy.blue.short': 'Calma',
    'breathing.chromotherapy.blue.desc': 'Reduz ansiedade e promove tranquilidade mental',
    'breathing.chromotherapy.green': 'Verde Equilibrante',
    'breathing.chromotherapy.green.short': 'Equilíbrio',
    'breathing.chromotherapy.green.desc': 'Harmoniza o sistema nervoso e estabiliza emoções',
    'breathing.chromotherapy.magenta': 'Magenta Energizante',
    'breathing.chromotherapy.magenta.short': 'Energia',
    'breathing.chromotherapy.magenta.desc': 'Revitaliza e libera tensões acumuladas',

    'breathing.phase': 'Fase',
    'breathing.phase.inhale.detail': 'Inspire profundamente pelo nariz',
    'breathing.phase.hold.detail': 'Segure o ar nos pulmões',
    'breathing.phase.exhale.detail': 'Expire lentamente pela boca',

    'breathing.benefits.title': 'Benefícios Científicos',
    'breathing.benefits.stress': 'Reduz cortisol',
    'breathing.benefits.sleep': 'Melhora o sono',
    'breathing.benefits.focus': 'Aumenta foco',
    'breathing.benefits.pressure': 'Reduz pressão',

    'breathing.sounds.title': 'Sons Harmonizantes',
    'breathing.sounds.free.title': 'Sons Gratuitos',
    'breathing.sounds.ocean': 'Sons do Mar',
    'breathing.sounds.rain': 'Chuva Suave',
    'breathing.sounds.ocean.desc': 'Ondas relaxantes',
    'breathing.sounds.rain.desc': 'Chuva calmante',
    'breathing.sounds.play': 'Reproduzir',
    'breathing.sounds.pause': 'Pausar',
    'breathing.sounds.stop': 'Parar',

    'breathing.sounds.premium.title': 'Sons Premium',
    'breathing.sounds.premium.desc': 'Biblioteca completa com mais de 50 sons + integração Spotify',
    'breathing.sounds.forest': 'Floresta',
    'breathing.sounds.fireplace': 'Lareira',
    'breathing.sounds.classical': 'Clássica',
    'breathing.sounds.mantras': 'Mantras',
    'breathing.sounds.more': '+50 sons',
    'breathing.sounds.premium.spotify': 'Abrir Spotify',
    'breathing.sounds.premium.upgrade': 'Upgrade Premium',

    'breathing.science.title': 'Base Científica',
    'breathing.science.evidence': 'Evidências Científicas',
    'breathing.science.parasympathetic': 'Ativa sistema parassimpático',
    'breathing.science.cortisol': 'Reduz cortisol em 23%',
    'breathing.science.heartRate': 'Diminui frequência cardíaca',
    'breathing.science.gaba': 'Aumenta produção de GABA',
    'breathing.science.chromotherapy': 'Cromoterapia',
    'breathing.science.blue.effect': 'Azul reduz pressão arterial',
    'breathing.science.green.effect': 'Verde equilibra sistema nervoso',
    'breathing.science.magenta.effect': 'Magenta estimula endorfinas',
    'breathing.science.melatonin': 'Cores regulam melatonina',

    // Premium page
    'premium.hero.title': 'Desbloqueie Todo o Potencial',
    'premium.hero.subtitle': 'Acesso completo a consultas especializadas e pontos terapêuticos exclusivos',
    'premium.hero.upgrade': 'Upgrade Premium',
    'premium.hero.active': 'Premium Ativo',

    'premium.features.title': 'Recursos Premium',
    'premium.features.available': 'Disponível',
    'premium.features.coming': 'Em breve',

    'premium.features.whatsapp.title': 'Consulta WhatsApp',
    'premium.features.whatsapp.description': 'Formulário especializado para casos complexos',
    'premium.features.whatsapp.benefit1': 'Atendimento personalizado',
    'premium.features.whatsapp.benefit2': 'Resposta em até 24h',
    'premium.features.whatsapp.benefit3': 'Profissional qualificado',
    'premium.features.whatsapp.benefit4': 'Casos complexos',

    'premium.features.points.title': 'Pontos Exclusivos',
    'premium.features.points.description': '11 pontos especializados para casos específicos',
    'premium.features.points.benefit1': 'Septicemia (3 pontos)',
    'premium.features.points.benefit2': 'ATM (3 pontos)',
    'premium.features.points.benefit3': 'Cranioterapia (3 pontos)',
    'premium.features.points.benefit4': 'Neurologia (2 pontos)',

    'premium.features.chromotherapy.title': 'Cromoterapia Avançada',
    'premium.features.chromotherapy.description': 'Sequências personalizadas de cores terapêuticas',
    'premium.features.chromotherapy.benefit1': 'Perfis personalizados',
    'premium.features.chromotherapy.benefit2': 'Sequências adaptativas',
    'premium.features.chromotherapy.benefit3': 'Integração com biofeedback',
    'premium.features.chromotherapy.benefit4': 'Relatórios de progresso',

    'premium.features.sounds.title': 'Biblioteca de Sons',
    'premium.features.sounds.description': 'Mais de 50 sons + integração Spotify Premium',
    'premium.features.sounds.benefit1': 'Biblioteca completa',
    'premium.features.sounds.benefit2': 'Integração Spotify',
    'premium.features.sounds.benefit3': 'Sons binaurais',
    'premium.features.sounds.benefit4': 'Playlists personalizadas',

    'premium.features.ai.title': 'Recomendações IA',
    'premium.features.ai.description': 'Inteligência artificial para recomendações personalizadas',
    'premium.features.ai.benefit1': 'Análise de padrões',
    'premium.features.ai.benefit2': 'Recomendações adaptativas',
    'premium.features.ai.benefit3': 'Otimização automática',
    'premium.features.ai.benefit4': 'Insights personalizados',

    'premium.features.offline.title': 'Modo Offline',
    'premium.features.offline.description': 'Use todos os recursos sem conexão à internet',
    'premium.features.offline.benefit1': 'Funciona offline',
    'premium.features.offline.benefit2': 'Sincronização automática',
    'premium.features.offline.benefit3': 'Dados locais seguros',
    'premium.features.offline.benefit4': 'Acesso universal',

    'premium.plans.title': 'Escolha seu Plano',
    'premium.plans.subtitle': 'Opções flexíveis para suas necessidades',
    'premium.plans.popular': 'Mais Popular',
    'premium.plans.choose': 'Escolher Plano',
    'premium.plans.save': 'Economize',

    'premium.plans.monthly.name': 'Mensal',
    'premium.plans.monthly.period': '/mês',
    'premium.plans.monthly.feature1': 'Todos os pontos premium',
    'premium.plans.monthly.feature2': 'Consultas WhatsApp ilimitadas',
    'premium.plans.monthly.feature3': 'Cromoterapia avançada',
    'premium.plans.monthly.feature4': 'Biblioteca de sons completa',
    'premium.plans.monthly.feature5': 'Suporte prioritário',

    'premium.plans.annual.name': 'Anual',
    'premium.plans.annual.period': '/ano',
    'premium.plans.annual.feature1': 'Tudo do plano mensal',
    'premium.plans.annual.feature2': '2 meses grátis',
    'premium.plans.annual.feature3': 'Recomendações IA',
    'premium.plans.annual.feature4': 'Relatórios de progresso',
    'premium.plans.annual.feature5': 'Modo offline completo',

    'premium.plans.lifetime.name': 'Vitalício',
    'premium.plans.lifetime.period': 'pagamento único',
    'premium.plans.lifetime.feature1': 'Tudo do plano anual',
    'premium.plans.lifetime.feature2': 'Acesso vitalício',
    'premium.plans.lifetime.feature3': 'Novos recursos inclusos',
    'premium.plans.lifetime.feature4': 'Suporte VIP',
    'premium.plans.lifetime.feature5': 'Consultoria personalizada',

    'premium.testimonials.title': 'O que dizem nossos usuários',
    'premium.testimonials.maria': 'Atendimento excepcional! Resolveu minha dor crônica em poucas sessões.',
    'premium.testimonials.joao': 'A plataforma mudou minha vida. Durmo melhor e tenho menos ansiedade.',
    'premium.testimonials.ana': 'Profissionais qualificados e técnicas realmente eficazes.',

    'premium.faq.title': 'Perguntas Frequentes',
    'premium.faq.q1': 'Como funciona o cancelamento?',
    'premium.faq.a1': 'Você pode cancelar a qualquer momento. Não há multas ou taxas.',
    'premium.faq.q2': 'Posso usar offline?',
    'premium.faq.a2': 'Sim, o modo offline está disponível para usuários Premium.',
    'premium.faq.q3': 'Como funciona o suporte?',
    'premium.faq.a3': 'Usuários Premium têm suporte prioritário via WhatsApp.',
    'premium.faq.q4': 'Há garantia?',
    'premium.faq.a4': 'Sim, oferecemos 30 dias de garantia ou seu dinheiro de volta.',

    'premium.payment.title': 'Finalizar Pagamento',
    'premium.payment.methods': 'Escolha a forma de pagamento',
    'premium.payment.processing': 'Processando pagamento via',
    'premium.payment.back': 'Voltar',
    'premium.payment.confirm': 'Confirmar Pagamento',

    'premium.payment.pix.desc': 'Instantâneo e seguro',
    'premium.payment.pix.title': 'Pagamento via PIX',
    'premium.payment.pix.scan': 'Escaneie o QR Code ou copie o código',

    'premium.payment.credit': 'Cartão de Crédito',
    'premium.payment.credit.desc': 'Visa, Mastercard, Elo',
    'premium.payment.credit.title': 'Dados do Cartão',
    'premium.payment.credit.number': 'Número do cartão',
    'premium.payment.credit.name': 'Nome no cartão',

    'premium.payment.crypto.desc': 'Bitcoin, Ethereum',
    'premium.payment.crypto.title': 'Pagamento em Criptomoedas',

    // WhatsApp consultation
    'whatsapp.back': 'Voltar',
    'whatsapp.consultation.title': 'Consulta Especializada',
    'whatsapp.consultation.description': 'Formulário detalhado para casos que precisam de atenção personalizada',

    'whatsapp.features.specialized.title': 'Atendimento Especializado',
    'whatsapp.features.specialized.subtitle': 'Profissional qualificado',
    'whatsapp.features.specialized.professional': '15+ anos de experiência',
    'whatsapp.features.fast.title': 'Resposta Rápida',
    'whatsapp.features.fast.subtitle': 'Até 24 horas',
    'whatsapp.features.direct.title': 'Contato Direto',
    'whatsapp.features.direct.subtitle': 'Via WhatsApp',

    'whatsapp.when.title': 'Quando buscar ajuda especializada?',
    'whatsapp.when.chronic': 'Dores crônicas que não melhoram',
    'whatsapp.when.neurological': 'Sintomas neurológicos complexos',
    'whatsapp.when.nonresponsive': 'Casos que não respondem aos pontos básicos',
    'whatsapp.when.personalized': 'Necessidade de protocolo personalizado',

    'whatsapp.testimonial.text': 'Atendimento excepcional! Resolveu minha dor crônica em poucas sessões.',
    'whatsapp.testimonial.author': 'Maria S., São Paulo',

    'whatsapp.form.title': 'Formulário de Consulta Especializada',
    'whatsapp.form.subtitle': 'Preencha os dados abaixo para receber atendimento personalizado',
    'whatsapp.form.name': 'Nome completo',
    'whatsapp.form.name.placeholder': 'Seu nome completo',
    'whatsapp.form.email': 'Email',
    'whatsapp.form.email.placeholder': 'seu@email.com',
    'whatsapp.form.whatsapp': 'WhatsApp',
    'whatsapp.form.whatsapp.placeholder': '(11) 99999-9999',
    'whatsapp.form.urgency': 'Nível de urgência',
    'whatsapp.form.urgency.select': 'Selecione o nível',
    'whatsapp.form.urgency.low': 'Baixa - Consulta preventiva',
    'whatsapp.form.urgency.medium': 'Média - Desconforto moderado',
    'whatsapp.form.urgency.high': 'Alta - Dor significativa',
    'whatsapp.form.urgency.urgent': 'Urgente - Dor intensa',

    'whatsapp.form.medical.title': 'Informações Médicas',
    'whatsapp.form.medical.condition': 'Condição principal',
    'whatsapp.form.medical.condition.placeholder': 'Ex: dor de cabeça, ansiedade, insônia...',
    'whatsapp.form.medical.duration': 'Há quanto tempo tem os sintomas?',
    'whatsapp.form.medical.duration.placeholder': 'Ex: 2 semanas, 3 meses...',
    'whatsapp.form.medical.symptoms': 'Descrição detalhada dos sintomas',
    'whatsapp.form.medical.symptoms.placeholder': 'Descreva seus sintomas, quando aparecem, intensidade...',
    'whatsapp.form.medical.treatments': 'Tratamentos já realizados',
    'whatsapp.form.medical.treatments.placeholder': 'Medicamentos, terapias, exames...',
    'whatsapp.form.medical.medications': 'Medicamentos atuais',
    'whatsapp.form.medical.medications.placeholder': 'Liste os medicamentos que usa atualmente...',
    'whatsapp.form.medical.schedule': 'Horário de preferência',
    'whatsapp.form.medical.schedule.select': 'Selecione',
    'whatsapp.form.medical.schedule.morning': 'Manhã (8h-12h)',
    'whatsapp.form.medical.schedule.afternoon': 'Tarde (12h-18h)',
    'whatsapp.form.medical.schedule.evening': 'Noite (18h-22h)',
    'whatsapp.form.medical.schedule.anytime': 'Qualquer horário',

    'whatsapp.form.notice.title': 'Importante',
    'whatsapp.form.notice.text': 'Este formulário não substitui consulta médica. Em emergências, procure atendimento médico imediato.',
    'whatsapp.form.submit': 'Enviar para WhatsApp',
    'whatsapp.form.redirect': 'Você será redirecionado para o WhatsApp com sua mensagem pronta',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.acupressure': 'Acupressure',
    'nav.breathing': 'Breathing',
    'nav.premium': 'Premium',
    'nav.corporate': 'Corporate',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Home page
    'home.hero.title': 'Holistic Wellness',
    'home.hero.subtitle': 'TCM acupressure, 4-7-8 breathing, chromotherapy and harmonizing sounds to transform your quality of life',
    'home.hero.startNow': 'Start Now',
    'home.hero.createAccount': 'Create Account',

    'home.features.title': 'Available Features',
    'home.features.subtitle': 'Ancient techniques combined with modern technology',

    'home.feature.acupressure.title': 'TCM Acupressure',
    'home.feature.acupressure.desc': 'Traditional Chinese Medicine therapeutic points',
    'home.feature.cranio.title': 'Craniopuncture',
    'home.feature.cranio.desc': 'Cranial techniques for brain optimization',
    'home.feature.breathing.title': '4-7-8 Breathing',
    'home.feature.breathing.desc': 'Scientific technique for stress reduction',
    'home.feature.chromotherapy.title': 'Chromotherapy',
    'home.feature.chromotherapy.desc': 'Therapeutic colors for energy balance',
    'home.feature.sounds.title': 'Harmonizing Sounds',
    'home.feature.sounds.desc': 'Sound library + Spotify integration',
    'home.feature.consultation.title': 'WhatsApp Consultation',

    'home.cta.title': 'Transform Your Company',
    'home.cta.subtitle': 'Corporate solutions for employee wellness',
    'home.cta.demo': 'View Demo',
    'home.cta.corporate': 'Corporate Solutions',

    'home.compliance.title': 'Corporate Legal Compliance',
    'home.compliance.subtitle': 'Full compliance with new workplace mental health regulations',

    'home.wellness.title': 'Mental Health Promoting Company Seal',
    'home.wellness.desc': 'Official certification for companies that invest in employee wellness',

    // Add more English translations as needed...
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.acupressure': 'Acupresión',
    'nav.breathing': 'Respiración',
    'nav.premium': 'Premium',
    'nav.corporate': 'Corporativo',
    'nav.login': 'Entrar',
    'nav.logout': 'Salir',

    // Add more Spanish translations as needed...
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.acupressure': 'Acupression',
    'nav.breathing': 'Respiration',
    'nav.premium': 'Premium',
    'nav.corporate': 'Entreprise',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',

    // Add more French translations as needed...
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};