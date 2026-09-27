# Publicar a API na internet (Render)

O APK precisa de uma API que o celular alcance de qualquer rede, com HTTPS. Este guia usa o **Render**, que tem plano gratuito sem cartão de crédito e cria a API e o PostgreSQL a partir do arquivo `render.yaml` da raiz do projeto.

Tempo estimado: 20 a 30 minutos, contando o primeiro build.

## Antes de começar: limites do plano gratuito

| Limite | Efeito no projeto | O que fazer |
|---|---|---|
| A API desliga após 15 minutos sem uso | A primeira requisição depois disso leva cerca de 1 minuto | O app já "acorda" a API ao abrir. Antes de apresentar, abra `/health` no navegador e espere responder |
| O PostgreSQL gratuito expira 30 dias após ser criado (depois há 14 dias de carência até a exclusão) | Contas e históricos somem após esse prazo | Crie o banco perto da data de entrega e confirme o período de avaliação da disciplina. O catálogo de veículos é recriado automaticamente |
| 512 MB de memória | Spring Boot cabe, mas no limite | O `Dockerfile` já ajusta a memória da JVM |

## 1. Subir o projeto no GitHub

O Render lê o código de um repositório Git. A pasta `Ford-Specs-Sprint3` (onde estão `README.md`, `render.yaml`, `backend/` e `frontend/`) deve ser a **raiz** do repositório.

```powershell
cd Ford-Specs-Sprint3
git init
git add .
git commit -m "Sprint 3 - versão final"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ford-specs-sprint3.git
git push -u origin main
```

Se a equipe já tem um repositório, basta enviar os arquivos novos (`render.yaml`, `backend/Dockerfile`, `backend/.dockerignore`) e as alterações.

Confira no GitHub que **nenhum** arquivo `.env`, senha ou chave `.jks`/`.keystore` foi enviado. O `.gitignore` já bloqueia esses arquivos.

## 2. Criar a API e o banco pelo Blueprint

1. Acesse https://dashboard.render.com e entre com a conta do GitHub.
2. Clique em **New > Blueprint**.
3. Autorize o acesso ao repositório e selecione-o.
4. O Render mostra o que o `render.yaml` vai criar: o banco `ford-specs-db` e o serviço `ford-specs-api`. Clique em **Apply** (ou **Deploy Blueprint**).
5. Aguarde. O primeiro build baixa as dependências Maven e leva de 5 a 10 minutos. Acompanhe em **ford-specs-api > Logs**.

O Blueprint conecta o banco automaticamente (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`) e gera um `JWT_SECRET` aleatório. Ninguém precisa digitar senhas.

## 3. Conferir se funcionou

Na página do serviço aparece a URL pública, no formato `https://ford-specs-api-XXXX.onrender.com`. Teste no navegador **do celular**:

- `https://SUA-URL/health` deve responder `{"status":"UP"}`.
- `https://SUA-URL/swagger-ui/index.html` deve abrir a documentação.

Guarde essa URL. Ela vai para o build do APK (próximo guia) e para o README.

## 4. Gerar o APK apontando para essa URL

Siga [GERAR_APK.md](GERAR_APK.md) usando o perfil **`preview`** (HTTPS):

```powershell
npx.cmd eas-cli@latest env:create --environment preview --name EXPO_PUBLIC_API_URL --value "https://SUA-URL" --visibility plaintext
npx.cmd eas-cli@latest build -p android --profile preview
```

Sem barra `/` no final da URL.

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Build falha em `mvn package` | Erro de compilação ou falta de memória no build | Leia o final do log. Rode `.\mvnw.cmd package` localmente para ver o mesmo erro |
| Log mostra `Connection refused` ou erro de PostgreSQL | Banco ainda iniciando ou em região diferente | Aguarde o banco ficar **Available** e clique em **Manual Deploy > Deploy latest commit** |
| Log mostra `JWT_SECRET deve ter pelo menos 32 bytes` | Variável apagada ou editada | Em **Environment**, gere um valor novo com pelo menos 32 caracteres |
| App mostra "O serviço está iniciando" | API estava dormindo | Aguarde cerca de 1 minuto e tente de novo |
| App mostra "Sem conexão com o serviço" | URL errada no build | Confira `EXPO_PUBLIC_API_URL` no EAS; mudar a variável exige **gerar outro APK** |
| Contas sumiram | Banco gratuito expirou ou foi recriado | Crie outro banco; o catálogo volta sozinho |

## Alternativa sem nuvem: API no notebook pela rede Wi-Fi

Serve para a apresentação ao vivo, mas o APK só funciona enquanto o notebook estiver ligado, com a API rodando e na mesma rede do celular. Use o perfil `preview-local`, descrito em [GERAR_APK.md](GERAR_APK.md#build-de-teste-por-wi-fihttp). Não é o ideal para o professor testar depois por conta própria.

## Outras plataformas

O `backend/Dockerfile` funciona em qualquer serviço que rode contêineres (Railway, Fly.io, Koyeb etc.). Nelas, configure manualmente as variáveis `DATABASE_URL` (formato `jdbc:postgresql://host:5432/banco`), `DATABASE_USER`, `DATABASE_PASSWORD` e `JWT_SECRET` (32 caracteres ou mais). Atenção: muitas plataformas entregam a URL do banco no formato `postgresql://usuario:senha@host/banco`, que o Spring não aceita diretamente. Nesse caso use `DB_HOST`, `DB_PORT` e `DB_NAME` separados, como faz o `render.yaml`.
