import React from 'react';
import { Play, Heart, Brain, Palette, Music, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: t('home.feature.acupressure.title'),
      description: t('home.feature.acupressure.desc'),
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: t('home.feature.cranio.title'),
      description: t('home.feature.cranio.desc'),
    },
    {
      icon: <Play className="w-8 h-8 text-green-500" />,
      title: t('home.feature.breathing.title'),
      description: t('home.feature.breathing.desc'),
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: t('home.feature.chromotherapy.title'),
      description: t('home.feature.chromotherapy.desc'),
      isPremium: true
    },
    {
      icon: <Music className="w-8 h-8 text-orange-500" />,
      title: t('home.feature.sounds.title'),
      description: t('home.feature.sounds.desc'),
      isPremium: true
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: t('home.feature.consultation.title'),
      description: (
        <span className="flex items-center">
          {t('home.feature.consultation.title')}
          <svg className="w-5 h-5 ml-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </span>
      ),
      isPremium: true
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/Logo Xzenpress oficial.png" 
                alt="XZenPress Logo" 
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('breathing')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {t('home.hero.startNow')}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button
                onClick={() => onPageChange('login')}
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                {t('home.hero.createAccount')}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl group-hover:bg-purple-50 transition-colors">
                  {feature.icon}
                  </div>
                  {feature.isPremium && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      <Star className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            {t('home.cta.subtitle')}
          </p>
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">⚖️</span>
                <span><strong>Compliance Legal:</strong> Atendimento integral à NR-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🎯</span>
                <span><strong>ROI Comprovado:</strong> Retorno em 6 meses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">📊</span>
                <span><strong>Métricas:</strong> Dashboard de acompanhamento</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🏆</span>
                <span><strong>Certificação:</strong> Objetivo do Selo de qualidade</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('breathing')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t('home.cta.demo')}
            </button>
            <button
              onClick={() => onPageChange('premium')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              {t('home.cta.corporate')}
            </button>
          </div>
        </div>
      </section>

      {/* Legal Compliance Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.compliance.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.compliance.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">⚖️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Lei 14.831/2024</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2"><span className="text-green-500 mt-1">✓</span><span>Certificação como Empresa Promotora da Saúde Mental</span></li>
                <li className="flex items-start space-x-2"><span className="text-green-500 mt-1">✓</span><span>Práticas baseadas em evidências científicas</span></li>
                <li className="flex items-start space-x-2"><span className="text-green-500 mt-1">✓</span><span>Programas de prevenção e promoção da saúde mental</span></li>
                <li className="flex items-start space-x-2"><span className="text-green-500 mt-1">✓</span><span>Acompanhamento e métricas de efetividade</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">NR-1 Compliance</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2"><span className="text-blue-500 mt-1">✓</span><span>Avaliação de riscos psicossociais no trabalho</span></li>
                <li className="flex items-start space-x-2"><span className="text-blue-500 mt-1">✓</span><span>Medidas de prevenção e controle de estresse ocupacional</span></li>
                <li className="flex items-start space-x-2"><span className="text-blue-500 mt-1">✓</span><span>Treinamento e capacitação de colaboradores</span></li>
                <li className="flex items-start space-x-2"><span className="text-blue-500 mt-1">✓</span><span>Documentação e relatórios de conformidade</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🏆 {t('home.wellness.title')}
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                {t('home.wellness.desc')}
              </p>
              <div className="inline-flex items-center space-x-2 bg-yellow-100 border border-yellow-300 rounded-full px-6 py-3">
                <span className="text-yellow-700 font-semibold">📊 Análise Gratuita:</span>
                <span className="text-yellow-800">Experimentação dos pontos gratuitos (sem login)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};