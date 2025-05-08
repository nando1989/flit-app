# Flit-App

Flit-App é uma aplicação web para gestão de funcionários, desenvolvida com React e TypeScript. O sistema permite que usuários façam login, cadastrem, editem e visualizem informações dos funcionários de forma simples e eficiente.

---

## Tecnologias Utilizadas

- *React* com *TypeScript* para construção da interface.
- *Vite* como bundler e servidor de desenvolvimento.
- *Tailwind CSS* para estilização rápida e responsiva.
- *Firebase* para autenticação, banco de dados (Firestore), armazenamento de arquivos e tradução de mensagens de erro.
- *Zustand* para gerenciamento de estado global.
- *Formik* e *Yup* para criação e validação de formulários.
- *React Router* para controle de rotas e navegação.

---

## Estrutura do Projeto

- src/components/: Componentes reutilizáveis da interface, organizados entre genéricos e específicos.
- src/pages/: Páginas da aplicação, divididas por funcionalidades (autenticação, área principal, funcionários).
- src/routes/: Definição das rotas públicas e privadas da aplicação.
- src/hook/: Hooks personalizados para lógica compartilhada, como controle de mensagens.
- src/lib/: Funções utilitárias para tarefas comuns.
- src/models/: Tipos e interfaces TypeScript para os dados usados.
- src/service/firebase/: Serviços que encapsulam a comunicação com Firebase.
- src/store/: Gerenciamento de estado global com Zustand.

---

## Funcionalidades Principais

- Autenticação segura com Firebase Authentication.
- Cadastro, edição e visualização de funcionários com dados armazenados no Firestore.
- Upload e gerenciamento de arquivos (ex: fotos) via Firebase Storage.
- Validação de formulários com feedback ao usuário usando Formik e Yup.
- Navegação protegida por rotas, garantindo acesso apenas a usuários autenticados.
- Mensagens e alertas centralizados para melhor experiência do usuário.

---

## Como Rodar o Projeto

1. Clone o repositório.
2. Instale as dependências com npm install.
3. Configure as credenciais do Firebase no arquivo de configurações.
4. Execute o projeto em modo de desenvolvimento com npm run dev.
5. Acesse a aplicação via navegador no endereço indicado pelo Vite (normalmente http://localhost:3000).

---

## Arquitetura e Boas Práticas

- O projeto é modular, com separação clara entre apresentação, lógica e dados.
- Utiliza hooks personalizados e Zustand para gerenciamento eficiente do estado.
- Componentes pequenos e focados, facilitando manutenção e testes.
- Integração organizada com Firebase, centralizando chamadas em serviços específicos.
- Uso de TypeScript para garantir tipagem forte e evitar erros comuns.
- Estilização com Tailwind CSS para desenvolvimento rápido e responsivo.

---

## Considerações Finais

O Flit-App é um exemplo de aplicação moderna, combinando tecnologias atuais e boas práticas para oferecer uma solução robusta e escalável para gestão de funcionários.

---