CONTEXTO DO PROJETO:

Estamos construindo um Todo App fullstack profissional com Next.js App Router.

Objetivo:
Simular ambiente de empresa nível profissional, aplicar as melhores práticas.


Arquitetura:

Clean Architecture adaptada (modulos)

Separação por domínio (auth, user, todo)

Repository Pattern

Supabase como adapter

Camadas: UI → UseCases → Repository Interface → Infrastructure Adapter

Requisitos obrigatórios:

Autenticação profissional (register, login, reset password)

Controle de acesso (RBAC)

Perfil com upload de avatar

Todo com filtros, paginação cursor, soft delete

Docker

CI/CD

Testes

Observabilidade

Segurança (RLS, validação, middleware)





Exemplo do module todo:
modules/todo

actions/
   create-todo.action.ts
   toggle-todo.action.ts
   delete-todo.action.ts

hooks/
   use-todos.ts
   use-create-todo.ts
   use-toggle-todo.ts
   use-delete-todo.ts

queries/
   fetch-todos.ts
   todo.keys.ts

components/
   todo-list.tsx
   todo-form.tsx
   todo-item.tsx
   todo-filters.tsx

repositories/
   todo.repository.ts

services/
   todo.service.ts


O que já foi implementado:
Next.js App Router
Prisma
React Query
SSR hydration
Cursor pagination
Optimistic updates
Domain architecture
Repository pattern

O que ainda falta implementar:
Tratamento de erro
AuditLog automático
Rate limiting
RBAC
RLS
testes
Docker
CI/CD
observabilidade