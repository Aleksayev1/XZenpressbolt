export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: string;
}

export interface AcupressurePoint {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  nameFr: string;
  description: string;
  descriptionEn: string;
  descriptionEs: string;
  descriptionFr: string;
  position: {
    x: number;
    y: number;
  };
  image?: string;
  imageAlt?: string;
  benefits: string[];
  benefitsEn: string[];
  benefitsEs: string[];
  benefitsFr: string[];
  isPremium: boolean;
  category: 'general' | 'septicemia' | 'atm' | 'cranio';
  instructions?: string;
  duration?: number;
  pressure?: 'muito leve' | 'leve' | 'moderada' | 'firme';
}

export interface BreathingSession {
  id: string;
  userId: string;
  duration: number;
  completedAt: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface PaymentMethod {
  type: 'pix' | 'credit' | 'crypto';
  details: any;
}

export interface UserProfile {
  id: string;
  stressLevel: 'low' | 'medium' | 'high';
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  mainConcerns: string[];
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'night';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  usageHistory: SessionHistory[];
}

export interface SessionHistory {
  date: string;
  type: 'breathing' | 'acupressure' | 'chromotherapy';
  duration: number;
  pointsUsed?: string[];
  effectiveness: number; // 1-5 rating
}

export interface AIRecommendation {
  id: string;
  type: 'point' | 'breathing' | 'routine' | 'timing';
  title: string;
  description: string;
  reason: string;
  confidence: number; // 0-1
  priority: 'low' | 'medium' | 'high';
  estimatedBenefit: string;
  pointId?: string;
  duration?: number;
  schedule?: string;
}