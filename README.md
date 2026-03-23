# 🧠 Todo App Fullstack — Arquitetura Profissional com Next.js

Este projeto consiste em um **Todo App fullstack** desenvolvido com **Next.js (App Router)**, com o objetivo de simular um ambiente de engenharia de software de nível profissional, aplicando padrões modernos de arquitetura, organização de código e boas práticas amplamente utilizadas na indústria.

---

## 🎯 Objetivo do Projeto

Construir uma aplicação realista que reflita:

* Estrutura escalável
* Separação clara de responsabilidades
* Facilidade de manutenção e evolução
* Adoção de padrões arquiteturais sólidos

---

## 🏗️ Arquitetura

O projeto adota uma abordagem baseada em **Clean Architecture adaptada por módulos**, com separação por domínio.

### 📦 Estrutura por Domínio

Cada domínio (ex: `auth`, `user`, `todo`) é isolado e segue uma organização consistente:

```
modules/todo
├── actions/
├── hooks/
├── queries/
├── components/
├── repositories/
└── services/
```

---

## 🔁 Fluxo de Camadas

A aplicação segue um fluxo bem definido:

```
UI → Use Cases (Actions/Services) → Repository Interface → Infrastructure (Prisma/Supabase)
```

### 📌 Responsabilidades

* **UI (components/hooks)**
  Interface do usuário e gerenciamento de estado (React Query)

* **Use Cases (actions/services)**
  Regras de negócio e orquestração

* **Repositories (interfaces)**
  Abstração de acesso a dados

* **Infrastructure (implementações)**
  Integração com banco (Prisma/Supabase)

---

## 🧩 Padrões Utilizados

* **Clean Architecture (adaptada)**
* **Domain-driven modular structure**
* **Repository Pattern**
* **Separation of Concerns**
* **SSR + Hydration (Next.js App Router)**
* **React Query (Server State Management)**
* **Optimistic UI Updates**
* **Cursor-based Pagination**

---

## ⚙️ Tecnologias Principais

* **Next.js (App Router)**
* **TypeScript (strict mode)**
* **Prisma ORM**
* **React Query**
* **Supabase (como adapter de infraestrutura)**

---

## ✅ Funcionalidades Implementadas

* Estrutura modular por domínio
* Autenticação básica (fluxo inicial)
* Listagem de todos com:

  * Paginação por cursor
  * SSR + hidratação
* Mutations com:

  * Optimistic updates
* Repository Pattern aplicado
* Separação clara entre camadas

---

## 🚧 Funcionalidades

* Tratamento robusto de erros
* Audit Log automático
* Rate limiting
* RBAC (controle de acesso por papel)
* RLS (Row Level Security)
* Upload de avatar (perfil)
* Testes automatizados
* Dockerização
* Pipeline de CI/CD
* Observabilidade (logs, tracing, métricas)
* Segurança avançada (validações, middlewares)

---

## 🔐 Considerações de Engenharia

Este projeto enfatiza práticas fundamentais de engenharia de software:

* **Baixo acoplamento e alta coesão**
* **Isolamento de regras de negócio**
* **Facilidade de substituição de infraestrutura**
* **Escalabilidade organizacional (times por domínio)**
* **Testabilidade (camadas desacopladas)**
* **Previsibilidade de comportamento**

---

## 📊 Nível do Projeto

Este projeto se posiciona entre **nível intermediário-avançado**, sendo adequado como:

* Base para sistemas reais
* Projeto de portfólio técnico
* Exercício de arquitetura
* Simulação de codebase corporativa

Com a implementação dos itens pendentes (principalmente testes, segurança e observabilidade), ele pode evoluir para um **nível próximo de produção**.

---

## 🎓 Contexto Educacional

Este projeto faz parte de um **exercício de engenharia de software e arquitetura** que aplico aos meus alunos, com o objetivo de desenvolver habilidades práticas em:

* Estruturação de aplicações reais
* Tomada de decisões arquiteturais
* Aplicação de padrões de projeto
* Escrita de código sustentável e escalável

A proposta não é apenas "fazer funcionar", mas sim **construir como um engenheiro de software profissional**.

---

## 📌 Conclusão

Este projeto demonstra uma base sólida de arquitetura moderna aplicada ao ecossistema React/Next.js, indo além do trivial e focando em aspectos que realmente importam em ambientes profissionais.

---
