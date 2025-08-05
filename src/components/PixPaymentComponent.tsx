import React, { useState, useEffect } from 'react';
import { QrCode, Copy, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { createPixService, PixPaymentData, PixResponse } from '../services/pixService';

interface PixPaymentComponentProps {
  amount: number;
  description: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  onPaymentSuccess?: (paymentData: PixResponse) => void;
  onPaymentError?: (error: string) => void;
}

export const PixPaymentComponent: React.FC<PixPaymentComponentProps> = ({
  amount,
  description,
  orderId,
  customerEmail,
  customerName,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const pixService = createPixService();

  useEffect(() => {
    generatePixPayment();
  }, []);

  useEffect(() => {
    if (pixData && pixData.status === 'pending') {
      // Verificar status do pagamento a cada 5 segundos
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [pixData]);

  useEffect(() => {
    if (pixData && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setError('PIX expirado. Gere um novo código.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [pixData, timeLeft]);

  const generatePixPayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      const paymentData: PixPaymentData = {
        amount,
        description,
        orderId,
        customerEmail,
        customerName
      };

      const response = await pixService.createPayment(paymentData);
      setPixData(response);
      
      // Calcular tempo restante em segundos
      const expiresIn = Math.floor((response.expiresAt.getTime() - Date.now()) / 1000);
      setTimeLeft(Math.max(0, expiresIn));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar PIX';
      setError(errorMessage);
      onPaymentError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (!pixData || checkingStatus) return;
    
    setCheckingStatus(true);
    try {
      const status = await pixService.checkStatus(pixData.paymentId);
      
      if (status.status === 'paid') {
        setPixData(prev => prev ? { ...prev, status: 'paid' } : null);
        onPaymentSuccess?.(status);
      } else if (status.status === 'expired' || status.status === 'cancelled') {
        setError(`Pagamento ${status.status === 'expired' ? 'expirado' : 'cancelado'}`);
        setPixData(prev => prev ? { ...prev, status: status.status } : null);
      }
    } catch (err) {
      console.error('Erro ao verificar status:', err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const copyPixCode = async () => {
    if (!pixData?.pixKey) return;
    
    try {
      await navigator.clipboard.writeText(pixData.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="bg-green-50 rounded-xl p-6">
        <div className="flex items-center justify-center space-x-3">
          <RefreshCw className="w-6 h-6 text-green-600 animate-spin" />
          <span className="text-green-800 font-medium">Gerando PIX...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <span className="text-red-800 font-medium">Erro no PIX</span>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={generatePixPayment}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (pixData?.status === 'paid') {
    return (
      <div className="bg-green-50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="text-green-800 font-bold text-lg">Pagamento Confirmado!</h3>
            <p className="text-green-700">PIX recebido com sucesso</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="text-sm text-gray-600">
            <div>Valor: <span className="font-semibold">R$ {amount.toFixed(2)}</span></div>
            <div>Pedido: <span className="font-semibold">{orderId}</span></div>
            <div>Status: <span className="font-semibold text-green-600">Pago</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (!pixData) return null;

  return (
    <div className="bg-green-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-green-800 font-bold text-lg">Pagamento via PIX</h3>
        <div className="flex items-center space-x-2">
          {checkingStatus && <RefreshCw className="w-4 h-4 text-green-600 animate-spin" />}
          <div className="text-sm text-green-700">
            Provedor: <span className="font-semibold">{pixService.getProviderName()}</span>
          </div>
        </div>
      </div>

      {/* Timer */}
      {timeLeft > 0 && (
        <div className="flex items-center space-x-2 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <Clock className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-800 font-medium">
            Expira em: {formatTime(timeLeft)}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code */}
        <div className="text-center">
          <div className="bg-white rounded-lg p-4 mb-4">
            {pixData.qrCodeBase64 ? (
              <img 
                src={pixData.qrCodeBase64} 
                alt="QR Code PIX" 
                className="w-48 h-48 mx-auto border border-gray-200 rounded bg-white"
              />
            ) : (
              <div className="w-48 h-48 mx-auto border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">QR Code PIX</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-green-700">
            Escaneie o QR Code com seu app do banco
          </p>
          <p className="text-xs text-green-600 mt-2">
            Chave PIX: aleksayevacupress@gmail.com
          </p>
        </div>

        {/* Código PIX */}
        <div>
          <h4 className="font-semibold text-green-800 mb-3">
            Ou copie o código PIX:
          </h4>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="font-mono text-xs break-all text-gray-700 mb-3">
              {pixData.pixKey}
            </div>
            <button
              onClick={copyPixCode}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>

          {/* Informações da chave PIX */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <h5 className="font-semibold text-blue-800 mb-2">Chave PIX Oficial:</h5>
            <div className="text-sm text-blue-700">
              <div className="font-mono bg-white rounded px-2 py-1 border">
                aleksayevacupress@gmail.com
              </div>
            </div>
          </div>

          {/* Informações do pagamento */}
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Detalhes:</h5>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Valor: <span className="font-semibold">R$ {amount.toFixed(2)}</span></div>
              <div>Descrição: <span className="font-semibold">{description}</span></div>
              <div>Pedido: <span className="font-semibold">{orderId}</span></div>
              <div>Status: <span className="font-semibold text-yellow-600">Aguardando pagamento</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">Como pagar:</h5>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Abra o app do seu banco</li>
          <li>2. Procure pela opção PIX</li>
          <li>3. Escaneie o QR Code ou cole o código copiado</li>
          <li>4. Ou use a chave PIX: <strong>aleksayevacupress@gmail.com</strong></li>
          <li>5. Confirme o pagamento</li>
          <li>6. Aguarde a confirmação automática</li>
        </ol>
      </div>
    </div>
  );
};