import React from 'react';
import { Crown, Star, Lock, Zap, MessageCircle, Target, Brain, Shield, Tooth } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PremiumStructureProps {
  onPageChange: (page: string) => void;
}

export const PremiumStructure: React.FC<PremiumStructureProps> = ({ onPageChange }) => {
  const { user } = useAuth();

  const premiumFeatures = [
    {
      id: 'whatsapp-consultation',
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: 'Consulta WhatsApp Especializada',
      description: 'Atendimento direto com Alexandre Pinheiro - 15 anos de experiência',
      benefits: [
        'Formulário detalhado para casos complexos',
        'Resposta prioritária em até 2 horas',
        'Protocolo personalizado de tratamento',
        'Acompanhamento contínuo via WhatsApp'
      ],
      status: 'active',
      action: () => onPageChange('whatsapp-consultation')
    },
    {
      id: 'premium-points',
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: 'Pontos de Acupressão Específicos',
      description: 'Acesso a pontos especializados para condições específicas',
      benefits: [
        'Pontos para Septicemia e fortalecimento imunológico',
        'Técnicas para ATM e disfunção temporomandibular',
        'Cranioterapia avançada para otimização cognitiva',
        'Protocolos para condições neurológicas'
      ],
      status: 'active',
      action: () => onPageChange('acupressure')
    },
    {
      id: 'advanced-chromotherapy',
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'Cromoterapia Avançada',
      description: 'Sequências de cores personalizadas para diferentes condições',
      benefits: [
        'Protocolos específicos para ansiedade, depressão',
        'Sequências para dor crônica e inflamação',
        'Cromoterapia para distúrbios do sono',
        'Cores terapêuticas para hipertensão'
      ],
      status: 'coming-soon',
      action: () => {}
    },
    {
      id: 'sound-library',
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: 'Biblioteca Completa de Sons',
      description: 'Mais de 50 sons terapêuticos + integração Spotify',
      benefits: [
        'Sons binaurais para diferentes frequências cerebrais',
        'Mantras e cantos tibetanos',
        'Frequências Solfeggio (528Hz, 432Hz, etc.)',
        'Integração com Spotify Premium'
      ],
      status: 'coming-soon',
      action: () => {}
    },
    {
      id: 'ai-recommendations',
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: 'Recomendações Personalizadas IA',
      description: 'Sistema inteligente que aprende com seus padrões',
      benefits: [
        'Análise de padrões de uso e efetividade',
        'Sugestões de pontos baseadas no histórico',
        'Horários ótimos para cada técnica',
        'Progressão personalizada de tratamento'
      ],
      status: 'coming-soon',
      action: () => {}
    },
    {
      id: 'offline-mode',
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: 'Modo Offline Completo',
      description: 'Acesso total sem conexão com internet',
      benefits: [
        'Todos os pontos disponíveis offline',
        'Sons e cromoterapia funcionam offline',
        'Sincronização automática quando online',
        'Backup seguro na nuvem'
      ],
      status: 'coming-soon',
      action: () => {}
    }
  ];

  const pricingPlans = [
    {
      name: 'Premium Mensal',
      price: 'R$ 29,90',
      period: '/mês',
      features: [
        'Consulta WhatsApp especializada',
        'Todos os pontos premium',
        'Cromoterapia avançada',
        'Biblioteca completa de sons',
        'Suporte prioritário'
      ],
      popular: false
    },
    {
      name: 'Premium Anual',
      price: 'R$ 297,00',
      period: '/ano',
      originalPrice: 'R$ 358,80',
      discount: '17% OFF',
      features: [
        'Tudo do plano mensal',
        'Recomendações IA personalizadas',
        'Modo offline completo',
        'Consultas ilimitadas',
        'Acesso antecipado a novos recursos'
      ],
      popular: true
    },
    {
      name: 'Premium Vitalício',
      price: 'R$ 997,00',
      period: 'pagamento único',
      originalPrice: 'R$ 1.794,00',
      discount: '44% OFF',
      features: [
        'Acesso vitalício a todos os recursos',
        'Todas as atualizações futuras incluídas',
        'Consultoria personalizada mensal',
        'Acesso a webinars exclusivos',
        'Certificado de conclusão'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Crown className="w-16 h-16 text-yellow-200" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Desbloqueie Todo o Potencial
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Acesso completo a consultas especializadas e recursos terapêuticos avançados
            </p>
            {user?.isPremium ? (
              <div className="inline-flex items-center px-6 py-3 bg-green-500 rounded-full backdrop-blur-sm">
                <Crown className="w-5 h-5 mr-2 text-yellow-200" />
                <span className="font-semibold">Usuário Premium Ativo</span>
              </div>
            ) : (
              <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Crown className="w-5 h-5 mr-2 text-yellow-200" />
                <span className="font-semibold">Upgrade para Premium</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recursos Premium Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  feature.status === 'active' 
                    ? 'border-green-200 hover:border-green-300 cursor-pointer' 
                    : 'border-gray-200'
                }`}
                onClick={feature.status === 'active' ? feature.action : undefined}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl">
                    {feature.icon}
                  </div>
                  {feature.status === 'active' ? (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <span>Disponível</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <span>Em Breve</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        {!user?.isPremium && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Escolha Seu Plano Premium
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Invista no seu bem-estar com acesso completo a todas as funcionalidades terapêuticas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 shadow-lg relative ${
                    plan.popular 
                      ? 'border-2 border-orange-500 transform scale-105' 
                      : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Mais Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-gray-500 line-through">{plan.originalPrice}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                          {plan.discount}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Escolher Plano
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            O que dizem nossos usuários Premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "A consulta via WhatsApp mudou minha vida. Protocolo personalizado que realmente funciona!"
              </p>
              <div className="text-sm text-gray-600">Maria S., São Paulo</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Os pontos específicos para ATM resolveram minha dor em 2 semanas. Incrível!"
              </p>
              <div className="text-sm text-gray-600">João M., Rio de Janeiro</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Atendimento excepcional do Alexandre. Profissional muito competente e atencioso."
              </p>
              <div className="text-sm text-gray-600">Ana L., Belo Horizonte</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Como funciona a consulta via WhatsApp?</h3>
              <p className="text-gray-600 text-sm">
                Você preenche um formulário detalhado e recebe atendimento personalizado do Alexandre Pinheiro, 
                com resposta prioritária e protocolo específico para seu caso.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-600 text-sm">
                Sim, você pode cancelar seu plano a qualquer momento. Não há fidelidade ou taxas de cancelamento.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Os pontos premium são seguros?</h3>
              <p className="text-gray-600 text-sm">
                Todos os pontos são baseados em técnicas tradicionais validadas e devem ser usados como 
                complemento ao tratamento médico convencional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Funciona offline?</h3>
              <p className="text-gray-600 text-sm">
                Sim, a maioria dos recursos funciona offline. Os dados são sincronizados automaticamente 
                quando você se conecta à internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};