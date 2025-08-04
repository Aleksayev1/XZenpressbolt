import React, { useState } from 'react';
import { MapPin, Lock, Star, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AcupressurePoint } from '../types';

const acupressurePoints: AcupressurePoint[] = [
  {
    id: '1',
    name: 'Yintang (EX-HN3)',
    nameEn: 'Third Eye Point',
    nameEs: 'Punto del Tercer Ojo',
    nameFr: 'Point du Troisième Œil',
    description: 'Localizado entre as sobrancelhas, ajuda com ansiedade e insônia',
    descriptionEn: 'Located between eyebrows, helps with anxiety and insomnia',
    descriptionEs: 'Ubicado entre las cejas, ayuda con ansiedad e insomnio',
    descriptionFr: 'Situé entre les sourcils, aide avec l\'anxiété et l\'insomnie',
    position: { x: 50, y: 25 },
    benefits: ['Reduz ansiedade', 'Melhora o sono', 'Alivia dores de cabeça'],
    benefitsEn: ['Reduces anxiety', 'Improves sleep', 'Relieves headaches'],
    benefitsEs: ['Reduce ansiedad', 'Mejora el sueño', 'Alivia dolores de cabeza'],
    benefitsFr: ['Réduit l\'anxiété', 'Améliore le sommeil', 'Soulage les maux de tête'],
    isPremium: false,
    category: 'general'
  },
  {
    id: '2',
    name: 'Shenmen (HE7)',
    nameEn: 'Spirit Gate',
    nameEs: 'Puerta del Espíritu',
    nameFr: 'Porte de l\'Esprit',
    description: 'No pulso, lado do dedo mindinho, acalma a mente',
    descriptionEn: 'On wrist, pinky side, calms the mind',
    descriptionEs: 'En la muñeca, lado del meñique, calma la mente',
    descriptionFr: 'Au poignet, côté auriculaire, calme l\'esprit',
    position: { x: 20, y: 70 },
    benefits: ['Reduz estresse', 'Melhora concentração', 'Equilibra emoções'],
    benefitsEn: ['Reduces stress', 'Improves focus', 'Balances emotions'],
    benefitsEs: ['Reduce estrés', 'Mejora concentración', 'Equilibra emociones'],
    benefitsFr: ['Réduit le stress', 'Améliore la concentration', 'Équilibre les émotions'],
    isPremium: false,
    category: 'general'
  },
  {
    id: '3',
    name: 'Baihui (GV20)',
    nameEn: 'Hundred Meetings',
    nameEs: 'Cien Reuniones',
    nameFr: 'Cent Réunions',
    description: 'No topo da cabeça, melhora clareza mental',
    descriptionEn: 'Top of head, improves mental clarity',
    descriptionEs: 'En la parte superior de la cabeza, mejora la claridad mental',
    descriptionFr: 'Au sommet de la tête, améliore la clarté mentale',
    position: { x: 50, y: 10 },
    benefits: ['Aumenta energia', 'Melhora memória', 'Reduz fadiga'],
    benefitsEn: ['Increases energy', 'Improves memory', 'Reduces fatigue'],
    benefitsEs: ['Aumenta energía', 'Mejora memoria', 'Reduce fatiga'],
    benefitsFr: ['Augmente l\'énergie', 'Améliore la mémoire', 'Réduit la fatigue'],
    isPremium: false,
    category: 'general'
  },
  {
    id: '4',
    name: 'Ponto Anti-Séptico Premium',
    nameEn: 'Premium Anti-Septic Point',
    nameEs: 'Punto Anti-Séptico Premium',
    nameFr: 'Point Anti-Septique Premium',
    description: 'Ponto específico para tratamento de septicemia',
    descriptionEn: 'Specific point for septicemia treatment',
    descriptionEs: 'Punto específico para tratamiento de septicemia',
    descriptionFr: 'Point spécifique pour le traitement de la septicémie',
    position: { x: 30, y: 40 },
    benefits: ['Fortalece imunidade', 'Combate infecções', 'Purifica sangue'],
    benefitsEn: ['Strengthens immunity', 'Fights infections', 'Purifies blood'],
    benefitsEs: ['Fortalece inmunidad', 'Combate infecciones', 'Purifica sangre'],
    benefitsFr: ['Renforce l\'immunité', 'Combat les infections', 'Purifie le sang'],
    isPremium: true,
    category: 'septicemia'
  },
  {
    id: '5',
    name: 'Ponto ATM Premium',
    nameEn: 'Premium TMJ Point',
    nameEs: 'Punto ATM Premium',
    nameFr: 'Point ATM Premium',
    description: 'Ponto específico para disfunção da ATM',
    descriptionEn: 'Specific point for TMJ dysfunction',
    descriptionEs: 'Punto específico para disfunción de ATM',
    descriptionFr: 'Point spécifique pour dysfonction ATM',
    position: { x: 35, y: 35 },
    benefits: ['Alivia dor na mandíbula', 'Reduz tensão facial', 'Melhora abertura bucal'],
    benefitsEn: ['Relieves jaw pain', 'Reduces facial tension', 'Improves mouth opening'],
    benefitsEs: ['Alivia dolor mandibular', 'Reduce tensión facial', 'Mejora apertura bucal'],
    benefitsFr: ['Soulage la douleur de la mâchoire', 'Réduit la tension faciale', 'Améliore l\'ouverture buccale'],
    isPremium: true,
    category: 'atm'
  }
];

export const AcupressurePage: React.FC = () => {
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const [selectedPoint, setSelectedPoint] = useState<AcupressurePoint | null>(null);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Blue
  const [isColorTherapyActive, setIsColorTherapyActive] = useState(false);

  const colors = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Magenta
  const colorNames = ['Azul Calmante', 'Verde Equilibrante', 'Magenta Energizante'];

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
                {availablePoints.map((point) => (
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
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Como Aplicar</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>• Pressione suavemente o ponto com o dedo indicador</p>
                <p>• Mantenha pressão constante por 30-60 segundos</p>
                <p>• Respire profundamente durante a aplicação</p>
                <p>• Use a técnica de respiração 4-7-8 para potencializar</p>
                <p>• Combine com cromoterapia para melhores resultados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="mt-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Desbloqueie Pontos Específicos</h2>
            <p className="text-xl mb-6 opacity-90">
              Acesse pontos especializados para septicemia, ATM e muito mais
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Fazer Upgrade Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
};