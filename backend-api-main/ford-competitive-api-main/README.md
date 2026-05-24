# Ford Competitive Intelligence API

## Disciplina

Arquitetura Orientada a Serviços (SOA) e Web Services

---

# Equipe

- Djalma Moreira de Andrade Filho - RM 555530
- Felipe Paes de Barros Muller Carioba - RM 558447
- Lucas Rodrigues de Queiroz - RM 556323
- Matheus Gushi Morioka - RM 556935
- Victor Hugo de Paula - RM 554787

---

# Sobre o Projeto

A Ford Competitive Intelligence API é uma API REST desenvolvida para o projeto acadêmico FIAP + Ford Challenge.

O objetivo da plataforma é permitir que usuários pesquisem veículos automotivos e visualizem especificações técnicas de maneira organizada, segura e escalável.

Nesta primeira sprint, o foco foi o desenvolvimento de um MVP profissional contendo:

- autenticação JWT
- persistência em PostgreSQL
- busca de veículos
- histórico de pesquisas
- documentação Swagger
- arquitetura escalável
- preparação para futuras integrações com IA e busca inteligente

As funcionalidades de IA, scraping e Google Dorking ainda não foram implementadas nesta sprint, permanecendo apenas preparadas arquiteturalmente para futuras evoluções do projeto.

---

# Tecnologias Utilizadas

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Swagger / OpenAPI
- Maven

## Arquitetura

- REST API
- Arquitetura em camadas
- DTO Pattern
- Service Layer
- Repository Pattern
- Exception Handler Global
- JWT Security
- Modularização por domínio

---

# Estrutura do Projeto

```txt
src/main/java/com/fordchallenge/ford_competitive_api

├── auth
│   ├── controller
│   ├── dto
│   └── service
│
├── common
│   └── exception
│
├── config
│
├── searches
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── security
│
├── specifications
│   ├── controller
│   ├── dto
│   └── service
│
├── users
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
└── vehicles
    ├── controller
    ├── dto
    ├── entity
    ├── repository
    └── service
````

---

# Arquitetura da Aplicação

```txt
React Native App
        ↓
Spring Boot REST API
        ↓
JWT Authentication
        ↓
Controllers
        ↓
Services
        ↓
Repositories
        ↓
PostgreSQL Database
```

---

# Funcionalidades Implementadas

## Autenticação JWT

* Registro de usuários
* Login autenticado
* Geração de Bearer Token
* Rotas protegidas com Spring Security

---

## Busca de Veículos

Fluxo implementado:

1. Usuário pesquisa um veículo
2. API verifica se o veículo já existe no banco
3. Se existir:

    * retorna os dados persistidos
4. Se não existir:

    * cria dados mockados
    * salva no banco
    * registra histórico da busca

---

## Histórico de Pesquisas

A API registra:

* usuário
* veículo pesquisado
* termo da busca
* data da pesquisa

---

## Especificações Automotivas

A API retorna:

* potência
* torque
* combustível
* câmbio
* consumo
* fonte dos dados

---

# Banco de Dados

## Tabelas

### users

| Campo      | Tipo      |
| ---------- | --------- |
| id         | Long      |
| nome       | String    |
| email      | String    |
| senha_hash | String    |
| role       | Enum      |
| created_at | Timestamp |

---

### vehicles

| Campo      | Tipo      |
| ---------- | --------- |
| id         | Long      |
| marca      | String    |
| modelo     | String    |
| ano        | Integer   |
| versao     | String    |
| created_at | Timestamp |

---

### vehicle_specs

| Campo       | Tipo      |
| ----------- | --------- |
| id          | Long      |
| vehicle_id  | Long      |
| potencia    | String    |
| torque      | String    |
| combustivel | String    |
| cambio      | String    |
| consumo     | String    |
| fonte_url   | String    |
| created_at  | Timestamp |

---

### search_history

| Campo       | Tipo      |
| ----------- | --------- |
| id          | Long      |
| user_id     | Long      |
| vehicle_id  | Long      |
| termo_busca | String    |
| created_at  | Timestamp |

---

# Como Rodar o Projeto

## Pré-requisitos

Instalar:

* Java JDK 21
* IntelliJ IDEA
* PostgreSQL
* Git

---

## Clonar o Repositório

```bash
git clone LINK_DO_REPOSITORIO
```

---

## Criar Database

No PostgreSQL, criar:

```sql
CREATE DATABASE ford_challenge;
```

---

## Configurar application.properties

Arquivo:

```txt
src/main/resources/application.properties
```

Configuração:

```properties
spring.application.name=ford-competitive-api

# DATABASE
spring.datasource.url=jdbc:postgresql://localhost:5432/ford_challenge
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA

# JPA / HIBERNATE
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# SERVER
server.port=8080
server.address=0.0.0.0
```

---

## Rodar a Aplicação

Executar:

```txt
FordCompetitiveApiApplication.java
```

Se aparecer:

```txt
Started FordCompetitiveApiApplication
```

A API estará funcionando.

---

# Swagger

Documentação disponível em:

```txt
http://localhost:8080/swagger-ui/index.html
```

---

# Autenticação JWT

## Login

### Endpoint

```http
POST /auth/login
```

### Body

```json
{
  "email": "victor@test.com",
  "senha": "123456"
}
```

### Resposta

```json
{
  "accessToken": "TOKEN_JWT",
  "tokenType": "Bearer"
}
```

---

# Como Consumir Endpoints Protegidos

Enviar header:

```http
Authorization: Bearer TOKEN_JWT
```

---

# Endpoints Disponíveis

## Auth

### Registrar usuário

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

---

## Vehicles

### Listar veículos

```http
GET /vehicles
```

### Buscar veículo por ID

```http
GET /vehicles/{id}
```

### Pesquisar veículo

```http
POST /vehicles/search
```

---

## Specifications

### Buscar especificações

```http
GET /specifications/{vehicleId}
```

---

## Search History

### Histórico de pesquisas

```http
GET /searches/history
```

---

# Integração com React Native

A API foi desenvolvida para futura integração com React Native Expo.

Fluxo esperado:

1. Mobile realiza login
2. API retorna JWT
3. Mobile salva token
4. Mobile envia Bearer Token nas próximas requisições

Exemplo:

```js
headers: {
  Authorization: `Bearer ${token}`
}
```

---

# Coerência com Testing, Compliance & QA

A API atual representa a base funcional do projeto Ford Intelligence Scout descrito na documentação da disciplina de Testing, Compliance & QA.

Nesta Sprint 1 foram implementados:

* API REST funcional
* autenticação JWT
* persistência em PostgreSQL
* histórico de buscas
* respostas JSON padronizadas
* estrutura preparada para integração mobile
* arquitetura escalável para futuras integrações

As funcionalidades de:

* Google Dorking
* Azure OpenAI
* Web Scraping em tempo real
* Cloud Monitoring
* IA para padronização automática

ainda permanecem planejadas para futuras sprints, sendo atualmente representadas por dados mockados e arquitetura preparada para expansão futura.

---

# Preparação para Futuras Sprints

A arquitetura foi preparada para futuras implementações:

* Inteligência Artificial
* Busca Inteligente
* Google Dorking
* Integração com APIs externas
* Cache
* Logs avançados
* Microserviços
* Deploy Cloud
* Docker
* Machine Learning

---

# Licença

Projeto acadêmico sem fins comerciais.

