# 🛠️ Desenvolvimento Local

## ✅ Pré-requisitos

- **Node.js 18+** (Frontend)
- **Java 17+** (Backend)
- **Maven 3.9+** (Backend)
- **PostgreSQL 18+** (Database)
- **Git**

## 📚 Backend Setup

### 1. Começar PostgreSQL

```powershell
# Se PostgreSQL está instalado localmente:
psql -U postgres -c "CREATE DATABASE flamengo_ratings;"
psql -U postgres -d flamengo_ratings -f init.sql
```

### 2. Rodar Backend

```powershell
cd backend
mvn clean install
mvn spring-boot:run
```

✅ Backend rodando em: `http://localhost:8080/api`

### 3. Testar API

```powershell
# Terminal novo
curl http://localhost:8080/api/avaliadores
```

## 🎨 Frontend Setup

### 1. Instalar Dependências

```powershell
cd frontend
npm install
```

### 2. Configurar Variáveis

`.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Rodar Frontend

```powershell
npm run dev
```

✅ Frontend rodando em: `http://localhost:3000`

## 🧪 Fluxo de Teste

1. Acesse `http://localhost:3000/campanato`
2. Selecione um campeonato
3. Veja os jogadores com notas

## 📦 Build para Produção

### Frontend

```powershell
cd frontend
npm run build
npm run start
```

### Backend

```powershell
cd backend
mvn clean package
java -jar target/flamengo-ratings-api-1.0.0.jar
```

## 🔧 Troubleshooting

### Erro de conexão ao banco
```
Verifique:
- PostgreSQL está rodando
- Credenciais em application.properties
- Database existe
```

### Frontend não conecta ao backend
```
- Verifique NEXT_PUBLIC_API_URL em .env.local
- Backend está em http://localhost:8080/api ?
- CORS ativado no backend? ✅ (está)
```

### Porta 3000 já em uso
```powershell
# Liberar porta
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📝 Dados de Teste

Ver `init.sql` para dados de exemplo com jogadores reais do Flamengo.

---

**Precisa de ajuda?** Abra uma issue no GitHub!
