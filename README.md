# Gerador de Propostas de Esquadrias

Sistema simples e direto para criação de propostas comerciais de esquadrias de alumínio.

![Versão](https://img.shields.io/badge/versão-3.1-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)
![Status](https://img.shields.io/badge/status-ativo-success)

---

## 📋 Sobre o Projeto

O Gerador de Propostas de Esquadrias é uma aplicação web desenvolvida para facilitar a criação de propostas comerciais profissionais no setor de esquadrias de alumínio. A ferramenta foi projetada com foco em **simplicidade e facilidade de uso**, ideal para usuários de todos os níveis técnicos.

**Principais características:**

- Interface limpa e intuitiva
- Funcionamento 100% offline após carregamento inicial
- Armazenamento automático no navegador
- Exportação profissional em PDF
- Valores padrão inteligentes
- Sem complexidade desnecessária

---

## ✨ Funcionalidades

### Dados Essenciais

**Cadastro da Empresa**
- Logo, razão social, CNPJ
- Contatos e endereço
- Salvos automaticamente para reutilização

**Dados do Cliente e Obra**
- Informações do cliente
- Endereço da obra
- Número da proposta e prazo

### Especificações Técnicas

Campos pré-preenchidos com valores profissionais:
- Tipo e especificações dos vidros
- Linha e acabamento dos perfis
- Ferragens e instalação
- Garantias (fabricação e instalação)
- Normas técnicas (ABNT NBR 7199 e NBR 10821)

### Condições Comerciais

Informações comerciais completas:
- Forma de pagamento
- Prazos de entrega e instalação
- Validade da proposta
- Garantias
- Observações comerciais

### Itens da Proposta

Sistema simples para adicionar produtos:
- Quantidade, dimensões (L x H)
- Linha, localização, cor
- Tipo de vidros
- Características personalizadas
- Preço unitário
- Cálculo automático de totais

### Catálogo de Produtos

Reutilize produtos frequentes:
- Salve modelos de produtos
- Campos personalizáveis
- Agiliza criação de propostas

### Exportação PDF

Gere documentos profissionais com um clique:
- Layout limpo e organizado
- Todas as informações formatadas
- Pronto para envio ao cliente

---

## 🚀 Como Usar

### Acesso Online

**Aplicação:** https://fulviofb.github.io/esquadrias-propostas/

Basta acessar o link em qualquer navegador moderno.

### Passo a Passo

1. **Configure sua empresa** (primeira vez)
   - Preencha dados da empresa
   - Faça upload do logo (opcional)
   - Os dados serão salvos automaticamente

2. **Preencha os dados do cliente**
   - Nome, CPF/CNPJ, contatos
   - Endereço da obra
   - Número da proposta

3. **Revise as especificações técnicas**
   - Campos já vêm preenchidos
   - Ajuste apenas se necessário

4. **Edite as condições comerciais**
   - Forma de pagamento
   - Prazos e garantias
   - Observações

5. **Adicione os itens**
   - Selecione produtos do catálogo ou crie novos
   - Informe dimensões e preços
   - Adicione características específicas

6. **Revise o preview**
   - Confira todos os dados à direita
   - Veja como ficará o PDF

7. **Exporte para PDF**
   - Clique em "Exportar PDF"
   - Documento pronto para envio!

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização responsiva
- **JavaScript** - Lógica de negócio (sem frameworks)
- **LocalStorage** - Armazenamento local
- **jsPDF** - Geração de PDF

**Zero dependências externas = Rápido e confiável**

---

## 📱 Compatibilidade

**Navegadores suportados:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Dispositivos:**
- 💻 Desktop (recomendado)
- 📱 Tablet (suportado)

**Requisitos:**
- JavaScript habilitado
- LocalStorage habilitado
- Conexão com internet (apenas para carregamento inicial)

---

## 🎨 Personalização

### Logo da Empresa

Faça upload do logo diretamente pela interface ou substitua o arquivo `assets/logo.svg`.

### Cores

Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
  --primary: #00897b;    /* Cor principal */
  --bg: #f5f5f5;         /* Fundo */
  --border: #ddd;        /* Bordas */
}
```

### Valores Padrão

Altere os valores padrão dos campos editando o objeto `state.dados` no arquivo `app.js`.

---

## 💾 Armazenamento

Todos os dados são salvos automaticamente no navegador (LocalStorage):

- Dados da empresa
- Última proposta editada
- Catálogo de produtos
- Configurações

**Importante:**
- Os dados ficam apenas no seu navegador
- Limpar cache pode apagar os dados
- Modo anônimo não salva dados

---

## 📝 Changelog

### v3.1 (15/10/2025) - Versão Simplificada
- 🎯 Interface simplificada e mais intuitiva
- ❌ Removido gerenciador de propostas
- ❌ Removidos templates de texto
- ❌ Removido upload de imagens
- ❌ Removida exportação JSON
- ✅ Foco em simplicidade e facilidade de uso
- ✅ Redução de 50% na complexidade

### v3.0 (15/10/2025) - Versão Avançada
- ✨ Cálculos automáticos
- ✨ Templates de texto
- ✨ Gerenciador de propostas
- ✨ Upload de imagens
- ✨ Exportação JSON
- ⚠️ Versão complexa (disponível na branch `v3.0-complexa`)

### v2.0 (15/10/2025)
- ✨ Especificações técnicas detalhadas
- ✨ Condições comerciais personalizáveis
- ✨ Observações gerais

### v1.0 (15/10/2025)
- 🎉 Versão inicial
- ✨ Cadastro de empresa e cliente
- ✨ Itens da proposta
- ✨ Catálogo de produtos
- ✨ Exportação em PDF

---

## 🤝 Versões Disponíveis

**v3.1 (main) - Simplificada** ← Recomendada
- Interface limpa e direta
- Ideal para todos os usuários
- Fácil de aprender e usar

**v3.0 (branch v3.0-complexa) - Avançada**
- Recursos extras para usuários avançados
- Gerenciamento de múltiplas propostas
- Templates e automações

Para usar a versão avançada:
```bash
git checkout v3.0-complexa
```

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 🔗 Links

**Repositório:** https://github.com/fulviofb/esquadrias-propostas  
**Aplicação:** https://fulviofb.github.io/esquadrias-propostas/

---

**Crie propostas profissionais de forma simples e rápida!** 🚀

