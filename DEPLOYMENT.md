# 📋 Guia de Deployment - Vercel & Railway

## 🚀 Step 1: Preparar o repositório GitHub

```bash
cd c:\Users\julio\OneDrive\Documentos\bruninhoesimoes
git add .
git commit -m "Inicial: Frontend Next.js e Backend Spring Boot"
git push origin main
```

## 📱 FRONTEND - Vercel

### 1. Setup no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Sign in com GitHub
3. Clique em "Add New..." → "Project"
4. Selecione o repositório `bruninhoesimoes`
5. Configure:
   - **Framework:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 2. Variáveis de Ambiente (Vercel)

Na aba "Environment Variables", adicione:

```
NEXT_PUBLIC_API_URL=https://sua-app-railway.up.railway.app/api
```

⚠️ **Nota:** Substitua `sua-app-railway` pelo nome da sua app no Railway (veremos adiante)

### 3. Deploy
Clique em "Deploy" e aguarde (~2-3 minutos)

Seu site estará em: `https://seu-projeto.vercel.app`

---

## 🚂 BACKEND - Railway

### 1. Criar Conta Railway

1. Acesse [railway.app](https://railway.app)
2. Sign in com GitHub
3. Autorize Railway para acessar repositórios

### 2. Criar PostgreSQL no Railway

1. Clique em "Create New Project"
2. Clique em "Provision PostgreSQL"
3. Aguarde a criação

**Copie as credenciais:**
- Host
- Port (normalmente 5432)
- Database (flamengo_ratings)
- User (postgres)
- Password

### 3. Rodar Scripts SQL

1. Na Railway, acesse o serviço PostgreSQL
2. Vá na aba "Connect"
3. Clique em "Command Line"
4. Cole os comandos SQL das tabelas (ver README.md)

```bash
psql postgresql://username:password@host:5432/flamengo_ratings < init.sql
```

### 4. Deploy Backend no Railway

1. Novo Projeto → "GitHub Repo"
2. Selecione `bruninhoesimoes`
3. Root Directory: `backend`
4. Build Command: `mvn clean package`
5. Start Command: `java -jar target/*.jar`

### 5. Variáveis de Ambiente (Backend - Railway)

Adicione as variáveis:

```bash
# Java/Spring
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:PORT/flamengo_ratings
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua-senha
SPRING_JPA_HIBERNATE_DDL_AUTO=validate

# Server
PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

⚠️ Use os valores que copiou do PostgreSQL do Railway

### 6. Deploy
Railway fará deploy automaticamente ao detectar mudanças no GitHub

Sua API será: `https://sua-app.up.railway.app/api`

---

## ✅ Checklist Final

- [ ] Frontend deployado na Vercel
- [ ] Backend deployado na Railway
- [ ] PostgreSQL criado no Railway
- [ ] Tabelas SQL criadas no banco
- [ ] Avaliadores inseridos (Simões e Bruninho)
- [ ] Variável `NEXT_PUBLIC_API_URL` apontando para Railway
- [ ] CORS ativado no backend

## 🧪 Testar Conexão

### No Frontend
```bash
curl https://seu-projeto.vercel.app
```

### Backend
```bash
curl https://sua-app.up.railway.app/api/avaliadores
```

Se receber JSON, está funcionando! ✅

---

## 📸 Próximo: Integração Cloudinary

Quando estiver pronto, vou ajudar com:
- Setup Cloudinary
- Upload de fotos
- Update URLs no banco
