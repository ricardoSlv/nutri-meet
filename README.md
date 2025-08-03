# README

# Como arrancar a aplicacao

Frontend
yarn #instalar
yarn dev

Backend
docker compose up -d postgres
rails db:create db:migrate db:seed
rails server

# Casos de teste contidos nas seeds

A nutricionista Maria Oliveira tem 3 agendamentos para as 2025-08-01 11:00:00 por:

- gabriel.lima@gmail.com
- rafael.costa@gmail.com
- patricia.silva@gmail.com

- Qualquer novo pedido de reagendamento por uma destas pessoas vai apagar o seu agendamento atual.
- A aceitacao de um destes agendamentos automaticamente rejeita automaticamente os outros dois

A nutricionista Ana Costa nao tem nenhum servico associado, mesmo assim e devolvida no endpoint de pesquisa, apesar de nunca ser visivel
na pagina de pesquisa de nutricionistas, ja que as cards retratam uma associassao de nutricionista a um servico, e visivel na pagina dos pedidos pendentes.

Uma pesquisa por "Pe" ou "pe" retorna todos os servicos do nutricionista Pedro Santos,
mas apenas os servicos "Perda de peso" e "Gestao de Peso" do nutricionista Joao da Silva,
ja que o nome deste nao faz match com a pesquisa, apenas alguns servicos deste, os restantes servicos sao omitidos.

# Funcionalidades da aplicacao

i18n
caching client side react query, server side rails low level cache (rails por default ja faz cache das queries sql dentro da mesma action)
paginacao client side (pending)
testes (pending)

# Problema detetado

Primeiro pedido falha, a partir funciona tudo normalmente

O endpoint /nutricionist talvez devesse ter outro nome, ja que a pesquisa e feita por caracteristicas nao so do nutricionista
mas tambem por caracteristicas dos servicos e localizacoes dos servicos destes.

Orientar o resultado mais as necessidades da pagina, em vez de ter os servicos agrupados por nutricionista e ter de descortinar no frontend

Datas de agendamentos nao sao validados,e possivel marcar para o passado.

Nomes dos Servicos nao estao traduzidos, era necessario uma abordagem mais modular sobre os servicos disponiveis ou
uma solucao de i18n no backend

Modelacao de dados: Talvez fosse mais simples separar a o dia e a hora no agendamento, ja que sao sempre usados separadamente e evita a complexidade de fusos
horarios e horarios de verao
