import React, { useState, useEffect, useRef } from 'react';
import { Target, Crown, Lock, Star, Clock, Play, Pause, RotateCcw, Info, CheckCircle, Timer, Volume2, VolumeX, Waves, CloudRain, Music, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSessionHistory } from '../hooks/useSessionHistory';
import { acupressurePoints, getPointsByCategory, getFreePoints, getPremiumPoints } from '../data/acupressurePoints';

interface AcupressurePageProps {
  onPageChange: (page: string) => void;
}

export const AcupressurePage: React.FC<AcupressurePageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { recordSession } = useSessionHistory();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalSessionTime, setTotalSessionTime] = useState(0);
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [isIntegratedTherapy, setIsIntegratedTherapy] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingTimeLeft, setBreathingTimeLeft] = useState(4);
  const [usedPoints, setUsedPoints] = useState<string[]>([]);
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.3);
  const [viewingPoint, setViewingPoint] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimeRef = useRef<NodeJS.Timeout | null>(null);
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const colorTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionStartTime = useRef<number | null>(null);

  const freeSounds = [
    {
      id: 'ocean',
      name: 'Sons do Mar',
      icon: <Waves className="w-5 h-5" />,
      src: '/sounds/ocean.mp3',
      description: 'Ondas relaxantes'
    },
    {
      id: 'rain',
      name: 'Chuva Suave',
      icon: <CloudRain className="w-5 h-5" />,
      src: '/sounds/rain.mp3',
      description: 'Chuva calmante'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os Pontos', icon: '🎯' },
    { id: 'general', name: 'MTC Geral', icon: '🫴' },
    { id: 'cranio', name: 'Craniopuntura', icon: '🧠', premium: true },
    { id: 'septicemia', name: 'Septicemia', icon: '🩸', premium: true },
    { id: 'atm', name: 'ATM', icon: '🦷', premium: true },
  ];

  const breathingPhases = {
    inhale: { duration: 4, next: 'hold' as const, color: '#3B82F6' },
    hold: { duration: 7, next: 'exhale' as const, color: '#10B981' },
    exhale: { duration: 8, next: 'inhale' as const, color: '#8B5CF6' },
  };

  const colors = ['#3B82F6', '#10B981', '#8B5CF6'];

  const filteredPoints = getPointsByCategory(selectedCategory, user?.isPremium || false);
  const selectedPointData = selectedPoint ? acupressurePoints.find(p => p.id === selectedPoint) : null;
  const viewingPointData = viewingPoint ? acupressurePoints.find(p => p.id === viewingPoint) : null;

  // Audio control effects
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundVolume;
    }
  }, [soundVolume]);

  useEffect(() => {
    if (audioRef.current && selectedSoundId) {
      if (isSoundPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSoundPlaying, selectedSoundId]);

  // Timer effects
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else if (timeLeft === 0 && isTimerActive) {
      stopTimer();
    }
  }, [isTimerActive, timeLeft]);

  useEffect(() => {
    if (isTimerActive) {
      totalTimeRef.current = setTimeout(() => {
        setTotalSessionTime(prev => prev + 1);
      }, 1000);
      
      return () => {
        if (totalTimeRef.current) {
          clearTimeout(totalTimeRef.current);
        }
      };
    }
  }, [isTimerActive, totalSessionTime]);

  useEffect(() => {
    if (isIntegratedTherapy && isTimerActive) {
      breathingTimerRef.current = setTimeout(() => {
        setBreathingTimeLeft(prev => {
          if (prev <= 1) {
            const currentPhase = breathingPhases[breathingPhase];
            const nextPhase = currentPhase.next;
            setBreathingPhase(nextPhase);
            setCurrentColor(breathingPhases[nextPhase].color);
            return breathingPhases[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (breathingTimerRef.current) {
          clearTimeout(breathingTimerRef.current);
        }
      };
    }
  }, [isIntegratedTherapy, isTimerActive, breathingPhase, breathingTimeLeft]);

  const startPointTimer = (pointId: string) => {
    const point = acupressurePoints.find(p => p.id === pointId);
    if (!point) return;

    if (point.isPremium && !user?.isPremium) {
      alert('Este ponto é exclusivo para usuários Premium. Faça upgrade para acessar!');
      return;
    }

    setSelectedPoint(pointId);
    setTimeLeft(point.duration || 120);
    setIsTimerActive(true);
    setTotalSessionTime(0);
    sessionStartTime.current = Date.now();
    
    if (!usedPoints.includes(pointId)) {
      setUsedPoints(prev => [...prev, pointId]);
    }
  };

  const startIntegratedTherapy = (pointId: string) => {
    const point = acupressurePoints.find(p => p.id === pointId);
    if (!point) return;

    if (point.isPremium && !user?.isPremium) {
      alert('Terapia integrada é exclusiva para usuários Premium!');
      return;
    }

    setSelectedPoint(pointId);
    setTimeLeft(point.duration || 120);
    setIsTimerActive(true);
    setIsIntegratedTherapy(true);
    setTotalSessionTime(0);
    setBreathingPhase('inhale');
    setBreathingTimeLeft(4);
    setCurrentColor('#3B82F6');
    sessionStartTime.current = Date.now();
    
    if (!usedPoints.includes(pointId)) {
      setUsedPoints(prev => [...prev, pointId]);
    }

    startColorTherapy();
  };

  const startColorTherapy = () => {
    let colorIndex = 0;
    
    const colorTick = () => {
      colorIndex = (colorIndex + 1) % colors.length;
      setCurrentColor(colors[colorIndex]);
      
      if (isIntegratedTherapy && isTimerActive) {
        colorTimerRef.current = setTimeout(colorTick, 20000);
      }
    };
    
    colorTimerRef.current = setTimeout(colorTick, 20000);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setIsIntegratedTherapy(false);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (totalTimeRef.current) {
      clearTimeout(totalTimeRef.current);
      totalTimeRef.current = null;
    }
    if (breathingTimerRef.current) {
      clearTimeout(breathingTimerRef.current);
      breathingTimerRef.current = null;
    }
    if (colorTimerRef.current) {
      clearTimeout(colorTimerRef.current);
      colorTimerRef.current = null;
    }
    
    if (user && sessionStartTime.current && totalSessionTime > 30) {
      recordSessionData();
    }
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setIsIntegratedTherapy(false);
    setSelectedPoint(null);
    setTimeLeft(0);
    setTotalSessionTime(0);
    setBreathingPhase('inhale');
    setBreathingTimeLeft(4);
    setCurrentColor('#3B82F6');
    sessionStartTime.current = null;
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (totalTimeRef.current) {
      clearTimeout(totalTimeRef.current);
      totalTimeRef.current = null;
    }
    if (breathingTimerRef.current) {
      clearTimeout(breathingTimerRef.current);
      breathingTimerRef.current = null;
    }
    if (colorTimerRef.current) {
      clearTimeout(colorTimerRef.current);
      colorTimerRef.current = null;
    }
  };

  const recordSessionData = async () => {
    if (!user || !sessionStartTime.current) return;

    try {
      await recordSession({
        sessionType: isIntegratedTherapy ? 'integrated' : 'acupressure',
        durationSeconds: totalSessionTime,
        pointsUsed: usedPoints,
        effectivenessRating: 4.0,
        sessionData: {
          integratedTherapy: isIntegratedTherapy,
          chromotherapyUsed: isIntegratedTherapy,
          selectedPoint: selectedPoint,
          completedCycles: isIntegratedTherapy ? Math.floor(totalSessionTime / 19) : 1
        },
        completedAt: new Date().toISOString()
      });
      
      console.log('✅ Sessão de acupressão registrada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao registrar sessão de acupressão:', error);
    }
  };

  const handleSoundSelect = (soundId: string) => {
    if (selectedSoundId === soundId) {
      setIsSoundPlaying(!isSoundPlaying);
    } else {
      setSelectedSoundId(soundId);
      setIsSoundPlaying(true);
    }
  };

  const toggleSoundPlayback = () => {
    if (selectedSoundId) {
      setIsSoundPlaying(!isSoundPlaying);
    }
  };

  const stopAllSounds = () => {
    setIsSoundPlaying(false);
    setSelectedSoundId(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out pt-16"
      style={{ 
        background: isIntegratedTherapy 
          ? `linear-gradient(135deg, ${currentColor}20, ${currentColor}10, white)` 
          : 'linear-gradient(135deg, #f0f9ff, #e0f2fe, white)'
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
            console.warn('Audio file not found:', e.currentTarget.src);
            setSelectedSoundId(null);
            setIsSoundPlaying(false);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
              <Target className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pontos de Acupressão
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Medicina Tradicional Chinesa com técnicas modernas de aplicação
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                disabled={category.premium && !user?.isPremium}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg'
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

        {/* Modal de Detalhes do Ponto */}
        {viewingPoint && viewingPointData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900">{viewingPointData.name}</h2>
                <button
                  onClick={() => setViewingPoint(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span className="text-3xl text-gray-500">×</span>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Lado Esquerdo - Imagem e Informações */}
                  <div>
                    {/* Imagem do Ponto */}
                    {viewingPointData.image && (
                      <div className="relative mb-6">
                        <img 
                          src={viewingPointData.image} 
                          alt={viewingPointData.imageAlt || viewingPointData.name}
                          className="w-full h-80 object-cover rounded-2xl shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {viewingPointData.isPremium && (
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                              <Crown className="w-5 h-5" />
                              <span>Premium</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Descrição */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Descrição</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {viewingPointData.description}
                      </p>
                    </div>

                    {/* Benefícios */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Benefícios</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {viewingPointData.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-3 bg-green-50 rounded-lg p-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lado Direito - Controles e Terapias */}
                  <div>
                    {/* Informações Técnicas */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                        <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-800">{Math.floor((viewingPointData.duration || 120) / 60)}</div>
                        <div className="text-sm text-blue-600">minutos</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                        <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-purple-800 capitalize">{viewingPointData.pressure || 'moderada'}</div>
                        <div className="text-sm text-purple-600">pressão</div>
                      </div>
                    </div>

                    {/* Instruções */}
                    {viewingPointData.instructions && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Como Aplicar</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-blue-800 leading-relaxed">
                            {viewingPointData.instructions}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Cromoterapia */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">🎨 Cromoterapia</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div 
                          className="bg-blue-500 rounded-xl p-4 text-center text-white cursor-pointer hover:bg-blue-600 transition-colors"
                          onClick={() => setCurrentColor('#3B82F6')}
                        >
                          <div className="text-lg font-bold">Azul</div>
                          <div className="text-xs opacity-90">Calmante</div>
                        </div>
                        <div 
                          className="bg-green-500 rounded-xl p-4 text-center text-white cursor-pointer hover:bg-green-600 transition-colors"
                          onClick={() => setCurrentColor('#10B981')}
                        >
                          <div className="text-lg font-bold">Verde</div>
                          <div className="text-xs opacity-90">Equilibrante</div>
                        </div>
                        <div 
                          className="bg-purple-500 rounded-xl p-4 text-center text-white cursor-pointer hover:bg-purple-600 transition-colors"
                          onClick={() => setCurrentColor('#8B5CF6')}
                        >
                          <div className="text-lg font-bold">Roxo</div>
                          <div className="text-xs opacity-90">Energizante</div>
                        </div>
                      </div>
                    </div>

                    {/* Sons Harmonizantes */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">🎵 Sons Harmonizantes</h3>
                      <div className="space-y-3">
                        {freeSounds.map((sound) => (
                          <button
                            key={sound.id}
                            onClick={() => handleSoundSelect(sound.id)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                              selectedSoundId === sound.id
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${
                                selectedSoundId === sound.id ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                {sound.icon}
                              </div>
                              <div className="text-left flex-1">
                                <div className="font-semibold text-gray-800">{sound.name}</div>
                                <div className="text-sm text-gray-600">{sound.description}</div>
                              </div>
                              {selectedSoundId === sound.id && isSoundPlaying && (
                                <div className="flex space-x-1">
                                  <div className="w-1 h-6 bg-blue-500 rounded animate-pulse"></div>
                                  <div className="w-1 h-6 bg-blue-500 rounded animate-pulse delay-100"></div>
                                  <div className="w-1 h-6 bg-blue-500 rounded animate-pulse delay-200"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                        
                        {/* Controles de Áudio */}
                        {selectedSoundId && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-center space-x-4">
                              <button
                                onClick={toggleSoundPlayback}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all ${
                                  isSoundPlaying
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                              >
                                {isSoundPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                <span>{isSoundPlaying ? 'Pausar' : 'Reproduzir'}</span>
                              </button>
                              
                              <div className="flex items-center space-x-2">
                                <VolumeX className="w-4 h-4 text-gray-500" />
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={soundVolume}
                                  onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                                  className="w-20 h-2 bg-gray-200 rounded appearance-none cursor-pointer"
                                />
                                <Volume2 className="w-4 h-4 text-gray-500" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    {viewingPointData.isPremium && !user?.isPremium ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 text-yellow-600 bg-yellow-50 py-4 rounded-xl border border-yellow-200">
                          <Lock className="w-5 h-5" />
                          <span className="font-medium">Ponto Premium - Faça upgrade para acessar</span>
                        </div>
                        <button
                          onClick={() => onPageChange('premium')}
                          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg"
                        >
                          🔓 Desbloquear Premium
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            startPointTimer(viewingPoint);
                            setViewingPoint(null);
                          }}
                          disabled={isTimerActive}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <Play className="w-6 h-6" />
                          <span>Aplicar Ponto ({Math.floor((viewingPointData.duration || 120) / 60)} minutos)</span>
                        </button>
                        
                        {user?.isPremium && (
                          <button
                            onClick={() => {
                              startIntegratedTherapy(viewingPoint);
                              setViewingPoint(null);
                            }}
                            disabled={isTimerActive}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                          >
                            <Target className="w-5 h-5" />
                            <span>Terapia Integrada (Respiração + Cores + Sons)</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Session Display */}
        {isTimerActive && selectedPoint && selectedPointData && (
          <div className="bg-white rounded-lg shadow-lg p-3 mb-4 max-w-sm mx-auto border-2 border-green-500">
            <div className="text-center">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                🎯 {selectedPointData.name}
              </h3>
              
              {isIntegratedTherapy && (
                <div className="mb-2">
                  <div className="text-sm font-semibold mb-1" style={{ color: currentColor }}>
                    {breathingPhase === 'inhale' ? 'Inspire' : 
                     breathingPhase === 'hold' ? 'Segure' : 'Expire'} ({breathingTimeLeft}s)
                  </div>
                  <div className="text-xs text-gray-500">Terapia Integrada Ativa</div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-green-50 rounded p-2">
                  <div className="text-sm font-bold text-green-600">{formatTime(timeLeft)}</div>
                  <div className="text-xs text-green-700">Restante</div>
                </div>
                <div className="bg-blue-50 rounded p-2">
                  <div className="text-sm font-bold text-blue-600">{formatTime(totalSessionTime)}</div>
                  <div className="text-xs text-blue-700">Total</div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2">
                <button
                  onClick={stopTimer}
                  className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-red-600 transition-colors"
                >
                  <Pause className="w-3 h-3" />
                  <span>Parar</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Points Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {filteredPoints.map((point) => (
            <div
              key={point.id}
              onClick={() => {
                console.log('🔍 CLIQUE NO CARD:', point.id, point.name);
                setViewingPoint(point.id);
              }}
              className={`bg-white rounded-2xl shadow-lg transition-all duration-300 border-2 cursor-pointer ${
                viewingPoint === point.id
                  ? 'border-green-500 shadow-xl'
                  : 'border-gray-200 hover:border-gray-300'
              } ${
                point.isPremium && !user?.isPremium
                  ? 'opacity-60'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Point Image */}
              {point.image && (
                <div className="relative">
                  <img 
                    src={point.image} 
                    alt={point.imageAlt || point.name}
                    className="w-full h-32 object-cover rounded-t-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {point.isPremium && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-yellow-500 text-white p-1 rounded-full">
                        <Crown className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-800 leading-tight">{point.name}</h3>
                  <div className="flex items-center space-x-2">
                    {point.isPremium && !user?.isPremium && (
                      <Lock className="w-3 h-3 text-yellow-500" />
                    )}
                    <div className="text-xs text-gray-500 capitalize">
                      {point.category}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {point.description}
                </p>

                {/* Duration and Pressure */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.floor((point.duration || 120) / 60)}min</span>
                  </div>
                  <div className="capitalize text-xs">
                    {point.pressure || 'moderada'}
                  </div>
                </div>

                {/* Compact Action Buttons */}
                {point.isPremium && !user?.isPremium ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-yellow-600 bg-yellow-50 py-2 rounded-lg">
                      <Lock className="w-3 h-3" />
                      <span className="text-xs font-medium">Premium</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPageChange('premium');
                      }}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg text-xs font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                    >
                      Desbloquear
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startPointTimer(point.id);
                      }}
                      disabled={isTimerActive}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg text-xs font-semibold hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>Aplicar</span>
                    </button>
                    
                    {user?.isPremium && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startIntegratedTherapy(point.id);
                        }}
                        disabled={isTimerActive}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-1.5 rounded-lg text-xs font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                      >
                        <Target className="w-2.5 h-2.5" />
                        <span>Integrada</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">🔒 Pontos Premium</h2>
            <p className="text-xl mb-6 opacity-90">
              Desbloqueie {getPremiumPoints().length} pontos especializados + terapia integrada
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🩸</div>
                <div className="font-semibold">Septicemia</div>
                <div className="text-sm opacity-80">3 pontos</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🦷</div>
                <div className="font-semibold">ATM</div>
                <div className="text-sm opacity-80">3 pontos</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-semibold">Craniopuntura</div>
                <div className="text-sm opacity-80">3 pontos</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold">Terapia Integrada</div>
                <div className="text-sm opacity-80">Respiração + Cores</div>
              </div>
            </div>
            <button 
              onClick={() => onPageChange('premium')}
              className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🔓 Desbloquear Pontos Premium
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Como Usar os Pontos de Acupressão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Escolha o Ponto</h3>
              <p className="text-gray-600 text-sm">
                Selecione o ponto baseado nos seus sintomas ou necessidades
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Aplique Pressão</h3>
              <p className="text-gray-600 text-sm">
                Use o timer para aplicar pressão pelo tempo recomendado
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Respire Profundo</h3>
              <p className="text-gray-600 text-sm">
                Mantenha respiração calma durante toda a aplicação
              </p>
            </div>
          </div>
          
          {/* Integrated Therapy Explanation */}
          {user?.isPremium && (
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-purple-800 mb-4 text-center">
                ⚡ Terapia Integrada Premium
              </h3>
              <p className="text-purple-700 text-center mb-4">
                Combine acupressão + respiração 4-7-8 + cromoterapia em uma única sessão
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-purple-800">Acupressão</div>
                  <div className="text-xs text-purple-600">Pressão no ponto</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Timer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">Respiração 4-7-8</div>
                  <div className="text-xs text-blue-600">Sincronizada</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
                  <div className="font-semibold text-purple-800">Cromoterapia</div>
                  <div className="text-xs text-purple-600">Cores automáticas</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            📊 Estatísticas da Plataforma
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{acupressurePoints.length}</div>
              <div className="text-sm text-gray-600">Pontos Totais</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{getFreePoints().length}</div>
              <div className="text-sm text-gray-600">Pontos Gratuitos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{getPremiumPoints().length}</div>
              <div className="text-sm text-gray-600">Pontos Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};