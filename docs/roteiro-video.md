# Roteiro do vídeo — até 3 minutos

## 0:00 a 0:25 — Contexto
Olá, somos o grupo do Ford Specs Intelligence. Escolhemos o Desafio 01, Inteligência Competitiva Automotiva. A Ford precisa comparar especificações técnicas de veículos da concorrência, mas esse processo costuma ser manual, demorado e sujeito a inconsistências.

## 0:25 a 0:45 — Proposta
Nossa solução é um app mobile que recebe marca, modelo, versão e uma lista livre de atributos técnicos. A partir disso, ele gera uma ficha técnica padronizada, com campos comparáveis e informações ausentes marcadas como “Não disponível”.

## 0:45 a 1:45 — Demo
Mostre o login, a home, a tela de pesquisa, selecione os atributos e gere a ficha da Ford Ranger Raptor. Explique a cobertura, a confiança, os campos técnicos e o histórico. Depois mostre rapidamente o comparador.

## 1:45 a 2:25 — Arquitetura técnica
O projeto foi feito com React Native e Expo. Usamos React Navigation para navegação, AsyncStorage para persistência local, componentes reutilizáveis para manter a interface padronizada e uma camada de serviço para busca, normalização e comparação dos dados.

## 2:25 a 2:45 — Destaques
O principal destaque é que o app não entrega apenas um CRUD. Ele simula um fluxo real de inteligência competitiva, padroniza informações técnicas, trata campos ausentes e permite comparação entre veículos.

## 2:45 a 3:00 — Aprendizados e próximos passos
Aprendemos a transformar um problema de negócio em uma experiência mobile funcional. Com mais tempo, integraríamos APIs automotivas reais, scraping controlado e IA generativa para preencher os dados automaticamente.
