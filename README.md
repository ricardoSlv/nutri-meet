# README

# Como correr a aplicação

## Pre requisitos:

```bash
- Nodejs
- Ruby 3.3.7
- Rails 8.0.2
- Docker
```

## Frontend

```bash
yarn install
yarn dev
```

### Testes

```bash
yarn test
```

## Backend

```bash
docker compose up -d postgres
rails db:create db:migrate db:seed
rails server
```

### Testes

```bash
rails db:create db:migrate db:fixtures:load RAILS_ENV=test
rails test
```

# Casos de teste contidos nas seeds

A nutricionista Maria Oliveira tem 3 agendamentos para as 2025-08-01 11:00:00 por:

- gabriel.lima@gmail.com
- rafael.costa@gmail.com
- patricia.silva@gmail.com

- Qualquer novo pedido de reagendamento por uma destas pessoas vai apagar o seu agendamento atual.
- A aceitação de um destes agendamentos automaticamente rejeita automaticamente os outros dois

A nutricionista Ana Costa não tem nenhum serviço associado, mesmo assim é devolvida no endpoint de pesquisa, apesar de nunca ser visível
na página de pesquisa de nutricionistas, já que as cards retratam uma associação de nutricionista a um serviço, e visível na página dos pedidos pendentes.

Uma pesquisa por "Pe" ou "pe" retorna todos os serviços do nutricionista Pedro Santos,
mas apenas os serviços "Perda de peso" e "Gestão de Peso" do nutricionista João da Silva,
já que o nome deste não faz match com a pesquisa, apenas alguns serviços deste, os restantes serviços são omitidos.

# Funcionalidades core

Todos os requisitos funcionais da aplicação foram cumpridos

### 1. Página de Pesquisa de Nutricionistas

Esta é a página principal onde os clientes podem pesquisar e visualizar nutricionistas.

#### Funcionalidades:

- **Sistema de pesquisa**
  - Campo de pesquisa (por nome ou serviço) ✅
  - Lista de resultados com nutricionistas correspondentes ✅
- **Agendamento de consultas**
  - Botão "Agendar Consulta" para cada nutricionista ✅
  - Modal para recolher informações do cliente:
    - Nome e email do cliente ✅
    - Data e hora desejadas para a consulta ✅
  - Um botão "Página Pessoal" ✅

### 2. Página de Pedidos de Consulta Pendentes (Vista do Nutricionista)

Uma página onde um nutricionista pode visualizar todos os pedidos de consulta recebidos.

#### Implementação:

- Deve ser implementada usando um framework JavaScript (React recomendado) ✅

#### Funcionalidades:

- **Gestão de pedidos**
  - Visualizar todos os pedidos de consulta recebidos (Por nutricionista) ✅
  - Para cada pedido, mostrar:
    - Informações do cliente ✅
    - Data/hora solicitada ✅
    - Ações: Aceitar ou Rejeitar ✅
- **Notificações**
  - Enviar notificação por email ao cliente quando o pedido for respondido ✅

# Notas do desenvolvimento

A aplicação foi desenvolvida numa abordagem jamStack, em que o frontend e o backend estão totalmente separados e comunicação por API, sendo que todas as respostas do backend são devolvidas em formato Json, para este efeito o servidor Rails foi colocado em modo API.

# Modelo de domínio

<img width="408" height="617" alt="Image" src="https://github.com/user-attachments/assets/0f96b93c-ca47-43cd-9d3e-b732ac6afa26" />

# Funcionalidades extra-mile

## I18n

- Traduções incluídas na aplicação frontend para todos os elementos de UI
- Switcher de língua incluído na NavBar
- Dados de texto vindos do backend não serão traduzidos

## Utility-First CSS

A aplicação utiliza TailwindCSS e Shadcn para os componentes de UI

## Caching

- **Frontend:** A execução dos pedidos por react query inclui uma cache para cada query key, o que faz com que novos pedidos para o mesmo endpoint num curto espaço de tempo
  reutilizem o valor em cache ao invés de executar um novo pedido
  - Invalidamentos de cache são executados quando um utilizador executa certos pedidos, por exemplo um pedido de agendamento para certo nutricionista faz com que a cache de agendamentos desse mesmo nutricionista seja invalidada.
- **Backend:** Utiliza rails cache para guardar resultados de pedidos de API
  - O pedido de filtragem de nutricionistas é guardado em cache durante um minuto para cada par de search+location_id

## Paginação client side

A página de pesquisa de nutricionistas inclui um elemento de paginação que é feito client side, assim serão vistos na página
no máximo 4 cartões de nutricionistas.

## Testes

### Testes funcionais de controllers

Foram criados testes funcionais para os controllers de nutricionistas e agendamentos, que validam o funcionamento da
aplicação, sendo os mais notáveis os seguintes casos:

#### 1. Nutricionistas

- A pesquisa por um valor na search deve devolver os nutricionistas que deem match na search juntamente com todos os seus serviços, e os nutricionistas que disponibilizem serviços que deem match, mas no caso dos segundos, apenas com os serviços que derem match e não todos.

#### 2. Agendamentos

- Pedido de agendamento não podem ser criados para horários em que o nutricionista requisitado já tenha aceitado um agendamento
- Os pedidos de agendamento à mesma hora para o mesmo nutricionista devem ser automaticamente rejeitados quando um destes é aceite
- Quando um cliente faz um segundo pedido de agendamento com o mesmo email quando um prévio ainda não foi respondido, este anterior deve ser eliminado

### Testes de UI

- Foram criados dois testes no frontend, um para cada página que validam que os cartões de nutricionistas e agendamentos são renderizados com a informação proveniente da API e que os dados são corretamente renderizados.
