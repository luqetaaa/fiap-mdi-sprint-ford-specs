# Ford Specs Intelligence + Ford Competitive Intelligence API

Aplicação fullstack desenvolvida para a Sprint Mobile Development and IoT + SOA & Web Services — Ford x FIAP.

---

# Sobre o Projeto

O Ford Specs Intelligence responde ao desafio de Inteligência Competitiva Automotiva proposto pela Ford.

A solução automatiza a pesquisa e padronização de especificações técnicas automotivas através de:

- aplicação mobile React Native
- API REST Spring Boot
- autenticação JWT
- persistência em PostgreSQL
- arquitetura preparada para IA e integração futura

A proposta reduz o trabalho manual de análise competitiva em sites, PDFs e portais automotivos, retornando uma ficha técnica padronizada e comparável.

---

# Objetivo da Solução

O sistema permite que usuários:

- pesquisem veículos Ford
- selecionem atributos técnicos específicos
- gerem fichas técnicas padronizadas
- comparem informações automotivas
- armazenem histórico de pesquisas
- compartilhem resultados

Tudo integrado a uma API REST segura com JWT.

---

# Integrantes do Grupo

| Nome | RM |
|---|---|
| Lucas Rodrigues de Queiroz | RM556323 |
| Victor Hugo de Paula | RM554787 |
| Felipe Paes de Barros Muller Carioba | RM558447 |
| Djalma Moreira de Andrade Filho | RM555530 |
| Matheus Gushi Morioka | RM556935 |

---

# Tecnologias Utilizadas

## Frontend

- React Native
- Expo
- React Navigation
- Axios
- AsyncStorage
- Expo Linear Gradient
- Expo Vector Icons
- JavaScript

---

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- PostgreSQL
- Swagger/OpenAPI
- Maven

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

# Estrutura do Projeto

```txt
fiap-mdi-sprint-ford-specs
│
├── backend
│
├── frontend
│
└── README.md
```

---

# Estrutura Frontend

```txt
src/
  components/
  data/
  hooks/
  navigation/
  screens/
  services/
  storage/
  theme/
  utils/
```

---

# Estrutura Backend

```txt
src/main/java/com/fordchallenge/ford_competitive_api

├── auth
├── common
├── config
├── searches
├── security
├── specifications
├── users
└── vehicles
```

---

# Funcionalidades Implementadas

## Frontend

- Login e cadastro
- Integração com API REST
- Pesquisa de veículos Ford
- Seleção de atributos técnicos
- Geração de ficha técnica
- Compartilhamento de resultado
- Histórico persistente
- Comparador técnico
- Loading e feedback visual

---

## Backend

- API REST Spring Boot
- Autenticação JWT
- Persistência PostgreSQL
- Histórico de pesquisas
- Busca de veículos
- Especificações técnicas
- Swagger/OpenAPI
- Arquitetura em camadas
- DTO Pattern
- Repository Pattern

---

# Banco de Dados

## Tabelas

### users
- usuários autenticados

### vehicles
- veículos cadastrados

### vehicle_specs
- especificações técnicas

### search_history
- histórico de pesquisas

---

# Como Rodar o Projeto

# Pré-requisitos

Instalar:

- Java JDK 21
- IntelliJ IDEA
- PostgreSQL
- Node.js LTS
- Git
- Expo Go
- VS Code

---

# 1. Clonar Repositório

```bash
git clone LINK_DO_REPOSITORIO
```

---

# 2. Criar Banco PostgreSQL

Abrir pgAdmin 4.

Criar database:

```sql
CREATE DATABASE ford_challenge;
```

---

# 3. Rodar Backend

Abrir pasta:

```txt
backend
```

no IntelliJ IDEA.

---

## Configurar application.properties

Arquivo:

```txt
src/main/resources/application.properties
```

Configuração:

```properties
spring.application.name=ford-competitive-api

spring.datasource.url=jdbc:postgresql://localhost:5432/ford_challenge
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080
server.address=0.0.0.0
```

---

## Rodar aplicação

Executar:

```txt
FordCompetitiveApiApplication.java
```

Se aparecer:

```txt
Started FordCompetitiveApiApplication
```

a API estará funcionando.

---

# 4. Swagger/OpenAPI

Abrir:

```txt
http://localhost:8080/swagger-ui/index.html
```

Endpoints disponíveis:

- POST /auth/login
- POST /auth/register
- GET /vehicles
- POST /vehicles/search
- GET /specifications/{vehicleId}
- GET /searches/history

---

# 5. Rodar Frontend

Abrir pasta:

```txt
frontend
```

no VS Code.

---

## Instalar dependências

```bash
npm install
```

---

## Rodar Expo

```bash
npx expo start --clear
```

---

## Abrir aplicação

No terminal:

```txt
Pressione W
```

para abrir no navegador.

Ou utilize Expo Go no celular.

---

# Configuração da API no Mobile

Arquivo:

```txt
src/services/apiClient.js
```

## Navegador/Web

```javascript
export const API_BASE_URL = 'http://localhost:8080';
```

## Celular

Utilizar IP do computador:

```javascript
export const API_BASE_URL = 'http://192.168.X.X:8080';
```

PC e celular devem estar na mesma rede Wi-Fi.

---

# Login de Teste

```txt
E-mail: victor@test.com
Senha: 123456
```

---

# Fluxo Principal da Aplicação

1. Usuário realiza login
2. API retorna JWT
3. App salva token com AsyncStorage
4. Usuário seleciona:
   - modelo
   - ano
   - versão
   - atributos técnicos
5. API retorna ficha técnica padronizada
6. Resultado pode ser compartilhado
7. Histórico é salvo localmente

---

# Autenticação JWT

## Login

Endpoint:

```http
POST /auth/login
```

Body:

```json
{
  "email": "victor@test.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "accessToken": "TOKEN_JWT",
  "tokenType": "Bearer"
}
```

---

# Consumo de Rotas Protegidas

Header:

```http
Authorization: Bearer TOKEN_JWT
```

---

# Funcionalidades Futuras

A arquitetura foi preparada para futuras integrações:

- IA Generativa
- Google Dorking
- Web Scraping
- APIs automotivas reais
- Exportação PDF
- Machine Learning
- Docker
- Deploy Cloud
- Cache
- Logs avançados
- Microserviços

---

# Observação Acadêmica

Este projeto foi desenvolvido para fins acadêmicos na FIAP em parceria com a Ford.

As funcionalidades de IA e scraping permanecem preparadas arquiteturalmente para futuras sprints.

---

# Demonstração Visual

Adicionar prints do projeto:

| Tela | Print |
|---|---|
| Login | assets/screenshots/login.png |
| Pesquisa | assets/screenshots/search.png |
| Resultado | assets/screenshots/result.png |
| Histórico | assets/screenshots/history.png |

Adicionar GIF/vídeo:

```txt
assets/demo/fluxo-principal.gif
```

---

# Licença

Projeto acadêmico sem fins comerciais.

# Prints do App

# Login

<img width="3836" height="1904" alt="image" src="https://github.com/user-attachments/assets/1b533e19-87ad-4dbc-bb2a-f6001d7ae4ed" />

# Início

<img width="1717" height="910" alt="image" src="https://github.com/user-attachments/assets/3f09ef73-ee65-4783-b8d9-12721ee3b81b" />

# Pesquisa

<img width="1719" height="909" alt="image" src="https://github.com/user-attachments/assets/af9bd636-d3b6-4cb0-b0c0-5fc0e1bfd21b" />

# Ficha Técnica

<img width="1718" height="910" alt="image" src="https://github.com/user-attachments/assets/a758dc0c-ba52-46e3-b441-2f7eebd63d11" />

# Histórico

<img width="1719" height="908" alt="image" src="https://github.com/user-attachments/assets/24edcb34-36d8-4c8f-8fcd-333d722ffcea" />


# Comparar

<img width="1718" height="910" alt="image" src="https://github.com/user-attachments/assets/62ea6171-144b-41e9-8913-bfac58683ed5" />


# Sobre

<img width="1718" height="911" alt="image" src="https://github.com/user-attachments/assets/efefadfb-0f40-40f3-addc-086b5cf96ecd" />
