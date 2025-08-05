# XZenPress - Plataforma de Bem-Estar Holística

## 🌟 Sobre o Projeto

XZenPress é uma plataforma completa de bem-estar holístico que combina:
- **Acupressão MTC** - Pontos terapêuticos da Medicina Tradicional Chinesa
- **Respiração 4-7-8** - Técnica de respiração com timer e cromoterapia
- **Cromoterapia** - Cores terapêuticas (azul, verde, magenta)
- **Sons Harmonizantes** - Biblioteca de sons relaxantes + Spotify Premium
- **Área Premium** - Consultas WhatsApp e pontos específicos

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Login/Cadastro com validação
- Recuperação de senha
- Contexto de usuário
- Estados de loading

### ✅ Navegação e Interface
- Header responsivo com menu mobile
- Sistema de navegação entre páginas
- Design moderno com Tailwind CSS
- Suporte a múltiplos idiomas (preparado)

### ✅ Páginas Principais
- **Home** - Landing page com hero section
- **Login** - Sistema completo de autenticação
- **Respiração** - Exercício 4-7-8 (preparado)
- **Acupressão** - Mapa de pontos terapêuticos (preparado)
- **Premium** - Área premium com pagamentos (preparado)

## 🛠️ Tecnologias

- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **Vite** como bundler
- **Context API** para gerenciamento de estado

## 📱 PWA Ready

- Service Worker configurado
- Manifest.json completo
- Suporte offline
- Instalável como app

## 🎨 Design System

- Cores principais: Azul (#3B82F6), Verde (#10B981), Roxo (#8B5CF6)
- Gradientes suaves
- Animações e micro-interações
- Responsivo (mobile-first)

## 🔄 Próximos Passos

1. **Respiração 4-7-8** - Timer com cromoterapia
2. **Acupressão** - Mapa interativo de pontos
3. **Premium** - Sistema de pagamentos
4. **Sons** - Integração com Spotify
5. **Offline** - Funcionalidades offline completas

## 🧪 Como Testar

1. **Login**: Use qualquer email válido + senha 6+ caracteres
2. **Navegação**: Teste o menu responsivo
3. **Responsividade**: Redimensione a tela

---

**Status**: ✅ Base sólida implementada - Login funcionando perfeitamente!

## 💳 Integração de Pagamentos

### PIX Real Implementado

A plataforma agora suporta PIX real através de múltiplos provedores:

#### Provedores Suportados:
- **PagSeguro** - Integração completa com API
- **Mercado Pago** - Integração completa com API  
- **Mock Provider** - Para desenvolvimento e demonstração

#### Configuração:

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configure suas credenciais:**
   ```env
   # Para PagSeguro
   VITE_PIX_PROVIDER=pagseguro
   VITE_PAGSEGURO_TOKEN=seu_token_aqui
   VITE_PAGSEGURO_EMAIL=seu_email_aqui
   
   # Para Mercado Pago
   VITE_PIX_PROVIDER=mercadopago
   VITE_MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
   
   # Para desenvolvimento (padrão)
   VITE_PIX_PROVIDER=mock
   ```

#### Funcionalidades PIX:
- ✅ Geração automática de QR Code
- ✅ Código PIX copiável
- ✅ Verificação automática de status
- ✅ Timer de expiração
- ✅ Notificações de pagamento
- ✅ Múltiplos provedores
- ✅ Fallback para modo demonstração

#### Como Usar:

1. **Desenvolvimento:** Use `VITE_PIX_PROVIDER=mock` para testes
2. **Produção:** Configure com PagSeguro ou Mercado Pago
3. **Webhooks:** Configure URLs de notificação nos provedores

#### Próximos Passos:
- [ ] Implementar webhooks para confirmação automática
- [ ] Adicionar mais provedores (Asaas, Gerencianet, etc.)
- [ ] Integrar com Supabase para persistência
- [ ] Adicionar relatórios de pagamento