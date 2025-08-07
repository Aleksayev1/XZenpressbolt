import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, Award, BarChart3, PieChart, Activity, Zap, Brain, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProgressTrackingPageProps {
  onPageChange: (page: string) => void;
}

interface ProgressData {
  date: string;
  stressLevel: number;
  sleepQuality: number;
  energyLevel: number;
  moodScore: number;
  sessionsCompleted: number;
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
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    // Simular dados de progresso
    const mockProgressData: ProgressData[] = [
      { date: '2025-01-01', stressLevel: 7, sleepQuality: 6, energyLevel: 5, moodScore: 6, sessionsCompleted: 1 },
      { date: '2025-01-02', stressLevel: 6, sleepQuality: 7, energyLevel: 6, moodScore: 7, sessionsCompleted: 2 },
      { date: '2025-01-03', stressLevel: 5, sleepQuality: 8, energyLevel: 7, moodScore: 8, sessionsCompleted: 2 },
      { date: '2025-01-04', stressLevel: 4, sleepQuality: 8, energyLevel: 8, moodScore: 8, sessionsCompleted: 3 },
      { date: '2025-01-05', stressLevel: 3, sleepQuality: 9, energyLevel: 9, moodScore: 9, sessionsCompleted: 2 },
    ];

    const mockGoals: Goal[] = [
      {
        id: 'daily-breathing',
        title: 'Respiração Diária',
        description: 'Praticar respiração 4-7-8 todos os dias',
        target: 1,
        current: 1,
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
        current: 5,
        unit: 'sessões/semana',
        category: 'weekly',
        icon: <Target className="w-5 h-5" />,
        color: 'green'
      },
      {
        id: 'stress-reduction',
        title: 'Redução de Estresse',
        description: 'Diminuir nível de estresse para abaixo de 4',
        target: 4,
        current: 3,
        unit: 'nível',
        category: 'monthly',
        icon: <Heart className="w-5 h-5" />,
        color: 'purple'
      },
      {
        id: 'sleep-improvement',
        title: 'Qualidade do Sono',
        description: 'Manter qualidade do sono acima de 8',
        target: 8,
        current: 9,
        unit: 'pontos',
        category: 'daily',
        icon: <Zap className="w-5 h-5" />,
        color: 'indigo'
      }
    ];

    setProgressData(mockProgressData);
    setGoals(mockGoals);
  }, [selectedPeriod]);

  const getProgressPercentage = (goal: Goal) => {
    if (goal.id === 'stress-reduction') {
      // Para redução de estresse, quanto menor melhor
      return Math.min(100, ((goal.target - goal.current + goal.target) / goal.target) * 100);
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">Evolução do Bem-estar</h2>
            
            <div className="space-y-6">
              {/* Stress Level Chart */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Nível de Estresse</span>
                  <span className="text-sm text-red-600">↓ -57% esta semana</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {progressData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(data.date).getDate()}/{new Date(data.date).getMonth() + 1}
                      </div>
                      <div className="h-16 bg-gray-100 rounded flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-red-500 to-red-300 rounded"
                          style={{ height: `${(data.stressLevel / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{data.stressLevel}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleep Quality Chart */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Qualidade do Sono</span>
                  <span className="text-sm text-green-600">↑ +50% esta semana</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {progressData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(data.date).getDate()}/{new Date(data.date).getMonth() + 1}
                      </div>
                      <div className="h-16 bg-gray-100 rounded flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded"
                          style={{ height: `${(data.sleepQuality / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{data.sleepQuality}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Energy Level Chart */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Nível de Energia</span>
                  <span className="text-sm text-green-600">↑ +80% esta semana</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {progressData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(data.date).getDate()}/{new Date(data.date).getMonth() + 1}
                      </div>
                      <div className="h-16 bg-gray-100 rounded flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded"
                          style={{ height: `${(data.energyLevel / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{data.energyLevel}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Insights and Recommendations */}
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo Semanal</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Melhoria Geral</span>
                  </div>
                  <span className="text-green-600 font-bold">+32%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Consistência</span>
                  </div>
                  <span className="text-blue-600 font-bold">5/7 dias</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Ponto Favorito</span>
                  </div>
                  <span className="text-purple-600 font-bold">Yintang</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                Conquistas Recentes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-lg">🏆</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Mestre do Bem-estar</div>
                    <div className="text-xs text-gray-600">Completou 50 sessões</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🎯</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Explorador Avançado</div>
                    <div className="text-xs text-gray-600">Testou 10+ pontos diferentes</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">⚡</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Transformação</div>
                    <div className="text-xs text-gray-600">Reduziu estresse em 50%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Recommendations */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                Próximas Recomendações
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-sm text-gray-800">🌅 Rotina Matinal</div>
                  <div className="text-xs text-gray-600">Adicione 5 min de respiração ao acordar</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-sm text-gray-800">🎯 Novo Ponto</div>
                  <div className="text-xs text-gray-600">Experimente Laogong (PC8) para ansiedade</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-sm text-gray-800">📈 Meta Semanal</div>
                  <div className="text-xs text-gray-600">Aumente para 10 sessões/semana</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Detalhados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Usage Patterns */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Padrões de Uso</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Horário Preferido</span>
                  <span className="font-semibold text-gray-800">19h-21h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duração Média</span>
                  <span className="font-semibold text-gray-800">4min 30s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Técnica Favorita</span>
                  <span className="font-semibold text-gray-800">Respiração 4-7-8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Efetividade</span>
                  <span className="font-semibold text-green-600">4.6/5.0</span>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Métricas de Saúde</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estresse</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-green-600">3/10</span>
                    <span className="text-xs text-green-600">↓ -57%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sono</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-blue-600">9/10</span>
                    <span className="text-xs text-green-600">↑ +50%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Energia</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-yellow-600">9/10</span>
                    <span className="text-xs text-green-600">↑ +80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Humor</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-purple-600">9/10</span>
                    <span className="text-xs text-green-600">↑ +50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Recomendações</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-sm text-blue-800">Continue a Sequência</div>
                  <div className="text-xs text-blue-600">Você está indo muito bem!</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-sm text-green-800">Explore Novos Pontos</div>
                  <div className="text-xs text-green-600">Tente pontos premium</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-sm text-purple-800">Aumente a Duração</div>
                  <div className="text-xs text-purple-600">Tente sessões de 10 minutos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};