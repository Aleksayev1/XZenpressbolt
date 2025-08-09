import React, { useState, useEffect, useRef } from 'react';
import { Target, Crown, Lock, Star, Clock, Play, Pause, RotateCcw, Info, CheckCircle, Timer, Volume2, VolumeX, Waves, CloudRain, Music, ExternalLink, Brain, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSessionHistory } from '../hooks/useSessionHistory';
import { acupressurePoints, getPointsByCategory, getFreePoints, getPremiumPoints } from '../data/acupressurePoints';
import { trackAcupressureSession } from './GoogleAnalytics';

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
  const sessionStartTime = useRef<number | null>(null);
  const expectedPhaseTimeRef = useRef<number>(0);
  const expectedTotalTimeRef = useRef<number>(0);
  const expectedBreathingTimeRef = useRef<number>(0);

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
    inhale: { duration: 4, next: 'hold' as const, color: '#3B82F6', label: 'Inspire' },
    hold: { duration: 7, next: 'exhale' as const, color: '#10B981', label: 'Segure' },
    exhale: { duration: 8, next: 'inhale' as const, color: '#8B5CF6', label: 'Expire' },
  };

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

  // Timer principal para duração do ponto
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const startTime = Date.now();
      expectedPhaseTimeRef.current = startTime + 1000;
      
      const tick = () => {
        const now = Date.now();
        const drift = now - expectedPhaseTimeRef.current;
        
        setTimeLeft(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
        
        if (timeLeft > 1) {
          expectedPhaseTimeRef.current += 1000;
          const nextDelay = Math.max(0, 1000 - drift);
          timerRef.current = setTimeout(tick, nextDelay);
        }
      };
      
      timerRef.current = setTimeout(tick, 1000);
      
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    } else if (timeLeft === 0 && isTimerActive) {
      stopTimer();
    }
  }, [isTimerActive, timeLeft]);

  // Timer total da sessão
  useEffect(() => {
    if (isTimerActive) {
      const startTime = Date.now();
      expectedTotalTimeRef.current = startTime + 1000;
      
      const totalTick = () => {
        const now = Date.now();
        const drift = now - expectedTotalTimeRef.current;
        
        setTotalSessionTime(prev => prev + 1);
        
        expectedTotalTimeRef.current += 1000;
        const nextDelay = Math.max(0, 1000 - drift);
        
        if (isTimerActive) {
          totalTimeRef.current = setTimeout(totalTick, nextDelay);
        }
      };
      
      totalTimeRef.current = setTimeout(totalTick, 1000);
      
      return () => {
        if (totalTimeRef.current) {
          clearTimeout(totalTimeRef.current);
          totalTimeRef.current = null;
        }
      };
    }
  }, [isTimerActive]);

  // Timer de respiração 4-7-8 (sempre ativo quando timer principal está ativo)
  useEffect(() => {
    if (isTimerActive) {
      const startTime = Date.now();
      expectedBreathingTimeRef.current = startTime + 1000;
      
      const breathingTick = () => {
        const now = Date.now();
        const drift = now - expectedBreathingTimeRef.current;
        
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
        
        expectedBreathingTimeRef.current += 1000;
        const nextDelay = Math.max(0, 1000 - drift);
        
        if (isTimerActive) {
          breathingTimerRef.current = setTimeout(breathingTick, nextDelay);
        }
      };
      
      breathingTimerRef.current = setTimeout(breathingTick, 1000);
      
      return () => {
        if (breathingTimerRef.current) {
          clearTimeout(breathingTimerRef.current);
          breathingTimerRef.current = null;
        }
      };
    }
  }, [isTimerActive, breathingPhase, breathingTimeLeft]);

  // Função única para iniciar terapia integrada
  const startIntegratedTherapy = (pointId: string) => {
    const point = acupressurePoints.find(p => p.id === pointId);
    if (!point) return;

    if (point.isPremium && !user?.isPremium) {
      alert('Este ponto é exclusivo para usuários Premium. Faça upgrade para acessar!');
      return;
    }

    setSelectedPoint(pointId);
    setViewingPoint(pointId);
    setTimeLeft(point.duration || 120);
    setIsTimerActive(true);
    setTotalSessionTime(0);
    setBreathingPhase('inhale');
    setBreathingTimeLeft(4);
    setCurrentColor('#3B82F6');
    sessionStartTime.current = Date.now();
    
    trackAcupressureSession(pointId, point.duration || 120, true);
    
    if (!usedPoints.includes(pointId)) {
      setUsedPoints(prev => [...prev, pointId]);
    }
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    
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
    
    if (user && sessionStartTime.current && totalSessionTime > 30) {
      recordSessionData();
    }
  };

  const resetTimer = () => {
    setIsTimerActive(false);
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
  };

  const recordSessionData = async () => {
    if (!user || !sessionStartTime.current) return;

    try {
      await recordSession({
        sessionType: 'integrated',
        durationSeconds: totalSessionTime,
        pointsUsed: usedPoints,
        effectivenessRating: 4.0,
        sessionData: {
          integratedTherapy: true,
          chromotherapyUsed: true,
          selectedPoint: selectedPoint,
          completedCycles: Math.floor(totalSessionTime / 19)
        },
        completedAt: new Date().toISOString()
      });
      
      console.log('✅ Sessão de terapia integrada registrada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao registrar sessão de terapia integrada:', error);
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

  // Calculate pulse scale for breathing circle
  const getPulseScale = () => {
    const phaseProgress = (breathingPhases[breathingPhase].duration - breathingTimeLeft) / breathingPhases[breathingPhase].duration;
    if (breathingPhase === 'inhale') {
      return 60 + (30 * phaseProgress); // Expand from 60 to 90
    } else if (breathingPhase === 'hold') {
      return 90; // Stay at maximum
    } else {
      return 90 - (30 * phaseProgress); // Contract from 90 to 60
    }
  };

  const circleRadius = 80;
  const circumference = 2 * Math.PI * circleRadius;
  const breathingProgress = ((breathingPhases[breathingPhase].duration - breathingTimeLeft) / breathingPhases[breathingPhase].duration) * circumference;

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out pt-16"
      style={{ 
        background: isTimerActive
          ? `radial-gradient(circle at center, ${currentColor}50, ${currentColor}30, ${currentColor}15, white)`
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
              Terapia Integrada
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acupressão + Respiração 4-7-8 + Cromoterapia + Sons Harmonizantes
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

        {/* Timer Ativo - Experiência Completa */}
        {isTimerActive && selectedPointData && (
          <div className="mb-8">
            <div 
              className="bg-white rounded-3xl shadow-2xl p-8 border-2 transition-all duration-1000"
              style={{ 
                borderColor: currentColor + '60',
                background: `linear-gradient(135deg, ${currentColor}20, ${currentColor}10, white)`
              }}
            >
              {/* Breathing Circle */}
              <div className="relative mb-8">
                <svg className="w-80 h-80 mx-auto transform -rotate-90" viewBox="0 0 280 280">
                  {/* Background circle */}
                  <circle
                    cx="140"
                    cy="140"
                    r={circleRadius * 1.75}
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="140"
                    cy="140"
                    r={circleRadius * 1.75}
                    stroke={currentColor}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference * 1.75}
                    strokeDashoffset={(circumference * 1.75) - breathingProgress * 1.75}
                    className="transition-all duration-1000 ease-in-out"
                  />
                  {/* Inner breathing circle */}
                  <circle
                    cx="140"
                    cy="140"
                    r={getPulseScale() * 1.5}
                    fill={currentColor}
                    fillOpacity="0.4"
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div 
                    className="text-6xl font-bold mb-2 transition-colors duration-500"
                    style={{ color: currentColor }}
                  >
                    {breathingTimeLeft}
                  </div>
                  <div 
                    className="text-2xl font-semibold uppercase tracking-wider transition-colors duration-500"
                    style={{ color: currentColor }}
                  >
                    {breathingPhases[breathingPhase].label}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {selectedPointData.name}
                  </div>
                </div>
              </div>

              {/* Breathing Phase Indicators */}
              <div className="grid grid-cols-3 gap-4 text-center mb-8">
                <div className={`p-4 rounded-xl transition-all duration-500 ${
                  breathingPhase === 'inhale' 
                    ? 'bg-blue-500 text-white border-2 border-blue-600 shadow-lg transform scale-105' 
                    : 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                }`}>
                  <div className="text-2xl font-bold mb-1">4s</div>
                  <div className="text-sm">Inspire</div>
                  <div className="text-xs mt-1 opacity-80">Azul Calmante</div>
                </div>
                <div className={`p-4 rounded-xl transition-all duration-500 ${
                  breathingPhase === 'hold' 
                    ? 'bg-green-500 text-white border-2 border-green-600 shadow-lg transform scale-105' 
                    : 'bg-green-50 text-green-700 border-2 border-green-200'
                }`}>
                  <div className="text-2xl font-bold mb-1">7s</div>
                  <div className="text-sm">Segure</div>
                  <div className="text-xs mt-1 opacity-80">Verde Equilibrante</div>
                </div>
                <div className={`p-4 rounded-xl transition-all duration-500 ${
                  breathingPhase === 'exhale' 
                    ? 'bg-purple-500 text-white border-2 border-purple-600 shadow-lg transform scale-105' 
                    : 'bg-purple-50 text-purple-700 border-2 border-purple-200'
                }`}>
                  <div className="text-2xl font-bold mb-1">8s</div>
                  <div className="text-sm">Expire</div>
                  <div className="text-xs mt-1 opacity-80">Roxo Energizante</div>
                </div>
              </div>

              {/* Timer Info */}
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">Tempo do Ponto</div>
                <div className="text-3xl font-bold text-gray-700 mb-2">{formatTime(timeLeft)}</div>
                <div className="text-sm text-gray-500">Total da Sessão: {formatTime(totalSessionTime)}</div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={stopTimer}
                  className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition-all shadow-lg"
                >
                  <Pause className="w-5 h-5" />
                  <span>Parar</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition-all shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reiniciar</span>
                </button>
                <button
                  onClick={() => onPageChange('sounds')}
                  className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-600 transition-all shadow-lg"
                >
                  <Music className="w-5 h-5" />
                  <span>Biblioteca</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Layout: Lista de Pontos + Painel de Detalhes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA ESQUERDA: Lista de Pontos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pontos Terapêuticos</h2>
            
            {/* Points Grid */}
            <div className="space-y-4">
              {filteredPoints.map((point) => (
                <div
                  key={point.id}
                  onClick={() => {
                    if (!isTimerActive) {
                      startIntegratedTherapy(point.id);
                    } else {
                      setViewingPoint(point.id);
                    }
                  }}
                  className={`bg-white rounded-xl shadow-lg transition-all duration-300 border-2 cursor-pointer p-4 ${
                    selectedPoint === point.id
                      ? 'border-green-500 shadow-xl bg-green-50'
                    : viewingPoint === point.id
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
                            {point.category === 'general' ? 'MTC Geral' : 
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
                        
                        <div className="text-green-600 text-sm font-medium">
                          {isTimerActive ? 'Ver detalhes →' : 'Iniciar terapia →'}
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{viewingPointData.name}</h2>
                  {viewingPointData.isPremium && (
                    <div className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <Crown className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>

                {/* Imagem do Ponto */}
                {viewingPointData.image && (
                  <div className="mb-6 relative">
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

                {/* Botão de Ação */}
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
                ) : !isTimerActive ? (
                  <button
                    onClick={() => startIntegratedTherapy(viewingPoint)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>🧘 Iniciar Terapia Integrada</span>
                  </button>
                ) : selectedPoint === viewingPoint ? (
                  <div className="text-center">
                    <div className="bg-green-100 border border-green-300 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-green-700">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold">Terapia Ativa</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => startIntegratedTherapy(viewingPoint)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    Trocar para este Ponto
                  </button>
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
                <p className="text-gray-500 text-sm mb-4">
                  Clique em qualquer ponto para iniciar a terapia integrada completa
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold mb-2">🧘 Terapia Integrada:</div>
                    <div className="space-y-1 text-xs">
                      <div>• Acupressão com timer preciso</div>
                      <div>• Respiração 4-7-8 sincronizada</div>
                      <div>• Cromoterapia com cores vibrantes</div>
                      <div>• Sons harmonizantes opcionais</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sound Controls - Sempre Visível */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Volume2 className="w-6 h-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-800">Sons Harmonizantes</h3>
          </div>
          
          {/* Free Sounds Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">🎵 Sons Gratuitos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {freeSounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => handleSoundSelect(sound.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
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
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{sound.name}</div>
                      <div className="text-sm text-gray-600">{sound.description}</div>
                    </div>
                    {selectedSoundId === sound.id && isSoundPlaying && (
                      <div className="ml-auto">
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-blue-500 rounded animate-pulse"></div>
                          <div className="w-1 h-4 bg-blue-500 rounded animate-pulse delay-100"></div>
                          <div className="w-1 h-4 bg-blue-500 rounded animate-pulse delay-200"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Audio Controls */}
            {selectedSoundId && (
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Play/Pause Button */}
                  <button
                    onClick={toggleSoundPlayback}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                      isSoundPlaying
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isSoundPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{isSoundPlaying ? 'Pausar' : 'Reproduzir'}</span>
                  </button>
                  
                  {/* Volume Control */}
                  <div className="flex items-center space-x-3">
                    <VolumeX className="w-5 h-5 text-gray-500" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={soundVolume}
                      onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                      className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <Volume2 className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600 min-w-[3rem]">
                      {Math.round(soundVolume * 100)}%
                    </span>
                  </div>
                  
                  {/* Stop Button */}
                  <button
                    onClick={stopAllSounds}
                    className="px-4 py-2 bg-gray-500 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-colors"
                  >
                    Parar
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Premium Sounds Teaser */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">🎼 Biblioteca Premium</h4>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-gray-700 mb-4">Mais de 50 sons exclusivos + integração Spotify Premium</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🌲 Floresta</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🔥 Lareira</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🎵 Clássica</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🧘 Mantras</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">+45 sons</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir Spotify</span>
                </a>
                <button 
                  onClick={() => onPageChange('premium')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                >
                  Upgrade Premium
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🔒 Pontos Premium</h2>
            <p className="text-xl mb-6 opacity-90">
              Desbloqueie {getPremiumPoints().length} pontos especializados com terapia integrada avançada
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
                <div className="font-semibold">Cranio Premium</div>
                <div className="text-sm opacity-80">3 pontos</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold">Terapia Integrada</div>
                <div className="text-sm opacity-80">Sempre Ativa</div>
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

      </div>
    </div>
  );
};