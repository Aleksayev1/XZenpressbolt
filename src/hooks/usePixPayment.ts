import { useState, useEffect } from 'react';
import { createPixService, PixPaymentData, PixResponse } from '../services/pixService';

export const usePixPayment = () => {
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const pixService = createPixService();

  const generatePayment = async (data: PixPaymentData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await pixService.createPayment(data);
      setPixData(response);
      const expiresIn = Math.floor((response.expiresAt.getTime() - Date.now()) / 1000);
      setTimeLeft(Math.max(0, expiresIn));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar PIX';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (!pixData || checkingStatus) return;
    
    setCheckingStatus(true);
    try {
      const status = await pixService.checkStatus(pixData.paymentId);
      if (status.status !== 'pending') {
        setPixData(prev => prev ? { ...prev, status: status.status } : null);
      }
    } catch (err) {
      console.error('Erro ao verificar status:', err);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    if (pixData?.status === 'pending') {
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [pixData]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev <= 1 ? 0 : prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return {
    pixData,
    loading,
    error,
    timeLeft,
    checkingStatus,
    generatePayment,
    providerName: pixService.getProviderName()
  };
};