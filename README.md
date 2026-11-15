<p align="center">
  <img src="docs/logo.jpg" alt="Logótipo do NEBe" width="360">
</p>

<h1 align="center">NEBe — Website</h1>

<p align="center">
  Site oficial do <strong>Núcleo de Estudantes de Bioengenharia</strong> da Universidade do Algarve.<br>
  <em>A vida inspira e a engenharia transforma.</em>
</p>

---

## O núcleo

O **NEBe — Núcleo de Estudantes de Bioengenharia** é um dos núcleos da [Associação Académica da Universidade do Algarve (AAUAlg)](https://www.aaualg.pt/). Representa e dinamiza a comunidade de estudantes da [licenciatura em Bioengenharia](https://www.ualg.pt/curso/1907) da Faculdade de Ciências e Tecnologia (FCT), no Campus de Gambelas, em Faro.

A licenciatura existe desde o ano letivo 2019/20. Tem 3 anos (180 ECTS) e é lecionada pela FCT em colaboração com o Departamento de Ciências Biomédicas e Medicina e a Escola Superior de Saúde. Junta a biologia, a biotecnologia e a engenharia.

O núcleo tem quatro objetivos:

- **Representar** os estudantes junto da direção de curso, da FCT e da AAUAlg;
- **Aproximar** os estudantes de empresas, centros de investigação e antigos alunos;
- **Formar**, com workshops e formações que complementam o plano de estudos;
- **Integrar**, com convívios, mentoria e apoio ao estudo.

## O site

É uma _single page_ com as seguintes secções, todas acessíveis a partir da navbar (com _scroll_ suave até à secção):

| Secção         | Âncora        | Conteúdo                                                 |
| -------------- | ------------- | -------------------------------------------------------- |
| Início         | `#inicio`     | Mensagem principal e diagrama das áreas da Bioengenharia |
| Sobre nós      | `#sobre`      | Quem somos, o que nos move e dados da licenciatura       |
| Atividades     | `#atividades` | Tipos de iniciativas organizadas pelo núcleo             |
| Recursos       | `#recursos`   | Ligações úteis (plano de estudos, UAlg, PubMed, b-on…)   |
| Junta-te a nós | `#junta-te`   | Como participar e contactos                              |

Funcionalidades:

- **Responsivo**, de telemóveis (320 px) a ecrãs grandes. No telemóvel o diagrama mostra só os ícones e uma legenda com a área ativa;
- **Animações** com [Motion](https://motion.dev/): o conteúdo aparece ao fazer scroll, há uma barra de progresso, o diagrama é interativo, há uma faixa de áreas em movimento e os cartões reagem ao cursor. As animações são desativadas quando o sistema pede menos movimento (`prefers-reduced-motion`);
- **Modo claro e modo escuro**: segue o sistema por defeito e guarda a escolha do visitante. A mudança é animada com um círculo que se expande a partir do botão (View Transitions API);
- **Português e inglês** com [i18next](https://www.i18next.com/), num menu com bandeiras acessível por teclado. **Português é a língua por defeito**, e a escolha do visitante fica guardada no browser;
- **Site estático**, exportado com `next build`, para alojamento gratuito no **GitHub Pages**.

### Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router, `output: "export"`) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/) / [react-i18next](https://react.i18next.com/) para as traduções
- [next-themes](https://github.com/pacocoursey/next-themes) para o modo claro/escuro
- [Motion](https://motion.dev/) para as animações
- [lucide-react](https://lucide.dev/) para os ícones
- [Playwright](https://playwright.dev/) para os testes end-to-end
- ESLint, Prettier, commitlint, husky e lint-staged para garantir a qualidade do código

### Estrutura

```
src/
├── app/                # layout, página única, estilos globais e favicon
├── assets/             # logótipo
├── components/         # uma componente por secção (Navbar, Hero, About, …)
├── config/site.ts      # contactos, redes sociais, áreas, atividades e recursos
└── i18n/
    ├── index.ts        # configuração do i18next
    └── locales/        # pt.json (por defeito) e en.json
e2e/                    # testes end-to-end (Playwright)
nginx/                  # configuração do nginx usada na imagem Docker
docs/                   # logótipo e esboço original do design
```

### Editar o conteúdo

- **Textos**: em `src/i18n/locales/pt.json` e `src/i18n/locales/en.json`. As duas línguas têm de ter as mesmas chaves. O TypeScript dá erro se uma componente usar uma chave que não exista.
- **Contactos e redes sociais**: em `siteConfig`, em `src/config/site.ts`.

> [!IMPORTANT]
> O e-mail (`nebe.ualg@gmail.com`) e os links de Instagram e LinkedIn são **provisórios**. Confirma-os com a direção do núcleo antes de publicar.

## Desenvolvimento local

Requisitos: **Node.js 22** (ver `.nvmrc`) e npm.

```bash
npm install          # também instala os hooks de Git (husky)
npm run dev          # http://localhost:3000
```

| Comando                | O que faz                                   |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                 |
| `npm run build`        | Gera o site estático na pasta `out/`        |
| `npm run start`        | Serve a pasta `out/` localmente             |
| `npm run lint`         | ESLint                                      |
| `npm run format`       | Formata todo o código com Prettier          |
| `npm run format:check` | Verifica a formatação sem alterar ficheiros |
| `npm run typecheck`    | Verificação de tipos com TypeScript         |

### Variáveis de ambiente

Estão documentadas em [`.env.example`](.env.example). Para as alterar, copia o ficheiro para `.env`:

| Variável                | Descrição                                                             | Por defeito             |
| ----------------------- | --------------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_BASE_PATH` | Subpasta onde o site é servido (ex.: `/NEBe-website` no GitHub Pages) | vazio (raiz)            |
| `NEXT_PUBLIC_SITE_URL`  | URL público do site, usado nos metadados Open Graph                   | `http://localhost:8080` |
| `PORT`                  | Porta do anfitrião usada pelo Docker Compose                          | `8080`                  |

## Pôr o site no ar

### Opção 1 — GitHub Pages (recomendado)

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica o site sempre que há um _push_ para `main`.

1. No GitHub, abre **Settings → Pages** e, em **Build and deployment → Source**, escolhe **GitHub Actions**.
2. Faz _merge_ para `main`, ou corre o workflow à mão em **Actions → Deploy no GitHub Pages → Run workflow**.
3. O site fica disponível em `https://<organização>.github.io/NEBe-website/`.

O workflow define o `NEXT_PUBLIC_BASE_PATH` sozinho. Se configurares um domínio próprio, o _base path_ passa a ser vazio, sem alterações ao código.

### Opção 2 — Docker

O `Dockerfile` gera o site estático e serve-o com nginx. O contentor corre sem root (`nginx-unprivileged`), com o sistema de ficheiros só de leitura e cabeçalhos de segurança (CSP, `X-Frame-Options`, etc.), definidos em [`nginx/`](nginx/).

```bash
cp .env.example .env     # opcional
docker compose up -d --build
```

O site fica disponível em <http://localhost:8080>. Para parar: `docker compose down`.

## Qualidade do código

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) corre em todos os _pull requests_ e _pushes_ para `main`. Verifica:

1. a formatação (Prettier), o linting (ESLint) e os tipos (TypeScript);
2. as vulnerabilidades nas dependências (`npm audit`);
3. se as mensagens de commit do PR seguem o Conventional Commits (commitlint);
4. o build de produção e os testes end-to-end (Playwright, em desktop e telemóvel);
5. o `Dockerfile` (hadolint) e o build da imagem Docker.

O [Dependabot](.github/dependabot.yml) abre todas as semanas PRs para atualizar as dependências npm, as GitHub Actions e as imagens Docker.

Localmente, os hooks de Git (husky) formatam e validam os ficheiros alterados antes de cada _commit_ (lint-staged). Também rejeitam mensagens de commit fora do formato.

## Contribuir

Os commits seguem a especificação [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
feat(atividades): adicionar hackathon de bioinformática
fix(navbar): corrigir scroll no telemóvel
docs: atualizar contactos no README
```

1. Cria uma branch a partir de `main` (`feat/...`, `fix/...`, `docs/...`).
2. Faz as alterações e confirma que o CI passa localmente.
3. Abre um _pull request_.

## Licença

Distribuído sob a licença MIT. Consulta o ficheiro [LICENSE](LICENSE).
