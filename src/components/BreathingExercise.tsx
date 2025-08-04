import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

export const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Blue
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const phases = {
    inhale: { duration: 4, next: 'hold' as const, color: '#3B82F6', label: 'Inspire' },
    hold: { duration: 7, next: 'exhale' as const, color: '#10B981', label: 'Segure' },
    exhale: { duration: 8, next: 'inhale' as const, color: '#8B5CF6', label: 'Expire' },
  };

  const colors = ['#3B82F6', '#10B981', '#8B5CF6']; // Blue, Green, Magenta

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
        setTotalTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase]);

  const startExercise = () => {
    setIsActive(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Audio play failed, continue without sound
      });
    }
  };

  const stopExercise = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setTotalTime(0);
    setCurrentColor('#3B82F6');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const circleRadius = 120;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = ((phases[phase].duration - timeLeft) / phases[phase].duration) * circumference;

  return (
    <div 
      className="min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out"
      style={{ 
        background: `linear-gradient(135deg, ${currentColor}20, ${currentColor}10, white)` 
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Técnica de Respiração 4-7-8
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
                r={phase === 'inhale' ? 80 : phase === 'hold' ? 90 : 60}
                fill={currentColor}
                fillOpacity="0.2"
                className="transition-all duration-1000 ease-in-out"
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
              <div className={`p-4 rounded-xl transition-all duration-300 ${phase === 'inhale' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-blue-600 mb-1">4s</div>
                <div className="text-sm text-gray-600">Inspire</div>
              </div>
              <div className={`p-4 rounded-xl transition-all duration-300 ${phase === 'hold' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-green-600 mb-1">7s</div>
                <div className="text-sm text-gray-600">Segure</div>
              </div>
              <div className={`p-4 rounded-xl transition-all duration-300 ${phase === 'exhale' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-purple-600 mb-1">8s</div>
                <div className="text-sm text-gray-600">Expire</div>
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
                <span>Iniciar Sessão</span>
              </button>
            ) : (
              <button
                onClick={stopExercise}
                className="flex items-center space-x-2 bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Pause className="w-6 h-6" />
                <span>Parar</span>
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
            <div className="text-sm text-gray-500 mb-2">Tempo Total</div>
            <div className="text-2xl font-bold text-gray-700">{formatTime(totalTime)}</div>
          </div>
        </div>

        {/* Sound Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-center space-x-4">
            <Volume2 className="w-6 h-6 text-gray-600" />
            <span className="text-gray-700">Sons Harmonizantes</span>
            <div className="flex space-x-2">
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Spotify Premium
              </a>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                Sons Gratuitos
              </button>
            </div>
          </div>
        </div>

        {/* Hidden audio element for ambient sounds */}
        <audio
          ref={audioRef}
          loop
          preload="none"
        >
          <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
};