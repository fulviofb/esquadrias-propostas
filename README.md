# Gerador de Propostas — Esquadrias

Aplicação estática para criação e exportação de propostas de esquadrias. Inclui:
- Formulário de dados do cliente e obra
- Cadastro de itens com medidas, linha, cor, vidro e características personalizadas
- Catálogo de modelos com campos dinâmicos
- Pré‑visualização e exportação para PDF

## Como publicar no GitHub Pages

### Opção A — Usando GitHub CLI (mais simples)
1. Instale o GitHub CLI: https://cli.github.com/
2. Autentique-se: `gh auth login`
3. No diretório deste projeto, rode:
   ```powershell
   git init
   git add .
   git commit -m "Inicial: gerador de propostas"
   git branch -M main
   gh repo create esquadrias-propostas --public --source . --remote origin --push
   ```
4. Ative o Pages:
   - Abra o repositório no GitHub → `Settings` → `Pages`.
   - Em `Build and deployment`, selecione `Deploy from a branch`.
   - Escolha `Branch: main` e `Folder: / (root)`.
5. Aguarde a publicação. A URL ficará:
   ```
   https://SEU_USUARIO.github.io/esquadrias-propostas/
   ```

### Opção B — Manual pelo site do GitHub
1. Crie um novo repositório no GitHub (ex.: `esquadrias-propostas`).
2. No diretório do projeto, execute:
   ```powershell
   git init
   git add .
   git commit -m "Inicial: gerador de propostas"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/esquadrias-propostas.git
   git push -u origin main
   ```
3. Ative o Pages:
   - `Settings` → `Pages` → `Build and deployment`.
   - `Deploy from a branch` → `Branch: main` e `Folder: / (root)`.
4. Acesse a URL gerada e compartilhe com o cliente.

## Dicas
- Se quiser usar um domínio próprio, crie `CNAME` com o domínio em `root` e aponte DNS para GitHub Pages.
- Para alterar o visual, edite `styles.css` e o layout em `index.html`.
- Os dados ficam salvos em `localStorage`; não há backend.

## Estrutura
- `index.html` — página principal (formulário + preview)
- `styles.css` — estilos da UI
- `app.js` — lógica de estado, renderização, PDF
- `assets/logo.svg` — logotipo