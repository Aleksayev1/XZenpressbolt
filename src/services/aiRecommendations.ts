import { UserProfile, AIRecommendation, SessionHistory } from '../types';
import { acupressurePoints } from '../data/acupressurePoints';

export class AIRecommendationEngine {
  
  // Análise básica do perfil do usuário
  static analyzeUserProfile(profile: UserProfile): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    
    // Recomendações baseadas no nível de estresse
    if (profile.stressLevel === 'high') {
      recommendations.push({
        id: 'stress-breathing',
        type: 'breathing',
        title: 'Respiração 4-7-8 Intensiva',
        description: 'Sessões de 10 minutos, 3x ao dia para redução rápida do estresse',
        reason: 'Seu nível de estresse está alto. A respiração 4-7-8 ativa o sistema parassimpático.',
        confidence: 0.9,
        priority: 'high',
        estimatedBenefit: 'Redução de 40% no cortisol em 2 semanas',
        duration: 600,
        schedule: '8h, 14h, 20h'
      });
      
      recommendations.push({
        id: 'stress-yintang',
        type: 'point',
        title: 'Ponto Yintang (EX-HN3)',
        description: 'Pressione entre as sobrancelhas por 2 minutos quando sentir ansiedade',
        reason: 'Ponto específico para reduzir ansiedade e tensão mental imediata',
        confidence: 0.85,
        priority: 'high',
        estimatedBenefit: 'Alívio imediato da tensão',
        pointId: 'yintang-ex-hn3'
      });
    }
    
    // Recomendações baseadas na qualidade do sono
    if (profile.sleepQuality === 'poor') {
      recommendations.push({
        id: 'sleep-routine',
        type: 'routine',
        title: 'Rotina Noturna de Relaxamento',
        description: 'Sequência: Respiração 4-7-8 + Ponto Anmian + Cromoterapia azul',
        reason: 'Sua qualidade de sono precisa melhorar. Esta rotina ativa a produção de melatonina.',
        confidence: 0.8,
        priority: 'medium',
        estimatedBenefit: 'Melhora de 60% na qualidade do sono',
        schedule: '30 minutos antes de dormir'
      });
    }
    
    // Recomendações baseadas no histórico de uso
    const recentSessions = profile.usageHistory.slice(-7); // Últimas 7 sessões
    if (recentSessions.length > 0) {
      const avgEffectiveness = recentSessions.reduce((sum, session) => sum + session.effectiveness, 0) / recentSessions.length;
      
      if (avgEffectiveness < 3) {
        recommendations.push({
          id: 'optimize-technique',
          type: 'routine',
          title: 'Otimização da Técnica',
          description: 'Suas sessões podem ser mais eficazes. Vamos ajustar sua abordagem.',
          reason: 'Detectamos que suas sessões recentes tiveram eficácia abaixo do ideal',
          confidence: 0.75,
          priority: 'medium',
          estimatedBenefit: 'Aumento de 50% na eficácia das sessões'
        });
      }
    }
    
    // Recomendações baseadas nos objetivos
    if (profile.goals.includes('focus')) {
      recommendations.push({
        id: 'focus-points',
        type: 'point',
        title: 'Pontos para Concentração',
        description: 'Baihui (VG20) pela manhã para clareza mental e foco',
        reason: 'Você definiu foco como objetivo. Este ponto otimiza função cognitiva.',
        confidence: 0.8,
        priority: 'medium',
        estimatedBenefit: 'Melhora de 35% na concentração',
        pointId: 'baihui-vg20'
      });
    }
    
    // Recomendações baseadas no horário preferido
    if (profile.preferredTime === 'morning') {
      recommendations.push({
        id: 'morning-energy',
        type: 'timing',
        title: 'Energização Matinal',
        description: 'Combine respiração energizante com cromoterapia laranja às 7h',
        reason: 'Você prefere sessões matinais. Esta combinação maximiza energia para o dia.',
        confidence: 0.7,
        priority: 'low',
        estimatedBenefit: 'Aumento de energia por 6-8 horas'
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority] || b.confidence - a.confidence;
    });
  }
  
  // Análise de padrões de uso
  static analyzeUsagePatterns(history: SessionHistory[]): string[] {
    const insights: string[] = [];
    
    if (history.length === 0) return insights;
    
    // Análise de horários
    const hourCounts: { [hour: number]: number } = {};
    history.forEach(session => {
      const hour = new Date(session.date).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    const mostActiveHour = Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (mostActiveHour) {
      insights.push(`Você é mais ativo às ${mostActiveHour[0]}h. Continue aproveitando este horário!`);
    }
    
    // Análise de eficácia
    const avgEffectiveness = history.reduce((sum, session) => sum + session.effectiveness, 0) / history.length;
    
    if (avgEffectiveness >= 4) {
      insights.push('Excelente! Suas sessões têm alta eficácia. Continue assim!');
    } else if (avgEffectiveness < 3) {
      insights.push('Suas sessões podem ser mais eficazes. Considere ajustar a técnica ou duração.');
    }
    
    // Análise de consistência
    const last7Days = history.filter(session => {
      const sessionDate = new Date(session.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    });
    
    if (last7Days.length >= 5) {
      insights.push('Parabéns pela consistência! Você está no caminho certo para resultados duradouros.');
    } else if (last7Days.length < 3) {
      insights.push('Tente ser mais consistente. Sessões regulares trazem melhores resultados.');
    }
    
    return insights;
  }
  
  // Predição de melhores horários
  static predictOptimalTimes(profile: UserProfile): string[] {
    const recommendations: string[] = [];
    
    // Baseado no perfil de estresse
    if (profile.stressLevel === 'high') {
      recommendations.push('7h-8h: Respiração matinal para começar o dia calmo');
      recommendations.push('12h-13h: Pausa para acupressão durante o almoço');
      recommendations.push('21h-22h: Rotina noturna para melhor sono');
    }
    
    // Baseado na qualidade do sono
    if (profile.sleepQuality === 'poor') {
      recommendations.push('20h-21h: Inicie a rotina de relaxamento cedo');
      recommendations.push('Evite sessões estimulantes após 19h');
    }
    
    return recommendations;
  }
  
  // Simulação de IA mais avançada (para futuro)
  static generateAdvancedInsights(profile: UserProfile): AIRecommendation[] {
    // Aqui seria onde conectaríamos com uma IA real (OpenAI, etc.)
    // Por enquanto, retornamos insights baseados em regras
    
    const insights: AIRecommendation[] = [];
    
    // Análise de correlações (simulada)
    if (profile.usageHistory.length > 10) {
      insights.push({
        id: 'pattern-analysis',
        type: 'routine',
        title: 'Padrão Personalizado Detectado',
        description: 'IA identificou que você responde melhor a sessões de 8 minutos às terças e quintas',
        reason: 'Análise de machine learning dos seus dados de uso e eficácia',
        confidence: 0.92,
        priority: 'high',
        estimatedBenefit: 'Otimização baseada em seus padrões únicos'
      });
    }
    
    return insights;
  }
}

// Dados mock para demonstração
export const mockUserProfile: UserProfile = {
  id: 'user-123',
  stressLevel: 'high',
  sleepQuality: 'poor',
  mainConcerns: ['ansiedade', 'insônia', 'dor de cabeça'],
  preferredTime: 'evening',
  experienceLevel: 'beginner',
  goals: ['relaxamento', 'melhor sono', 'focus'],
  usageHistory: [
    {
      date: '2024-01-15T20:30:00Z',
      type: 'breathing',
      duration: 300,
      effectiveness: 4
    },
    {
      date: '2024-01-14T21:00:00Z',
      type: 'acupressure',
      duration: 180,
      pointsUsed: ['yintang-ex-hn3'],
      effectiveness: 3
    },
    {
      date: '2024-01-13T19:45:00Z',
      type: 'breathing',
      duration: 420,
      effectiveness: 5
    }
  ]
};