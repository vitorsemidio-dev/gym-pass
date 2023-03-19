# 💪🎟️ Gym Pass

<p align="center">
  <img src="https://img.shields.io/static/v1?logo=Fastify&logoColor=000000&label=Fastify&message=Fastify&color=000000" alt="Logo Fastify" />
  <img src="https://img.shields.io/static/v1?logo=Node.js&logoColor=339933&label=Node.js&message=Node.js&color=339933" alt="Logo Node.js" />
  <img src="https://img.shields.io/static/v1?logo=Prisma&logoColor=2D3748&label=Prisma&message=Prisma&color=2D3748" alt="Logo Prisma" />
  <img src="https://img.shields.io/static/v1?logo=Vitest&logoColor=6E9F18&label=Vitest&message=Vitest&color=6E9F18" alt="Logo Vitest" />
</p>

A GymPass API é uma aplicação que permite o gerenciamento de check-ins em academias. Com ela, é possível realizar o cadastro de usuários e academias, além de permitir a busca de academias por nome.

---

## 🧭 Como rodar o projeto

Inicie o banco de dados

```bash
docker-compose up -d
```

Instale as dependências

```bash
npm install
```

Crie e preencha as variáveis de ambiente no arquivo `.env`

```bash
cp .env.example .env
```

Prepare o Husky

```bash
npm run prepare
```

Execute as migrations

```bash
npm run db:migrate-dev
```

Rode o projeto

```bash
npm run start:dev
```

---

## Funcionalidades do projeto

### RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de usuário;
- [x] Deve ser possível cadastrar uma academia;

### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não poder fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não tiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

---

## 🔜 Próximas etapas

- [ ] Criar documentação API
- [ ] Botão Insomnia

---

## 🧪 Testes

Utilize o comando a seguir para executar os testes unitários

```bash
npm run test:unit
```

Utilize o comando a seguir para executar os testes e2e

```bash
npm run test:e2e
```
