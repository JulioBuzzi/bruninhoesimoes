# 🚀 Guia Completo de Deployment - Flamengo Ratings (FORMA CORRETA 2026)

## Status do Projeto ✅
- ✅ Backend Java 21 LTS com Spring Boot 3.2
- ✅ Frontend Next.js 14
- ✅ REST API com 4 controllers completos
- ✅ Banco de dados PostgreSQL com schema pronto
- 🔄 **Próximos passos**: Railway (Backend + DB) e Vercel (Frontend)

---

## 📊 PARTE 1: Criar PostgreSQL no Railway (FORMA CORRETA)

### 1.1 Acessar Railway e Criar um Novo Projeto
1. Acesse [railway.com/new](https://railway.com/new)
2. Faça login com GitHub
3. Escolha uma das opções:
   - **Opção A (Recomendada)**: Clique em **"Database"** → **"PostgreSQL"**
   - **Opção B**: Clique em **"Empty Project"** → depois **"+ New"** → **"Database"** → **"PostgreSQL"**

### 1.2 Railway vai criar o Banco Automaticamente ✅
- Nenhuma configuração necessária!
- Railway cria as seguintes **variáveis de ambiente AUTOMATICAMENTE**:
```
PGHOST=seu-database-id.railway.internal
PGPORT=5432
PGUSER=postgres
PGPASSWORD=sua-senha-aleatoria
PGDATABASE=railway
DATABASE_URL=postgresql://postgres:senha@host:5432/railway
```

**Onde achar essas credenciais:**
1. Na página do PostgreSQL do Railway
2. Clique na aba **"Connect"**
3. Você verá a `DATABASE_URL` pronta para usar

### 1.3 Criar as Tabelas SQL (IMPORTANTE!)

**Opção 1: Usar Railway CLI (Mais fácil)**
```bash
# 1. Instale Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Conecte ao seu projeto
railway link

# 4. Execute o SQL
railway run psql < init.sql
```

**Opção 2: Usar pgAdmin ou DBeaver**
1. Baixe [pgAdmin](https://www.pgadmin.org/) ou [DBeaver](https://dbeaver.io/)
2. Crie uma conexão com as credenciais do Railway
3. Cole o conteúdo de `init.sql` e execute

**Opção 3: Via Django Shell ou similar**
- Copie o `DATABASE_URL` do Railway
- Execute localmente:
```bash
PGPASSWORD="sua-senha" psql -h seu-host -U postgres -d railway < init.sql
```

---

## 🚂 PARTE 2: Deploy Backend no Railway (FORMA CORRETA)

### 2.1 Conectar seu GitHub ao Rails/Repository

No seu **projeto existente no Railway**:
1. Clique em **"Services"** → **"+ New Service"** 
2. Selecione **"GitHub Repo"**
3. Selecione `bruninhoesimoes`

### 2.2 Configurar o Build

Railway vai **detectar automaticamente** que é Maven/Java.

Mas você pode customizar se precisar:
- **Root Directory**: `backend`
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/flamengo-ratings-api-1.0.0.jar`

### 2.3 Variáveis de Ambiente do Backend

Railway **automaticamente conecta o PostgreSQL** ao seu backend!

Mas você ainda precisa configurar:

Na aba **"Variables"** do seu serviço backend, adicione:

```bash
# Railway vai fornecer automaticamente (não precisa adicionar):
PGHOST=seu-postgres-service.railway.internal
PGPORT=5432
PGUSER=postgres
PGPASSWORD=xxxxx
PGDATABASE=railway
DATABASE_URL=postgresql://...

# Você adiciona manualmente:
SPRING_DATASOURCE_URL=${DATABASE_URL}
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SERVER_PORT=${PORT}
SPRING_PROFILES_ACTIVE=prod
```

### 2.4 Deploy
1. Railway faz deploy **automaticamente** quando você faz push no GitHub
2. Aguarde 5-10 minutos
3. Você verá um link tipo: `https://seu-app.up.railway.app`

**Teste a API:**
```bash
curl https://seu-app.up.railway.app/api/avaliadores
```

---

## 📱 PARTE 3: Deploy Frontend no Vercel (FORMA CORRETA)

### 3.1 Connecting to Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique **"Add New"** → **"Project"**
3. Selecione `bruninhoesimoes`

### 3.2 Configurar o Build
- **Framework**: Next.js (auto-detectado)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`

### 3.3 Variáveis de Ambiente (IMPORTANTE!)

Na aba **"Environment Variables"**, adicione:

```bash
NEXT_PUBLIC_API_URL=https://seu-app.up.railway.app/api
```

⚠️ **IMPORTANTE**: 
- Substitua `seu-app` pelo nome exato do seu projeto no Railway
- Use `https://` (não `http://`)
- Isso permite que o frontend **Front** encontre o backend!

### 3.4 Deploy
1. Clique **"Deploy"**
2. Aguarde 3-5 minutos
3. Seu site estará em: `https://seu-projeto.vercel.app`

---

## ✅ Checklist Final

### Railway PostgreSQL
- [ ] PostgreSQL criado no Railway
- [ ] Variáveis `PGHOST`, `PGPORT`, etc. visíveis em "Connect"
- [ ] Tabelas criadas (init.sql executado)
- [ ] Consegue conectar com pgAdmin/DBeaver

### Railway Backend
- [ ] Backend deployado no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Backend responde em `https://seu-app.up.railway.app/api/avaliadores`
- [ ] Database conecta corretamente

### Vercel Frontend  
- [ ] Frontend deployado no Vercel
- [ ] `NEXT_PUBLIC_API_URL` configurada
- [ ] Frontend abre em `https://seu-projeto.vercel.app`
- [ ] Consegue acessar `/jogador` e `/campeonato`

---

## 🧪 Testar Conexão (Passo a Passo)

### 1️⃣ Backend está vivo?
```bash
curl https://seu-app.up.railway.app/api/avaliadores
```
**Resposta esperada**: JSON com lista de avaliadores

### 2️⃣ Frontend vê o backend?
1. Abra seu site Vercel
2. Aperte **F12** (abre Developer Console)
3. Vá na aba **"Network"**
4. Tente acessar `/jogador` ou `/campeonato`
5. Procure por requisições para `seu-app.up.railway.app/api`
6. Se ver erro 404 ou CORS, verifique o `NEXT_PUBLIC_API_URL`

### 3️⃣ Banco de dados funciona?
1. No Railway, clique em seu serviço PostgreSQL
2. Clique em **"Connect"** → **"Railway CLI"**
3. Execute:
```bash
psql -h seu-host -U postgres -d railway -c "SELECT COUNT(*) FROM avaliadores;"
```
**Resposta esperada**: `2` (Simões e Bruninho)

---

## 🔧 Troubleshooting

### ❌ "Cannot connect to PostgreSQL"
- [ ] Verificar `SPRING_DATASOURCE_URL` está correto
- [ ] Verificar se as tabelas foram criadas (rodou init.sql?)
- [ ] Testar conexão local com DBeaver/pgAdmin

### ❌ "CORS Error" no frontend
- [ ] Verificar se backend tem `@CrossOrigin(origins = "*")`
- [ ] Verificar `NEXT_PUBLIC_API_URL` foi configurada no Vercel
- [ ] Fazer redeploy do Vercel após mudar variável

### ❌ "404 Not Found" no API
- [ ] Backend está realmente online? (curl test)
- [ ] A URL está correta? (Usar exatamente como Railway mostra)
- [ ] Porta 8080 está liberada? (Railway libera automaticamente)

### ❌ "Build failed" no Railway
```bash
# Teste localmente
mvn clean package -DskipTests
```

---

## 🎯 Resumo das URLs

Ao final, você terá:

| Serviço | URL | Localização |
|---------|-----|-------------|
| **Backend API** | `https://seu-app.up.railway.app/api` | Railway |
| **PostgreSQL** | `seu-postgres.railway.internal:5432` | Railway (privado) |
| **Frontend** | `https://seu-projeto.vercel.app` | Vercel |
| **Dados** | `init.sql` | PostgreSQL |

---

## 📞 Próximos Passos

1. ✅ PostgreSQL criado e tabelas inseridas
2. ✅ Backend rodando no Railway
3. ✅ Frontend rodando no Vercel
4. ✅ Frontend conecta com sucesso no backend

**Pronto! Seu app está LIVE! 🎉**
