import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Target, Zap, Star, ChevronRight, RefreshCw } from 'lucide-react';
import { AIRecommendationEngine, mockUserProfile } from '../services/aiRecommendations';
import { AIRecommendation } from '../types';

interface AIRecommendationsPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AIRecommendationsPanel: React.FC<AIRecommendationsPanelProps> = ({ isVisible, onClose }) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [optimalTimes, setOptimalTimes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simular delay de processamento IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newRecommendations = AIRecommendationEngine.analyzeUserProfile(mockUserProfile);
    const newInsights = AIRecommendationEngine.analyzeUsagePatterns(mockUserProfile.usageHistory);
    const newOptimalTimes = AIRecommendationEngine.predictOptimalTimes(mockUserProfile);
    
    setRecommendations(newRecommendations);
    setInsights(newInsights);
    setOptimalTimes(newOptimalTimes);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isVisible && recommendations.length === 0) {
      generateRecommendations();
    }
  }, [isVisible]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'breathing': return <span className="text-blue-500">🫁</span>;
      case 'point': return <span className="text-green-500">🎯</span>;
      case 'routine': return <span className="text-purple-500">🔄</span>;
      case 'timing': return <span className="text-orange-500">⏰</span>;
      default: return <span className="text-gray-500">💡</span>;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-full">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Recomendações IA</h2>
                <p className="text-purple-100">Insights personalizados para seu bem-estar</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={generateRecommendations}
                disabled={isLoading}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-3">
                <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
                <div>
                  <div className="text-lg font-semibold text-gray-800">IA Analisando...</div>
                  <div className="text-gray-600">Processando seus dados de bem-estar</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Recomendações Principais */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Recomendações Personalizadas
                </h3>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(rec.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                            <div className="flex items-center space-x-2">
                              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                                {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Média' : 'Baixa'}
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>{Math.round(rec.confidence * 100)}%</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                          <div className="bg-blue-50 rounded-lg p-3 mb-2">
                            <div className="text-xs text-blue-800 font-medium mb-1">Por que recomendamos:</div>
                            <div className="text-xs text-blue-700">{rec.reason}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                              💡 {rec.estimatedBenefit}
                            </div>
                            {rec.schedule && (
                              <div className="text-xs text-gray-600 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {rec.schedule}
                              </div>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights de Uso */}
              {insights.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Análise de Padrões
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                    <div className="space-y-2">
                      {insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Horários Otimizados */}
              {optimalTimes.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    Horários Otimizados
                  </h3>
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
                    <div className="space-y-2">
                      {optimalTimes.map((time, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* IA Status */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-800">IA em Evolução</div>
                    <div className="text-sm text-purple-700">
                      Quanto mais você usa, mais precisas ficam as recomendações. 
                      Próxima atualização: Integração com wearables e análise de humor.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};