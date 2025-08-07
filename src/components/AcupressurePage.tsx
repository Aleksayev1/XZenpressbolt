import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Lock, Star, Info, Clock, Zap, Target, Crown, Volume2, VolumeX, Palette, Play, Pause } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AcupressurePoint } from '../types';
import { acupressurePoints } from '../data/acupressurePoints';

interface AcupressurePageProps {
  onPageChange?: (page: string) => void;
}

export const AcupressurePage: React.FC<AcupressurePageProps> = ({ onPageChange = () => {} }) => {
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const [selectedPoint, setSelectedPoint] = useState<AcupressurePoint | null>(null);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Blue
  const [isColorTherapyActive, setIsColorTherapyActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [initialDuration, setInitialDuration] = useState(0);
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isChromotherapyEnabled, setIsChromotherapyEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.3);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const colorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const colors = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Magenta
  const colorNames = ['Azul Calmante', 'Verde Equilibrante', 'Magenta Energizante'];
  
  const freeSounds = [
    {
      id: 'ocean',
      name: 'Sons do Mar',
      description: 'Ondas relaxantes do oceano',
      src: '/sounds/ocean.mp3'
    },
    {
      id: 'rain',
      name: 'Chuva Suave',
      description: 'Som calmante de chuva',
      src: '/sounds/rain.mp3'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os Pontos', icon: '🌟' },
    { id: 'general', name: 'MTC (Medicina Tradicional Chinesa)', icon: '☯️' },
    { id: 'cranio', name: 'Craniopuntura', icon: '🧠' },
    { id: 'mtc-premium', name: 'MTC Premium', icon: '👑', premium: true },
    { id: 'septicemia', name: 'Septicemia', icon: '🛡️', premium: true },
    { id: 'atm', name: 'ATM', icon: '🦷', premium: true },
    { id: 'neurologia', name: 'Neurologia Avançada', icon: '🧬', premium: true },
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

  // Audio control effects
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume;
    }
  }, [soundVolume]);

  useEffect(() => {
    if (audioRef.current && selectedSoundId) {
      if (isSoundPlaying) {
        audioRef.current.play().catch(error => {
          console.warn('Erro ao reproduzir áudio:', error);
          playFallbackTone();
        });
      } else {
        audioRef.current.pause();
        stopFallbackTone();
      }
    }
  }, [isSoundPlaying, selectedSoundId]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (colorIntervalRef.current) {
        clearInterval(colorIntervalRef.current);
        colorIntervalRef.current = null;
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopFallbackTone();
    }
  }, []);

  const startIntegratedTherapy = (duration: number) => {
    // Clear any existing intervals first
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (colorIntervalRef.current) {
      clearInterval(colorIntervalRef.current);
      colorIntervalRef.current = null;
    }
    
    setInitialDuration(duration);
    setTimeRemaining(duration);
    setIsTimerActive(true);
    
    // Start chromotherapy if enabled
    if (isChromotherapyEnabled) {
      setIsColorTherapyActive(true);
      let colorIndex = 0;
      setCurrentColor(colors[colorIndex]);
      colorIntervalRef.current = setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        setCurrentColor(colors[colorIndex]);
      }, 4000);
    }
    
    // Start sound if enabled and selected
    if (isSoundEnabled && selectedSoundId) {
      setIsSoundPlaying(true);
    }
    
    // Start timer countdown
    let startTime = Date.now();
    let expectedTime = startTime + 1000;
    
    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const drift = now - expectedTime;
      
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          stopIntegratedTherapy();
          return 0;
        }
        return prev - 1;
      });
      
      expectedTime += 1000;
    }, 1000);
  };

  const stopIntegratedTherapy = () => {
    setIsTimerActive(false);
    setIsColorTherapyActive(false);
    setIsSoundPlaying(false);
    setCurrentColor('#3B82F6');
    
    // Clear intervals
    if (colorIntervalRef.current) {
      clearInterval(colorIntervalRef.current);
      colorIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Stop fallback tone
    stopFallbackTone();
  };

  // Fallback audio using Web Audio API
  const playFallbackTone = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequency = selectedSoundId === 'ocean' ? 220 : 440;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(soundVolume * 0.1, audioContext.currentTime);
      
      oscillator.start();
      
      (window as any).currentTone = { oscillator, audioContext };
    } catch (error) {
      console.warn('Web Audio API não suportado:', error);
    }
  };
  
  const stopFallbackTone = () => {
    if ((window as any).currentTone) {
      try {
        (window as any).currentTone.oscillator.stop();
        (window as any).currentTone.audioContext.close();
        (window as any).currentTone = null;
      } catch (error) {
        console.warn('Erro ao parar tom:', error);
      }
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
    }, 60000);
  };

  const handleSoundSelect = (soundId: string) => {
    if (selectedSoundId === soundId) {
      setIsSoundPlaying(!isSoundPlaying);
    } else {
      setSelectedSoundId(soundId);
      setIsSoundPlaying(true);
    }
  };

  const filteredPoints = acupressurePoints.filter(point => {
    const categoryMatch = selectedCategory === 'all' || 
                         point.category === selectedCategory ||
                         (selectedCategory === 'mtc-premium' && point.category === 'general' && point.isPremium);
    const accessMatch = !point.isPremium || (user && user.isPremium);
    
    // Debug log para verificar acesso
    console.log(`🔍 Ponto ${point.name}:`, {
      category: point.category,
      selectedCategory,
      categoryMatch,
      isPremium: point.isPremium,
      userPremium: user?.isPremium,
      accessMatch,
      willShow: categoryMatch && accessMatch
    });
    
    return categoryMatch && accessMatch;
  });

  const availablePoints = acupressurePoints.filter(point => 
    !point.isPremium || (user && user.isPremium)
  );

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out pt-16"
      style={{ 
        background: isColorTherapyActive || isTimerActive
          ? `linear-gradient(135deg, ${currentColor}30, ${currentColor}10, white)`
          : 'linear-gradient(135deg, #f0f9ff, #e0e7ff, white)'
      }}
    >
      {/* Audio Element */}
      {selectedSoundId && (
        <audio
          ref={audioRef}
          src={freeSounds.find(sound => sound.id === selectedSoundId)?.src}
          loop
          preload="auto"
          onError={(e) => {
            console.warn('Arquivo de áudio não encontrado, usando tom sintético');
            if (isSoundPlaying) {
              playFallbackTone();
            }
          }}
          onCanPlay={() => {
            console.log('Áudio carregado com sucesso');
          }}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/Logo Xzenpress oficial.png" 
              alt="XZenPress Logo" 
              className="h-16 w-auto opacity-80"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
              Acupressão & Cranioterapia
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pontos terapêuticos da Medicina Tradicional Chinesa combinados com cromoterapia
          </p>
          
          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 max-w-5xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Categorias de Pontos</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={category.premium && !user?.isPremium}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full font-medium transition-all text-sm ${
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
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visual Points Gallery */}
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Pontos Terapêuticos Visuais
            </h2>
            
            {/* Category Description */}
            {selectedCategory !== 'all' && (
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                  {categories.find(c => c.id === selectedCategory)?.icon} {categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {selectedCategory === 'general' && 'Medicina Tradicional Chinesa - Pontos baseados em meridianos energéticos para equilíbrio do Qi e harmonização do organismo.'}
                  {selectedCategory === 'mtc-premium' && 'MTC Premium - Técnicas avançadas da Medicina Tradicional Chinesa com protocolos especializados e métodos de aplicação diferenciados para máxima eficácia terapêutica.'}
                  {selectedCategory === 'cranio' && 'Craniopuntura - Técnicas específicas de estimulação craniana para otimização das funções cerebrais e sistema nervoso.'}
                  {selectedCategory === 'septicemia' && 'Pontos MTC especializados para fortalecimento do sistema imunológico e combate a infecções sistêmicas graves.'}
                  {selectedCategory === 'atm' && 'Pontos específicos dos meridianos para disfunção da articulação temporomandibular, bruxismo e tensões faciais.'}
                  {selectedCategory === 'neurologia' && 'Pontos avançados para condições neurológicas: enxaquecas severas, insônia crônica e distúrbios neurológicos.'}
                </p>
              </div>
            )}
            
            {/* Points Grid */}
            <div className="space-y-3">
              {filteredPoints.length > 0 ? (
                filteredPoints.map((point) => (
                  <div
                    key={point.id}
                    onClick={() => setSelectedPoint(point)}
                    className={`cursor-pointer border-2 rounded-xl p-3 transition-all duration-200 hover:shadow-lg ${
                      selectedPoint?.id === point.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Point Image */}
                      {point.image ? (
                        <div className="flex-shrink-0">
                          <img
                            src={point.image}
                            alt={point.imageAlt || `Localização do ponto ${getLocalizedName(point)}`}
                            className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-200"
                            onError={(e) => {
                              console.log('Erro ao carregar imagem:', point.image);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                      )}
                      
                      {/* Point Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-800 truncate text-sm">
                            {getLocalizedName(point)}
                          </h3>
                          {point.isPremium && (
                            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs">
                              <Star className="w-2 h-2" />
                              <span>Premium</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                          {getLocalizedDescription(point)}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-2 h-2" />
                            <span>{formatTime(point.duration || 120)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-2 h-2" />
                            <span className="capitalize">{point.pressure || 'Moderada'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-600 mb-2">
                    Nenhum ponto disponível
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {selectedCategory === 'septicemia' || selectedCategory === 'atm' 
                      ? 'Estes pontos estão disponíveis apenas para usuários Premium'
                      : 'Selecione uma categoria para ver os pontos disponíveis'
                    }
                  </p>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Pontos Gratuitos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-600">Pontos Premium</span>
              </div>
            </div>
          </div>

          {/* Point Details */}
          <div className="space-y-4">
            {selectedPoint ? (
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {getLocalizedName(selectedPoint)}
                  </h3>
                  {selectedPoint.isPremium && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs">
                      <Star className="w-4 h-4" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {getLocalizedDescription(selectedPoint)}
                </p>
                
                {/* Point Image */}
                {selectedPoint.image && (
                  <div className="mb-4">
                    <img
                      src={selectedPoint.image}
                      alt={selectedPoint.imageAlt || `Localização do ponto ${getLocalizedName(selectedPoint)}`}
                     className="w-full max-w-sm mx-auto rounded-xl shadow-lg transition-all duration-1000"
                     style={{
                       filter: isTimerActive && isChromotherapyEnabled 
                         ? `hue-rotate(${currentColor === '#3B82F6' ? '0deg' : currentColor === '#10B981' ? '120deg' : '300deg'}) saturate(1.5) brightness(1.1)`
                         : 'none'
                     }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {/* Timer e Controles - Posicionados próximos ao ponto visual */}
                {selectedPoint && (!selectedPoint.isPremium || user?.isPremium) && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-800">Terapia Integrada</h4>
                      {isTimerActive && (
                        <div className="text-xl font-bold" style={{ color: currentColor }}>
                          {formatTime(timeRemaining)}
                        </div>
                      )}
                    </div>
                    
                    {/* Breathing Integration Guide */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 mb-3 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🫁</span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800">🫁 Respiração Integrada 4-7-8</h4>
                      </div>
                      
                      {/* Compact Breathing Steps */}
                      <div className="bg-white rounded-lg p-2 mb-3">
                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                            <span className="text-blue-800 font-medium text-xs">Inspire</span>
                            <span className="text-blue-600 text-xs">Azul</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">7</div>
                            <span className="text-green-800 font-medium text-xs">Segure</span>
                            <span className="text-green-600 text-xs">Verde</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">8</div>
                            <span className="text-purple-800 font-medium text-xs">Expire</span>
                            <span className="text-purple-600 text-xs">Magenta</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Compact Instructions */}
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600 space-y-1">
                          <div><strong>1.</strong> Posicione o dedo no ponto • <strong>2.</strong> Inicie o timer • <strong>3.</strong> Siga as cores:</div>
                          <div className="flex flex-wrap gap-1 text-xs">
                            <span><span className="text-blue-600">●</span> Azul = Inspire 4s + pressão</span>
                            <span><span className="text-green-600">●</span> Verde = Segure 7s + manter</span>
                            <span><span className="text-purple-600">●</span> Magenta = Expire 8s + circular</span>
                          </div>
                        </div>
                      </div>
                      
                      {isTimerActive && (
                        <div className="mt-2 bg-white rounded-lg p-2 border-l-4" style={{ borderColor: currentColor }}>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentColor }}></div>
                            <span className="font-semibold text-xs" style={{ color: currentColor }}>
                              {currentColor === '#3B82F6' && 'INSPIRE (4s) - Pressão suave no ponto'}
                              {currentColor === '#10B981' && 'SEGURE (7s) - Mantenha pressão constante'}
                              {currentColor === '#8B5CF6' && 'EXPIRE (8s) - Movimentos circulares suaves'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Therapy Controls */}
                    <div className="bg-gray-50 rounded-xl p-3 mb-3">
                      <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
                        {/* Chromotherapy Control */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Palette className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-medium text-gray-700">Cores</span>
                          </div>
                          <button
                            onClick={() => setIsChromotherapyEnabled(!isChromotherapyEnabled)}
                            className={`w-8 h-4 rounded-full transition-colors ml-2 ${
                              isChromotherapyEnabled ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                              isChromotherapyEnabled ? 'translate-x-4' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                        
                        {/* Sound Control */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Volume2 className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-gray-700">Sons</span>
                          </div>
                          <button
                            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                            className={`w-8 h-4 rounded-full transition-colors ml-2 ${
                              isSoundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                              isSoundEnabled ? 'translate-x-4' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Sound Selection */}
                      {isSoundEnabled && (
                        <div className="mb-2">
                          <label className="block text-xs font-medium text-gray-700 mb-2">
                            Selecionar Som:
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {freeSounds.map((sound) => (
                              <button
                                key={sound.id}
                                onClick={() => handleSoundSelect(sound.id)}
                                className={`p-2 rounded-lg border text-left transition-all flex-1 min-w-0 text-xs ${
                                  selectedSoundId === sound.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="font-medium">{sound.name}</div>
                                {selectedSoundId === sound.id && isSoundPlaying && (
                                  <div className="text-blue-600">🔊</div>
                                )}
                              </button>
                            ))}
                          </div>
                          
                          {/* Volume Control */}
                          {selectedSoundId && (
                            <div className="flex items-center space-x-2 mt-1">
                              <VolumeX className="w-3 h-3 text-gray-500" />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={soundVolume}
                                onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <Volume2 className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-600 min-w-[2rem]">
                                {Math.round(soundVolume * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Active Therapy Indicator */}
                      {(isChromotherapyEnabled || (isSoundEnabled && selectedSoundId)) && (
                        <div className="text-center mt-1">
                          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
                            {isChromotherapyEnabled && (
                              <div className="flex items-center space-x-1">
                                <div 
                                  className="w-2 h-2 rounded-full shadow-md" 
                                  style={{ 
                                    backgroundColor: currentColor,
                                    boxShadow: isTimerActive ? `0 0 8px ${currentColor}60` : 'none'
                                  }}
                                ></div>
                                <span className="text-xs text-gray-600">Cores</span>
                              </div>
                            )}
                            {isChromotherapyEnabled && isSoundEnabled && selectedSoundId && (
                              <div className="w-px h-3 bg-gray-300"></div>
                            )}
                            {isSoundEnabled && selectedSoundId && (
                              <div className="flex items-center space-x-1">
                                <Volume2 className="w-2 h-2 text-blue-500" />
                                <span className="text-xs text-gray-600">Som</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => {
                        if (isTimerActive) {
                          stopIntegratedTherapy();
                        } else {
                          startIntegratedTherapy(selectedPoint.duration || 120);
                        }
                      }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 text-sm ${
                        isTimerActive
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                      }`}
                    >
                      {isTimerActive ? (
                        <>
                          <Pause className="w-5 h-5" />
                          <span>Parar Terapia Integrada</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>🫁 Iniciar Acupressão + Respiração 4-7-8</span>
                        </>
                      )}
                    </button>
                    
                    {/* Therapy Description */}
                    <div className="mt-2 text-center">
                      <p className="text-xs text-gray-600">
                        {isTimerActive 
                          ? '🎯 Siga as cores para respirar corretamente durante a acupressão'
                          : isChromotherapyEnabled && isSoundEnabled && selectedSoundId
                          ? '🫁 Acupressão + Respiração 4-7-8 + Cromoterapia + Sons'
                          : isChromotherapyEnabled && (!isSoundEnabled || !selectedSoundId)
                          ? '🫁 Acupressão + Respiração 4-7-8 + Cromoterapia'
                          : !isChromotherapyEnabled && isSoundEnabled && selectedSoundId
                          ? '🫁 Acupressão + Respiração 4-7-8 + Sons'
                          : '🫁 Acupressão + Respiração 4-7-8'
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* Point Details */}
                <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-xl p-3 mb-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-blue-600" />
                      <span className="text-gray-600">Duração:</span>
                      <span className="font-semibold text-blue-800 text-xs">{formatTime(selectedPoint.duration || 120)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-3 h-3 text-green-600" />
                      <span className="text-gray-600">Pressão:</span>
                      <span className="font-semibold text-green-800 capitalize text-xs">{selectedPoint.pressure || 'Moderada'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-3 h-3 text-purple-600" />
                      <span className="text-gray-600">Categoria:</span>
                      <span className="font-semibold text-purple-800 capitalize text-xs">{selectedPoint.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-base font-semibold text-gray-800 mb-2">Benefícios:</h4>
                  <ul className="space-y-1">
                    {getLocalizedBenefits(selectedPoint).map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1"></div>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                {selectedPoint.instructions && (
                  <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-2">Instruções:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">
                      {selectedPoint.instructions}
                    </p>
                  </div>
                )}

                {/* Premium Lock Message */}
                {selectedPoint.isPremium && !user?.isPremium && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-800 text-sm">Conteúdo Premium</span>
                    </div>
                    <p className="text-yellow-700 text-xs">
                      Este ponto específico está disponível apenas para usuários Premium.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl p-6 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Selecione um Ponto
                </h3>
                <p className="text-gray-500 text-sm">
                  Clique em qualquer ponto no diagrama para ver detalhes e benefícios
                </p>
                
                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      {availablePoints.filter(p => !p.isPremium).length}
                    </div>
                    <div className="text-xs text-gray-500">Pontos Gratuitos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600">
                      {availablePoints.filter(p => p.isPremium).length}
                    </div>
                    <div className="text-xs text-gray-500">Pontos Premium</div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Guia de Aplicação Integrada</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🫁 Respiração + Acupressão:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <span className="text-blue-600">Azul</span>: Inspire 4s + pressão suave</li>
                      <li>• <span className="text-green-600">Verde</span>: Segure 7s + pressão constante</li>
                      <li>• <span className="text-purple-600">Magenta</span>: Expire 8s + movimentos circulares</li>
                      <li>• Siga as cores do timer para sincronizar</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🎯 Maximização dos Resultados:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use timer integrado para sincronização perfeita</li>
                      <li>• Cromoterapia potencializa os efeitos</li>
                      <li>• Aplique em ambiente tranquilo</li>
                      <li>• Sons harmonizantes amplificam relaxamento</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 bg-white rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-2 text-center">🧬 Ciência por trás da Integração</h4>
                  <p className="text-sm text-gray-600 text-center">
                    A combinação de <strong>acupressão + respiração 4-7-8 + cromoterapia</strong> ativa simultaneamente:
                    o sistema nervoso parassimpático, pontos de acupuntura tradicionais e receptores visuais,
                    criando um efeito sinérgico para máximo relaxamento e bem-estar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-6 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">🔒 Conteúdo Premium Bloqueado</h2>
            <p className="text-lg mb-4 opacity-90">
              Para acessar estes pontos especializados, você precisa ser um usuário Premium
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-semibold text-sm">Septicemia</div>
                <div className="text-sm opacity-80">🔒 3 pontos bloqueados</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl mb-2">🦷</div>
                <div className="font-semibold text-sm">ATM</div>
                <div className="text-sm opacity-80">🔒 3 pontos bloqueados</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-semibold text-sm">Cranioterapia</div>
                <div className="text-sm opacity-80">🔒 3 zonas bloqueadas</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-2xl mb-2">🧬</div>
                <div className="font-semibold text-sm">Neurologia</div>
                <div className="text-sm opacity-80">🔒 2 pontos bloqueados</div>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '#premium'}
              className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center space-x-2"
            >
              <Crown className="w-5 h-5" />
              <span>🔓 Desbloquear Agora</span>
            </button>
            <p className="text-xs opacity-80 mt-3">
              💳 Pagamento único • ✅ Acesso imediato • 🔒 Seguro
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Estatísticas da Plataforma
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {acupressurePoints.length}
              </div>
              <div className="text-xs text-gray-600">Pontos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {acupressurePoints.filter(p => !p.isPremium).length}
              </div>
              <div className="text-xs text-gray-600">Pontos Gratuitos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {acupressurePoints.filter(p => p.isPremium).length}
              </div>
              <div className="text-xs text-gray-600">Pontos Premium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {new Set(acupressurePoints.map(p => p.category)).size}
              </div>
              <div className="text-xs text-gray-600">Categorias</div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            💡 Dicas de Bem-Estar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">🌅 Rotina Matinal</h3>
              <p className="text-gray-600 text-xs">
                Comece o dia aplicando o ponto Baihui (VG20) por 2 minutos para aumentar energia e clareza mental.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">😴 Antes de Dormir</h3>
              <p className="text-gray-600 text-xs">
                Use o ponto Yintang (EX-HN3) combinado com respiração 4-7-8 para um sono mais reparador.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">💼 No Trabalho</h3>
              <p className="text-gray-600 text-xs">
                O ponto Shenmen (HE7) é perfeito para reduzir estresse durante o expediente.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">🎯 Foco e Concentração</h3>
              <p className="text-gray-600 text-xs">
                Combine cromoterapia azul com pontos frontais para melhorar concentração nos estudos.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 text-lg">⚠️</div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Aviso Importante</h3>
              <p className="text-yellow-700 text-xs">
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