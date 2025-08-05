import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Waves, CloudRain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const BreathingExercise: React.FC = () => {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Blue
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const phases = {
    inhale: { duration: 4, next: 'hold' as const, color: '#3B82F6', label: t('breathing.phase.inhale') },
    hold: { duration: 7, next: 'exhale' as const, color: '#10B981', label: t('breathing.phase.hold') },
    exhale: { duration: 8, next: 'inhale' as const, color: '#8B5CF6', label: t('breathing.phase.exhale') },
  };

  const colors = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Magenta
  
  const freeSounds = [
    {
      id: 'ocean',
      name: t('breathing.sounds.ocean'),
      icon: <Waves className="w-5 h-5" />,
      src: '/sounds/ocean.mp3',
      description: t('breathing.sounds.ocean.desc')
    },
    {
      id: 'rain',
      name: t('breathing.sounds.rain'),
      icon: <CloudRain className="w-5 h-5" />,
      src: '/sounds/rain.mp3',
      description: t('breathing.sounds.rain.desc')
    }
  ];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const currentPhase = phases[phase];
            const nextPhase = currentPhase.next;
            setPhase(nextPhase);
            setCurrentColor(phases[nextPhase].color);
            return phases[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Separate interval for total time
      totalTimeIntervalRef.current = setInterval(() => {
        setTotalTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (totalTimeIntervalRef.current) {
        clearInterval(totalTimeIntervalRef.current);
        totalTimeIntervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (totalTimeIntervalRef.current) {
        clearInterval(totalTimeIntervalRef.current);
      }
    };
  }, [isActive, phase]);

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

  const startExercise = () => {
    setIsActive(true);
  };

  const stopExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (totalTimeIntervalRef.current) {
      clearInterval(totalTimeIntervalRef.current);
      totalTimeIntervalRef.current = null;
    }
    setPhase('inhale');
    setTimeLeft(4);
    setTotalTime(0);
    setCurrentColor('#3B82F6');
  };

  const handleSoundSelect = (soundId: string) => {
    if (selectedSoundId === soundId) {
      // If same sound is selected, toggle play/pause
      setIsSoundPlaying(!isSoundPlaying);
    } else {
      // If different sound is selected, switch to it and start playing
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

  const circleRadius = 120;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = ((phases[phase].duration - timeLeft) / phases[phase].duration) * circumference;
  
  // Calculate pulse scale based on phase and time
  const getPulseScale = () => {
    const phaseProgress = (phases[phase].duration - timeLeft) / phases[phase].duration;
    if (phase === 'inhale') {
      return 60 + (30 * phaseProgress); // Expand from 60 to 90
    } else if (phase === 'hold') {
      return 90; // Stay at maximum
    } else {
      return 90 - (30 * phaseProgress); // Contract from 90 to 60
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out pt-16"
      style={{ 
        background: `linear-gradient(135deg, ${currentColor}20, ${currentColor}10, white)` 
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/Logo Xzenpress oficial.png" 
            alt="XZenPress Logo" 
            className="h-16 w-auto opacity-80"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {t('breathing.title.main')}
        </h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          {/* Breathing Circle */}
          <div className="relative mb-8">
            <svg className="w-80 h-80 mx-auto transform -rotate-90" viewBox="0 0 280 280">
              {/* Background circle */}
              <circle
                cx="140"
                cy="140"
                r={circleRadius}
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="140"
                cy="140"
                r={circleRadius}
                stroke={currentColor}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                className="transition-all duration-1000 ease-in-out"
              />
              {/* Inner breathing circle */}
              <circle
                cx="140"
                cy="140"
                r={getPulseScale()}
                fill={currentColor}
                fillOpacity="0.2"
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="text-6xl font-bold mb-2 transition-colors duration-500"
                style={{ color: currentColor }}
              >
                {timeLeft}
              </div>
              <div 
                className="text-2xl font-semibold uppercase tracking-wider transition-colors duration-500"
                style={{ color: currentColor }}
              >
                {phases[phase].label}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className={`p-4 rounded-xl transition-all duration-500 ${phase === 'inhale' ? 'bg-blue-50 border-2 border-blue-200 shadow-lg transform scale-105' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-blue-600 mb-1">4s</div>
                <div className="text-sm text-gray-600">{t('breathing.inhale')}</div>
                <div className="text-xs text-blue-500 mt-1">{t('breathing.chromotherapy.blue.calm')}</div>
              </div>
              <div className={`p-4 rounded-xl transition-all duration-500 ${phase === 'hold' ? 'bg-green-50 border-2 border-green-200 shadow-lg transform scale-105' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-green-600 mb-1">7s</div>
                <div className="text-sm text-gray-600">{t('breathing.hold')}</div>
                <div className="text-xs text-green-500 mt-1">{t('breathing.chromotherapy.green.balance')}</div>
              </div>
              <div className={`p-4 rounded-xl transition-all duration-500 ${phase === 'exhale' ? 'bg-purple-50 border-2 border-purple-200 shadow-lg transform scale-105' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-purple-600 mb-1">8s</div>
                <div className="text-sm text-gray-600">{t('breathing.exhale')}</div>
                <div className="text-xs text-purple-500 mt-1">{t('breathing.chromotherapy.magenta.renewal')}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {!isActive ? (
              <button
                onClick={startExercise}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Play className="w-6 h-6" />
                <span>{t('breathing.start.session')}</span>
              </button>
            ) : (
              <button
                onClick={stopExercise}
                className="flex items-center space-x-2 bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Pause className="w-6 h-6" />
                <span>{t('breathing.stop')}</span>
              </button>
            )}
            
            <button
              onClick={resetExercise}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Timer */}
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">{t('breathing.totalTime')}</div>
            <div className="text-2xl font-bold text-gray-700">{formatTime(totalTime)}</div>
          </div>
        </div>

        {/* Chromotherapy Education Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {t('breathing.chromotherapy.title')}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            {t('breathing.chromotherapy.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-blue-800">{t('breathing.chromotherapy.blue')}</h3>
              </div>
              <p className="text-blue-700 text-sm leading-relaxed">
                {t('breathing.chromotherapy.blue.desc')}
              </p>
              <div className="mt-4 text-xs text-blue-600 bg-blue-50 rounded-lg p-2">
                <strong>{t('breathing.phase')}:</strong> {t('breathing.phase.inhale.detail')}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-green-800">{t('breathing.chromotherapy.green')}</h3>
              </div>
              <p className="text-green-700 text-sm leading-relaxed">
                {t('breathing.chromotherapy.green.desc')}
              </p>
              <div className="mt-4 text-xs text-green-600 bg-green-50 rounded-lg p-2">
                <strong>{t('breathing.phase')}:</strong> {t('breathing.phase.hold.detail')}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-purple-800">{t('breathing.chromotherapy.magenta')}</h3>
              </div>
              <p className="text-purple-700 text-sm leading-relaxed">
                {t('breathing.chromotherapy.magenta.desc')}
              </p>
              <div className="mt-4 text-xs text-purple-600 bg-purple-50 rounded-lg p-2">
                <strong>{t('breathing.phase')}:</strong> {t('breathing.phase.exhale.detail')}
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {t('breathing.benefits.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.stress')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.sleep')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.focus')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{t('breathing.benefits.pressure')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sound Controls */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Volume2 className="w-6 h-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-800">{t('breathing.sounds.harmonizing')}</h3>
          </div>
          
          {/* Free Sounds Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">{t('breathing.sounds.free.title')}</h4>
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
                    <span>{isSoundPlaying ? t('breathing.sounds.pause') : t('breathing.sounds.play')}</span>
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
                    {t('breathing.sounds.stop')}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Premium Sounds Teaser */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">{t('breathing.sounds.premium.title')}</h4>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-gray-700 mb-4">
                {t('breathing.sounds.premium.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🌲 {t('breathing.sounds.forest')}</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🔥 {t('breathing.sounds.fireplace')}</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🎵 {t('breathing.sounds.classical.music')}</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">🧘 {t('breathing.sounds.mantras')}</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">{t('breathing.sounds.more')}</span>
              </div>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors mr-3"
              >
                <span>{t('breathing.sounds.premium.spotify')}</span>
              </a>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all">
                {t('breathing.sounds.premium.upgrade')}
              </button>
            </div>
          </div>
        </div>

        {/* Scientific Background */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🧬 {t('breathing.science.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">📚 {t('breathing.science.evidence')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {t('breathing.science.parasympathetic')}</li>
                <li>• {t('breathing.science.cortisol')}</li>
                <li>• {t('breathing.science.heartRate')}</li>
                <li>• {t('breathing.science.gaba')}</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">🎨 {t('breathing.science.chromotherapy')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {t('breathing.science.blue.effect')}</li>
                <li>• {t('breathing.science.green.effect')}</li>
                <li>• {t('breathing.science.magenta.effect')}</li>
                <li>• {t('breathing.science.melatonin')}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};