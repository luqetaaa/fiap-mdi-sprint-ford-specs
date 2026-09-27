# Verificação da revisão 1.2.0 — 27/09/2026

## Confirmado

| Verificação | Resultado |
|---|---|
| Instalação limpa com Node.js 24.19.0 | `npm ci` concluído, incluindo scripts de instalação |
| Auditoria das dependências do frontend | Zero vulnerabilidades conhecidas reportadas pelo `npm audit` nesta data |
| Compatibilidade e configuração Expo | Expo Doctor: 21 de 21 verificações aprovadas |
| Versões dos módulos Expo | Alinhadas ao SDK 57; `expo install --check` também aprovado no modo offline |
| Exportação de bundles web, Android e iOS | Concluída com Expo 57.0.25 e React Native 0.86.3 |
| Geração dos projetos nativos (prebuild) | Android e iOS gerados em cópia isolada, sem compilação Gradle/Xcode |
| Compilação e empacotamento da API com Java 21 | Concluídos; JAR iniciado no teste de navegação |
| Testes de integração da API | 7 aprovados na revisão de 25/09; código da API preservado nesta atualização |
| Navegação em navegador, viewport 390 × 920 | Fluxo repetido no SDK 57 com a API Spring Boot real, em H2; sem erros de página |
| Capturas de login, cadastro, início, pesquisa, ficha, histórico, comparação e Sobre | Incluídas em telas/ |
| PostgreSQL local no computador do usuário | Persistência de conta e histórico após reiniciar a API confirmada manualmente pelo usuário em 26/09 |

## Cenários da API

Cadastro e perfil autenticado; validação e duplicidade de conta; pesquisa preservando atributos; veículo desconhecido sem criação de dados; histórico privado e exclusão pelo titular; tokens inválidos/expirados retornando 401; catálogo e CORS.

## Cenários do aplicativo web

Cadastro, login, escolha de atributos, bloqueio de seleção vazia, geração da ficha, histórico, reabertura, botão **Nova pesquisa**, comparação, troca de versão, fechamento do seletor, restauração da sessão, logout, erro de credenciais e limpeza do histórico.

Os testes web utilizam respostas reais da API de demonstração. O executor faz o encaminhamento local das requisições quando precisa usar portas isoladas. Não foram inventadas respostas da API para produzir as capturas.

## Migração das dependências

O Expo foi atualizado de SDK 51 para 57, com os módulos nativos alinhados às versões fornecidas pelo pacote Expo. A navegação foi atualizada para React Navigation 7; **Nova pesquisa** usa `popTo` para retornar à tela principal existente. A barra inferior recebeu espaço para ícones, rótulos e área segura. O splash usa o plugin atual, e a configuração dinâmica preserva os campos do `app.json`.

Um override restrito a `xcode > uuid@11.1.1` elimina o aviso transitivo remanescente e preserva a API `v4` usada por `xcode`. O prebuild iOS foi concluído com essa resolução. A auditoria cobre a árvore npm consultada nesta data, não o código Java nem todos os riscos do aplicativo.

No prebuild de teste foi definido um identificador iOS apenas na cópia temporária. Essa configuração, os projetos nativos gerados e as dependências instaladas não fazem parte do ZIP. Nenhum projeto EAS ou certificado foi criado.

## Revisão 1.3.0

Adicionados `backend/Dockerfile`, `backend/.dockerignore` e `render.yaml`; a URL do banco passou a aceitar `DB_HOST`, `DB_PORT` e `DB_NAME` separados, mantendo `DATABASE_URL` com prioridade. O app chama `/health` ao abrir para acordar a API do plano gratuito, e a mensagem de tempo esgotado passou a explicar essa espera. A sintaxe dos arquivos JavaScript alterados foi verificada. **O build Docker e o deploy no Render não foram executados neste ambiente**: devem ser confirmados no primeiro deploy.

## Ainda não verificado

- Compilação nativa e assinatura do APK no EAS.
- Instalação e execução em Android físico ou emulador.
- Compartilhamento nativo, teclado, áreas seguras e armazenamento SecureStore no dispositivo.
- Backend publicado na internet, PostgreSQL hospedado e acesso pela rede do Android.
- Recuperação offline no dispositivo.
- Exatidão das especificações automotivas da base demonstrativa.

A exportação de bundles e o prebuild não comprovam a compilação nativa. As capturas web não comprovam instalação do APK. O teste automatizado usou H2; a confirmação de PostgreSQL é a execução manual relatada pelo usuário.

Os arquivos `resultado-api.json`, `resultado-web.json` e `resultado-dependencias.json` registram os resultados resumidos. Os testes permanecem no código para execução pela equipe.
