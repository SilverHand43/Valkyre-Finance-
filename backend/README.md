# Valkyre Finance Backend

Backend SaaS multi-tenant em Node.js + NestJS + TypeScript + Prisma + PostgreSQL.

## Stack

- NestJS
- Prisma ORM
- PostgreSQL
- JWT + Refresh Token
- bcrypt
- class-validator
- Swagger

## Regras Multi-tenant

- Todo registro de domínio tem companyId.
- Consultas dos módulos de negócio filtram por companyId do usuário autenticado.
- Guards globais ativos:
  - JwtAuthGuard
  - RolesGuard
  - CompanyIsolationGuard

## Módulos

- Auth
- Company
- Customer
- Supplier
- Product
- InventoryMovement
- AccountPayable
- AccountReceivable
- CashFlow
- Dashboard
- AuditLog

## Funcionalidades de Auth

- Cadastro
- Login
- Refresh Token
- Recuperação de senha (token mock)
- Redefinição de senha
- Alteração de senha

## Dashboard Endpoints

- monthly-revenue
- monthly-expenses
- monthly-profit
- cash-flow
- low-stock-products
- top-customers
- top-products-sold

## Auditoria

Registro de eventos:

- CREATE
- UPDATE
- DELETE
- LOGIN

## Setup

1. Instalar dependências:

npm install

2. Configurar ambiente em backend/.env:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/valkyre_finance"
JWT_ACCESS_SECRET="change-me-access"
JWT_REFRESH_SECRET="change-me-refresh"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

3. Gerar client Prisma:

npx prisma generate

4. Aplicar migration inicial:

npx prisma migrate deploy

5. Rodar API:

npm run start:dev

## Swagger

- URL: /api/docs

## Testes

- Unit: npm test
- Build: npm run build
