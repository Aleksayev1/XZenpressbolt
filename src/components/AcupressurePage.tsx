import React, { useState } from 'react';
import { MapPin, Lock, Star, Info, Clock, Zap, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AcupressurePoint } from '../types';
import { acupressurePoints } from '../data/acupressurePoints';

export const AcupressurePage: React.FC = () => {
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const [selectedPoint, setSelectedPoint] = useState<AcupressurePoint | null>(null);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Blue
  const [isColorTherapyActive, setIsColorTherapyActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const colors = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Magenta
  const colorNames = ['Azul Calmante', 'Verde Equilibrante', 'Magenta Energizante'];

  const categories = [
    { id: 'all', name: 'Todos os Pontos', icon: '🌟' },
    { id: 'general', name: 'Pontos Gerais', icon: '⚡' },
    { id: 'septicemia', name: 'Septicemia', icon: '🛡️', premium: true },
    { id: 'atm', name: 'ATM', icon: '🦷', premium: true },
    { id: 'cranio', name: 'Cranioterapia', icon: '🧠', premium: true }
  ];

  const getLocalizedName = (point: AcupressurePoint) => {
    switch (currentLanguage.code) {
      case 'en': return point.nameEn;
      case 'es': return point.nameEs;
      case 'fr': return point.nameFr;
      default: return point.name;
    }
  };

  const getLocalizedDescription = (point: AcupressurePoint) => {
    switch (currentLanguage.code) {
      case 'en': return point.descriptionEn;
      case 'es': return point.descriptionEs;
      case 'fr': return point.descriptionFr;
      default: return point.description;
    }
  };

  const getLocalizedBenefits = (point: AcupressurePoint) => {
    switch (currentLanguage.code) {
      case 'en': return point.benefitsEn;
      case 'es': return point.benefitsEs;
      case 'fr': return point.benefitsFr;
      default: return point.benefits;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startPointTimer = (duration: number) => {
    setTimeRemaining(duration);
    setIsTimerActive(true);
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startColorTherapy = () => {
    setIsColorTherapyActive(true);
    let colorIndex = 0;
    const interval = setInterval(() => {
      setCurrentColor(colors[colorIndex]);
      colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setIsColorTherapyActive(false);
      setCurrentColor('#3B82F6');
    }, 60000); // 1 minute
  };

  const filteredPoints = acupressurePoints.filter(point => {
    const categoryMatch = selectedCategory === 'all' || point.category === selectedCategory;
    const accessMatch = !point.isPremium || (user && user.isPremium);
    return categoryMatch && accessMatch;
  });

  const availablePoints = acupressurePoints.filter(point => 
    !point.isPremium || (user && user.isPremium)
  );

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={{ 
        background: isColorTherapyActive 
          ? `linear-gradient(135deg, ${currentColor}30, ${currentColor}10, white)`
          : 'linear-gradient(135deg, #f0f9ff, #e0e7ff, white)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
              Acupressão & Cranioterapia
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pontos terapêuticos da Medicina Tradicional Chinesa combinados com cromoterapia
          </p>
          
          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Categorias de Pontos</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={category.premium && !user?.isPremium}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : category.premium && !user?.isPremium
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  {category.premium && !user?.isPremium && (
                    <Lock className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color Therapy Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cromoterapia</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {colors.map((color, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 cursor-pointer transform hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                  />
                  <span className="text-sm text-gray-600">{colorNames[index]}</span>
                </div>
              ))}
            </div>
            <button
              onClick={startColorTherapy}
              disabled={isColorTherapyActive}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                isColorTherapyActive
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
              }`}
            >
              {isColorTherapyActive ? 'Cromoterapia Ativa...' : 'Iniciar Cromoterapia (1min)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Body Diagram */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Mapa de Pontos Terapêuticos
            </h2>
            <div className="relative">
              {/* Simplified body outline */}
              <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
                {/* Head */}
                <ellipse cx="150" cy="60" rx="40" ry="50" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                {/* Body */}
                <rect x="120" y="100" width="60" height="120" rx="30" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                {/* Arms */}
                <ellipse cx="90" cy="140" rx="15" ry="40" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="210" cy="140" rx="15" ry="40" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                {/* Legs */}
                <ellipse cx="135" cy="280" rx="15" ry="60" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="165" cy="280" rx="15" ry="60" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Acupressure Points */}
                {filteredPoints.map((point) => (
                  <g key={point.id}>
                    <circle
                      cx={point.position.x * 3}
                      cy={point.position.y * 4}
                      r="8"
                      fill={point.isPremium ? '#fbbf24' : currentColor}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all duration-200"
                      onClick={() => setSelectedPoint(point)}
                    />
                    {point.isPremium && (
                      <Star 
                        x={point.position.x * 3 - 4} 
                        y={point.position.y * 4 - 4} 
                        width="8" 
                        height="8" 
                        fill="white"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Pontos Gratuitos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Pontos Premium</span>
              </div>
            </div>
          </div>

          {/* Point Details */}
          <div className="space-y-6">
            {selectedPoint ? (
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {getLocalizedName(selectedPoint)}
                  </h3>
                  {selectedPoint.isPremium && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      <Star className="w-4 h-4" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {getLocalizedDescription(selectedPoint)}
                </p>
                
                {/* Point Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duração</div>
                    <div className="font-semibold text-blue-800">
                      {formatTime(selectedPoint.duration || 120)}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Pressão</div>
                    <div className="font-semibold text-green-800 capitalize">
                      {selectedPoint.pressure || 'Moderada'}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Categoria</div>
                    <div className="font-semibold text-purple-800 capitalize">
                      {selectedPoint.category}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Benefícios:</h4>
                  <ul className="space-y-2">
                    {getLocalizedBenefits(selectedPoint).map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                {selectedPoint.instructions && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Instruções:</h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {selectedPoint.instructions}
                    </p>
                  </div>
                )}

                {/* Timer */}
                {selectedPoint && !selectedPoint.isPremium || user?.isPremium ? (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800">Timer de Aplicação</h4>
                      {isTimerActive && (
                        <div className="text-2xl font-bold text-blue-600">
                          {formatTime(timeRemaining)}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => startPointTimer(selectedPoint.duration || 120)}
                      disabled={isTimerActive}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        isTimerActive
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      }`}
                    >
                      {isTimerActive ? 'Timer Ativo...' : 'Iniciar Timer'}
                    </button>
                  </div>
                ) : null}

                {selectedPoint.isPremium && !user?.isPremium && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Conteúdo Premium</span>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Este ponto específico está disponível apenas para usuários Premium.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Selecione um Ponto
                </h3>
                <p className="text-gray-500">
                  Clique em qualquer ponto no diagrama para ver detalhes e benefícios
                </p>
                
                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {availablePoints.filter(p => !p.isPremium).length}
                    </div>
                    <div className="text-sm text-gray-500">Pontos Gratuitos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {availablePoints.filter(p => p.isPremium).length}
                    </div>
                    <div className="text-sm text-gray-500">Pontos Premium</div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Guia de Aplicação</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Técnica Básica:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Pressione suavemente com dedo indicador ou médio</li>
                      <li>• Mantenha pressão constante e confortável</li>
                      <li>• Respire profundamente durante aplicação</li>
                      <li>• Use movimentos circulares se indicado</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Potencialização:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Combine com respiração 4-7-8</li>
                      <li>• Use cromoterapia durante aplicação</li>
                      <li>• Aplique em ambiente tranquilo</li>
                      <li>• Mantenha regularidade na prática</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="mt-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🔓 Desbloqueie Pontos Específicos</h2>
            <p className="text-xl mb-6 opacity-90">
              Acesse pontos especializados para septicemia, ATM, cranioterapia e muito mais
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-semibold">Septicemia</div>
                <div className="text-sm opacity-80">Fortalecimento imunológico</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🦷</div>
                <div className="font-semibold">ATM</div>
                <div className="text-sm opacity-80">Disfunção temporomandibular</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-semibold">Cranioterapia</div>
                <div className="text-sm opacity-80">Técnicas cranianas avançadas</div>
              </div>
            </div>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>Fazer Upgrade Premium</span>
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Estatísticas da Plataforma
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {acupressurePoints.length}
              </div>
              <div className="text-sm text-gray-600">Pontos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {acupressurePoints.filter(p => !p.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Pontos Gratuitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {acupressurePoints.filter(p => p.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Pontos Premium</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(acupressurePoints.map(p => p.category)).size}
              </div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            💡 Dicas de Bem-Estar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">🌅 Rotina Matinal</h3>
              <p className="text-gray-600 text-sm">
                Comece o dia aplicando o ponto Baihui (GV20) por 2 minutos para aumentar energia e clareza mental.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">😴 Antes de Dormir</h3>
              <p className="text-gray-600 text-sm">
                Use o ponto Yintang (EX-HN3) combinado com respiração 4-7-8 para um sono mais reparador.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">💼 No Trabalho</h3>
              <p className="text-gray-600 text-sm">
                O ponto Shenmen (HE7) é perfeito para reduzir estresse durante o expediente.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">🎯 Foco e Concentração</h3>
              <p className="text-gray-600 text-sm">
                Combine cromoterapia azul com pontos frontais para melhorar concentração nos estudos.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 text-xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Aviso Importante</h3>
              <p className="text-yellow-700 text-sm">
                A acupressão é uma técnica complementar e não substitui tratamento médico. 
                Em caso de condições graves como septicemia, procure sempre assistência médica profissional. 
                Os pontos premium são baseados em técnicas tradicionais e devem ser usados como apoio ao tratamento convencional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
              Fazer Upgrade Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
};