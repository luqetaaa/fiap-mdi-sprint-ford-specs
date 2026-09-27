# Ford Specs Intelligence — Sprint 3

Projeto acadêmico FIAP × Ford para consultar especificações, selecionar atributos e comparar versões de veículos.

## Entrega final

<!-- Preencher após concluir o docs/CHECKLIST_ENTREGA.md e apagar este comentário. -->

| Item | Link |
|---|---|
| APK Android (v1.3.0) | [Baixar APK](COLE-AQUI-O-LINK-DO-APK) |
| API publicada | https://COLE-AQUI-A-URL.onrender.com ([Swagger](https://COLE-AQUI-A-URL.onrender.com/swagger-ui/index.html)) |
| Vídeo de demonstração | [Assistir](COLE-AQUI-O-LINK-DO-VIDEO) |
| Evidência de instalação | Testado em APARELHO, Android VERSÃO, em DATA: XX de 19 fluxos aprovados ([detalhes](docs/CHECKLIST_ENTREGA.md#evidência-de-instalação)) |

Para instalar: baixe o `.apk` em um celular Android, abra o arquivo e permita a instalação desta origem. Não é necessário Expo Go. Na primeira abertura, crie uma conta em **Criar uma conta**.

> A API está hospedada em plano gratuito e desliga quando fica sem uso. Se o primeiro acesso demorar, aguarde até 1 minuto: o app avisa e o servidor volta sozinho.

## Funcionalidades

- Cadastro, login, restauração de sessão e logout.
- Catálogo de 25 versões servido pela API.
- Pesquisa por marca, modelo, versão e ano; seleção dos atributos desejados.
- Ficha técnica com cobertura, origem dos dados e compartilhamento.
- Histórico individual, reabertura de ficha e exclusão.
- Cache do histórico por usuário para consulta quando o serviço não responder.
- Comparação de duas versões usando o mesmo catálogo.
- Tema, componentes, ícone e splash padronizados.

## Segurança e decisões técnicas

Autenticação por JWT, com o token guardado no SecureStore do Android. Pesquisa, resultado e histórico usam um contrato comum entre app e API. Cada histórico pertence ao usuário autenticado. O comparador usa o mesmo catálogo da API.

Veículos desconhecidos retornam 404: a API não cria especificações genéricas. O cadastro não expõe hashes de senha e tokens inválidos/expirados retornam 401. Credenciais de banco e segredo JWT são externos ao código de produção.

## Dados e escopo

As 25 versões foram copiadas da base demonstrativa do projeto original, **sem verificação externa das especificações**. Essa condição aparece no app. O antigo percentual de “confiança” foi removido.

Não há scraping, pesquisa em sites ou IA generativa implementados. Se o enunciado completo do desafio Ford exigir esses recursos, eles continuam pendentes. A imagem da Sprint 3 fornecida trata de finalização, identidade visual, documentação e APK.

## Equipe

| Integrante | RM |
|---|---|
| Lucas Rodrigues de Queiroz | 556323 |
| Victor Hugo de Paula | 554787 |
| Felipe Paes de Barros Muller Carioba | 558447 |
| Djalma Moreira de Andrade Filho | 555530 |
| Matheus Gushi Morioka | 556935 |

## Arquitetura

| Camada | Tecnologias |
|---|---|
| App | React Native 0.86.3, Expo SDK 57, React 19.2, JavaScript, React Navigation 7 |
| Comunicação | Axios e JWT |
| Persistência no dispositivo | SecureStore para token nativo; AsyncStorage para cache e versão web |
| API | Java 21, Spring Boot 3.5, Security, JPA |
| Banco principal | PostgreSQL |
| Demonstração/testes | H2 em memória, em perfil separado |

A versão 1.3.0 adiciona a publicação da API em contêiner e o despertar automático do servidor ao abrir o app. A revisão 1.2.0 atualizou o Expo e suas dependências compatíveis. As versões exatas estão em `frontend/package-lock.json`. Para atualizar uma instalação existente, consulte [ATUALIZAR_FRONTEND.md](docs/ATUALIZAR_FRONTEND.md).

- `frontend/` — aplicativo Expo.
- `backend/` — API, catálogo inicial e testes.
- `docs/telas/` — capturas reais da versão web em largura de celular.
- `docs/GERAR_APK.md` — geração e instalação Android.
- `docs/ROTEIRO_VIDEO.md` — demonstração de todas as telas.
- `docs/REQUISITOS_SPRINT3.md` — situação da entrega.
- `docs/PUBLICAR_API.md` — publicação da API e do banco no Render.
- `docs/CHECKLIST_ENTREGA.md` — etapas finais, testes no Android e evidências.
- `render.yaml` e `backend/Dockerfile` — infraestrutura da API na nuvem.

## Rodar primeiro no computador

Pré-requisitos: JDK 21, Node.js 24 LTS (validado com 24.19.0), Git para o fluxo EAS, internet para dependências e dois terminais. O wrapper Maven está incluído.

### API de demonstração

No PowerShell, a partir da raiz extraída:

```powershell
cd backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=demo"
```

No Linux/macOS, use `bash mvnw spring-boot:run -Dspring-boot.run.profiles=demo`.

A API abre em `http://localhost:8080`. O perfil `demo` usa H2 e carrega o catálogo. **Contas e históricos são apagados ao encerrar o servidor.** Use esse perfil para conferência local, não como backend definitivo.

### Aplicativo

Em outro terminal, a partir da raiz:

```powershell
cd frontend
npm.cmd ci
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npx.cmd expo start --web --clear --port 8081
```

No Linux/macOS, use `npm`/`npx` sem `.cmd` e crie `.env` com `cp .env.example .env` apenas se ele ainda não existir. O app abre em `http://localhost:8081`.

Na primeira execução, clique em **Criar uma conta**. Não há uma conta ou senha obrigatória de teste.

### Fluxo de conferência

1. Cadastre-se e entre.
2. Abra **Consultar Ranger Raptor**.
3. Selecione os campos em **Personalizar atributos**.
4. Gere a ficha; confira veículo, atributos e origem.
5. Compartilhe no Android ou copie a ficha no navegador compatível.
6. Reabra pelo **Histórico**.
7. Compare duas versões diferentes.
8. Confira **Sobre** e saia da conta.

## PostgreSQL: persistir usuários e históricos

Na primeira configuração, crie o banco. Se ele já existir e estiver funcionando, reutilize-o:

```sql
CREATE DATABASE ford_specs_sprint3;
```

Na pasta `backend`, no PowerShell:

```powershell
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ford_specs_sprint3"
$env:DATABASE_USER="postgres"
$senhaBanco=Read-Host "Senha do PostgreSQL" -AsSecureString
```

Digite a senha quando solicitado. Depois execute, no mesmo terminal:

```powershell
$env:DATABASE_PASSWORD=[System.Net.NetworkCredential]::new("",$senhaBanco).Password
$env:JWT_SECRET=([guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N"))
.\mvnw.cmd spring-boot:run
```

As variáveis desse exemplo valem para o terminal atual; configure-as novamente ao abrir outro terminal. Guarde o segredo JWT para reutilizá-lo; trocá-lo invalida as sessões existentes. Em uma hospedagem, configure essas variáveis no servidor.

`SEED_DEMO_CATALOG=false` desativa a inclusão do catálogo inicial, sem apagar dados. O inicializador preserva veículos já cadastrados. Registros antigos com fonte fictícia `mock-api.ford-challenge.com` são ocultados das consultas, sem remoção do banco.

Faça backup antes de atualizar um banco antigo. O histórico recebeu os atributos selecionados e a data passou a usar Instant. Para publicação além da entrega acadêmica, use migrações versionadas em lugar de `ddl-auto=update`.

## Publicar a API na internet

O APK precisa de uma API acessível pelo celular, com HTTPS. O arquivo `render.yaml` cria a API e o PostgreSQL no Render em poucos cliques, sem digitar credenciais. Passo a passo e limites do plano gratuito em [docs/PUBLICAR_API.md](docs/PUBLICAR_API.md).

Além de `DATABASE_URL`, a API aceita `DB_HOST`, `DB_PORT` e `DB_NAME` separados, formato usado pelas plataformas de nuvem.

## Endpoints

Swagger: `http://localhost:8080/swagger-ui/index.html`.

| Método | Caminho | Autenticação | Uso |
|---|---|---|---|
| GET | /health | Não | Disponibilidade |
| POST | /auth/register | Não | Cadastro |
| POST | /auth/login | Não | Token e perfil |
| GET | /auth/me | Sim | Perfil atual |
| GET | /vehicles | Sim | Catálogo |
| GET | /vehicles/{id} | Sim | Veículo |
| POST | /vehicles/search | Sim | Pesquisa e registro |
| GET | /specifications/{vehicleId} | Sim | Atributos |
| GET | /searches/history | Sim | Últimas 100 pesquisas da própria conta |
| DELETE | /searches/history | Sim | Limpar pesquisas da própria conta |

Rotas protegidas usam `Authorization: Bearer TOKEN`.

```json
{
  "marca": "Ford",
  "modelo": "Ranger",
  "ano": 2025,
  "versao": "Raptor 3.0 V6 EcoBoost",
  "selectedFields": ["motor", "potencia", "torque", "transmissao"]
}
```

Pesquisa e histórico retornam `id`, `createdAt`, `vehicle` e `selectedFields`. As especificações ficam em `vehicle.specs`. Erros esperados retornam status 400, 401, 404 ou 409 e uma mensagem adequada.

## Testes e build

```powershell
# Em backend
.\mvnw.cmd test
.\mvnw.cmd package

# Em frontend, depois de configurar .env
npx.cmd expo install --check
npx.cmd expo-doctor
npm.cmd audit
npx.cmd expo export --platform android --clear
npx.cmd expo export --platform web --clear
```

**Exportar JavaScript não gera APK.** A compilação instalável está documentada em [GERAR_APK.md](docs/GERAR_APK.md).

Com API demo em localhost:8080 e app web em localhost:8081, execute o teste de navegação:

```powershell
# Em frontend
npm.cmd install --no-save --package-lock=false playwright
npx.cmd playwright install chromium
node tests/flow.cjs
```

O teste cria uma conta no backend utilizado. Execute em banco de teste ou no perfil demo.

## Telas

<!-- Após os testes, salvar os prints do celular em docs/telas-android/ com os mesmos nomes e trocar os links abaixo. -->

Capturas web em 390 × 920. As capturas do APK em execução ficam em `docs/telas-android/`.

| Tela | Captura |
|---|---|
| Login | [01-login.png](docs/telas/01-login.png) |
| Cadastro | [02-cadastro.png](docs/telas/02-cadastro.png) |
| Início | [03-inicio.png](docs/telas/03-inicio.png) |
| Pesquisa | [04-pesquisa.png](docs/telas/04-pesquisa.png) |
| Ficha | [05-ficha-tecnica.png](docs/telas/05-ficha-tecnica.png) |
| Histórico | [06-historico.png](docs/telas/06-historico.png) |
| Comparação | [07-comparacao.png](docs/telas/07-comparacao.png) |
| Sobre | [08-sobre.png](docs/telas/08-sobre.png) |

O roteiro de conclusão da entrega (API, APK, testes, vídeo) está em [docs/CHECKLIST_ENTREGA.md](docs/CHECKLIST_ENTREGA.md).

Projeto acadêmico desenvolvido no contexto do desafio FIAP × Ford; não é apresentado como aplicativo oficial do fabricante.
