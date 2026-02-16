# 🚀 Guia Completo de Deployment - Flamengo Ratings

## Status do Projeto ✅
- ✅ Backend Java 21 LTS com Spring Boot 3.2
- ✅ Frontend Next.js 14
- ✅ REST API com 4 controllers completos
- ✅ Banco de dados PostgreSQL com schema pronto
- 🔄 **Próximos passos**: Railway (Backend + DB) e Vercel (Frontend)

---

## 📊 PARTE 1: Criar PostgreSQL no Railway

### 1.1 Acessar Railway
1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em **"Create New Project"** → **"Provision PostgreSQL"**
4. Aguarde a criação (2-3 minutos)

### 1.2 Copiar Credenciais
Na aba **"Connect"** do banco PostgreSQL, você encontrará:
- **DATABASE_URL**: `postgresql://username:password@host:port/database`

Ou separe como:
- **Host**: `sua-host-railway.railway.app`
- **Port**: `5432`
- **Database**: `railway` ou seu nome
- **Username**: `postgres`
- **Password**: `sua-senha`

### 1.3 Criar as Tabelas SQL

Copie todo o conteúdo de `init.sql` do seu repositório:

```bash
# Na Railway, vá em "Connect" → "Command Line" e execute:
psql postgresql://username:password@host:5432/railway < init.sql
```

**OU** execute manualmente na Railway CLI:
```sql
-- Execute no console PostgreSQL da Railway:
CREATE TABLE avaliadores (id_avaliador SERIAL PRIMARY KEY, nome VARCHAR(100));
CREATE TABLE jogadores (numero_camisa INT PRIMARY KEY, nome VARCHAR(100), ...);
-- ... etc (copiar do init.sql)
```

---

## 🚂 PARTE 2: Deploy Backend no Railway

### 2.1 Settings do Backend
1. Volte ao dashboard do Railway
2. Clique **"+ New"** → **"GitHub Repo"**
3. Selecione `bruninhoesimoes`
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/flamengo-ratings-api-1.0.0.jar`

### 2.2 Variáveis de Ambiente (Backend)

Na aba **"Variables"** do Railway, adicione:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/database
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua-senha-postgres
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
CORS_ALLOWED_ORIGINS=https://seu-site-vercel.vercel.app
```

**Substitua com suas credenciais do PostgreSQL!**

### 2.3 Deploy
Railway faz deploy automaticamente quando você faz push no GitHub. 

Você verá um link tipo: `https://seu-app.up.railway.app`

Teste a API:
```bash
curl https://seu-app.up.railway.app/api/avaliadores
```

---

## 📱 PARTE 3: Deploy Frontend no Vercel

### 3.1 Settings do Frontend
1. Acesse [vercel.com](https://vercel.com)
2. Clique **"Add New"** → **"Project"**
3. Selecione `bruninhoesimoes`
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`

### 3.2 Variáveis de Ambiente (Frontend)

Na aba **"Environment Variables"**, adicione:

```bash
NEXT_PUBLIC_API_URL=https://seu-app.up.railway.app/api
```

**Substitua `seu-app` pelo nome do seu projeto no Railway!**

### 3.3 Deploy
Clique **"Deploy"** e aguarde (2-3 min).

Seu site estará em: `https://seu-projeto.vercel.app`

---

## ✅ Checklist Final

- [ ] Banco PostgreSQL criado no Railway
- [ ] Tabelas SQL criadas (init.sql)
- [ ] Backend deployado no Railway
- [ ] Variáveis de ambiente do backend configuradas
- [ ] Frontend deployado no Vercel
- [ ] `NEXT_PUBLIC_API_URL` apontando para Railway
- [ ] Backend responde em `/api/avaliadores`
- [ ] Frontend conecta com sucesso

---

## 🧪 Testar Conexão

### Backend está online?
```bash
curl https://seu-app.up.railway.app/api/avaliadores
```
Deve retornar JSON com lista de avaliadores.

### Frontend conecta?
1. Abra seu site no Vercel
2. Vá para `/jogador` ou `/campeonato`
3. Verifique console do navegador (F12) para erros de CORS

Se tudo funcionar, **está pronto! 🎉**

---

## 🔧 Troubleshooting

### ❌ "Cannot connect to database"
- Verifique `SPRING_DATASOURCE_URL` está correto
- Teste conexão na Railway CLI

### ❌ "CORS Error" no frontend
- Verifique `CORS_ALLOWED_ORIGINS` no backend
- Ou use `*` temporariamente (menos seguro)

### ❌ "Build failed" no Railway
- Execute localmente: `mvn clean package`
- Verifique pom.xml

### ❌ Frontend não vê backend
- Verifique `NEXT_PUBLIC_API_URL` em Vercel
- Deve ser `https://` (não `http://`)
- Backend deve estar online

---

**Pronto para fazer o deployment? Me avise se tiver dúvidas! 🚀**
