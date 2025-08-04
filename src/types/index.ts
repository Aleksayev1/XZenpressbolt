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