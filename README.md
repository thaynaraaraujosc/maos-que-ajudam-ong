# Mãos que Ajudam

Plataforma web (Single Page Application) desenvolvida para uma ONG fictícia do terceiro setor, permitindo divulgar projetos sociais e captar voluntários/doadores através de um formulário de cadastro.

Projeto acadêmico da disciplina de Desenvolvimento Front-end.

Repositório: https://github.com/thaynaraaraujosc/maos-que-ajudam-ong

## Pré-requisitos

- Navegador atualizado (Chrome, Firefox, Edge ou Safari)
- Python 3 instalado (usado apenas para servir os arquivos localmente via `http.server`)
- Não há dependências de Node/NPM — o projeto usa apenas HTML, CSS e JavaScript puro, sem processo de build

## Tecnologias

- HTML5 semântico
- CSS3 (Design System com variáveis, CSS Grid, Flexbox, media queries)
- JavaScript puro (Vanilla JS) — sem frameworks
- [Day.js](https://day.js.org/) (via CDN) — cálculo de idade mínima no cadastro
- `localStorage` — persistência dos cadastros no navegador

## Estrutura de pastas

```
experiencia-pratica-1-ong/
├── html/
│   └── index.html          # shell único da SPA
├── css/
│   ├── reset.css
│   └── style.css           # Design System + componentes + layout
├── img/
│   └── equipe-voluntarios.jpg
└── js/
    ├── main.js              # ponto de entrada
    └── modules/
        ├── router.js        # roteamento via hash (#/rota)
        ├── templates.js     # geração de HTML de cada "página"
        ├── validacao.js     # máscaras e validação do formulário
        ├── storage.js       # leitura/escrita no localStorage
        ├── nav.js           # menu hambúrguer
        └── ui.js            # modal e toasts
```

## Como rodar o projeto localmente

É necessário servir os arquivos por HTTP (não abrir o `index.html` direto por `file://`), pois a aplicação faz `fetch`/roteamento que exige um servidor.

```bash
cd experiencia-pratica-1-ong
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000/html/index.html` no navegador.

## Rotas da aplicação

| Rota          | Descrição                          |
|---------------|-------------------------------------|
| `#/inicio`    | Página inicial (institucional)      |
| `#/projetos`  | Lista de projetos sociais           |
| `#/cadastro`  | Formulário de voluntário/doador     |

## Fluxo de branches (GitFlow)

- `main` — versão estável/publicável (tags `v1.0`, `v1.0.1`, `v1.1.0`, `v1.2.0`)
- `develop` — integração contínua do desenvolvimento
- `feature/*` — novas funcionalidades, a partir de `develop`, integradas via Pull Request
- `hotfix/*` — correções urgentes, a partir de `main`, mescladas em `main` e `develop`

Issues e milestones do projeto ficam registrados diretamente no GitHub, organizando o trabalho por etapa da disciplina.

## Licença

Projeto acadêmico, sem fins comerciais.
