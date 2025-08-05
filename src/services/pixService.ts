export interface PixPaymentData {
  amount: number;
  description: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
}

export interface PixResponse {
  qrCode: string;
  qrCodeBase64?: string;
  pixKey: string;
  expiresAt: Date;
  paymentId: string;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
}

export interface PixProvider {
  name: string;
  generatePixPayment(data: PixPaymentData): Promise<PixResponse>;
  checkPaymentStatus(paymentId: string): Promise<PixResponse>;
}

// Implementação para PagSeguro
export class PagSeguroPixProvider implements PixProvider {
  name = 'PagSeguro';
  private apiUrl = 'https://ws.sandbox.pagseguro.uol.com.br'; // Use produção: https://ws.pagseguro.uol.com.br
  private token: string;
  private email: string;

  constructor(token: string, email: string) {
    this.token = token;
    this.email = email;
  }

  async generatePixPayment(data: PixPaymentData): Promise<PixResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/instant-payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          reference_id: data.orderId,
          description: data.description,
          amount: {
            value: Math.round(data.amount * 100), // Converter para centavos
            currency: 'BRL'
          },
          payment_method: {
            type: 'PIX',
            pix: {
              expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutos
            }
          },
          notification_urls: [
            `${window.location.origin}/api/pix/webhook/pagseguro`
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`PagSeguro API error: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        qrCode: result.qr_codes[0].text,
        qrCodeBase64: result.qr_codes[0].arrangements[0].qr_code,
        pixKey: result.qr_codes[0].text,
        expiresAt: new Date(result.qr_codes[0].expiration_date),
        paymentId: result.id,
        status: 'pending'
      };
    } catch (error) {
      console.error('Erro ao gerar PIX PagSeguro:', error);
      throw new Error('Falha ao gerar pagamento PIX');
    }
  }

  async checkPaymentStatus(paymentId: string): Promise<PixResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/orders/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`PagSeguro API error: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        qrCode: result.qr_codes?.[0]?.text || '',
        pixKey: result.qr_codes?.[0]?.text || '',
        expiresAt: new Date(result.qr_codes?.[0]?.expiration_date || Date.now()),
        paymentId: result.id,
        status: this.mapStatus(result.status)
      };
    } catch (error) {
      console.error('Erro ao verificar status PIX:', error);
      throw error;
    }
  }

  private mapStatus(status: string): 'pending' | 'paid' | 'expired' | 'cancelled' {
    switch (status) {
      case 'PAID': return 'paid';
      case 'CANCELLED': return 'cancelled';
      case 'EXPIRED': return 'expired';
      default: return 'pending';
    }
  }
}

// Implementação para Mercado Pago
export class MercadoPagoPixProvider implements PixProvider {
  name = 'Mercado Pago';
  private apiUrl = 'https://api.mercadopago.com';
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async generatePixPayment(data: PixPaymentData): Promise<PixResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          transaction_amount: data.amount,
          description: data.description,
          payment_method_id: 'pix',
          external_reference: data.orderId,
          payer: {
            email: data.customerEmail || 'customer@example.com',
            first_name: data.customerName || 'Cliente',
          },
          notification_url: `${window.location.origin}/api/pix/webhook/mercadopago`
        })
      });

      if (!response.ok) {
        throw new Error(`Mercado Pago API error: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        qrCode: result.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64: result.point_of_interaction.transaction_data.qr_code_base64,
        pixKey: result.point_of_interaction.transaction_data.qr_code,
        expiresAt: new Date(result.date_of_expiration),
        paymentId: result.id.toString(),
        status: 'pending'
      };
    } catch (error) {
      console.error('Erro ao gerar PIX Mercado Pago:', error);
      throw new Error('Falha ao gerar pagamento PIX');
    }
  }

  async checkPaymentStatus(paymentId: string): Promise<PixResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Mercado Pago API error: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        qrCode: result.point_of_interaction?.transaction_data?.qr_code || '',
        pixKey: result.point_of_interaction?.transaction_data?.qr_code || '',
        expiresAt: new Date(result.date_of_expiration || Date.now()),
        paymentId: result.id.toString(),
        status: this.mapStatus(result.status)
      };
    } catch (error) {
      console.error('Erro ao verificar status PIX:', error);
      throw error;
    }
  }

  private mapStatus(status: string): 'pending' | 'paid' | 'expired' | 'cancelled' {
    switch (status) {
      case 'approved': return 'paid';
      case 'cancelled': return 'cancelled';
      case 'expired': return 'expired';
      default: return 'pending';
    }
  }
}

// Implementação Mock para desenvolvimento/demonstração
export class MockPixProvider implements PixProvider {
  name = 'Mock PIX (Demonstração)';

  async generatePixPayment(data: PixPaymentData): Promise<PixResponse> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockQrCode = `00020126580014BR.GOV.BCB.PIX013636c4b8e8-1234-4567-8901-${Date.now()}5204000053039865802BR5925XZENPRESS WELLNESS LTDA6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    return {
      qrCode: mockQrCode,
      qrCodeBase64: this.generateMockQRCodeBase64(),
      pixKey: mockQrCode,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
      paymentId: `mock_${Date.now()}`,
      status: 'pending'
    };
  }

  async checkPaymentStatus(paymentId: string): Promise<PixResponse> {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular pagamento aprovado após 2 minutos (para demonstração)
    const isOld = paymentId.includes('mock_') && 
      (Date.now() - parseInt(paymentId.replace('mock_', ''))) > 120000;
    
    return {
      qrCode: '',
      pixKey: '',
      expiresAt: new Date(),
      paymentId,
      status: isOld ? 'paid' : 'pending'
    };
  }

  private generateMockQRCodeBase64(): string {
    // Retorna um QR Code base64 de demonstração (pequeno quadrado preto)
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  }
}

// Classe principal do serviço PIX
export class PixService {
  private provider: PixProvider;

  constructor(provider: PixProvider) {
    this.provider = provider;
  }

  async createPayment(data: PixPaymentData): Promise<PixResponse> {
    return this.provider.generatePixPayment(data);
  }

  async checkStatus(paymentId: string): Promise<PixResponse> {
    return this.provider.checkPaymentStatus(paymentId);
  }

  getProviderName(): string {
    return this.provider.name;
  }
}

// Factory para criar o serviço PIX baseado na configuração
export function createPixService(): PixService {
  // Verificar variáveis de ambiente ou configuração
  const pixProvider = import.meta.env.VITE_PIX_PROVIDER || 'mock';
  
  switch (pixProvider) {
    case 'pagseguro':
      const pagSeguroToken = import.meta.env.VITE_PAGSEGURO_TOKEN;
      const pagSeguroEmail = import.meta.env.VITE_PAGSEGURO_EMAIL;
      if (!pagSeguroToken || !pagSeguroEmail) {
        console.warn('PagSeguro credentials not found, using Mock provider');
        return new PixService(new MockPixProvider());
      }
      return new PixService(new PagSeguroPixProvider(pagSeguroToken, pagSeguroEmail));
      
    case 'mercadopago':
      const mpAccessToken = import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN;
      if (!mpAccessToken) {
        console.warn('Mercado Pago access token not found, using Mock provider');
        return new PixService(new MockPixProvider());
      }
      return new PixService(new MercadoPagoPixProvider(mpAccessToken));
      
    default:
      return new PixService(new MockPixProvider());
  }
}