# Desafio Lumi Backend

O objetivo será desenvolver um
código que seja capaz de:
* Extrair os dadosrelevantes dessasfaturas.
* Organizar esses dados de maneira estruturada em um banco de dados PostgreSQL.
* Apresentar esses dados em uma aplicação web, por meio de uma API.

### Detalhamento do desafio

Foi desenvolvido um extrator de dados para capturar os dados
das faturas, em arquivo pdf, de energia elétrica recebida atraves de um endpoint (/file) e extrair as informações
relevantes. Estas incluem:
* Numero do cliente
* Ano de referencia;
* Mês de referencia
* quantidade de kwh de Energia usada
* Valor da Energia usada
* quantidade de kwh de Energia SCEEE;
* Valor da Energia SCEEE
* quantidade de kwh de Energia Compensada
* Valor da Energia Compensada
* Valor da Iluminação Publica

Tendo as faturas arquivadas no proprio servidor e as informações persistida em banco de dados Postgres, atraves do ORM Prisma, em um servidor separado.

Foi desenvolvido também mais dois entpoint para:
* Listar as faturas por numero de cliente e ano de referencia (/invoice/:cliente/:ano)
* Download das faturas em pdf para maquina do usuario (/file/:cliente/:ano/:mes)

## Stacks e arquitetura usada

Para essa desafio foi usado:
* node 18
* nestjs 10
* prisma client 5
* postgres 16
* pdfreader 3
* jest 29
* faker-js 8
* typescript 5
 E como arquitetura foi suada arquitetura limpa ( clean arch ) em um sistema modular do propsio nestjs.

 ### Lista de entipoints
  * /file - Fornecer a fatura em pdf - POST - recebe arquivo pdf como body e sem retorno
  * /file/client/ano/mes - Baixa a fatura em pdf - GET - fornecer o numero do cliente, ano com 4 digidos e mes nome abreviado, exemplo "JAN"
  * /invoice/client/ano - Lista as informações das faturas contida no ano e cliente fornecido - GET - fornecer o numero do cliente, ano com 4 digidos - retorna um json com informações do cliente, ano e as faturas correspondente

  ### Produção
  O mesmo esta hospedado em servidor proprio nesta url [Backend](https://desafio-lumi-backend.onrender.com)

  ## Testes
  ```
  git clone https://github.com/cledson-leite/desafio-lumi-backend.git

  cd desafio-lumi-backend
  yarn ou npm i ou npm install
  yarn test ou npm rum test

  ```
  ## Execução local
  ```
  git clone https://github.com/cledson-leite/desafio-lumi-backend.git

  cd desafio-lumi-backend
  yarn ou npm i ou npm install
  yarn dev ou npm rum dev

  ```
  neste caso deve-se usar a url base http://localhost:3000
