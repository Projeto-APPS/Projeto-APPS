## 🐾 SJPA – Sistema de Gestão de Proteção Animal

Este é um sistema desenvolvido em **Next.js 14 (App Router)** para o gerenciamento interno da **SJPA** (Sistema de Gestão de Proteção Animal). O objetivo é fornecer uma plataforma robusta para o controle de informações e processos relacionados aos animais sob a responsabilidade da instituição.

-----

## ✨ Telas e Funcionalidades Atuais

O projeto já possui as seguintes telas e funcionalidades implementadas ou em desenvolvimento:

  * **Cadastro de Usuário:** Registro de novos membros da equipe.
  * **Login:** Acesso seguro ao sistema.
  * **Home:** Painel inicial de navegação.
  * **Animais:** Visão geral e listagem.
  * **Relação de Cães e Gatos:** Telas específicas para visualização detalhada.
  * **Cadastro de Animais:** Formulário para inclusão de novos animais no sistema.
  * **Muito mais (em desenvolvimento...):** Outras funcionalidades de gerenciamento interno.

-----

## 🚀 Tecnologias Essenciais

A aplicação é construída com uma stack moderna e tipada, utilizando **Supabase** como backend de banco de dados e autenticação.

| Tecnologia | Função |
| :--- | :--- |
| **Next.js 14 / App Router** | Interface do usuário, rotas e *server actions*. |
| **React** | Componentização da interface. |
| **Tailwind CSS** | Estilização rápida e responsiva (*utility-first*). |
| **Supabase** | Banco de dados PostgreSQL, armazenamento e serviços de autenticação. |
| **@supabase/supabase-js** | Acesso ao banco pelo *frontend* e APIs internas. |
| **bcryptjs** | Criptografia de senha. |
| **TypeScript** | Tipagem estática para maior segurança e escalabilidade. |
| **Node 20+** | *Runtime* obrigatório. |

-----

## 📁 Estrutura Atual do Projeto

O código está organizado da seguinte forma:

```
frontend/
 ├── app/
 │   ├── (telas)/ 
 │   ├── animais/
 │   │    └── page.tsx      // Página de listagem/visão geral de animais
 │   ├── api/
 │   │    ├── login/route.ts   // Rota de API para autenticação de login
 │   │    └── cadastro/route.ts // Rota de API para cadastro de usuário
 │   └── components/
 │        ├── Login.tsx
 │        ├── Cadastro.tsx
 │        ├── Home.tsx
 │        └── Animais.tsx
 ├── lib/
 │    └── supabase.ts       // Configuração de cliente Supabase
 ├── public/
 │    ├── logoSJPA.png
 │    └── paws-pattern.png
 └── package.json
```

-----

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e iniciar o ambiente de desenvolvimento.

### ⭐ 1. Instalar o Node 20 (obrigatório)

O Supabase e o Next.js 14 funcionam de forma mais estável e correta com o **Node na versão 20 ou superior**.

Se você usa `nvm` (Node Version Manager), rode:

```bash
nvm install 20
nvm use 20
```

Verifique a versão:

```bash
node -v
```

> **Resultado esperado:** `v20.x.x`

### ⭐ 2. Clonar o repositório

```bash
git clone [https://github.com/SEU-USUARIO/Projeto-APPS.git](https://github.com/SEU-USUARIO/Projeto-APPS.git)
cd Projeto-APPS/frontend
```

### ⭐ 3. Criar o arquivo `.env.local`

Na pasta `frontend`, crie o arquivo `.env.local` e adicione suas credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=[https://SEU-PROJETO.supabase.co](https://SEU-PROJETO.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Você encontra essas chaves no painel do Supabase, em: **Project Settings → API → Project URL e anon key**.

> ⚠️ **ATENÇÃO:** Este arquivo **NÃO DEVE** ser *committado* por conter chaves de acesso.

### ⭐ 4. Instalar dependências

Dentro da pasta `frontend`, execute:

```bash
npm install
```

Caso ocorra algum erro de permissão ou dependências corrompidas, tente limpar e reinstalar:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### ⭐ 5. Rodar o servidor

Para iniciar o servidor de desenvolvimento do Next.js:

```bash
npm run dev
```

Acesse a aplicação no seu navegador em:

**`http://localhost:3000`**

-----

## 🗄️ Configuração do Banco (Supabase)

### Tabela

A tabela inicial para usuários já foi criada:

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `uuid` | Identificador único. |
| `nome` | `text` | Nome completo do usuário. |
| `email` | `text, unique` | E-mail do usuário, único no sistema. |
| `telefone` | `text` | Contato telefônico. |
| `senha_hash` | `text` | Senha criptografada com *bcrypt*. |
| `created_at` | `timestamp` | Data de criação do registro. |

### Policies (Regras de Segurança)

As seguintes políticas foram criadas para o ambiente de desenvolvimento:

```sql
create policy "public_insert_usuarios"
on public.usuarios
for insert
to anon
with check (true);

create policy "public_select_usuarios"
on public.usuarios
for select
to anon
using (true);
```

> ⚠️ **IMPORTANTE:** Essas *policies* são amplas e destinadas apenas ao **desenvolvimento**. Para o ambiente de **produção**, será necessário criar *policies* mais restritivas e seguras.

-----

## 🔐 Detalhes da Autenticação

O fluxo de autenticação atual já está funcional:

  * **Cadastro:** A senha do usuário é criptografada com **bcrypt** antes de ser salva no banco (`senha_hash`).
  * **Login:** A senha fornecida é comparada de forma segura com o `senha_hash` usando **bcrypt**.
  * **Redirecionamento:** Após o login, o usuário é redirecionado automaticamente para a tela **Home**.

Ainda **NÃO** implementamos, o que será feito na próxima fase:

  * **Cookies de Sessão:** Para manter o estado de autenticação entre as requisições.
  * **Proteção de Rotas:** Para impedir acesso a rotas internas por usuários não autenticados.
  * **Logout:** Funcionalidade para encerrar a sessão.

-----

## 🧩 Próximas Telas em Andamento (Roadmap)

Foco nos próximos desenvolvimentos:

  * Tela **Animais** (já criada, precisa de listagem).
  * **Relação de Cães**
  * **Relação de Gatos**
  * **Cadastro de Animal**
  * **Menu inferior fixo** (navegação mobile/desktop).
  * Telas de **Perfis** (usuário e animal).
  * Funcionalidades de **Gerenciamento Interno**.

-----

## 🤝 Como Contribuir

Toda ajuda é bem-vinda\! Siga estas diretrizes ao contribuir:

  * **Versão do Node:** Sempre utilize o **Node 20+**.
  * **Instalação de Pacotes:** Instale novas dependências usando:
    ```bash
    npm install "pacote"
    ```
  * **Localização de Telas:**
      * Telas aninhadas (sub-páginas): `app/(telas)/NOME/page.tsx`
      * Telas que são rotas reais e diretas: `app/minhaRota/page.tsx`
  * **Componentes:** Crie componentes reutilizáveis na pasta:
    `app/components`
  * **APIs Internas:** Rotas de API devem ser criadas em:
    `app/api/NOME/route.ts`