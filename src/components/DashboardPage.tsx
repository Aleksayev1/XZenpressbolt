import React, { useState, useEffect } from 'react';
import { BarChart3, Users, TrendingUp, Clock, Target, Brain, Heart, Zap, Calendar, Award, Download, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardPageProps {
  onPageChange: (page: string) => void;
}

interface SessionData {
  date: string;
  type: 'breathing' | 'acupressure' | 'chromotherapy';
  duration: number;
  pointsUsed?: string[];
  effectiveness: number;
}

interface WeeklyStats {
  totalSessions: number;
  totalTime: number;
  averageEffectiveness: number;
  streakDays: number;
  favoritePoint: string;
  improvementTrend: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);

  useEffect(() => {
    // Simular dados de sessões para demonstração
    const mockSessions: SessionData[] = [
      { date: '2025-01-05', type: 'breathing', duration: 300, effectiveness: 4.5 },
      { date: '2025-01-05', type: 'acupressure', duration: 180, pointsUsed: ['yintang-ex-hn3'], effectiveness: 4.2 },
      { date: '2025-01-04', type: 'breathing', duration: 240, effectiveness: 4.8 },
      { date: '2025-01-04', type: 'chromotherapy', duration: 120, effectiveness: 4.0 },
      { date: '2025-01-03', type: 'acupressure', duration: 200, pointsUsed: ['baihui-basic-vg20'], effectiveness: 4.6 },
      { date: '2025-01-02', type: 'breathing', duration: 360, effectiveness: 4.9 },
      { date: '2025-01-01', type: 'acupressure', duration: 150, pointsUsed: ['yongquan-r1-kd1'], effectiveness: 4.3 },
    ];

    setSessionHistory(mockSessions);

    // Calcular estatísticas
    const stats: WeeklyStats = {
      totalSessions: mockSessions.length,
      totalTime: mockSessions.reduce((acc, session) => acc + session.duration, 0),
      averageEffectiveness: mockSessions.reduce((acc, session) => acc + session.effectiveness, 0) / mockSessions.length,
      streakDays: 5,
      favoritePoint: 'Yintang (EX-HN3)',
      improvementTrend: 15.3
    };

    setWeeklyStats(stats);
  }, [selectedPeriod]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'breathing': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'acupressure': return <Target className="w-4 h-4 text-green-500" />;
      case 'chromotherapy': return <Zap className="w-4 h-4 text-purple-500" />;
      default: return <Heart className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'breathing': return 'Respiração 4-7-8';
      case 'acupressure': return 'Acupressão';
      case 'chromotherapy': return 'Cromoterapia';
      default: return type;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Faça login para acessar seu dashboard</p>
          <button
            onClick={() => onPageChange('login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard de Bem-estar</h1>
              <p className="text-gray-600 mt-2">Acompanhe seu progresso e insights personalizados</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
                <option value="year">Último Ano</option>
              </select>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {weeklyStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{weeklyStats.totalSessions}</span>
              </div>
              <h3 className="font-semibold text-gray-800">Sessões Realizadas</h3>
              <p className="text-sm text-gray-600">Esta semana</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{formatDuration(weeklyStats.totalTime)}</span>
              </div>
              <h3 className="font-semibold text-gray-800">Tempo Total</h3>
              <p className="text-sm text-gray-600">Dedicado ao bem-estar</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">{weeklyStats.averageEffectiveness.toFixed(1)}/5</span>
              </div>
              <h3 className="font-semibold text-gray-800">Efetividade</h3>
              <p className="text-sm text-gray-600">Avaliação média</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">{weeklyStats.streakDays}</span>
              </div>
              <h3 className="font-semibold text-gray-800">Sequência</h3>
              <p className="text-sm text-gray-600">Dias consecutivos</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Sessões Recentes</h2>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <Filter className="w-4 h-4" />
                  <span>Filtrar</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {sessionHistory.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {getTypeIcon(session.type)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{getTypeName(session.type)}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(session.date).toLocaleDateString('pt-BR')} • {formatDuration(session.duration)}
                        </div>
                        {session.pointsUsed && (
                          <div className="text-xs text-blue-600 mt-1">
                            Pontos: {session.pointsUsed.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(session.effectiveness) ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{session.effectiveness}/5</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Progresso Semanal</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Meta Semanal</span>
                    <span className="font-semibold">7/10 sessões</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Tempo de Prática</span>
                    <span className="font-semibold">25/30 min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                Recomendações IA
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-sm text-gray-800">🎯 Ponto Sugerido</div>
                  <div className="text-xs text-gray-600">Shenmen (HE7) - baseado no seu padrão de estresse</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-sm text-gray-800">⏰ Melhor Horário</div>
                  <div className="text-xs text-gray-600">19h-21h para máxima efetividade</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-sm text-gray-800">🔄 Próxima Sessão</div>
                  <div className="text-xs text-gray-600">Respiração 4-7-8 com cromoterapia azul</div>
                </div>
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                Conquistas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600">🔥</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">Sequência de 5 dias</div>
                    <div className="text-xs text-gray-600">Continue assim!</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🧘</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">Mestre da Respiração</div>
                    <div className="text-xs text-gray-600">10+ sessões completas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">🎯</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">Explorador de Pontos</div>
                    <div className="text-xs text-gray-600">5+ pontos diferentes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Atividade Semanal</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{day}</div>
                <div className={`h-20 rounded-lg flex items-end justify-center ${
                  index < 5 ? 'bg-gradient-to-t from-blue-500 to-blue-300' : 'bg-gray-100'
                }`}>
                  {index < 5 && (
                    <div className="text-white text-xs font-semibold mb-2">
                      {Math.floor(Math.random() * 3) + 1}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Sessões por dia • Meta: 1-2 sessões diárias
          </div>
        </div>

        {/* Wellness Score */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Índice de Bem-estar XZenPress</h2>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#10B981"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * 0.85)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">85</div>
                  <div className="text-xs text-gray-600">Excelente</div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 max-w-md mx-auto">
              Seu índice de bem-estar está excelente! Continue com a prática regular para manter este nível.
            </p>
            <div className="mt-4 flex justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Melhoria: +{weeklyStats.improvementTrend}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};