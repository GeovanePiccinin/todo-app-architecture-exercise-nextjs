## Todo App – Clean Architecture (Next.js App Router)

This project is a full‑stack Todo application built with **Next.js App Router**, following a **Clean Architecture** / modular domain approach.

High‑level layers:

- **UI**: React Server Components + Client Components under `app/` and `src/modules/*/components`.
- **Use cases / actions**: Server Actions in `src/modules/*/actions` and hooks in `src/modules/*/hooks`.
- **Domain services**: Business logic in `src/modules/*/services`.
- **Repositories**: Data access in `src/modules/*/repositories` using Prisma.
- **Infrastructure**: Shared infra such as Prisma, Supabase, logger, and observability under `src/infrastructure`.

Domains are split by feature (auth, todo, profile, audit, rate‑limit) under `src/modules`.

### Running locally

- **Install dependencies**

```bash
npm install
```

- **Run database (Docker) and apply migrations**

```bash
docker-compose up -d
npx prisma migrate dev
```

- **Start the dev server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.  
If authenticated, `/` redirects to `/todos`; otherwise it redirects to `/login`.

### Key architecture decisions

- **Auth**: NextAuth with credentials provider, JWT strategy, and RBAC (`modules/auth`).
- **Todos**:
  - Read path via `/api/todos` (used by React Query and SSR hydration).
  - Write operations via Server Actions (`modules/todo/actions`) calling services + repositories.
  - Cursor pagination, optimistic updates, and soft delete.
- **Profile**: Profile form and avatar upload using Server Actions and Supabase storage.
- **Cross‑cutting concerns**:
  - Centralized error type (`AppError`) and serializer (`handleError`) for API responses.
  - Structured logging with `pino` and per‑request IDs using AsyncLocalStorage.
  - Rate limiting and audit logging stored in the database.

See `context.md` for the complete requirements and roadmap.
