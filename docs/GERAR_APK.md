# Gerar e instalar o APK

APK é o formato Android. Para essa entrega, use celular Android ou emulador; ele não instala em iPhone.

## API acessível

O APK não inclui o servidor Java nem o PostgreSQL.

- Para funcionar fora da rede local: use uma API publicada com HTTPS e banco persistente. O passo a passo está em [PUBLICAR_API.md](PUBLICAR_API.md).
- Para testar na mesma rede Wi-Fi: mantenha a API no computador ligada e use o IPv4 dele.
- `localhost` no celular aponta para o celular, não para o computador.
- `10.0.2.2` é do emulador Android padrão, não do dispositivo físico.

No Windows, descubra o IPv4 com `ipconfig`. Um exemplo de URL seria `http://192.168.1.20:8080`, substituindo pelo IP real. Confira `/health` pelo navegador do celular e permita a porta 8080 no firewall para a rede privada.

## Conectar a conta Expo

Use Node.js 24 LTS (validado com 24.19.0), JDK 21 para a API e Git instalado. Na pasta `frontend`, no PowerShell:

```powershell
npm.cmd ci
npx.cmd eas-cli@latest login
npx.cmd eas-cli@latest init
```

Use uma conta da equipe. Se a configuração dinâmica impedir a gravação automática, copie o identificador fornecido pelo EAS para `expo.extra.eas.projectId` no `app.json`. O `app.config.js` preserva esses valores.

Nenhuma conta Expo ou projectId foi inventado nesta entrega.

## Configurar a URL do build

```powershell
npx.cmd eas-cli@latest env:create --environment preview --name EXPO_PUBLIC_API_URL --value "https://SUA-API" --visibility plaintext
```

Use a URL real. Se a variável já existir, atualize-a no painel Expo ou via `eas env:update`. Credenciais de banco e segredo JWT pertencem ao servidor, não às variáveis públicas do app.

O `.env` local é usado no desenvolvimento e foi excluído do envio ao EAS. Configure a URL também no ambiente EAS `preview`.

## Build com API HTTPS

```powershell
npx.cmd eas-cli@latest build -p android --profile preview
```

Esse perfil usa `android.buildType: apk` e distribuição interna. Quando o EAS solicitar assinatura Android, use o gerenciamento da conta da equipe e preserve a chave para atualizações.

## Build de teste por Wi-Fi/HTTP

Cadastre a URL HTTP real no ambiente `preview` e execute:

```powershell
npx.cmd eas-cli@latest build -p android --profile preview-local
```

Esse perfil permite HTTP no Android. O computador deve continuar ligado na mesma rede durante a demonstração. Para a entrega acessível fora dessa rede, use HTTPS e o perfil `preview`.

A configuração bloqueia build EAS sem URL e com endereço localhost/emulador.

## Instalar e conferir

1. Ao concluir o build, baixe o arquivo `.apk` no EAS.
2. Abra no Android e permita a instalação por essa origem quando solicitado.
3. Execute sem Expo Go e sem `expo start`.
4. Cadastre-se e teste pesquisa, ficha, compartilhamento, histórico, comparação e logout.
5. Feche e reabra o app para conferir a sessão.
6. Desative a rede e confira as mensagens e o histórico em cache; reative e teste a recuperação.

Com ADB:

```powershell
adb install -r CAMINHO_DO_ARQUIVO.apk
```

Registre modelo do dispositivo, versão Android, URL do build e resultado na tabela de evidências do [CHECKLIST_ENTREGA.md](CHECKLIST_ENTREGA.md). As capturas web do projeto não substituem essa etapa.

### Sem celular Android na equipe

Use o emulador do Android Studio: **Device Manager > Create Virtual Device**, escolha um Pixel com imagem de sistema recente e inicie. Arraste o arquivo `.apk` para a janela do emulador para instalar. O APK usa a URL pública da API, então funciona no emulador da mesma forma.

## Arquivos para a entrega

Código/repositório, APK, README, vídeo de todas as telas e evidência de instalação, conforme o pedido da disciplina.

O perfil `production` gera AAB para loja. Ele exige o ambiente EAS `production` e o atendimento aos requisitos vigentes da Google Play; não é o perfil da entrega APK.

Referências: [Expo APK](https://docs.expo.dev/build-reference/apk/), [variáveis Expo](https://docs.expo.dev/guides/environment-variables/) e [ambientes EAS](https://docs.expo.dev/eas/environment-variables/).
