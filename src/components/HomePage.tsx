import React from 'react';
import { Play, Heart, Brain, Palette, Music, Star, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Acupressão Ocupacional',
      description: 'Técnicas de MTC adaptadas para alívio do estresse no ambiente de trabalho, reduzindo tensões musculares e ansiedade ocupacional',
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: 'Cranioterapia Corporativa',
      description: 'Protocolos específicos para alívio de cefaleia tensional, fadiga mental e sobrecarga cognitiva relacionadas ao trabalho',
    },
    {
      icon: <Play className="w-8 h-8 text-green-500" />,
      title: 'Respiração Anti-Estresse',
      description: 'Técnica 4-7-8 cientificamente validada para redução imediata da ansiedade e regulação do sistema nervoso durante o expediente',
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: 'Cromoterapia Ambiental',
      description: 'Aplicação de cores terapêuticas para otimização do ambiente de trabalho e redução de riscos psicossociais',
    },
    {
      icon: <Music className="w-8 h-8 text-orange-500" />,
      title: 'Soundscaping Corporativo',
      description: 'Paisagens sonoras especializadas para mascaramento de ruído ocupacional e promoção de foco e concentração',
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Consultoria Especializada',
      description: 'Acompanhamento profissional de Acupressão, Cranioterapia e MTC apenas para usuários Premium (via Whatsapp)',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
              <button
                onClick={() => onPageChange('login')}
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                Criar Conta Gratuita
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sua empresa promove a saúde integral, Wellness no ambiente de trabalho full time?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Implemente agora práticas de saúde mental e almeje a certificação de Empresa Promotora da Saúde.
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
              Demonstração Gratuita
            </button>
            <button
              onClick={() => onPageChange('premium')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Consultoria Corporativa
            </button>
          </div>
        </div>
      </section>

      {/* Legal Compliance Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conformidade Legal e Científica
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma foi desenvolvida em total conformidade com a legislação brasileira 
              e baseada em evidências científicas reconhecidas internacionalmente
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
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Certificação como Empresa Promotora da Saúde Mental</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Práticas baseadas em evidências científicas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Programas de prevenção e promoção da saúde mental</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Acompanhamento e métricas de efetividade</span>
                </li>
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
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Avaliação de riscos psicossociais no trabalho</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Medidas de prevenção e controle de estresse ocupacional</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Treinamento e capacitação de colaboradores</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Documentação e relatórios de conformidade</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🏆 Busca do Wellness Corporativo
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                Nossa metodologia auxilia sua empresa se tornar uma <strong>Empresa Promotora da Saúde Mental</strong>, 
                auxiliando no atendimento integral aos requisitos da Lei 14.831/2024 e NR-1, com efetividade online durante todo o processo.
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