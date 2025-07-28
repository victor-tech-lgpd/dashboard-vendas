Painel de Vendas Full-Stack (React + FastAPI)
(Substitua esta imagem por um screenshot real do seu dashboard)
📄 Sobre o Projeto
Este é um projeto de um dashboard de dados full-stack construído para visualizar e analisar métricas de vendas. A aplicação possui um back-end robusto desenvolvido em Python com FastAPI que serve os dados a partir de um banco de dados PostgreSQL, e um front-end moderno e interativo construído com React, TypeScript e Material-UI.
O projeto foi containerizado com Docker para facilitar a configuração e o deploy.
✨ Funcionalidades
•	Visualização de KPIs Dinâmicos: Cards que exibem métricas chave como Faturamento Total, Total de Vendas, Itens Vendidos e Ticket Médio.
•	Gráficos Interativos: Gráficos de barra, linha e pizza para analisar dados de vendas por produto e sua evolução no tempo.
•	Tabela de Dados Detalhada: Visualização tabular de todas as vendas registradas.
•	Filtragem por Período: Seletores de data que atualizam dinamicamente todos os componentes do dashboard (KPIs, gráficos e tabela).
•	API RESTful: Back-end com endpoints otimizados para servir tanto dados agregados (/kpis/) quanto dados brutos (/sales/).
•	Tema Customizado: Interface com um tema escuro, sóbrio e profissional, construído com Material-UI.
🚀 Tecnologias Utilizadas
Back-end
•	Python 3.11+
•	FastAPI: Framework web de alta performance.
•	SQLAlchemy: ORM para comunicação com o banco de dados.
•	Pydantic: Para validação e serialização de dados.
•	PostgreSQL: Banco de dados relacional.
•	Uvicorn: Servidor ASGI.
Front-end
•	React 18+
•	TypeScript: Para tipagem estática e um código mais robusto.
•	Vite: Build tool de alta performance.
•	Material-UI (MUI): Biblioteca de componentes para a interface.
•	Chart.js (react-chartjs-2): Para a criação dos gráficos.
•	React Datepicker: Para o seletor de datas.
DevOps
•	Docker & Docker Compose: Para containerização e orquestração dos serviços.
📂 Estrutura do Projeto
meu-dashboard/
├── backend/
│   ├── app/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── theme.ts
│   └── package.json
└── docker-compose.yml
⚙️ Instalação e Execução
Pré-requisitos
•	Node.js (versão 18 ou superior)
•	Python (versão 3.11 ou superior)
•	PostgreSQL
•	Docker (recomendado)
________________________________________
Método 1: Usando Docker (Recomendado)
Esta é a forma mais simples de executar o projeto, pois o Docker gerencia todos os serviços e dependências.
1.	Clone o repositório (se estiver no Git) ou certifique-se de que está na pasta raiz meu-dashboard.
2.	Construa e inicie os contêineres:
Bash
docker-compose up --build
3.	Acesse as aplicações:
o	Front-end (Dashboard): http://localhost:5173
o	Back-end (Documentação da API): http://localhost:8000/docs
________________________________________
Método 2: Executando Manualmente
Back-end
1.	Navegue até a pasta do back-end:
Bash
cd backend
2.	Crie e ative um ambiente virtual:
Bash
python -m venv venv
.\venv\Scripts\Activate
3.	Instale as dependências:
Bash
pip install -r requirements.txt
4.	Configure o Banco de Dados:
o	Certifique-se de que o PostgreSQL está rodando.
o	Crie um banco de dados chamado meu_dashboard_db.
o	Edite o arquivo backend/app/database.py e atualize a SQLALCHEMY_DATABASE_URL com seu usuário e senha do PostgreSQL.
5.	Inicie o servidor:
Bash
uvicorn app.main:app --reload
O back-end estará disponível em http://localhost:8000.
Front-end
1.	Abra um novo terminal e navegue até a pasta do front-end:
Bash
cd frontend
2.	Instale as dependências:
Bash
npm install
3.	Inicie o servidor de desenvolvimento:
Bash
npm run dev
O front-end estará disponível em http://localhost:5173.
🛠️ Uso da API
A documentação completa da API está disponível via Swagger UI em http://localhost:8000/docs.
•	GET /kpis/: Retorna os KPIs calculados. Aceita os query params start_date e end_date.
•	GET /sales/: Retorna a lista de vendas. Aceita os query params start_date e end_date.
•	POST /sales/: Cria um novo registro de venda.
🔮 Possíveis Melhorias
•	Autenticação: Implementar autenticação de usuários com JWT para proteger o dashboard.
•	Testes: Adicionar testes unitários e de integração para o back-end (com Pytest) e para o front-end (com Jest/React Testing Library).
•	Atualizações em Tempo Real: Usar WebSockets para que o dashboard se atualize automaticamente quando novos dados forem inseridos.
•	CI/CD: Configurar um pipeline de Integração e Deploy Contínuo (ex: com GitHub Actions) para automatizar testes e deploys.
•	Filtros Avançados: Adicionar mais opções de filtro (por produto, categoria, etc.).
________________________________________

