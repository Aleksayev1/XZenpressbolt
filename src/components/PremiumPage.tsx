import React, { useState } from 'react';
import { Crown, MessageCircle, CreditCard, Smartphone, Bitcoin, Check, Star, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { PaymentMethod } from '../types';

interface PremiumPageProps {
  onPageChange: (page: string) => void;
}

export const PremiumPage: React.FC<PremiumPageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod['type']>('pix');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const plans = {
    monthly: {
      price: 'R$ 29,90',
      period: '/mês',
      savings: null
    },
    yearly: {
      price: 'R$ 299,00',
      period: '/ano',
      savings: 'Economize R$ 59,80'
    }
  };

  const features = [
    'Consultas via WhatsApp com especialistas',
    'Pontos específicos para septicemia',
    'Pontos específicos para ATM',
    'Acesso a biblioteca completa de sons',
    'Integração com Spotify Premium',
    'Sessões de cromoterapia avançada',
    'Relatórios de progresso detalhados',
    'Suporte prioritário 24/7',
    'Conteúdo exclusivo semanal',
    'Acesso antecipado a novos recursos'
  ];

  const paymentMethods = [
    { type: 'pix' as const, name: 'PIX', icon: <Smartphone className="w-6 h-6" />, description: 'Pagamento instantâneo' },
    { type: 'credit' as const, name: 'Cartão de Crédito', icon: <CreditCard className="w-6 h-6" />, description: 'Visa, Mastercard, Elo' },
    { type: 'crypto' as const, name: 'Criptomoedas', icon: <Bitcoin className="w-6 h-6" />, description: 'Bitcoin, Ethereum, USDT' }
  ];

  const handleUpgrade = () => {
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    alert(`Processando pagamento via ${selectedPayment}...`);
    // In a real app, this would integrate with payment processors
  };

  if (user?.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6">
              <Crown className="w-6 h-6" />
              <span>Usuário Premium Ativo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('premium.title')}
            </h1>
            <p className="text-xl text-gray-600">
              Aproveite todos os recursos exclusivos da sua conta Premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp Consultation */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{t('premium.whatsapp')}</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Converse diretamente com nossos especialistas em medicina tradicional chinesa
              </p>
              <a
                href="https://wa.me/5511999999999?text=Olá! Sou usuário Premium e gostaria de uma consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-200 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Iniciar Consulta</span>
              </a>
              <button
                onClick={() => onPageChange('whatsapp-consultation')}
                className="block w-full bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 mt-3"
              >
                📋 Formulário Detalhado
              </button>
            </div>

            {/* Specific Points */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-2xl">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{t('premium.points')}</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Acesse pontos especializados para condições específicas
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => onPageChange('acupressure')}
                  className="w-full text-left bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 hover:from-red-100 hover:to-pink-100 transition-all"
                >
                  <div className="font-semibold text-red-800">Pontos para Septicemia</div>
                  <div className="text-sm text-red-600">Fortalecimento do sistema imunológico</div>
                </button>
                <button
                  onClick={() => onPageChange('acupressure')}
                  className="w-full text-left bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 hover:from-blue-100 hover:to-indigo-100 transition-all"
                >
                  <div className="font-semibold text-blue-800">Pontos para ATM</div>
                  <div className="text-sm text-blue-600">Alívio de disfunções temporomandibulares</div>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Features Grid */}
          <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Seus Recursos Premium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spotify Integration */}
          <div className="mt-8 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Integração com Spotify Premium</h2>
            <p className="mb-6 opacity-90">
              Acesse nossa playlist exclusiva de sons harmonizantes e relaxantes
            </p>
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <span>Abrir no Spotify</span>
              <Zap className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/Logo Xzenpress oficial.png" 
              alt="XZenPress Logo" 
              className="h-16 w-auto opacity-80"
            />
          </div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6">
            <Crown className="w-6 h-6" />
            <span>Premium</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-xl text-gray-600">
            Acesso completo a consultas especializadas e pontos terapêuticos exclusivos
          </p>
        </div>

        {!showPaymentForm ? (
          <>
            {/* Plan Selection */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-full">
                  <button
                    onClick={() => setSelectedPlan('monthly')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedPlan === 'monthly'
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    onClick={() => setSelectedPlan('yearly')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedPlan === 'yearly'
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Anual
                  </button>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {plans[selectedPlan].price}
                  <span className="text-2xl text-gray-600 font-normal">
                    {plans[selectedPlan].period}
                  </span>
                </div>
                {plans[selectedPlan].savings && (
                  <div className="text-green-600 font-semibold">
                    {plans[selectedPlan].savings}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {t('premium.upgrade')}
              </button>
            </div>
          </>
        ) : (
          /* Payment Form */
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Escolha sua Forma de Pagamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.type}
                  onClick={() => setSelectedPayment(method.type)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedPayment === method.type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`p-3 rounded-full ${
                      selectedPayment === method.type ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {method.icon}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Plano {selectedPlan === 'monthly' ? 'Mensal' : 'Anual'}</span>
                <span className="font-semibold">{plans[selectedPlan].price}</span>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600">Desconto Anual</span>
                  <span className="text-green-600 font-semibold">-R$ 59,80</span>
                </div>
              )}
              <hr className="my-3" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>{plans[selectedPlan].price}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowPaymentForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
              >
                Finalizar Pagamento
              </button>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            O que nossos usuários Premium dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "As consultas via WhatsApp mudaram minha vida. Tenho acesso direto a especialistas!"
              </p>
              <div className="font-semibold text-gray-800">Maria Silva</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Os pontos específicos para ATM resolveram um problema que eu tinha há anos."
              </p>
              <div className="font-semibold text-gray-800">João Santos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};