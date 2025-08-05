# Intranet Backend

Backend para sistema de Intranet, desenvolvido em Node.js, TypeScript, Fastify e Prisma ORM, com autenticação JWT, controle de permissões e integração com PostgreSQL.

## Estrutura do Projeto

- `back/` - Código-fonte do backend
  - `src/` - Código principal (rotas, controllers, serviços, domínio, infraestrutura)
  - `prisma/` - Schema e migrações do banco de dados
  - `Dockerfile` - Build da aplicação para produção
  - `package.json` - Dependências e scripts
- `docker-compose.yml` - Orquestração dos containers (backend + banco de dados)
- `.back.env` / `.database.env` - Variáveis de ambiente

## Tecnologias

- Node.js + TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- Docker

## Variáveis de Ambiente Obrigatórias

Antes de rodar o projeto, configure as seguintes variáveis de ambiente nos arquivos `.back.env` e `.database.env`:

### `.back.env`

```env
DATABASE_URL="postgresql://usuario:senha@localhost/nome_do_banco"
NODE_ENV="development"
JWT_SECRET="secure_key"
URL_FRONT="*"

CLOUDINARY_CLOUD_NAME="CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY="CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET="CLOUDINARY_API_SECRET"
```

### `.database.env`

```env
POSTGRES_DB="db_name"
POSTGRES_USER="user_name"
POSTGRES_PASSWORD="password"
```

## Como rodar localmente

1. **Clone o repositório e acesse a pasta:**
   ```sh
   git clone https://github.com/joao-victorr/intranetBackend.git
   cd intranetBackend
   ```

2. **Configure as variáveis de ambiente:**
   - Copie `.back.env.example` e `.database.env.example` (ou crie `.back.env` e `.database.env` conforme necessário).

3. **Suba os containers com Docker Compose:**
   ```sh
   docker-compose up --build
   ```

   Isso irá:
   - Subir o banco de dados PostgreSQL
   - Subir o backend em modo produção

4. **Para desenvolvimento local (fora do Docker):**
   ```sh
   cd back
   npm install
   npm run dev
   ```

5. **Rodar migrações e seeds:**
   ```sh
   cd back
   npm run dev-migrate
   npm run dev-seed
   ```

## Principais Endpoints

- `POST /api/auth/login` - Login (JWT)
- `POST /api/auth/refresh-token` - Refresh Token
- `GET /api/users` - Listar usuários (autenticado)
- `POST /api/users` - Criar usuário (autenticado)
- `GET /api/roles` - Listar roles
- `GET /api/permissions` - Listar permissões

> Acesse a documentação Swagger em `/api/docs` (modo desenvolvimento).

## Observações

- O backend exige variáveis de ambiente válidas para funcionar.
- O sistema de permissões e roles é totalmente customizável via código e seeds.
- O projeto já está pronto para deploy em produção via Docker.
- **Usuário padrão:** ao rodar o seed, será criado um usuário administrador com o usuário `admin` e senha `admin`.

---
