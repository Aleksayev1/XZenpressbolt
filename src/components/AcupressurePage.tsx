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
    { id: 'cranio', name: 'Craniopuntura', icon: '🧠' },
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

        {/* Main Layout: Lista de Pontos + Painel de Detalhes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA ESQUERDA: Lista de Pontos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pontos Terapêuticos Visuais</h2>
            
            {/* Points Grid */}
            <div className="space-y-4">
              {filteredPoints.map((point) => (
                <div
                  key={point.id}
                  onClick={() => {
                    console.log('🔍 CLIQUE NO PONTO:', point.id, point.name);
                    setViewingPoint(point.id);
                  }}
                  className={`bg-white rounded-xl shadow-lg transition-all duration-300 border-2 cursor-pointer p-4 ${
                    viewingPoint === point.id
                      ? 'border-blue-500 shadow-xl bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                  } ${
                    point.isPremium && !user?.isPremium
                      ? 'opacity-60'
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Point Image */}
                    {point.image && (
                      <div className="relative flex-shrink-0">
                        <img 
                          src={point.image} 
                          alt={point.imageAlt || point.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {point.isPremium && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-yellow-500 text-white p-1 rounded-full">
                              <Crown className="w-3 h-3" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Point Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{point.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{Math.floor((point.duration || 120) / 60)}:00</span>
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {point.pressure || 'Leve'}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {point.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            point.category === 'general' ? 'bg-blue-100 text-blue-800' :
                            point.category === 'cranio' ? 'bg-purple-100 text-purple-800' :
                            point.category === 'septicemia' ? 'bg-red-100 text-red-800' :
                            point.category === 'atm' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {point.category === 'general' ? 'MTC' : 
                             point.category === 'cranio' ? 'Cranio' :
                             point.category === 'septicemia' ? 'Septicemia' :
                             point.category === 'atm' ? 'ATM' : point.category}
                          </div>
                          {point.isPremium && (
                            <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              <Crown className="w-3 h-3" />
                              <span>Premium</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-blue-600 text-sm font-medium">
                          Clique para ver detalhes →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Pontos Gratuitos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Pontos Premium</span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Painel de Detalhes */}
          <div className="lg:col-span-1">
            {viewingPoint && viewingPointData ? (
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
                {/* Header do Ponto */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingPointData.name}</h2>
                  {viewingPointData.isPremium && (
                    <div className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
                      <Crown className="w-4 h-4" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>

                {/* Imagem Grande */}
                {viewingPointData.image && (
                  <div className="mb-6">
                    <img 
                      src={viewingPointData.image} 
                      alt={viewingPointData.imageAlt || viewingPointData.name}
                      className="w-full h-48 object-cover rounded-xl shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Timer Ativo */}
                {isTimerActive && selectedPoint === viewingPoint && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-sm text-green-700 mb-3">
                        Sessão Ativa • Total: {formatTime(totalSessionTime)}
                      </div>
                      
                      {isIntegratedTherapy && (
                        <div className="mb-3">
                          <div className="text-sm font-semibold mb-1" style={{ color: currentColor }}>
                            {breathingPhase === 'inhale' ? 'Inspire' : 
                             breathingPhase === 'hold' ? 'Segure' : 'Expire'} ({breathingTimeLeft}s)
                          </div>
                          <div className="text-xs text-gray-500">Terapia Integrada</div>
                        </div>
                      )}
                      
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={stopTimer}
                          className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                        >
                          <Pause className="w-4 h-4" />
                          <span>Parar</span>
                        </button>
                        <button
                          onClick={resetTimer}
                          className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-600 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Reiniciar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cromoterapia */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🎨 Cromoterapia</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setCurrentColor('#3B82F6')}
                      className={`p-3 rounded-xl text-center text-white transition-all ${
                        currentColor === '#3B82F6' ? 'bg-blue-600 shadow-lg scale-105' : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      <div className="font-bold text-sm">Azul</div>
                      <div className="text-xs opacity-90">Calma</div>
                    </button>
                    <button 
                      onClick={() => setCurrentColor('#10B981')}
                      className={`p-3 rounded-xl text-center text-white transition-all ${
                        currentColor === '#10B981' ? 'bg-green-600 shadow-lg scale-105' : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      <div className="font-bold text-sm">Verde</div>
                      <div className="text-xs opacity-90">Equilíbrio</div>
                    </button>
                    <button 
                      onClick={() => setCurrentColor('#8B5CF6')}
                      className={`p-3 rounded-xl text-center text-white transition-all ${
                        currentColor === '#8B5CF6' ? 'bg-purple-600 shadow-lg scale-105' : 'bg-purple-500 hover:bg-purple-600'
                      }`}
                    >
                      <div className="font-bold text-sm">Roxo</div>
                      <div className="text-xs opacity-90">Energia</div>
                    </button>
                  </div>
                </div>

                {/* Sons Harmonizantes */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🎵 Sons</h3>
                  <div className="space-y-2">
                    {freeSounds.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => handleSoundSelect(sound.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedSoundId === sound.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            selectedSoundId === sound.id ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            {sound.icon}
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-semibold text-gray-800 text-sm">{sound.name}</div>
                            <div className="text-xs text-gray-600">{sound.description}</div>
                          </div>
                          {selectedSoundId === sound.id && isSoundPlaying && (
                            <div className="flex space-x-1">
                              <div className="w-1 h-4 bg-blue-500 rounded animate-pulse"></div>
                              <div className="w-1 h-4 bg-blue-500 rounded animate-pulse delay-100"></div>
                              <div className="w-1 h-4 bg-blue-500 rounded animate-pulse delay-200"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                    
                    {/* Controles de Áudio */}
                    {selectedSoundId && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={toggleSoundPlayback}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
                              isSoundPlaying
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                          >
                            {isSoundPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            <span>{isSoundPlaying ? 'Pausar' : 'Play'}</span>
                          </button>
                          
                          <div className="flex items-center space-x-2">
                            <VolumeX className="w-3 h-3 text-gray-500" />
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={soundVolume}
                              onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                              className="w-16 h-1 bg-gray-200 rounded appearance-none cursor-pointer"
                            />
                            <Volume2 className="w-3 h-3 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informações do Ponto */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Descrição</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {viewingPointData.description}
                  </p>
                  
                  {/* Benefícios */}
                  <h4 className="font-semibold text-gray-800 mb-2">Benefícios:</h4>
                  <div className="space-y-2">
                    {viewingPointData.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instruções */}
                {viewingPointData.instructions && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Como Aplicar:</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 text-sm leading-relaxed">
                        {viewingPointData.instructions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Botões de Ação */}
                {viewingPointData.isPremium && !user?.isPremium ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-yellow-600 bg-yellow-50 py-3 rounded-xl border border-yellow-200">
                      <Lock className="w-5 h-5" />
                      <span className="font-medium">Ponto Premium</span>
                    </div>
                    <button
                      onClick={() => onPageChange('premium')}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg"
                    >
                      🔓 Desbloquear Premium
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => startPointTimer(viewingPoint)}
                      disabled={isTimerActive}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Play className="w-5 h-5" />
                      <span>Aplicar Ponto ({Math.floor((viewingPointData.duration || 120) / 60)} min)</span>
                    </button>
                    
                    {user?.isPremium && (
                      <button
                        onClick={() => startIntegratedTherapy(viewingPoint)}
                        disabled={isTimerActive}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <Target className="w-4 h-4" />
                        <span>Terapia Integrada</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center sticky top-24">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Target className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  Selecione um Ponto
                </h3>
                <p className="text-gray-500 text-sm">
                  Clique em qualquer ponto da lista para ver detalhes, sons e cromoterapia
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-center text-white">
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
        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">
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
                Clique no ponto da lista para ver detalhes completos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Configure Som e Cor</h3>
              <p className="text-gray-600 text-sm">
                Escolha a cor terapêutica e som harmonizante
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Aplique com Timer</h3>
              <p className="text-gray-600 text-sm">
                Use o timer para aplicar pressão pelo tempo recomendado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};