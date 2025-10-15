# Gerador de Propostas — Esquadrias

Aplicação web completa para criação e exportação de propostas profissionais de esquadrias. Inclui formulários detalhados, especificações técnicas, condições comerciais e exportação para PDF.

## ✨ Funcionalidades

### Dados da Empresa
- Cadastro completo da empresa emitente
- Upload de logo personalizado
- Informações de contato e endereço

### Dados da Proposta
- Informações do cliente
- Dados da obra
- Número e identificação da proposta

### Especificações Técnicas
- Tipo, espessura e acabamento dos vidros
- Linha e acabamento dos perfis de alumínio
- Descrição de ferragens e instalação
- Garantias de fabricação e instalação
- Normas técnicas aplicáveis (ABNT)

### Condições Comerciais
- Forma de pagamento personalizável
- Prazos de entrega e instalação
- Validade da proposta
- Garantias dos perfis e vidros
- Observações comerciais

### Observações Gerais
- Área de cobertura (transporte/instalação)
- Observações sobre alterações de medidas
- Observações adicionais personalizadas

### Itens da Proposta
- Cadastro detalhado de produtos
- Medidas (largura x altura)
- Linha, cor e tipo de vidro
- Localização na obra
- Características personalizadas
- Preço individual e total

### Catálogo de Produtos
- Criação de modelos reutilizáveis
- Campos dinâmicos por modelo
- Biblioteca de produtos padrão

### Exportação
- Pré-visualização em tempo real
- Exportação para PDF profissional
- Formatação otimizada para impressão

## 🎯 Valores Padrão Inteligentes

A aplicação vem pré-configurada com valores padrão que seguem as melhores práticas do mercado:

**Especificações Técnicas:**
- Vidros: Temperados, espessura 8 mm, tipo incolor
- Perfis: Linha padrão, acabamento preto fosco
- Ferragens: Inclusas (roldanas, fechos, escovas e acessórios)
- Instalação: Inclusa, realizada por equipe técnica especializada
- Garantia fabricação: 1 ano
- Garantia instalação: 3 meses
- Normas: ABNT NBR 7199 e NBR 10821

**Condições Comerciais:**
- Forma de pagamento: 50% sinal + 50% na conclusão
- Prazo de entrega: 30 dias úteis
- Prazo de instalação: 5 dias úteis
- Validade: 15 dias corridos
- Garantia perfis: 5 anos
- Garantia vidros/instalação: 1 ano

**Observações:**
- Transporte e instalação inclusos na área urbana de Goiânia
- Alterações nas medidas podem implicar revisão de valores

Todos os valores podem ser personalizados conforme necessário.

## 🚀 Como Usar

### Acesso Online

Após publicar no GitHub Pages, acesse diretamente pelo navegador:
```
https://SEU_USUARIO.github.io/esquadrias-propostas/
```

### Uso Local

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` no navegador
3. Comece a criar suas propostas!

## 📝 Fluxo de Trabalho

1. **Configure sua empresa** (faça isso uma vez)
   - Preencha os dados da empresa
   - Faça upload do logo
   - Configure especificações técnicas padrão
   - Configure condições comerciais padrão

2. **Crie uma nova proposta**
   - Preencha os dados do cliente e obra
   - Ajuste especificações e condições se necessário
   - Adicione os itens (produtos/esquadrias)
   - Adicione observações específicas

3. **Visualize e exporte**
   - Confira o preview em tempo real
   - Clique em "Exportar PDF"
   - Envie para o cliente

4. **Salve e reutilize**
   - Os dados são salvos automaticamente
   - Crie modelos de produtos no catálogo
   - Reutilize configurações padrão

## 💾 Armazenamento

Os dados ficam salvos automaticamente no navegador (localStorage). Não há backend ou servidor necessário.

**Importante:** Os dados são armazenados localmente no seu navegador. Para backup:
- Exporte as propostas em PDF
- Anote os dados importantes
- Use o mesmo navegador e computador

## 🎨 Personalização

### Logo da Empresa
- Faça upload pela interface
- Formatos aceitos: JPG, PNG, SVG
- Aparece no cabeçalho e no preview

### Cores e Estilos
Edite o arquivo `styles.css`:
```css
:root {
  --bg: #f6f7fb;        /* Cor de fundo */
  --panel: #ffffff;     /* Cor dos painéis */
  --text: #1d2433;      /* Cor do texto */
  --muted: #6b7280;     /* Cor do texto secundário */
  --primary: #0f766e;   /* Cor primária (botões) */
  --border: #e5e7eb;    /* Cor das bordas */
}
```

### Modelos de Produtos
Crie modelos reutilizáveis na seção "Catálogo de Produtos":
- Janela de Correr - 4 Folhas
- Janela de Correr - 2 Folhas
- Porta de Correr
- Porta Balcão
- E outros conforme sua necessidade

## 🌐 Como Publicar no GitHub Pages

### Opção A — Usando GitHub CLI (mais simples)

1. Instale o GitHub CLI: https://cli.github.com/
2. Autentique-se: `gh auth login`
3. No diretório deste projeto, rode:
   ```bash
   git init
   git add .
   git commit -m "Inicial: gerador de propostas"
   git branch -M main
   gh repo create esquadrias-propostas --public --source . --remote origin --push
   ```
4. Ative o Pages:
   - Abra o repositório no GitHub → `Settings` → `Pages`
   - Em `Build and deployment`, selecione `Deploy from a branch`
   - Escolha `Branch: main` e `Folder: / (root)`
5. Aguarde a publicação. A URL ficará:
   ```
   https://SEU_USUARIO.github.io/esquadrias-propostas/
   ```

### Opção B — Manual pelo site do GitHub

1. Crie um novo repositório no GitHub (ex.: `esquadrias-propostas`)
2. No diretório do projeto, execute:
   ```bash
   git init
   git add .
   git commit -m "Inicial: gerador de propostas"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/esquadrias-propostas.git
   git push -u origin main
   ```
3. Ative o Pages:
   - `Settings` → `Pages` → `Build and deployment`
   - `Deploy from a branch` → `Branch: main` e `Folder: / (root)`
4. Acesse a URL gerada e compartilhe com o cliente

## 📁 Estrutura do Projeto

```
esquadrias-propostas/
├── index.html          # Página principal (formulário + preview)
├── styles.css          # Estilos da interface
├── app.js              # Lógica da aplicação (estado, renderização, PDF)
├── assets/
│   └── logo.svg        # Logo padrão (substituível)
└── README.md           # Esta documentação
```

## 🔧 Tecnologias Utilizadas

- **HTML5** — Estrutura da aplicação
- **CSS3** — Estilos e layout responsivo
- **JavaScript (Vanilla)** — Lógica da aplicação
- **html2pdf.js** — Exportação para PDF
- **localStorage** — Armazenamento local dos dados

## 📱 Responsividade

A aplicação é responsiva e funciona em:
- Desktop (recomendado para criação)
- Tablet (visualização e edição)
- Mobile (visualização)

## 🖨️ Impressão

O preview está otimizado para impressão:
- Formato A4
- Margens adequadas
- Quebras de página inteligentes
- Oculta elementos de interface

## 🆕 Novidades da Versão 2.0

- ✅ Seção de Especificações Técnicas completa
- ✅ Seção de Condições Comerciais detalhada
- ✅ Seção de Observações Gerais
- ✅ Valores padrão inteligentes pré-configurados
- ✅ Suporte a campos de texto longo (textarea)
- ✅ Preview profissional com formatação aprimorada
- ✅ Melhor organização visual das seções

## 💡 Dicas

- **Domínio próprio**: Crie um arquivo `CNAME` com seu domínio e configure o DNS para apontar para o GitHub Pages
- **Backup**: Exporte regularmente suas propostas em PDF
- **Modelos**: Crie modelos de produtos para agilizar o cadastro
- **Valores padrão**: Configure uma vez as especificações e condições padrão
- **Personalização**: Ajuste cores e estilos no `styles.css` conforme sua identidade visual

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação completa
- Veja o guia rápido de personalização

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins comerciais ou pessoais.

---

**Desenvolvido com ❤️ para profissionais de esquadrias**

**Versão:** 2.0 (com Condições Comerciais e Especificações Técnicas)  
**Data:** Outubro 2025

