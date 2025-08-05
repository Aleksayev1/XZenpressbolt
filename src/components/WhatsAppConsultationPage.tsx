import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Clock, CheckCircle, Star, AlertTriangle, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface WhatsAppConsultationPageProps {
  onPageChange: (page: string) => void;
}

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  urgencia: string;
  condicaoPrincipal: string;
  tempoSintomas: string;
  descricaoSintomas: string;
  tratamentosRealizados: string;
  medicamentosAtuais: string;
  horarioPreferencia: string;
}

export const WhatsAppConsultationPage: React.FC<WhatsAppConsultationPageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    nome: user?.name || '',
    email: user?.email || '',
    whatsapp: '',
    urgencia: '',
    condicaoPrincipal: '',
    tempoSintomas: '',
    descricaoSintomas: '',
    tratamentosRealizados: '',
    medicamentosAtuais: '',
    horarioPreferencia: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar mensagem formatada para WhatsApp
    const message = `🏥 *CONSULTA ESPECIALIZADA - XZENPRESS*

👤 *DADOS PESSOAIS:*
• Nome: ${formData.nome}
• Email: ${formData.email}
• WhatsApp: ${formData.whatsapp}
• Urgência: ${formData.urgencia}

🩺 *INFORMAÇÕES MÉDICAS:*
• Condição Principal: ${formData.condicaoPrincipal}
• Tempo dos Sintomas: ${formData.tempoSintomas}

📝 *DESCRIÇÃO DETALHADA:*
${formData.descricaoSintomas}

💊 *TRATAMENTOS JÁ REALIZADOS:*
${formData.tratamentosRealizados}

💉 *MEDICAMENTOS ATUAIS:*
${formData.medicamentosAtuais}

⏰ *PREFERÊNCIA DE HORÁRIO:*
${formData.horarioPreferencia}

---
*Solicitação enviada via XZenPress Premium*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onPageChange('premium')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Consulta Especializada</h2>
              <p className="text-gray-600 text-sm mb-6">
                Para casos complexos que precisam de atenção personalizada
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">Atendimento Especializado</div>
                    <div className="text-xs text-gray-600">Profissional Qualificado</div>
                    <div className="text-xs text-blue-600">Alexandre Pinheiro - 15 anos de experiência</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">Resposta Rápida</div>
                    <div className="text-xs text-gray-600">Prioridade de resposta máxima</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">WhatsApp Direto</div>
                    <div className="text-xs text-gray-600">Atendimento personalizado via mensagem</div>
                  </div>
                </div>
              </div>
            </div>

            {/* When to Seek Help */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Quando Procurar?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Dores crônicas que não melhoram</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Condições neurológicas complexas</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Casos que não respondem ao tratamento padrão</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Necessidade de protocolo personalizado</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-3 italic">
                "Atendimento excepcional! Resolveu minha dor crônica em poucas sessões."
              </p>
              <div className="text-xs text-gray-600">Maria S., São Paulo</div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulário de Consulta</h2>
              <p className="text-gray-600 mb-8">
                Preencha os dados abaixo para receber atendimento personalizado via WhatsApp
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível de Urgência *
                    </label>
                    <select
                      name="urgencia"
                      value={formData.urgencia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Selecione a urgência</option>
                      <option value="baixa">Baixa - Consulta de rotina</option>
                      <option value="media">Média - Desconforto moderado</option>
                      <option value="alta">Alta - Dor intensa</option>
                      <option value="urgente">Urgente - Necessita atenção imediata</option>
                    </select>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-blue-600 text-sm">🩺</span>
                    </div>
                    Informações Médicas
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condição Principal *
                      </label>
                      <input
                        type="text"
                        name="condicaoPrincipal"
                        value={formData.condicaoPrincipal}
                        onChange={handleInputChange}
                        placeholder="Ex: Enxaqueca crônica, Fibromialgia, Dor lombar, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-orange-600">Há quanto tempo tem esses sintomas?</span>
                      </label>
                      <input
                        type="text"
                        name="tempoSintomas"
                        value={formData.tempoSintomas}
                        onChange={handleInputChange}
                        placeholder="Duração dos sintomas"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descreva seus sintomas detalhadamente *
                      </label>
                      <textarea
                        name="descricaoSintomas"
                        value={formData.descricaoSintomas}
                        onChange={handleInputChange}
                        placeholder="Descreva intensidade da dor (1-10), quando piora/melhora, sintomas associados, etc."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tratamentos já realizados
                      </label>
                      <textarea
                        name="tratamentosRealizados"
                        value={formData.tratamentosRealizados}
                        onChange={handleInputChange}
                        placeholder="Ex: Fisioterapia, medicamentos, outras terapias..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicamentos atuais
                      </label>
                      <textarea
                        name="medicamentosAtuais"
                        value={formData.medicamentosAtuais}
                        onChange={handleInputChange}
                        placeholder="Liste medicamentos que usa regularmente..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferência de horário para retorno
                      </label>
                      <select
                        name="horarioPreferencia"
                        value={formData.horarioPreferencia}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Quando prefere ser contactado?</option>
                        <option value="manha">Manhã (8h às 12h)</option>
                        <option value="tarde">Tarde (12h às 18h)</option>
                        <option value="noite">Noite (18h às 22h)</option>
                        <option value="qualquer">Qualquer horário</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-800 text-sm">Importante:</div>
                    <div className="text-blue-700 text-sm">
                      Este serviço não substitui consulta médica. Em casos de emergência, procure atendimento médico imediatamente.
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar via WhatsApp</span>
                </button>

                <p className="text-center text-sm text-gray-500">
                  Ao enviar, você será redirecionado para o WhatsApp com sua mensagem pré-formatada
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};