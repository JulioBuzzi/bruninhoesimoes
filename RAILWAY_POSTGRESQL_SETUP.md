# 🚂 Railway PostgreSQL - Setup Correto (Passo a Passo)

## 📺 Passo 1: Criar Novo Projeto no Railway

### ✅ No navegador:
1. Acesse **[railway.com/new](https://railway.com/new)**
2. Faça login com GitHub (autorize se necessário)
3. Você verá 7 opções:
   - `GitHub Repository`
   - **`Database`** ← **CLIQUE AQUI**
   - `Template`
   - `Docker Image`
   - `Function`
   - `Bucket`
   - `Empty Project`

---

## 📺 Passo 2: Selecionar PostgreSQL

### ✅ Na tela de "Database":
1. Você verá 4 opções de banco:
   - `PostgreSQL` ← **CLIQUE AQUI**
   - `MySQL`
   - `Redis`
   - `MongoDB`

2. Clique em **"PostgreSQL"** 

👉 **Railway vai criar automaticamente seu banco PostgreSQL em ~30 segundos**

---

## 📺 Passo 3: Copiar as Credenciais do PostgreSQL

### ✅ Após criado, você verá sua página PostgreSQL:

**Importante: Vá para a aba "Connect"**

Você verá algo assim:

```
PGHOST: seu-postgres-id.railway.internal
PGPORT: 5432
PGUSER: postgres
PGPASSWORD: sua_senha_aqui_123xyz
PGDATABASE: railway
```

**Ou uma única linha:**
```
DATABASE_URL: postgresql://postgres:sua_senha_aqui_123xyz@seu-postgres-id.railway.internal:5432/railway
```

**⚠️ COPIE E GUARDE ESSA INFORMAÇÃO! Você vai precisar daqui a pouco.**

---

## 📺 Passo 4: Criar as Tabelas SQL (3 Opções)

### Opção A: Usar Railway CLI (RECOMENDADO ✅)

```bash
# 1. Instale o CLI do Railway
npm install -g @railway/cli

# 2. Faça login
railway login

# 3. Conecte ao seu projeto (choose your project)
railway link

# 4. Execute o init.sql (do seu repositório)
railway run psql < init.sql

# ✅ Pronto! Tabelas criadas
```

### Opção B: Usar pgAdmin (Visual)

1. Baixe [pgAdmin](https://www.pgadmin.org/)
2. Crie uma conexão com as credenciais do Railway:
   - **Host**: `seu-postgres-id.railway.internal`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: copie do Railway
   - **Database**: `railway`
3. Abra uma query e copie todo o conteúdo de `init.sql`
4. Cole e execute

### Opção C: Linha de Comando (Local)

```bash
# Copie a DATABASE_URL do Railway
export DATABASE_URL="postgresql://postgres:senha@host:5432/railway"

# Execute o SQL
psql $DATABASE_URL < init.sql

# ✅ Pronto!
```

---

## 📺 Passo 5: Verificar que as Tabelas Foram Criadas

```bash
# Use o Railway CLI
railway run psql

# Na prompt PostgreSQL, digite:
\dt

# Você deve ver:
#  public | avaliadores | table
#  public | jogadores   | table
#  public | jogos       | table
#  public | notas       | table

# Saia com:
\q
```

✅ **Se viu as 4 tabelas, seu banco está pronto!**

---

## 📺 Passo 6: Deploy do Backend no Railway

### ✅ No seu projeto Railroad (onde criou o PostgreSQL):

1. Clique no botão **"+ New Service"** ou **"+ New"**
2. Selecione **"GitHub Repository"**
3. Selecione seu repositório: `bruninhoesimoes`
4. Configure:
   - **Root Directory**: `backend` ← **IMPORTANTE**
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/flamengo-ratings-api-1.0.0.jar`

### ✅ Variáveis de Ambiente (Railway vai oferecer):

Railway **automaticamente** conecta o PostgreSQL!

Mas você ainda precisa adicionar manualmente. Clique na aba **"Variables"**:

```bash
# Adicione:
SPRING_DATASOURCE_URL=${DATABASE_URL}
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SERVER_PORT=${PORT}
SPRING_PROFILES_ACTIVE=prod
```

💡 **Nota**: `${DATABASE_URL}` vai ser preenchido automaticamente pelo Railway!

### ✅ Deploy automático

Quando fizer push no GitHub:
```bash
git add .
git commit -m "Deploy backend to Railway"
git push origin main
```

Railway vai:
1. Detectar que é Maven/Java
2. Compilar com `mvn clean package`
3. Fazer deploy automático
4. Mostrar URL tipo: `https://seu-app.up.railway.app`

⏱️ **Aguarde 5-10 minutos**

### ✅ Testar Backend

```bash
# Essa URL vai vir do Railway
curl https://seu-app.up.railway.app/api/avaliadores

# Resposta esperada:
# [{"id_avaliador":1,"nome":"Simões"},{"id_avaliador":2,"nome":"Bruninho"}]
```

---

## 📺 Passo 7: Deploy do Frontend no Vercel

### ✅ Acesse Vercel:

1. Vá para [vercel.com](https://vercel.com)
2. Clique **"Add New"** → **"Project"**
3. Selecione `bruninhoesimoes`

### ✅ Configure o build:

- **Framework**: Next.js (auto-detectado)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`

### ✅ Variáveis de Ambiente (CRUCIAL!):

Na aba **"Environment Variables"**, adicione:

```bash
NEXT_PUBLIC_API_URL=https://seu-app.up.railway.app/api
```

⚠️ **IMPORTANTE**:
- Substitua `seu-app` pelo nome exato que Railway mostrou
- Use HTTPS, não HTTP
- Essa variável permite que o frontend encontre o backend!

### ✅ Deploy

1. Clique **"Deploy"**
2. Aguarde 3-5 minutos
3. Sua URL será: `https://seu-projeto.vercel.app`

---

## ✅ CHECKLIST FINAL

### PostgreSQL Railway
- [ ] PostgreSQL criado no Railway
- [ ] Consegue ver PGHOST, PGPORT, etc
- [ ] Tabelas criadas (rodou init.sql)
- [ ] Consegue conectar com pgAdmin/DBeaver/CLI

### Backend Railway
- [ ] Backend deployado
- [ ] Variáveis de ambiente configuradas
- [ ] Backend online: `curl https://seu-app.up.railway.app/api/avaliadores` ✅
- [ ] Banco conecta (viu os 2 avaliadores)

### Frontend Vercel
- [ ] Frontend deployado
- [ ] `NEXT_PUBLIC_API_URL` configurada
- [ ] Frontend abre: `https://seu-projeto.vercel.app`
- [ ] Consegue acessar `/jogador` e `/campeonato` sem erros

---

## 🧪 TESTES FINAIS

### 1. Backend responde?
```bash
curl https://seu-app.up.railway.app/api/avaliadores
# Deve retornar: [{"id_avaliador":1,"nome":"Simões"}...]
```

### 2. Banco tem dados?
```bash
# Via Railway CLI ou pgAdmin
SELECT COUNT(*) FROM avaliadores;
# Deve retornar: 2
```

### 3. Frontend no Vercel funciona?
1. Abra `https://seu-projeto.vercel.app`
2. Clique em "Jogador" ou "Campeonato"
3. Aperte F12 → Console
4. Se nenhum erro vermelho, ✅ está pronto!

---

## 🚨 Se algo der errado

### Backend não aparece / Build falhou
- Verifique logs no Railway
- Teste localmente: `mvn clean package`
- Cheque se pom.xml está correto

### PostgreSQL não conecta
- Verifique SPRING_DATASOURCE_URL
- Cheque DATABASE_URL do Railway
- Rode `railway run psql` para testar

### Frontend mostra erro de CORS
- Verifique `@CrossOrigin(origins="*")` no backend
- Cheque `NEXT_PUBLIC_API_URL` em Vercel
- Faça redeploy do Vercel

---

## 📞 RESUMO

Você acaba de:
1. ✅ Criar um banco PostgreSQL no Railway
2. ✅ Inserir dados (init.sql)
3. ✅ Fazer deploy do backend Java 21
4. ✅ Fazer deploy do frontend Next.js
5. ✅ Conectar frontend ↔ backend ↔ banco de dados

**Seu app está LIVE na internet! 🎉**

---

**Qualquer dúvida, abra um issue no GitHub ou me chame!**
