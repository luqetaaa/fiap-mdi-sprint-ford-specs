# Ford Specs Intelligence

Aplicação mobile desenvolvida para a Sprint **Mobile Development and IoT — Ford x FIAP**.

## Sobre o projeto

O **Ford Specs Intelligence** responde ao **Desafio 01 — Inteligência Competitiva Automotiva**.

A proposta é reduzir o trabalho manual de pesquisa técnica de veículos concorrentes. O usuário informa **marca, modelo, versão** e escolhe livremente os atributos que deseja pesquisar. O app retorna uma ficha técnica sempre no mesmo padrão, com campos organizados, comparáveis e com indicação explícita quando uma informação não está disponível.

## Por que escolhemos esse desafio?

Escolhemos o Desafio 01 porque ele resolve uma dor real de análise competitiva: pesquisas manuais em sites, PDFs, vídeos e portais automotivos consomem tempo, podem gerar inconsistência e dificultam a comparação entre versões de veículos.

## Funcionalidades implementadas

- Login demonstrativo para acesso ao app.
- Home com resumo do problema, proposta de valor e validação com Ranger Raptor.
- Pesquisa por marca, modelo e versão.
- Seleção livre de atributos técnicos por categorias.
- Geração de ficha técnica padronizada.
- Tratamento de campos ausentes com “Não disponível”.
- Indicador de cobertura dos campos encontrados.
- Indicador de confiança da fonte/base.
- Histórico persistente de pesquisas com AsyncStorage.
- Comparador técnico entre veículos.
- Tela sobre o projeto, integrantes, arquitetura e próximos passos.
- Feedback visual de loading durante a geração da ficha.
- Compartilhamento do resultado gerado.

## Integrantes do grupo

- Lucas Rodrigues de Queiroz — RM556323
- Victor Hugo de Paula — RM554787
- Felipe Paes de Barros Muller Carioba — RM558447
- Djalma Moreira de Andrade Filho — RM555530
- Matheus Gushi Morioka — RM556935

## Tecnologias utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage
- Expo Linear Gradient
- Expo Vector Icons
- JavaScript

## Como rodar o projeto

### Pré-requisitos

Instale antes:

- Node.js LTS
- Expo Go no celular
- Git
- VS Code, opcional

### Passo a passo

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/fiap-mdi-sprint-ford-specs.git
```

Entre na pasta:

```bash
cd fiap-mdi-sprint-ford-specs
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npx expo start
```

Depois disso:

- No celular, abra o Expo Go e leia o QR Code.
- No navegador, pressione `w` no terminal.
- No Android Studio, pressione `a` se tiver emulador configurado.

## Login de teste

```txt
E-mail: analista@ford.com
Senha: 123456
```

## Fluxo principal de uso

1. Entrar no app.
2. Acessar a tela **Pesquisa**.
3. Manter o caso de teste Ford Ranger Raptor ou digitar outro veículo.
4. Selecionar atributos técnicos.
5. Clicar em **Gerar ficha técnica padronizada**.
6. Ver a ficha com cobertura, confiança e campos comparáveis.
7. Conferir o histórico ou usar o comparador.

## Demonstração visual

Coloque aqui os prints após rodar o app:

| Tela | Print |
|---|---|
| Login | `assets/screenshots/login.png` |
| Home | `assets/screenshots/home.png` |
| Pesquisa | `assets/screenshots/search.png` |
| Resultado | `assets/screenshots/result.png` |
| Histórico | `assets/screenshots/history.png` |
| Comparador | `assets/screenshots/compare.png` |
| Sobre | `assets/screenshots/about.png` |

Também adicione um GIF ou vídeo do fluxo principal:

```txt
assets/demo/fluxo-principal.gif
```

> Importante: o enunciado exige prints de todas as telas e GIF/vídeo do fluxo principal. Antes da entrega, capture as imagens reais do app rodando e coloque nesta seção.

## Decisões técnicas

### Stack

A stack escolhida foi **React Native com Expo**, pois é a tecnologia recomendada no desafio e permite entregar uma experiência mobile fluida em iOS e Android.

### Estrutura do projeto

```txt
src/
  components/     Componentes reutilizáveis
  data/           Base simulada de veículos e atributos
  hooks/          Contexto global do app
  navigation/     Navegação por stack e abas
  screens/        Telas principais
  services/       Regra de busca, normalização e comparação
  storage/        Persistência local
  theme/          Cores e padrões visuais
  utils/          Funções auxiliares
```

### Integração externa / fonte de dados

Nesta versão acadêmica, a integração foi representada por uma base JSON estruturada em `src/data/vehicleSpecs.js`, simulando a resposta de uma API automotiva ou de uma camada de IA/crawler.

A arquitetura foi separada para permitir que, no futuro, o arquivo local seja substituído por:

- API automotiva real;
- crawler em fontes aprovadas;
- extração de PDFs técnicos;
- LLM para padronização em JSON.

### Persistência

O histórico de pesquisas é salvo localmente com **AsyncStorage**, permitindo que o usuário volte às fichas geradas mesmo depois de navegar entre telas.

### Padronização dos campos

A saída é montada pela função `buildStandardSpecs`. Todos os campos selecionados são retornados no mesmo formato. Quando uma informação não existe, o valor exibido é **Não disponível**.

## Caso de validação

O app inclui a **Ford Ranger Raptor** como caso principal de validação, com os principais dados técnicos necessários para demonstrar a operação da solução.

## Próximos passos

Com mais tempo, implementaríamos:

- Consumo de API automotiva real.
- Web scraping controlado em sites autorizados.
- Integração com IA generativa para transformar textos técnicos em JSON.
- Exportação da ficha técnica em PDF.
- Login real com Firebase.
- Painel administrativo para cadastro de novas fontes.
- Ranking de confiabilidade por fonte.

## Sugestão de commits por integrante

Para evitar desconto por colaboração, cada integrante deve fazer commits reais e descritivos:

Lucas:

```bash
git commit -m "cria estrutura inicial do app Expo e navegação principal"
git commit -m "implementa fluxo de pesquisa e geração de ficha técnica"
```

Victor:

```bash
git commit -m "adiciona componentes visuais reutilizáveis do aplicativo"
git commit -m "melhora interface da home e tela de login"
```

Felipe:

```bash
git commit -m "cria base de dados técnica dos veículos"
git commit -m "implementa normalização dos atributos técnicos"
```

Djalma:

```bash
git commit -m "implementa histórico de pesquisas com AsyncStorage"
git commit -m "adiciona tratamento de campos não disponíveis"
```

Matheus:

```bash
git commit -m "implementa comparador técnico entre veículos"
git commit -m "documenta execução, prints e decisões técnicas no README"
```

## Roteiro do vídeo

O roteiro de apresentação está em:

```txt
docs/roteiro-video.md
```


## Atualização FULL do catálogo

Esta versão foi ampliada para funcionar como uma entrega final da sprint:

- Marca travada em Ford na tela de pesquisa.
- Seleção de modelo e versão por botões, evitando erro de digitação.
- Base demonstrativa com mais de 20 versões Ford.
- Especificações preenchidas no mesmo padrão para todos os veículos.
- Tratamento padronizado de campos não aplicáveis, como caçamba em SUVs ou ângulo off-road em sedãs.
- Comparador usando a mesma base técnica.

Observação: os dados são uma base demonstrativa para a sprint acadêmica. A arquitetura foi preparada para trocar essa base por API, scraping validado ou camada de IA/LLM em uma etapa futura.
