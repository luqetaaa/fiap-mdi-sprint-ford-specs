# Checklist de entrega — Sprint 3

Siga as etapas na ordem. Cada uma depende da anterior.

## Divisão sugerida na equipe

| Frente | Responsável | Etapas |
|---|---|---|
| API na nuvem | _________ | 1 |
| Build do APK | _________ | 2 |
| Testes no Android | _________ e _________ | 3 |
| Vídeo | _________ | 4 |
| README e envio | _________ | 5 |

Os testes podem ser feitos por duas pessoas ao mesmo tempo, em aparelhos diferentes. Isso gera mais evidência.

## Etapa 1 — API publicada

Guia: [PUBLICAR_API.md](PUBLICAR_API.md)

- [ ] Projeto no GitHub, com `render.yaml` na raiz
- [ ] Blueprint aplicado no Render; serviço e banco com status ativo
- [ ] `https://SUA-URL/health` responde `{"status":"UP"}` no navegador do celular
- [ ] URL anotada: `https://________________________.onrender.com`

## Etapa 2 — APK gerado

Guia: [GERAR_APK.md](GERAR_APK.md)

- [ ] Conta Expo da equipe criada (use um e-mail compartilhado ou de um integrante que fique até o fim)
- [ ] `eas login` e `eas init` executados na pasta `frontend`
- [ ] `EXPO_PUBLIC_API_URL` cadastrada no ambiente `preview` com a URL da etapa 1
- [ ] `eas build -p android --profile preview` concluído
- [ ] Arquivo `.apk` baixado e salvo em local seguro (Drive da equipe)
- [ ] Link do build no Expo anotado: `https://expo.dev/________________________`

## Etapa 3 — Testes no Android

Instale o APK e percorra todos os fluxos. Tire um print do celular em cada tela; esses prints substituem as capturas web no README.

| # | Fluxo | Como testar | OK? |
|---|---|---|---|
| 1 | Instalação | Instalar o APK e abrir pelo ícone, sem Expo Go | |
| 2 | Ícone e splash | Conferir ícone azul e tela de abertura | |
| 3 | Cadastro | Criar conta nova | |
| 4 | Erro de login | Entrar com senha errada; deve mostrar mensagem clara | |
| 5 | Login | Entrar com a conta criada | |
| 6 | Início | Ver quantidade de versões e modelos | |
| 7 | Pesquisa | Escolher veículo, personalizar atributos, gerar ficha | |
| 8 | Seleção vazia | Desmarcar todos os atributos; o app deve impedir | |
| 9 | Ficha técnica | Conferir atributos, cobertura e aviso de dados demonstrativos | |
| 10 | Compartilhar | Compartilhar a ficha pelo WhatsApp ou e-mail | |
| 11 | Histórico | Abrir o histórico e reabrir uma pesquisa | |
| 12 | Limpar histórico | Limpar e confirmar que ficou vazio | |
| 13 | Comparação | Comparar duas versões e trocar uma delas | |
| 14 | Sobre | Conferir equipe e versão 1.3.0 | |
| 15 | Sessão | Fechar o app totalmente e reabrir; deve continuar logado | |
| 16 | Sem internet | Ativar modo avião; mensagens devem ser claras e o histórico em cache deve aparecer | |
| 17 | Volta da internet | Desativar modo avião e repetir uma pesquisa | |
| 18 | Teclado | Nos campos de login e cadastro, o teclado não pode cobrir o campo nem o botão | |
| 19 | Logout | Sair e confirmar que volta ao login | |

Se algum item falhar, anote o que aconteceu, com print, e envie para quem cuida do código antes de gravar o vídeo.

### Evidência de instalação

| Campo | Valor |
|---|---|
| Aparelho ou emulador | |
| Versão do Android | |
| Data do teste | |
| Versão do app | 1.3.0 |
| URL da API usada | |
| Resultado | ___ de 19 fluxos aprovados |
| Testado por | |

## Etapa 4 — Vídeo

Roteiro: [ROTEIRO_VIDEO.md](ROTEIRO_VIDEO.md)

- [ ] Abrir `https://SUA-URL/health` 2 minutos antes, para a API estar acordada
- [ ] Gravar a tela do celular (não a versão web)
- [ ] Mostrar o ícone do app instalado no início
- [ ] Passar por todas as 8 telas
- [ ] Vídeo publicado (YouTube não listado ou Drive com acesso por link)
- [ ] Link testado em uma aba anônima

## Etapa 5 — README e envio

- [ ] Preencher a seção **Entrega final** do README (APK, API, vídeo, evidência)
- [ ] Salvar os prints do celular em `docs/telas-android/` com os mesmos nomes das capturas web
- [ ] Remover do README qualquer texto que diga que algo "ainda precisa ser feito" e que já foi feito
- [ ] Conferir o enunciado completo do desafio Ford para requisitos além desta sprint
- [ ] `git push` final
- [ ] Entregar no portal: link do repositório, APK, vídeo
