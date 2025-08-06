export interface CreditCardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  orderId: string;
  customerEmail?: string;
  customerName?: string;
}

export interface PaymentResult {
  id: string;
  status: 'approved' | 'declined' | 'pending' | 'error';
  amount: number;
  currency: string;
  orderId: string;
  paymentMethod: string;
  card?: {
    brand: string;
    lastFour: string;
    name: string;
  };
  processedAt: string;
  errorMessage?: string;
}

export interface CreditCardProvider {
  name: string;
  processPayment(cardData: CreditCardData, paymentData: PaymentData): Promise<PaymentResult>;
}

// Implementação para Stripe
export class StripeProvider implements CreditCardProvider {
  name = 'Stripe';
  private publishableKey: string;

  constructor(publishableKey: string) {
    this.publishableKey = publishableKey;
  }

  async processPayment(cardData: CreditCardData, paymentData: PaymentData): Promise<PaymentResult> {
    try {
      // Em produção, aqui seria a integração real com Stripe
      // Por enquanto, simulamos o processamento
      
      console.log('Processing Stripe payment...', {
        amount: paymentData.amount,
        orderId: paymentData.orderId
      });

      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular resposta do Stripe
      const paymentIntent = {
        id: `pi_${Date.now()}`,
        status: 'succeeded',
        amount: Math.round(paymentData.amount * 100), // Stripe usa centavos
        currency: paymentData.currency.toLowerCase(),
        payment_method: {
          card: {
            brand: this.getCardBrand(cardData.number),
            last4: cardData.number.slice(-4)
          }
        }
      };

      return {
        id: paymentIntent.id,
        status: 'approved',
        amount: paymentData.amount,
        currency: paymentData.currency,
        orderId: paymentData.orderId,
        paymentMethod: 'credit_card',
        card: {
          brand: paymentIntent.payment_method.card.brand,
          lastFour: paymentIntent.payment_method.card.last4,
          name: cardData.name
        },
        processedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Stripe payment error:', error);
      throw new Error('Falha no processamento do pagamento');
    }
  }

  private getCardBrand(number: string): string {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6(?:011|5)/.test(num)) return 'discover';
    return 'unknown';
  }
}

// Implementação para PagSeguro
export class PagSeguroProvider implements CreditCardProvider {
  name = 'PagSeguro';
  private token: string;
  private email: string;

  constructor(token: string, email: string) {
    this.token = token;
    this.email = email;
  }

  async processPayment(cardData: CreditCardData, paymentData: PaymentData): Promise<PaymentResult> {
    try {
      console.log('Processing PagSeguro payment...', {
        amount: paymentData.amount,
        orderId: paymentData.orderId
      });

      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Simular resposta do PagSeguro
      return {
        id: `ps_${Date.now()}`,
        status: 'approved',
        amount: paymentData.amount,
        currency: paymentData.currency,
        orderId: paymentData.orderId,
        paymentMethod: 'credit_card',
        card: {
          brand: this.getCardBrand(cardData.number),
          lastFour: cardData.number.slice(-4),
          name: cardData.name
        },
        processedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('PagSeguro payment error:', error);
      throw new Error('Falha no processamento do pagamento');
    }
  }

  private getCardBrand(number: string): string {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    return 'unknown';
  }
}

// Implementação Mock para desenvolvimento
export class MockCreditCardProvider implements CreditCardProvider {
  name = 'Mock Credit Card (Demonstração)';

  async processPayment(cardData: CreditCardData, paymentData: PaymentData): Promise<PaymentResult> {
    console.log('Processing mock credit card payment...', {
      amount: paymentData.amount,
      orderId: paymentData.orderId,
      cardBrand: this.getCardBrand(cardData.number)
    });

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simular diferentes cenários baseados no número do cartão
    const cardNumber = cardData.number.replace(/\s/g, '');
    
    // Cartão de teste para falha
    if (cardNumber.startsWith('4000000000000002')) {
      return {
        id: `mock_declined_${Date.now()}`,
        status: 'declined',
        amount: paymentData.amount,
        currency: paymentData.currency,
        orderId: paymentData.orderId,
        paymentMethod: 'credit_card',
        processedAt: new Date().toISOString(),
        errorMessage: 'Cartão recusado pelo banco emissor'
      };
    }

    // Cartão de teste para sucesso
    return {
      id: `mock_approved_${Date.now()}`,
      status: 'approved',
      amount: paymentData.amount,
      currency: paymentData.currency,
      orderId: paymentData.orderId,
      paymentMethod: 'credit_card',
      card: {
        brand: this.getCardBrand(cardData.number),
        lastFour: cardData.number.slice(-4),
        name: cardData.name
      },
      processedAt: new Date().toISOString()
    };
  }

  private getCardBrand(number: string): string {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6(?:011|5)/.test(num)) return 'discover';
    return 'unknown';
  }
}

// Classe principal do serviço de cartão de crédito
export class CreditCardService {
  private provider: CreditCardProvider;

  constructor(provider: CreditCardProvider) {
    this.provider = provider;
  }

  async processPayment(cardData: CreditCardData, paymentData: PaymentData): Promise<PaymentResult> {
    return this.provider.processPayment(cardData, paymentData);
  }

  getProviderName(): string {
    return this.provider.name;
  }
}

// Factory para criar o serviço de cartão baseado na configuração
export function createCreditCardService(): CreditCardService {
  const provider = import.meta.env.VITE_CREDIT_CARD_PROVIDER || 'mock';
  
  switch (provider) {
    case 'stripe':
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!stripeKey) {
        console.warn('Stripe key not found, using Mock provider');
        return new CreditCardService(new MockCreditCardProvider());
      }
      return new CreditCardService(new StripeProvider(stripeKey));
      
    case 'pagseguro':
      const pagSeguroToken = import.meta.env.VITE_PAGSEGURO_TOKEN;
      const pagSeguroEmail = import.meta.env.VITE_PAGSEGURO_EMAIL;
      if (!pagSeguroToken || !pagSeguroEmail) {
        console.warn('PagSeguro credentials not found, using Mock provider');
        return new CreditCardService(new MockCreditCardProvider());
      }
      return new CreditCardService(new PagSeguroProvider(pagSeguroToken, pagSeguroEmail));
      
    default:
      return new CreditCardService(new MockCreditCardProvider());
  }
}