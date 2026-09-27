# Atualizar para a revisão 1.2.0

Esta revisão atualiza o frontend do Expo SDK 51 para o SDK 57, com React Native 0.86.3, React 19.2 e React Navigation 7. Inclui o ajuste do botão **Nova pesquisa**, a configuração atual de splash e o lockfile revisado.

## Aplicar no Windows

1. No terminal do aplicativo Expo, pressione `Ctrl+C`. Se aparecer a pergunta para finalizar o arquivo em lotes, digite `S` e pressione Enter.
2. Extraia o ZIP novo em uma pasta temporária. Abra a pasta extraída que contém `frontend`, `backend`, `docs` e `README.md`.
3. Copie somente a pasta `frontend` nova para a pasta do projeto que já contém `frontend` e `backend`. Aceite a substituição dos arquivos de mesmo nome, mesclando as pastas. Não apague a pasta antiga: o ZIP não inclui `.env`, e a mesclagem preserva sua configuração local. Depois, copie também `docs` e `README.md` para atualizar a documentação.
4. Abra o terminal na pasta `frontend` do seu projeto existente e execute:

```powershell
node --version
npm.cmd ci
```

Use Node.js 24 LTS; a versão 24.19.0 foi validada. `npm.cmd ci` reinstala as dependências exatamente como registradas no lockfile. O comando substitui `node_modules` automaticamente.

5. Com a API funcionando na porta 8080 e o `.env` existente apontando para ela, inicie:

```powershell
npx.cmd expo start --web --clear --port 8081
```

6. Abra `http://localhost:8081`. Faça login, gere uma ficha, confira **Nova pesquisa**, **Histórico** e **Comparar**. Em **Sobre**, a versão exibida deve ser **1.2.0**.

Essa atualização do frontend não executa comandos no PostgreSQL. Reutilize o banco `ford_specs_sprint3` e o backend que já estavam funcionando.

## Dependências e validação

O `package-lock.json` foi gerado com as versões compatíveis do SDK 57. A auditoria registrada em 27/09/2026 apresentou zero vulnerabilidades conhecidas na árvore instalada; esse resultado pode mudar com novos avisos publicados. Não é uma certificação de segurança de todo o aplicativo.

Foi aplicado um override apenas em `xcode > uuid`, para `uuid@11.1.1`, corrigindo o aviso `GHSA-w5hq-g745-h8pq` remanescente. O pacote `xcode` utiliza a API CommonJS `v4`, preservada nessa versão. A geração dos projetos Android e iOS foi concluída em uma cópia de teste; remova o override quando a dependência de origem incorporar a correção.

Consulte [VALIDACAO.md](VALIDACAO.md) para os testes executados e as etapas Android ainda pendentes. A exportação de bundles e o prebuild não geram um APK instalável.
