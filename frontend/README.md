# Fintech FIAP - Via Cartao

Sistema web de gerenciamento financeiro pessoal desenvolvido para a FIAP utilizando **Spring Boot** no backend e **ReactJS** no frontend.

---

# Autenticacao

O frontend esta preparado para autenticacao real via backend em:

```bash
POST /auth/login
```

Usuario inicial criado automaticamente pelo backend:

```bash
email: admin@viacartao.com
senha: 123456
```

Tambem e possivel habilitar um login demo local durante o desenvolvimento usando as variaveis do arquivo `.env.example`.

---

# Estrutura do Projeto

```bash
Fintech-FIAP/
+-- backend/
+-- frontend/
```

---

# Funcionalidades

- Autenticacao de usuario
- Dashboard financeiro
- CRUD de contas
- CRUD de cartoes vinculados
- Controle de movimentacoes financeiras
- Navegacao com React Router DOM
- Tratamento de rotas invalidas (NotFound)
- Interface moderna com identidade visual padronizada

---

# Backend (Spring Boot)

## Tecnologias utilizadas

- Java 17
- Spring Boot
- Spring Data JPA
- Maven
- H2 Database para desenvolvimento local
- Oracle Database opcional

---

## Como executar o backend

Abra a pasta:

```bash
backend
```

Execute:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

Ou execute diretamente no IntelliJ a classe:

```bash
ViaCartaoApplication.java
```

O backend iniciara em:

```bash
http://localhost:8080
```

Por padrao, o backend usa um banco H2 local salvo em:

```bash
backend/data/via-cartao
```

Console H2:

```bash
http://localhost:8080/h2-console
```

Dados de conexao do H2:

```bash
JDBC URL: jdbc:h2:file:./data/via-cartao
User: sa
Password:
```

---

## Usar Oracle opcionalmente

Para usar Oracle em vez do H2 local, defina as variaveis de ambiente antes de iniciar o backend:

```bash
DB_URL=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DRIVER=oracle.jdbc.OracleDriver
```

No PowerShell:

```powershell
$env:DB_URL="jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL"
$env:DB_USERNAME="seu_usuario"
$env:DB_PASSWORD="sua_senha"
$env:DB_DRIVER="oracle.jdbc.OracleDriver"
.\mvnw.cmd spring-boot:run
```

---

## Endpoints usados pelo frontend

```bash
POST   /auth/login
GET    /usuarios
POST   /usuarios
PUT    /usuarios/{id}
DELETE /usuarios/{id}
GET    /cartoes
POST   /cartoes
PUT    /cartoes/{id}
DELETE /cartoes/{id}
GET    /transacoes
POST   /transacoes
PUT    /transacoes/{id}
DELETE /transacoes/{id}
```

---

# Frontend (ReactJS)

## Tecnologias utilizadas

- ReactJS
- Vite
- React Router DOM
- JavaScript
- Axios
- TanStack Query
- React Hook Form
- Zod
- Sonner
- Lucide React
- CSS global componentizado

---

## Como executar o frontend

Abra a pasta:

```bash
frontend
```

Instale as dependencias:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend iniciara em:

```bash
http://localhost:5173
```

O frontend usa por padrao:

```bash
http://localhost:8080
```

Para alterar a URL da API, configure no `.env` do frontend:

```bash
VITE_API_URL=http://localhost:8080
```

---

# Paginas do Sistema

| Pagina | Descricao |
|---|---|
| Login | Tela de autenticacao de usuarios |
| Dashboard Financeiro | Painel principal do sistema |
| Contas | Cadastro e gerenciamento de contas |
| Cartoes Vinculados | Cadastro e gerenciamento de cartoes |
| Controle Financeiro | Registro de movimentacoes financeiras |
| Pagina 404 | Tratamento de rotas invalidas |

---

# Objetivo do Projeto

Desenvolver uma aplicacao financeira moderna utilizando integracao entre frontend e backend, aplicando conceitos de:

- APIs REST
- CRUD completo
- Navegacao SPA
- Componentizacao
- Integracao com banco de dados
- Organizacao visual e experiencia do usuario

---

# Desenvolvido para

FIAP - Faculdade de Informatica e Administracao Paulista

Projeto academico desenvolvido para avaliacao da disciplina de Frontend e Java Spring Boot.
