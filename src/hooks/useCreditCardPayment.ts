import { useState } from 'react';
import { createCreditCardService, CreditCardData, PaymentData, PaymentResult } from '../services/creditCardService';

export const useCreditCardPayment = () => {
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const creditCardService = createCreditCardService();

  const processPayment = async (cardData: CreditCardData, paymentData: PaymentData) => {
    setLoading(true);
    setError('');
    setPaymentResult(null);
    
    try {
      const result = await creditCardService.processPayment(cardData, paymentData);
      setPaymentResult(result);
      
      if (result.status === 'declined') {
        setError(result.errorMessage || 'Pagamento recusado');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no processamento do pagamento';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPaymentResult(null);
    setError('');
    setLoading(false);
  };

  return {
    paymentResult,
    loading,
    error,
    processPayment,
    reset,
    providerName: creditCardService.getProviderName()
  };
};