import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, Award, BarChart3, PieChart, Activity, Zap, Brain, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSessionHistory } from '../hooks/useSessionHistory';
import { acupressurePoints } from '../data/acupressurePoints';

interface ProgressTrackingPageProps {
  onPageChange: (page: string) => void;
}


interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  category: 'daily' | 'weekly' | 'monthly';
  icon: React.ReactNode;
  color: string;
}

export const ProgressTrackingPage: React.FC<ProgressTrackingPageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const { sessions, stats, loading, error } = useSessionHistory(selectedPeriod);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    // Atualizar metas baseadas nas estatísticas reais
    if (stats) {
      const updatedGoals: Goal[] = [
        {
          id: 'daily-breathing',
          title: 'Respiração Diária',
          description: 'Praticar respiração 4-7-8 todos os dias',
          target: 1,
          current: stats.sessionsByType['breathing'] || 0,
          unit: 'sessão/dia',
          category: 'daily',
          icon: <Brain className="w-5 h-5" />,
          color: 'blue'
        },
        {
          id: 'weekly-acupressure',
          title: 'Acupressão Semanal',
          description: 'Aplicar pontos de acupressão regularmente',
          target: 7,
          current: (stats.sessionsByType['acupressure'] || 0) + (stats.sessionsByType['integrated'] || 0),
          unit: 'sessões/semana',
          category: 'weekly',
          icon: <Target className="w-5 h-5" />,
          color: 'green'
        },
        {
          id: 'total-time',
          title: 'Tempo de Prática',
          description: 'Meta de tempo semanal de prática',
          target: 1800, // 30 minutos
          current: stats.totalTime,
          unit: 'segundos/semana',
          category: 'weekly',
          icon: <Heart className="w-5 h-5" />,
          color: 'purple'
        },
        {
          id: 'effectiveness',
          title: 'Efetividade',
          description: 'Manter avaliação média acima de 4.0',
          target: 4.0,
          current: stats.averageEffectiveness,
          unit: 'pontos',
          category: 'daily',
          icon: <Zap className="w-5 h-5" />,
          color: 'indigo'
        }
      ];
      setGoals(updatedGoals);
    } else {
      // Metas padrão quando não há dados
      const defaultGoals: Goal[] = [
      {
        id: 'daily-breathing',
        title: 'Respiração Diária',
        description: 'Praticar respiração 4-7-8 todos os dias',
        target: 1,
        current: 0,
        unit: 'sessão/dia',
        category: 'daily',
        icon: <Brain className="w-5 h-5" />,
        color: 'blue'
      },
      {
        id: 'weekly-acupressure',
        title: 'Acupressão Semanal',
        description: 'Aplicar pontos de acupressão regularmente',
        target: 7,
        current: 0,
        unit: 'sessões/semana',
        category: 'weekly',
        icon: <Target className="w-5 h-5" />,
        color: 'green'
      },
      {
        id: 'total-time',
        title: 'Tempo de Prática',
        description: 'Meta de tempo semanal de prática',
        target: 1800,
        current: 0,
        unit: 'segundos/semana',
        category: 'weekly',
        icon: <Heart className="w-5 h-5" />,
        color: 'purple'
      },
      {
        id: 'effectiveness',
        title: 'Efetividade',
        description: 'Manter avaliação média acima de 4.0',
        target: 4.0,
        current: 0,
        unit: 'pontos',
        category: 'daily',
        icon: <Zap className="w-5 h-5" />,
        color: 'indigo'
      }
      ];
      setGoals(defaultGoals);
    }
  }, [stats]);

  const getFavoritePointName = (pointId: string): string => {
    const point = acupressurePoints.find(p => p.id === pointId);
    return point ? point.name : pointId;
  };

  const getProgressPercentage = (goal: Goal) => {
    if (goal.id === 'total-time') {
      // Para tempo, mostrar progresso normal
      return Math.min(100, (goal.current / goal.target) * 100);
    }
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50 border-blue-200',
      green: 'bg-green-500 text-green-600 bg-green-50 border-green-200',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50 border-purple-200',
      indigo: 'bg-indigo-500 text-indigo-600 bg-indigo-50 border-indigo-200',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Faça login para acessar seu progresso</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Acompanhamento de Progresso</h1>
              <p className="text-gray-600 mt-2">Monitore sua evolução no bem-estar holístico</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
                <option value="quarter">Último Trimestre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading && (
            <div className="col-span-full text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Carregando progresso...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">Erro ao carregar dados: {error}</p>
            </div>
          )}
          
          {goals.map((goal) => {
            const percentage = getProgressPercentage(goal);
            const colorClasses = getColorClasses(goal.color).split(' ');
            
            return (
              <div key={goal.id} className={`bg-white rounded-2xl p-6 shadow-lg border ${colorClasses[3]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 ${colorClasses[2]} rounded-lg`}>
                    <div className={colorClasses[1]}>{goal.icon}</div>
                  </div>
                  <div className={`px-2 py-1 ${colorClasses[2]} rounded-full text-xs font-semibold ${colorClasses[1]}`}>
                    {goal.category}
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-semibold">{goal.current}/{goal.target} {goal.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${colorClasses[0]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <span className={`text-lg font-bold ${colorClasses[1]}`}>
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Histórico de Sessões</h2>
            
            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.slice(0, 10).map((session, index) => (
                  <div key={session.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        session.sessionType === 'breathing' ? 'bg-blue-500' :
                        session.sessionType === 'acupressure' ? 'bg-green-500' :
                        session.sessionType === 'integrated' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">
                          {session.sessionType === 'breathing' ? 'Respiração 4-7-8' :
                           session.sessionType === 'acupressure' ? 'Acupressão' :
                           session.sessionType === 'integrated' ? 'Terapia Integrada' :
                           'Cromoterapia'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {new Date(session.completedAt || session.createdAt || '').toLocaleDateString('pt-BR')} • 
                          {Math.floor(session.durationSeconds / 60)}min {session.durationSeconds % 60}s
                        </div>
                        {session.pointsUsed && session.pointsUsed.length > 0 && (
                          <div className="text-xs text-blue-600">
                            Pontos: {session.pointsUsed.map(pointId => {
                              const point = acupressurePoints.find(p => p.id === pointId);
                              return point ? point.name.split(' ')[0] : pointId;
                            }).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {session.effectivenessRating && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(session.effectivenessRating || 0) ? 'bg-yellow-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {session.effectivenessRating && (
                        <div className="text-sm text-gray-600 mt-1">{session.effectivenessRating}/5</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-600 mb-2">Nenhuma sessão registrada</h3>
                <p className="text-gray-500 text-sm">
                  Complete uma sessão de respiração ou acupressão para ver seu progresso aqui
                </p>
              </div>
            )}
          </div>

          {/* Real-time Statistics */}
          <div className="space-y-6">
            {/* Current Period Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Resumo {selectedPeriod === 'week' ? 'Semanal' : selectedPeriod === 'month' ? 'Mensal' : 'Trimestral'}
              </h3>
              {stats ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Total de Sessões</span>
                    </div>
                    <span className="text-blue-600 font-bold">{stats.totalSessions}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Tempo Total</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      {Math.floor(stats.totalTime / 60)}min
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-800">Ponto Favorito</span>
                    </div>
                    <span className="text-purple-600 font-bold text-sm">
                      {getFavoritePointName(stats.favoritePoint)}
                    </span>
                  </div>
                  
                  {stats.averageEffectiveness > 0 && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Efetividade</span>
                      </div>
                      <span className="text-yellow-600 font-bold">
                        {stats.averageEffectiveness.toFixed(1)}/5.0
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Nenhum dado disponível para este período</p>
                </div>
              )}
            </div>
          </div>


            {/* Achievements */}
            {stats && stats.totalSessions > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                Conquistas
              </h3>
              <div className="space-y-3">
                {stats.totalSessions >= 1 && (
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">🌱</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Primeira Sessão</div>
                      <div className="text-xs text-gray-600">Iniciou sua jornada de bem-estar</div>
                    </div>
                  </div>
                )}
                
                {stats.totalSessions >= 5 && (
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-lg">🎯</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Praticante Dedicado</div>
                      <div className="text-xs text-gray-600">Completou 5+ sessões</div>
                    </div>
                  </div>
                )}
                
                {stats.streakDays >= 3 && (
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-lg">🔥</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Sequência de {stats.streakDays} dias</div>
                      <div className="text-xs text-gray-600">Consistência impressionante!</div>
                    </div>
                  </div>
                )}
                
                {stats.totalSessions >= 10 && (
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-lg">🏆</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Mestre do Bem-estar</div>
                      <div className="text-xs text-gray-600">Completou 10+ sessões</div>
                    </div>
                  </div>
                )}
              </div>
              </div>
            )}

            {/* Next Recommendations */}
            {stats && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                Recomendações Baseadas no seu Progresso
              </h3>
              <div className="space-y-3">
                {stats.totalSessions === 0 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-800">🌟 Comece Agora</div>
                    <div className="text-xs text-gray-600">Faça sua primeira sessão de respiração 4-7-8</div>
                  </div>
                )}
                
                {stats.totalSessions > 0 && stats.totalSessions < 5 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-800">🎯 Continue Praticando</div>
                    <div className="text-xs text-gray-600">Tente fazer pelo menos 1 sessão por dia</div>
                  </div>
                )}
                
                {stats.sessionsByType['breathing'] > 0 && !stats.sessionsByType['acupressure'] && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-800">🫴 Explore Acupressão</div>
                    <div className="text-xs text-gray-600">Experimente o ponto Yintang para potencializar os resultados</div>
                  </div>
                )}
                
                {stats.averageEffectiveness > 0 && stats.averageEffectiveness < 4.0 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-800">📈 Melhore a Efetividade</div>
                    <div className="text-xs text-gray-600">Tente sessões mais longas ou combine técnicas</div>
                  </div>
                )}
                
                {stats.streakDays >= 3 && (
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-800">🔥 Excelente Consistência!</div>
                    <div className="text-xs text-gray-600">Você está no caminho certo, continue assim!</div>
                  </div>
                )}
              </div>
              </div>
            )}
          </div>
        </div>

        {stats && stats.totalSessions > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
        {stats && stats.totalSessions > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <div>
            <div>
          {/* Wellness Score baseado em dados reais */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Índice de Bem-estar</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {Math.min(100, Math.round((stats.averageEffectiveness / 5) * 100))}
              </div>
              <div className="text-sm text-gray-600">
                Baseado em {stats.totalSessions} sessões reais
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};