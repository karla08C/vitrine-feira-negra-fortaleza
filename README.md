# Vitrine Negra Fortaleza

Plataforma digital de divulgação, fomento comercial e valorização de afroempreendedores e negócios locais vinculados à Feira Negra de Fortaleza/CE.

---

## Visão do Produto

A **Vitrine Negra Fortaleza** foi desenvolvida para potencializar a visibilidade e o alcance econômico de negócios liderados por pessoas negras na capital cearense. A solução atua como um catálogo online centralizado, conectando consumidores diretamente aos expositores e produtores locais nas áreas de gastronomia, moda, cosmética natural, artesanato e economia criativa.

A plataforma alia facilidade de contato via WhatsApp e redes sociais com um painel de governança administrativa para cadastro e curadoria de expositores, além de uma seção dedicada à agenda oficial das edições itinerantes da feira.

---

## Tecnologias Utilizadas

- **Frontend Core:** React 19, TypeScript, Vite
- **Estilização e UI:** Tailwind CSS v4, Motion (Framer Motion), Lucide React
- **Inteligência Artificial:** Google Gen AI SDK (`@google/genai`) com modelos Gemini
- **Gerenciamento de Estado:** Custom Hooks desacoplados (`useNegocios`, `useAdminAuth`)
- **Autenticação e Governança:** Painel administrativo com controle de acesso para expositores e gestores

---

## Módulos e Funcionalidades

### 1. Catálogo Dinâmico de Expositores (NegocioCard & NegocioModal)
Apresentação detalhada de cada negócio, contendo narrativa de marca, catálogo de produtos em destaque, galeria de imagens e botões de ação imediata para canais de venda direta (WhatsApp e Instagram).

### 2. Filtros por Nichos de Atuação (FilterBar)
Segmentação rápida por categorias comerciais:
- Gastronomia e Confeitaria
- Moda, Vestuário e Acessórios
- Beleza, Cabelo e Cosméticos Naturais
- Artesanato, Decoração e Papelaria
- Serviços e Educação

### 3. Painel Administrativo de Gestão (AdminPanel & AdminLoginModal)
Área restrita para os organizadores da feira realizarem operações completas de gestão (CRUD):
- Cadastro de novos empreendedores
- Atualização de portfólios, fotos e informações de contato
- Moderação e curadoria dos perfis exibidos

### 4. Calendário Oficial de Edições (EventosSection)
Divulgação dos locais, datas e horários dos próximos encontros presenciais da feira nos pontos culturais de Fortaleza.

### 5. Memória e Manifesto Cultural (SobreSection)
Espaço de contextualização sobre a história da Feira Negra, seu impacto na economia solidária e importância para o ecossistema cultural da cidade.

---

## Arquitetura de Software

```
src/
├── components/
│   ├── HeaderHero.tsx          # Cabeçalho com identidade visual e busca
│   ├── FilterBar.tsx           # Filtros de categorias e termos de busca
│   ├── NegocioCard.tsx         # Card de exibição do empreendedor
│   ├── NegocioModal.tsx        # Modal com história, produtos e canais de contato
│   ├── EventosSection.tsx      # Agenda oficial de encontros presenciais
│   ├── SobreSection.tsx        # Manifesto e história da Feira Negra
│   ├── AdminPanel.tsx          # Painel de gestão e cadastro de negócios
│   ├── AdminLoginModal.tsx     # Modal de autenticação de moderadores
│   ├── CompartilharModal.tsx   # Compartilhamento social de negócios
│   ├── ToastNotification.tsx   # Notificações visuais de feedback
│   └── Footer.tsx              # Rodapé institucional e links comunitários
├── data/
│   ├── eventosData.ts          # Cronograma oficial de edições presenciais
│   └── seedData.ts             # Dados iniciais de negócios cadastrados
├── hooks/
│   ├── useNegocios.ts          # Hook para busca, filtros e persistência de dados
│   └── useAdminAuth.ts         # Hook para gerenciamento de sessão administrativa
├── utils/
│   └── formatters.ts           # Utilitários de formatação de telefones, links e texto
├── types.ts                    # Interfaces de dados (Negocio, Evento, Categoria)
├── App.tsx                     # Orquestrador de visualizações e abas
└── main.tsx                    # Inicializador React
```

---

## Execução Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes npm

### Passo a passo
1. Clone o repositório:
```bash
git clone https://github.com/karla08C/Vitrine--feira-negra--fortaleza.git
cd Vitrine--feira-negra--fortaleza
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Adicione sua chave GEMINI_API_KEY no arquivo .env
```

4. Execute o servidor local de desenvolvimento:
```bash
npm run dev
```

5. Para gerar a versão de produção:
```bash
npm run build
```
