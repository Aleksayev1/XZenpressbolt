import React from 'react';
import { Play, Heart, Brain, Palette, Music, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Acupressão MTC',
      description: 'Pontos de acupressão da Medicina Tradicional Chinesa para alívio natural',
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: 'Cranioterapia',
      description: 'Técnicas de cranioterapia para relaxamento profundo e bem-estar',
    },
    {
      icon: <Play className="w-8 h-8 text-green-500" />,
      title: 'Respiração 4-7-8',
      description: 'Técnica de respiração com timer para reduzir ansiedade e stress',
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: 'Cromoterapia',
      description: 'Cores terapêuticas (azul, verde, magenta) durante as sessões',
    },
    {
      icon: <Music className="w-8 h-8 text-orange-500" />,
      title: 'Sons Harmonizantes',
      description: 'Biblioteca de sons relaxantes e integração com Spotify Premium',
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Área Premium',
      description: 'Consultas via WhatsApp e pontos específicos para condições especiais',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Transforme sua vida com terapias holísticas
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Acupressão, respiração 4-7-8, cromoterapia e sons harmonizantes em uma plataforma única
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('breathing')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              {!user && (
                <button
                  onClick={() => onPageChange('login')}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
                >
                  Criar Conta Gratuita
                </button>
              )}
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
              Terapias Integradas para seu Bem-Estar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combine o melhor da medicina tradicional com tecnologia moderna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6 group-hover:bg-purple-50 transition-colors">
                  {feature.icon}
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua qualidade de vida?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de pessoas que já descobriram o poder das terapias holísticas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('breathing')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Experimentar Gratuitamente
            </button>
            <button
              onClick={() => onPageChange('premium')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Ver Planos Premium
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};