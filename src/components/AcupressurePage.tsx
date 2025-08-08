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
  const expectedPhaseTimeRef = useRef<number>(0);
  const expectedTotalTimeRef = useRef<number>(0);

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

  const colors = [
    { hex: '#3B82F6', name: 'Azul Calmante', effect: 'Reduz ansiedade' },
    { hex: '#10B981', name: 'Verde Equilibrante', effect: 'Harmoniza emoções' },
    { hex: '#8B5CF6', name: 'Roxo Energizante', effect: 'Estimula criatividade' }
  ];

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

  // Precise timer effects with drift correction
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
  }, [isTimerActive, totalSessionTime]);

  // Breathing timer for integrated therapy
  useEffect(() => {
    if (isIntegratedTherapy && isTimerActive) {
      const startTime = Date.now();
      let expectedBreathingTime = startTime + 1000;
      
      const breathingTick = () => {
        const now = Date.now();
        const drift = now - expectedBreathingTime;
        
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
        
        expectedBreathingTime += 1000;
        const nextDelay = Math.max(0, 1000 - drift);
        
        if (isIntegratedTherapy && isTimerActive) {
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
    setIsIntegratedTherapy(false);
    setTotalSessionTime(0);
    setCurrentColor('#3B82F6');
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

  // Calculate pulse scale for breathing circle (same as BreathingExercise)
  const getPulseScale = () => {
    if (!isIntegratedTherapy) return 60;
    
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
  const progress = isIntegratedTherapy 
    ? ((breathingPhases[breathingPhase].duration - breathingTimeLeft) / breathingPhases[breathingPhase].duration) * circumference
    : ((selectedPointData?.duration || 120) - timeLeft) / (selectedPointData?.duration || 120) * circumference;

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out pt-16"
      style={{ 
        background: isIntegratedTherapy && isTimerActive
          ? `radial-gradient(circle at center, ${currentColor}40, ${currentColor}20, ${currentColor}10, white)`
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pontos Terapêuticos</h2>
            
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

          {/* COLUNA DIREITA: Painel de Detalhes Integrado */}
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

                {/* Timer Ativo com Círculo de Respiração */}
                {isTimerActive && selectedPoint === viewingPoint && (
                  <div 
                    className="mb-6 rounded-2xl p-6 border-2 transition-all duration-1000"
                    style={{ 
                      background: isIntegratedTherapy 
                        ? `linear-gradient(135deg, ${currentColor}30, ${currentColor}15, white)`
                        : 'linear-gradient(135deg, #f0f9ff, #e0f2fe, white)',
                      borderColor: currentColor + '40'
                    }}
                  >
                    {/* Breathing Circle - Identical to BreathingExercise */}
                    {isIntegratedTherapy && (
                      <div className="relative mb-6">
                        <svg className="w-48 h-48 mx-auto transform -rotate-90" viewBox="0 0 200 200">
                          {/* Background circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r={circleRadius}
                            stroke="#E5E7EB"
                            strokeWidth="6"
                            fill="none"
                          />
                          {/* Progress circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r={circleRadius}
                            stroke={currentColor}
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - progress}
                            className="transition-all duration-1000 ease-in-out"
                          />
                          {/* Inner breathing circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r={getPulseScale()}
                            fill={currentColor}
                            fillOpacity="0.3"
                            className="transition-all duration-500 ease-in-out"
                          />
                        </svg>
                        
                        {/* Center content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div 
                            className="text-4xl font-bold mb-1 transition-colors duration-500"
                            style={{ color: currentColor }}
                          >
                            {breathingTimeLeft}
                          </div>
                          <div 
                            className="text-lg font-semibold uppercase tracking-wider transition-colors duration-500"
                            style={{ color: currentColor }}
                          >
                            {breathingPhases[breathingPhase].label}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timer Display */}
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: currentColor }}>
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-sm mb-3" style={{ color: currentColor }}>
                        {isIntegratedTherapy ? 'Terapia Integrada' : 'Acupressão'} • Total: {formatTime(totalSessionTime)}
                      </div>
                      
                      {/* Breathing Phase Indicators for Integrated Therapy */}
                      {isIntegratedTherapy && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className={`p-2 rounded-lg text-center transition-all duration-500 ${
                            breathingPhase === 'inhale' 
                              ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            <div className="text-sm font-bold">4s</div>
                            <div className="text-xs">Inspire</div>
                          </div>
                          <div className={`p-2 rounded-lg text-center transition-all duration-500 ${
                            breathingPhase === 'hold' 
                              ? 'bg-green-500 text-white shadow-lg transform scale-105' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            <div className="text-sm font-bold">7s</div>
                            <div className="text-xs">Segure</div>
                          </div>
                          <div className={`p-2 rounded-lg text-center transition-all duration-500 ${
                            breathingPhase === 'exhale' 
                              ? 'bg-purple-500 text-white shadow-lg transform scale-105' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            <div className="text-sm font-bold">8s</div>
                            <div className="text-xs">Expire</div>
                          </div>
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

                {/* Imagem do Ponto com Overlay de Cor */}
                {viewingPointData.image && (
                  <div className="mb-6 relative">
                    <div 
                      className="absolute inset-0 rounded-xl transition-all duration-1000 opacity-30"
                      style={{ 
                        background: isIntegratedTherapy && isTimerActive
                          ? `radial-gradient(circle at center, ${currentColor}60, ${currentColor}30, transparent)`
                          : 'transparent'
                      }}
                    />
                    <img 
                      src={viewingPointData.image} 
                      alt={viewingPointData.imageAlt || viewingPointData.name}
                      className="w-full h-48 object-cover rounded-xl shadow-lg relative z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Cromoterapia Interativa */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🎨 Cromoterapia</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => (
                      <button 
                        key={color.hex}
                        onClick={() => setCurrentColor(color.hex)}
                        className={`p-3 rounded-xl text-center text-white transition-all duration-300 transform ${
                          currentColor === color.hex 
                            ? 'shadow-2xl scale-110 ring-4 ring-white ring-opacity-50' 
                            : 'hover:scale-105 shadow-lg'
                        }`}
                        style={{ 
                          background: `linear-gradient(135deg, ${color.hex}, ${color.hex}CC)`,
                          boxShadow: currentColor === color.hex 
                            ? `0 0 30px ${color.hex}60, 0 10px 25px rgba(0,0,0,0.2)`
                            : `0 4px 15px ${color.hex}40`
                        }}
                      >
                        <div className="font-bold text-sm drop-shadow-lg">{color.name.split(' ')[0]}</div>
                        <div className="text-xs opacity-90 drop-shadow">{color.name.split(' ')[1]}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium" style={{ color: currentColor }}>
                      {colors.find(c => c.hex === currentColor)?.effect}
                    </div>
                  </div>
                </div>

                {/* Sons Harmonizantes */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🎵 Sons Harmonizantes</h3>
                  <div className="space-y-2">
                    {freeSounds.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => handleSoundSelect(sound.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedSoundId === sound.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
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
                            <span className="text-xs text-gray-600">{Math.round(soundVolume * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Premium Sounds Teaser */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-purple-800 mb-1">🎼 Biblioteca Premium</div>
                        <div className="text-xs text-purple-700 mb-2">50+ sons + Spotify</div>
                        <button
                          onClick={() => onPageChange('sounds')}
                          className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-colors"
                        >
                          Ver Biblioteca
                        </button>
                      </div>
                    </div>
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
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Play className="w-4 h-4" />
                      <span>Aplicar Ponto ({Math.floor((viewingPointData.duration || 120) / 60)} min)</span>
                    </button>
                    
                    <button
                      onClick={() => startIntegratedTherapy(viewingPoint)}
                      disabled={isTimerActive}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Target className="w-4 h-4" />
                      <span>🧘 Terapia Integrada</span>
                    </button>
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
                <p className="text-gray-500 text-sm mb-4">
                  Clique em qualquer ponto da lista para ver detalhes, sons e cromoterapia
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold mb-2">🎯 Experiência Completa:</div>
                    <div className="space-y-1 text-xs">
                      <div>• Timer visual com círculo de respiração</div>
                      <div>• Cromoterapia com cores vibrantes</div>
                      <div>• Sons harmonizantes integrados</div>
                      <div>• Terapia integrada (respiração + acupressão)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">🔒 Pontos Premium</h2>
            <p className="text-xl mb-6 opacity-90">
              Desbloqueie {getPremiumPoints().length} pontos especializados + terapia integrada avançada
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
            Como Usar a Terapia Integrada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Escolha o Ponto</h3>
              <p className="text-gray-600 text-sm">
                Clique no ponto da lista para ver detalhes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Configure Som e Cor</h3>
              <p className="text-gray-600 text-sm">
                Escolha cor terapêutica e som harmonizante
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Terapia Integrada</h3>
              <p className="text-gray-600 text-sm">
                Respiração 4-7-8 + acupressão + cores
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">4️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Sinta os Efeitos</h3>
              <p className="text-gray-600 text-sm">
                Cores vibrantes + som + respiração sincronizada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};