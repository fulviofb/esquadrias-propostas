/* Estado principal da proposta - VERSÃO 3.0 COM MELHORIAS AVANÇADAS */
const state = {
  dados: {
    cliente: '', cpfcnpj: '', contato: '', telefone: '', email: '',
    endereco: '', cidade: '', cep: '', numero: '', obra: '', prazo: ''
  },
  emissor: {
    empresa: '', cnpj: '', ie: '', telefone: '', email: '',
    endereco: '', cidade: '', cep: '',
    logo: ''
  },
  especificacoes: {
    vidroTipo: 'Temperados',
    vidroEspessura: '8',
    vidroAcabamento: 'incolor',
    perfilLinha: 'Linha padrão',
    perfilAcabamento: 'preto fosco',
    ferragens: 'Inclusas (roldanas, fechos, escovas e acessórios)',
    instalacao: 'Inclusa, realizada por equipe técnica especializada',
    garantiaFabricacao: '1',
    garantiaInstalacao: '3',
    normasTecnicas: 'ABNT NBR 7199 e NBR 10821'
  },
  condicoesComerciais: {
    formaPagamento: '50% de sinal no aceite da proposta e 50% na conclusão da instalação',
    prazoEntrega: '30',
    prazoInstalacao: '5',
    validadeProposta: '15',
    garantiaPerfis: '5',
    garantiaVidros: '1',
    observacoesComerciais: 'Esta proposta não inclui serviços de alvenaria, pintura ou arremates que se façam necessários para a instalação das esquadrias.'
  },
  observacoesGerais: {
    areaCobertura: 'O transporte e a instalação estão inclusos dentro da área urbana de Goiânia.',
    observacaoAlteracoes: 'Alterações nas medidas após conferência técnica poderão implicar revisão de valores.',
    observacoesAdicionais: ''
  },
  // NOVO: Cálculos automáticos
  calculos: {
    descontoTipo: 'percentual', // 'percentual' ou 'fixo'
    descontoValor: 0
  },
  // NOVO: Templates de texto
  templates: {
    formaPagamento: [
      { id: '50-50', nome: '50% + 50%', texto: '50% de sinal no aceite da proposta e 50% na conclusão da instalação' },
      { id: '30-40-30', nome: '30% + 40% + 30%', texto: '30% de sinal no aceite, 40% na entrega dos materiais e 30% na conclusão da instalação' },
      { id: '3x', nome: 'Parcelado 3x', texto: 'Parcelado em 3 vezes sem juros (entrada + 2 parcelas)' },
      { id: 'avista', nome: 'À vista', texto: 'Pagamento à vista com 10% de desconto' }
    ],
    observacoesComerciais: [
      { id: 'padrao', nome: 'Padrão', texto: 'Esta proposta não inclui serviços de alvenaria, pintura ou arremates que se façam necessários para a instalação das esquadrias.' },
      { id: 'residencial', nome: 'Residencial', texto: 'Esta proposta não inclui serviços de alvenaria, pintura, arremates, ou adequações elétricas/hidráulicas que se façam necessários.' },
      { id: 'comercial', nome: 'Comercial', texto: 'Proposta para obra comercial. Não inclui serviços de infraestrutura, adequações prediais ou licenças específicas.' },
      { id: 'retrofit', nome: 'Retrofit', texto: 'Proposta para retrofit. Inclui remoção das esquadrias antigas. Não inclui reparos estruturais ou acabamentos.' }
    ],
    observacoesGerais: [
      { id: 'goiania', nome: 'Goiânia', texto: 'O transporte e a instalação estão inclusos dentro da área urbana de Goiânia.' },
      { id: 'regiao', nome: 'Região Metropolitana', texto: 'O transporte e a instalação estão inclusos na região metropolitana de Goiânia. Para outras cidades, consultar taxa de deslocamento.' },
      { id: 'condominio', nome: 'Condomínio', texto: 'Para obras em condomínio, o cliente deve providenciar autorização prévia e acesso facilitado para equipe e materiais.' }
    ]
  },
  // NOVO: Sistema de múltiplas propostas
  propostaAtual: null,
  propostas: [],
  itens: [],
  catalogo: [],
  seq: 1
};

// Templates padrão de catálogo
const catalogoPadrao = [
  { nome: 'Janela de Correr - 4 Folhas - Linha Suprema', campos: [] },
  { nome: 'Janela de Correr - 2 Folhas - Linha Suprema', campos: [] },
  { nome: 'Porta de Correr - 2 Folhas - Linha Suprema', campos: [] },
  { nome: 'Porta Balcão - Linha Suprema', campos: [] }
];

const el = {
  formDados: document.getElementById('formDados'),
  formEmpresa: document.getElementById('formEmpresa'),
  formEspecificacoes: document.getElementById('formEspecificacoes'),
  formCondicoes: document.getElementById('formCondicoes'),
  formObservacoes: document.getElementById('formObservacoes'),
  formCalculos: document.getElementById('formCalculos'),
  formItem: document.getElementById('formItem'),
  tabela: document.getElementById('tabelaItens'),
  pv: {
    numero: document.getElementById('pv-numero'),
    obra: document.getElementById('pv-obra'),
    cliente: document.getElementById('pv-cliente'),
    cpfcnpj: document.getElementById('pv-cpfcnpj'),
    contato: document.getElementById('pv-contato'),
    telefone: document.getElementById('pv-telefone'),
    email: document.getElementById('pv-email'),
    endereco: document.getElementById('pv-endereco'),
    cidade: document.getElementById('pv-cidade'),
    cep: document.getElementById('pv-cep'),
    prazo: document.getElementById('pv-prazo'),
    itens: document.getElementById('pv-itens'),
    totalItens: document.getElementById('pv-totalItens'),
    valorTotal: document.getElementById('pv-valorTotal'),
    data: document.getElementById('pv-data'),
    usuario: document.getElementById('pv-usuario'),
    empLogo: document.getElementById('pv-emp-logo'),
    empNome: document.getElementById('pv-emp-nome'),
    empDoc: document.getElementById('pv-emp-doc'),
    empContato: document.getElementById('pv-emp-contato'),
    empEnd: document.getElementById('pv-emp-end'),
    // Especificações
    vidros: document.getElementById('pv-vidros'),
    perfis: document.getElementById('pv-perfis'),
    ferragens: document.getElementById('pv-ferragens'),
    instalacao: document.getElementById('pv-instalacao'),
    garantiaEspec: document.getElementById('pv-garantia-espec'),
    normas: document.getElementById('pv-normas'),
    // Condições Comerciais
    prazoEntrega: document.getElementById('pv-prazo-entrega'),
    prazoInstalacao: document.getElementById('pv-prazo-instalacao'),
    validade: document.getElementById('pv-validade'),
    formaPagamento: document.getElementById('pv-forma-pagamento'),
    garantia: document.getElementById('pv-garantia'),
    obsComerciais: document.getElementById('pv-obs-comerciais'),
    obsComerciaisWrapper: document.getElementById('pv-obs-comerciais-wrapper'),
    // Observações
    areaCobertura: document.getElementById('pv-area-cobertura'),
    areaCoberturaWrapper: document.getElementById('pv-area-cobertura-wrapper'),
    obsAlteracoes: document.getElementById('pv-obs-alteracoes'),
    obsAlteracoesWrapper: document.getElementById('pv-obs-alteracoes-wrapper'),
    obsAdicionais: document.getElementById('pv-obs-adicionais'),
    obsAdicionaisWrapper: document.getElementById('pv-obs-adicionais-wrapper'),
    // Cálculos
    areaTotal: document.getElementById('pv-area-total'),
    precoM2: document.getElementById('pv-preco-m2'),
    valorSemDesconto: document.getElementById('pv-valor-sem-desconto'),
    descontoValor: document.getElementById('pv-desconto-valor'),
    valorComDesconto: document.getElementById('pv-valor-com-desconto')
  },
  // Cálculos
  calcArea: document.getElementById('calc-area'),
  calcPrecoM2: document.getElementById('calc-preco-m2'),
  calcSemDesconto: document.getElementById('calc-sem-desconto'),
  calcDesconto: document.getElementById('calc-desconto'),
  calcComDesconto: document.getElementById('calc-com-desconto'),
  // Templates
  templateFormaPagamento: document.getElementById('templateFormaPagamento'),
  btnAplicarTemplateFormaPagamento: document.getElementById('btnAplicarTemplateFormaPagamento'),
  templateObsComerciais: document.getElementById('templateObsComerciais'),
  btnAplicarTemplateObsComerciais: document.getElementById('btnAplicarTemplateObsComerciais'),
  templateObsGerais: document.getElementById('templateObsGerais'),
  btnAplicarTemplateObsGerais: document.getElementById('btnAplicarTemplateObsGerais'),
  // Propostas
  nomeProposta: document.getElementById('nomeProposta'),
  btnSalvarProposta: document.getElementById('btnSalvarProposta'),
  btnNovaProposta: document.getElementById('btnNovaProposta'),
  listaPropostas: document.getElementById('listaPropostas'),
  buscaProposta: document.getElementById('buscaProposta'),
  // Upload de imagens
  uploadImagemItem: document.getElementById('uploadImagemItem'),
  imagensItemPreview: document.getElementById('imagensItemPreview'),
  // Botões principais
  statusItem: document.getElementById('statusItem'),
  btnAdicionar: document.getElementById('btnAdicionar'),
  btnNova: document.getElementById('btnNova'),
  btnSalvar: document.getElementById('btnSalvar'),
  btnPDF: document.getElementById('btnPDF'),
  btnExportarJSON: document.getElementById('btnExportarJSON'),
  btnImportarJSON: document.getElementById('btnImportarJSON'),
  inputImportarJSON: document.getElementById('inputImportarJSON'),
  // item customização
  selProduto: document.getElementById('selProduto'),
  prodCampos: document.getElementById('prodCampos'),
  caracteristicasList: document.getElementById('caracteristicasList'),
  btnAddCaracteristica: document.getElementById('btnAddCaracteristica'),
  // catálogo
  formCatalogo: document.getElementById('formCatalogo'),
  catalogoCampos: document.getElementById('catalogoCampos'),
  btnAddCampo: document.getElementById('btnAddCampo'),
  btnSalvarModelo: document.getElementById('btnSalvarModelo'),
  catalogoLista: document.getElementById('catalogoLista')
};

// Elementos adicionais
el.brandLogo = document.getElementById('brandLogo');

/* Utilidades */
const currencyBR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const numBR = new Intl.NumberFormat('pt-BR');
const todayStr = () => new Date().toLocaleString('pt-BR');

// NOVO: Funções de cálculo
function calcularArea(largura, altura) {
  // Converte mm para m² (largura * altura / 1.000.000)
  return (largura * altura) / 1000000;
}

function calcularTotais() {
  let areaTotal = 0;
  let valorSemDesconto = 0;
  
  state.itens.forEach(it => {
    const area = calcularArea(it.largura || 0, it.altura || 0);
    areaTotal += area * (it.qtd || 1);
    valorSemDesconto += (Number(it.preco) || 0);
  });
  
  const precoM2 = areaTotal > 0 ? valorSemDesconto / areaTotal : 0;
  
  let descontoValor = 0;
  if (state.calculos.descontoTipo === 'percentual') {
    descontoValor = valorSemDesconto * (Number(state.calculos.descontoValor) || 0) / 100;
  } else {
    descontoValor = Number(state.calculos.descontoValor) || 0;
  }
  
  const valorComDesconto = valorSemDesconto - descontoValor;
  
  return {
    areaTotal,
    precoM2,
    valorSemDesconto,
    descontoValor,
    valorComDesconto
  };
}

function renderCalculos() {
  const calc = calcularTotais();
  
  if (el.calcArea) el.calcArea.textContent = calc.areaTotal.toFixed(2);
  if (el.calcPrecoM2) el.calcPrecoM2.textContent = calc.precoM2.toFixed(2);
  if (el.calcSemDesconto) el.calcSemDesconto.textContent = currencyBR.format(calc.valorSemDesconto).replace('R$', '').trim();
  if (el.calcDesconto) el.calcDesconto.textContent = currencyBR.format(calc.descontoValor).replace('R$', '').trim();
  if (el.calcComDesconto) el.calcComDesconto.textContent = currencyBR.format(calc.valorComDesconto).replace('R$', '').trim();
  
  // Preview
  if (el.pv.areaTotal) el.pv.areaTotal.textContent = calc.areaTotal.toFixed(2);
  if (el.pv.precoM2) el.pv.precoM2.textContent = currencyBR.format(calc.precoM2).replace('R$', '').trim();
  if (el.pv.valorSemDesconto) el.pv.valorSemDesconto.textContent = currencyBR.format(calc.valorSemDesconto).replace('R$', '').trim();
  if (el.pv.descontoValor) {
    if (calc.descontoValor > 0) {
      el.pv.descontoValor.textContent = currencyBR.format(calc.descontoValor).replace('R$', '').trim();
      if (el.pv.descontoValor.parentElement) el.pv.descontoValor.parentElement.style.display = 'block';
    } else {
      if (el.pv.descontoValor.parentElement) el.pv.descontoValor.parentElement.style.display = 'none';
    }
  }
  if (el.pv.valorComDesconto) el.pv.valorComDesconto.textContent = currencyBR.format(calc.valorComDesconto).replace('R$', '').trim();
}

// NOVO: Funções de templates
function popularTemplatesFormaPagamento() {
  if (!el.templateFormaPagamento) return;
  el.templateFormaPagamento.innerHTML = '<option value="">Selecione um template...</option>';
  state.templates.formaPagamento.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.nome;
    el.templateFormaPagamento.appendChild(opt);
  });
}

function popularTemplatesObsComerciais() {
  if (!el.templateObsComerciais) return;
  el.templateObsComerciais.innerHTML = '<option value="">Selecione um template...</option>';
  state.templates.observacoesComerciais.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.nome;
    el.templateObsComerciais.appendChild(opt);
  });
}

function popularTemplatesObsGerais() {
  if (!el.templateObsGerais) return;
  el.templateObsGerais.innerHTML = '<option value="">Selecione um template...</option>';
  state.templates.observacoesGerais.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.nome;
    el.templateObsGerais.appendChild(opt);
  });
}

function aplicarTemplateFormaPagamento() {
  const id = el.templateFormaPagamento.value;
  if (!id) return;
  const template = state.templates.formaPagamento.find(t => t.id === id);
  if (template && el.formCondicoes && el.formCondicoes.formaPagamento) {
    el.formCondicoes.formaPagamento.value = template.texto;
    state.condicoesComerciais.formaPagamento = template.texto;
    renderDados();
    persist();
  }
}

function aplicarTemplateObsComerciais() {
  const id = el.templateObsComerciais.value;
  if (!id) return;
  const template = state.templates.observacoesComerciais.find(t => t.id === id);
  if (template && el.formCondicoes && el.formCondicoes.observacoesComerciais) {
    el.formCondicoes.observacoesComerciais.value = template.texto;
    state.condicoesComerciais.observacoesComerciais = template.texto;
    renderDados();
    persist();
  }
}

function aplicarTemplateObsGerais() {
  const id = el.templateObsGerais.value;
  if (!id) return;
  const template = state.templates.observacoesGerais.find(t => t.id === id);
  if (template && el.formObservacoes && el.formObservacoes.areaCobertura) {
    el.formObservacoes.areaCobertura.value = template.texto;
    state.observacoesGerais.areaCobertura = template.texto;
    renderDados();
    persist();
  }
}

// NOVO: Sistema de múltiplas propostas
function gerarIdProposta() {
  return 'prop_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function salvarProposta() {
  const nome = el.nomeProposta ? el.nomeProposta.value.trim() : '';
  if (!nome) {
    alert('Por favor, informe um nome para a proposta');
    return;
  }
  
  const proposta = {
    id: state.propostaAtual || gerarIdProposta(),
    nome: nome,
    numero: state.dados.numero || '',
    cliente: state.dados.cliente || '',
    dataCriacao: state.propostaAtual ? state.propostas.find(p => p.id === state.propostaAtual)?.dataCriacao || new Date().toISOString() : new Date().toISOString(),
    dataModificacao: new Date().toISOString(),
    dados: { ...state.dados },
    emissor: { ...state.emissor },
    especificacoes: { ...state.especificacoes },
    condicoesComerciais: { ...state.condicoesComerciais },
    observacoesGerais: { ...state.observacoesGerais },
    calculos: { ...state.calculos },
    itens: [...state.itens],
    catalogo: [...state.catalogo],
    seq: state.seq
  };
  
  const idx = state.propostas.findIndex(p => p.id === proposta.id);
  if (idx >= 0) {
    state.propostas[idx] = proposta;
  } else {
    state.propostas.push(proposta);
  }
  
  state.propostaAtual = proposta.id;
  persist();
  renderListaPropostas();
  alert('Proposta salva com sucesso!');
}

function carregarProposta(id) {
  const proposta = state.propostas.find(p => p.id === id);
  if (!proposta) return;
  
  state.propostaAtual = id;
  state.dados = { ...proposta.dados };
  state.emissor = { ...proposta.emissor };
  state.especificacoes = { ...proposta.especificacoes };
  state.condicoesComerciais = { ...proposta.condicoesComerciais };
  state.observacoesGerais = { ...proposta.observacoesGerais };
  state.calculos = { ...proposta.calculos };
  state.itens = [...proposta.itens];
  state.catalogo = [...proposta.catalogo];
  state.seq = proposta.seq;
  
  // Preencher formulários
  preencherFormularios();
  renderDados();
  renderItens();
  renderCalculos();
  renderCatalogoLista();
  updateProdutoSelect();
  renderListaPropostas();
  
  if (el.nomeProposta) el.nomeProposta.value = proposta.nome;
}

function excluirProposta(id) {
  if (!confirm('Tem certeza que deseja excluir esta proposta?')) return;
  
  state.propostas = state.propostas.filter(p => p.id !== id);
  if (state.propostaAtual === id) {
    state.propostaAtual = null;
  }
  persist();
  renderListaPropostas();
}

function duplicarProposta(id) {
  const proposta = state.propostas.find(p => p.id === id);
  if (!proposta) return;
  
  const novaProposta = {
    ...proposta,
    id: gerarIdProposta(),
    nome: proposta.nome + ' (Cópia)',
    dataCriacao: new Date().toISOString(),
    dataModificacao: new Date().toISOString()
  };
  
  state.propostas.push(novaProposta);
  persist();
  renderListaPropostas();
  alert('Proposta duplicada com sucesso!');
}

function renderListaPropostas() {
  if (!el.listaPropostas) return;
  
  const busca = el.buscaProposta ? el.buscaProposta.value.toLowerCase() : '';
  const propostasFiltradas = state.propostas.filter(p => {
    if (!busca) return true;
    return p.nome.toLowerCase().includes(busca) ||
           p.cliente.toLowerCase().includes(busca) ||
           p.numero.toLowerCase().includes(busca);
  });
  
  el.listaPropostas.innerHTML = '';
  
  if (propostasFiltradas.length === 0) {
    el.listaPropostas.innerHTML = '<div class="muted">Nenhuma proposta salva</div>';
    return;
  }
  
  propostasFiltradas.sort((a, b) => new Date(b.dataModificacao) - new Date(a.dataModificacao));
  
  propostasFiltradas.forEach(p => {
    const div = document.createElement('div');
    div.className = 'proposta-item' + (p.id === state.propostaAtual ? ' ativa' : '');
    div.innerHTML = `
      <div class="proposta-info">
        <div class="proposta-nome"><strong>${p.nome}</strong></div>
        <div class="proposta-detalhes muted">
          Cliente: ${p.cliente || '—'} | Nº: ${p.numero || '—'} | 
          Modificado: ${new Date(p.dataModificacao).toLocaleDateString('pt-BR')}
        </div>
      </div>
      <div class="proposta-acoes">
        <button class="btn-carregar" data-id="${p.id}" title="Carregar">📂</button>
        <button class="btn-duplicar" data-id="${p.id}" title="Duplicar">📋</button>
        <button class="btn-excluir" data-id="${p.id}" title="Excluir">🗑️</button>
      </div>
    `;
    el.listaPropostas.appendChild(div);
  });
  
  // Event listeners
  document.querySelectorAll('.btn-carregar').forEach(btn => {
    btn.addEventListener('click', () => carregarProposta(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.btn-duplicar').forEach(btn => {
    btn.addEventListener('click', () => duplicarProposta(btn.getAttribute('data-id')));
  });
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', () => excluirProposta(btn.getAttribute('data-id')));
  });
}

function novaProposta() {
  if (state.itens.length > 0 || state.dados.cliente) {
    if (!confirm('Deseja criar uma nova proposta? Os dados atuais não salvos serão perdidos.')) {
      return;
    }
  }
  
  state.propostaAtual = null;
  state.dados = { cliente:'', cpfcnpj:'', contato:'', telefone:'', email:'', endereco:'', cidade:'', cep:'', numero:'', obra:'', prazo:'' };
  state.itens = [];
  state.seq = 1;
  state.calculos = { descontoTipo: 'percentual', descontoValor: 0 };
  
  preencherFormularios();
  renderDados();
  renderItens();
  renderCalculos();
  renderListaPropostas();
  
  if (el.nomeProposta) el.nomeProposta.value = '';
}

// NOVO: Exportação/Importação JSON
function exportarJSON() {
  const dados = {
    versao: '3.0',
    dataExportacao: new Date().toISOString(),
    state: state
  };
  
  const json = JSON.stringify(dados, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `propostas_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importarJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const dados = JSON.parse(e.target.result);
      if (dados.state) {
        Object.assign(state, dados.state);
        preencherFormularios();
        renderDados();
        renderItens();
        renderCalculos();
        renderCatalogoLista();
        updateProdutoSelect();
        renderListaPropostas();
        persist();
        alert('Dados importados com sucesso!');
      }
    } catch (err) {
      alert('Erro ao importar arquivo: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function preencherFormularios() {
  // Preencher form dados
  if (el.formDados) {
    [...el.formDados.elements].forEach(input => {
      if (!input.name) return;
      input.value = state.dados[input.name] || '';
    });
  }
  
  // Preencher form empresa
  if (el.formEmpresa) {
    [...el.formEmpresa.elements].forEach(input => {
      if (!input.name || input.type === 'file') return;
      input.value = state.emissor[input.name] || '';
    });
  }
  
  // Preencher form especificações
  if (el.formEspecificacoes) {
    [...el.formEspecificacoes.elements].forEach(input => {
      if (!input.name) return;
      input.value = state.especificacoes[input.name] || '';
    });
  }
  
  // Preencher form condições
  if (el.formCondicoes) {
    [...el.formCondicoes.elements].forEach(input => {
      if (!input.name) return;
      input.value = state.condicoesComerciais[input.name] || '';
    });
  }
  
  // Preencher form observações
  if (el.formObservacoes) {
    [...el.formObservacoes.elements].forEach(input => {
      if (!input.name) return;
      input.value = state.observacoesGerais[input.name] || '';
    });
  }
  
  // Preencher form cálculos
  if (el.formCalculos) {
    [...el.formCalculos.elements].forEach(input => {
      if (!input.name) return;
      input.value = state.calculos[input.name] || '';
    });
  }
}

function renderDados() {
  const d = state.dados;
  el.pv.numero.textContent = d.numero || '00-00-0000';
  el.pv.obra.textContent = (d.obra || 'OBRA').toUpperCase();
  el.pv.cliente.textContent = d.cliente || '—';
  el.pv.cpfcnpj.textContent = d.cpfcnpj || '—';
  el.pv.contato.textContent = d.contato || '—';
  el.pv.telefone.textContent = d.telefone || '—';
  el.pv.email.textContent = d.email || '—';
  el.pv.endereco.textContent = d.endereco || '—';
  el.pv.cidade.textContent = d.cidade || '—';
  el.pv.cep.textContent = d.cep || '—';
  el.pv.prazo.textContent = d.prazo || '—';
  el.pv.data.textContent = todayStr();

  const e = state.emissor || {};
  if (el.pv.empNome) el.pv.empNome.textContent = e.empresa || '—';
  if (el.pv.empDoc) el.pv.empDoc.textContent = [e.cnpj, e.ie].filter(Boolean).join(' / ') || '—';
  if (el.pv.empContato) el.pv.empContato.textContent = [e.telefone, e.email].filter(Boolean).join(' · ') || '—';
  if (el.pv.empEnd) el.pv.empEnd.textContent = [e.endereco, e.cidade, e.cep].filter(Boolean).join(' - ') || '—';
  if (el.pv.empLogo) {
    if (e.logo) { el.pv.empLogo.src = e.logo; el.pv.empLogo.style.display = 'inline-block'; }
    else { el.pv.empLogo.style.display = 'none'; }
  }
  if (el.brandLogo) {
    el.brandLogo.src = e.logo || 'assets/logo.svg';
  }

  // Renderizar especificações técnicas
  const esp = state.especificacoes || {};
  const vidrosText = [esp.vidroTipo, `espessura ${esp.vidroEspessura} mm`, `tipo ${esp.vidroAcabamento}`].filter(Boolean).join(', ');
  const perfisText = [esp.perfilLinha, `acabamento ${esp.perfilAcabamento}`].filter(Boolean).join(', ');
  
  if (el.pv.vidros) el.pv.vidros.textContent = vidrosText || '—';
  if (el.pv.perfis) el.pv.perfis.textContent = perfisText || '—';
  if (el.pv.ferragens) el.pv.ferragens.textContent = esp.ferragens || '—';
  if (el.pv.instalacao) el.pv.instalacao.textContent = esp.instalacao || '—';
  
  const garantiaEspecText = [
    esp.garantiaFabricacao ? `${esp.garantiaFabricacao} ano(s) contra defeitos de fabricação` : '',
    esp.garantiaInstalacao ? `${esp.garantiaInstalacao} meses para instalação (ajustes e regulagens)` : ''
  ].filter(Boolean).join('; ');
  if (el.pv.garantiaEspec) el.pv.garantiaEspec.textContent = garantiaEspecText || '—';
  if (el.pv.normas) el.pv.normas.textContent = esp.normasTecnicas || '—';

  // Renderizar condições comerciais
  const cond = state.condicoesComerciais || {};
  if (el.pv.prazoEntrega) el.pv.prazoEntrega.textContent = cond.prazoEntrega ? `${cond.prazoEntrega} dias úteis após aprovação e medição final` : '—';
  if (el.pv.prazoInstalacao) el.pv.prazoInstalacao.textContent = cond.prazoInstalacao ? `${cond.prazoInstalacao} dias úteis após início dos trabalhos` : '—';
  if (el.pv.validade) el.pv.validade.textContent = cond.validadeProposta ? `${cond.validadeProposta} dias corridos` : '—';
  if (el.pv.formaPagamento) el.pv.formaPagamento.textContent = cond.formaPagamento || '—';
  
  const garantiaText = [
    cond.garantiaPerfis ? `${cond.garantiaPerfis} anos de garantia contra defeitos de fabricação dos perfis de alumínio` : '',
    cond.garantiaVidros ? `${cond.garantiaVidros} ano(s) para os vidros e instalação` : ''
  ].filter(Boolean).join(' e ');
  if (el.pv.garantia) el.pv.garantia.textContent = garantiaText || '—';
  
  if (el.pv.obsComerciais && el.pv.obsComerciaisWrapper) {
    if (cond.observacoesComerciais) {
      el.pv.obsComerciais.textContent = cond.observacoesComerciais;
      el.pv.obsComerciaisWrapper.style.display = 'block';
    } else {
      el.pv.obsComerciaisWrapper.style.display = 'none';
    }
  }

  // Renderizar observações gerais
  const obs = state.observacoesGerais || {};
  if (el.pv.areaCobertura && el.pv.areaCoberturaWrapper) {
    if (obs.areaCobertura) {
      el.pv.areaCobertura.textContent = obs.areaCobertura;
      el.pv.areaCoberturaWrapper.style.display = 'block';
    } else {
      el.pv.areaCoberturaWrapper.style.display = 'none';
    }
  }
  if (el.pv.obsAlteracoes && el.pv.obsAlteracoesWrapper) {
    if (obs.observacaoAlteracoes) {
      el.pv.obsAlteracoes.textContent = obs.observacaoAlteracoes;
      el.pv.obsAlteracoesWrapper.style.display = 'block';
    } else {
      el.pv.obsAlteracoesWrapper.style.display = 'none';
    }
  }
  if (el.pv.obsAdicionais && el.pv.obsAdicionaisWrapper) {
    if (obs.observacoesAdicionais) {
      el.pv.obsAdicionais.textContent = obs.observacoesAdicionais;
      el.pv.obsAdicionaisWrapper.style.display = 'block';
    } else {
      el.pv.obsAdicionaisWrapper.style.display = 'none';
    }
  }
}

function renderItens() {
  // tabela de edição
  el.tabela.innerHTML = '';
  state.itens.forEach((it, idx) => {
    const row = document.createElement('div');
    row.className = 'linha';
    const area = calcularArea(it.largura || 0, it.altura || 0) * (it.qtd || 1);
    row.innerHTML = `
      <div class="codigo">${it.codigo}</div>
      <div>${it.produto}</div>
      <div>${it.qtd}</div>
      <div>${numBR.format(it.largura)}</div>
      <div>${numBR.format(it.altura)}</div>
      <div>${area.toFixed(2)} m²</div>
      <div>${it.linha}</div>
      <div>${it.local}</div>
      <div class="preco">${currencyBR.format(it.preco || 0)}</div>
      <div class="acoes">
        <button data-idx="${idx}" class="btn-remover">Remover</button>
      </div>
    `;
    el.tabela.appendChild(row);
  });

  // preview
  el.pv.itens.innerHTML = '';
  state.itens.forEach(it => {
    const card = document.createElement('div');
    card.className = 'item-card';
    const folhas = detectFolhas(it);
    const fig = folhas ? `<div class=\"figure\">${windowSVG(folhas)}</div>` : '';
    
    // Renderizar imagens se existirem
    let imagensHTML = '';
    if (it.imagens && it.imagens.length > 0) {
      imagensHTML = '<div class="item-imagens">';
      it.imagens.forEach(img => {
        imagensHTML += `<img src="${img.base64}" alt="${img.nome}" />`;
      });
      imagensHTML += '</div>';
    }
    
    const area = calcularArea(it.largura || 0, it.altura || 0) * (it.qtd || 1);
    
    card.innerHTML = `
      <div class="desc">${it.produto}</div>
      ${fig}
      ${imagensHTML}
      <div class="sub">Cor: ${it.cor || '—'} · Vidros: ${it.vidro || '—'}</div>
      ${it.caracteristicas && it.caracteristicas.length ? `<div class="sub">Caract.: ${it.caracteristicas.map(c=>`${c.nome}: ${c.valor}`).join(' · ')}</div>` : ''}
      <div class="grid">
        <div><strong>Tipo:</strong> ${it.codigo}</div>
        <div><strong>Qtd:</strong> ${it.qtd}</div>
        <div><strong>L:</strong> ${numBR.format(it.largura)}</div>
        <div><strong>H:</strong> ${numBR.format(it.altura)}</div>
        <div><strong>Área:</strong> ${area.toFixed(2)} m²</div>
        <div><strong>Linha:</strong> ${it.linha}</div>
        <div><strong>Localização:</strong> ${it.local}</div>
      </div>
      ${it.obs ? `<div class="muted">Obs.: ${it.obs}</div>` : ''}
    `;
    el.pv.itens.appendChild(card);
  });

  el.pv.totalItens.textContent = state.itens.length;
  const calc = calcularTotais();
  el.pv.valorTotal.textContent = (currencyBR.format(calc.valorComDesconto)).replace('R$', '').trim();

  // Remover handlers
  document.querySelectorAll('.btn-remover').forEach(b => {
    b.addEventListener('click', () => {
      const idx = Number(b.getAttribute('data-idx'));
      state.itens.splice(idx, 1);
      renderItens();
      renderCalculos();
      persist();
    });
  });
  
  renderCalculos();
}

function persist() {
  localStorage.setItem('proposta.esquadrias.v3', JSON.stringify(state));
}

function restore() {
  const raw = localStorage.getItem('proposta.esquadrias.v3');
  if (!raw) {
    // Tentar migrar da versão anterior
    const oldRaw = localStorage.getItem('proposta.esquadrias');
    if (oldRaw) {
      try {
        const oldState = JSON.parse(oldRaw);
        Object.assign(state.dados, oldState.dados || {});
        Object.assign(state.emissor, oldState.emissor || {});
        Object.assign(state.especificacoes, oldState.especificacoes || {});
        Object.assign(state.condicoesComerciais, oldState.condicoesComerciais || {});
        Object.assign(state.observacoesGerais, oldState.observacoesGerais || {});
        state.itens = oldState.itens || [];
        state.catalogo = oldState.catalogo || [];
        state.seq = oldState.seq || 1;
        persist(); // Salvar na nova versão
      } catch (e) {}
    }
    return;
  }
  try {
    const s = JSON.parse(raw);
    Object.assign(state, s);
    preencherFormularios();
    renderDados();
    renderItens();
    renderCalculos();
    renderCatalogoLista();
    updateProdutoSelect();
    renderListaPropostas();
  } catch (e) {}
}

/* Catálogo de modelos */
function updateProdutoSelect() {
  const sel = el.selProduto;
  const cur = sel.value;
  // limpar e repopular
  sel.innerHTML = '<option value="livre">Produto livre (descrição manual)</option>';
  state.catalogo.forEach((m, i) => {
    const op = document.createElement('option');
    op.value = `modelo:${i}`;
    op.textContent = m.nome;
    sel.appendChild(op);
  });
  if ([...sel.options].some(o => o.value === cur)) sel.value = cur;
}

function renderCamposDoModelo() {
  el.prodCampos.innerHTML = '';
  const selVal = el.selProduto.value;
  if (!selVal.startsWith('modelo:')) return; // nada a fazer para "livre"
  const idx = Number(selVal.split(':')[1]);
  const modelo = state.catalogo[idx];
  if (!modelo) return;
  const wrap = document.createElement('div');
  wrap.className = 'field-row';
  modelo.campos.forEach(c => {
    const g = document.createElement('div');
    g.className = 'field-group';
    g.innerHTML = `<label>${c.nome}</label><input data-campo="${c.nome}" />`;
    wrap.appendChild(g);
  });
  el.prodCampos.appendChild(wrap);
}

function addAttrRow(container, nome = '', valor = '') {
  const row = document.createElement('div');
  row.className = 'attr-row';
  row.innerHTML = `
    <input placeholder="Nome" value="${nome}" class="attr-nome"/>
    <input placeholder="Valor" value="${valor}" class="attr-valor"/>
    <button type="button" class="remove">Remover</button>
  `;
  container.appendChild(row);
  row.querySelector('.remove').addEventListener('click', () => row.remove());
}

/* Eventos catálogo */
el.btnAddCampo && el.btnAddCampo.addEventListener('click', () => {
  addAttrRow(el.catalogoCampos, '', '');
});

el.btnSalvarModelo && el.btnSalvarModelo.addEventListener('click', () => {
  const nome = el.formCatalogo.nome.value.trim();
  if (!nome) return;
  const campos = [...el.catalogoCampos.querySelectorAll('.attr-row')]
    .map(r => r.querySelector('.attr-nome').value.trim())
    .filter(Boolean)
    .map(n => ({ nome: n }));
  state.catalogo.push({ nome, campos });
  el.formCatalogo.nome.value = '';
  el.catalogoCampos.innerHTML = '';
  renderCatalogoLista();
  updateProdutoSelect();
  persist();
});

// Upload de logo da empresa
if (el.formEmpresa) {
  const logoInp = el.formEmpresa.querySelector('input[name="logo"]');
  if (logoInp) {
    logoInp.addEventListener('change', () => {
      const f = logoInp.files && logoInp.files[0];
      if (!f) { state.emissor.logo = ''; renderDados(); persist(); return; }
      const reader = new FileReader();
      reader.onload = () => { state.emissor.logo = reader.result; renderDados(); persist(); };
      reader.readAsDataURL(f);
    });
  }
}

function renderCatalogoLista() {
  if (!el.catalogoLista) return;
  el.catalogoLista.innerHTML = '';
  state.catalogo.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'modelo';
    const camposStr = (m.campos || []).map(c => c.nome).join(', ');
    div.innerHTML = `<div><strong>${m.nome}</strong><div class="muted">Campos: ${camposStr || '—'}</div></div>
      <div><button type="button" data-idx="${i}" class="remove-modelo">Excluir</button></div>`;
    el.catalogoLista.appendChild(div);
  });
  el.catalogoLista.querySelectorAll('.remove-modelo').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      state.catalogo.splice(idx, 1);
      renderCatalogoLista();
      updateProdutoSelect();
      persist();
    });
  });
}

el.selProduto && el.selProduto.addEventListener('change', renderCamposDoModelo);

el.btnAddCaracteristica && el.btnAddCaracteristica.addEventListener('click', () => {
  addAttrRow(el.caracteristicasList, '', '');
});

/* Eventos principais */
el.formDados.addEventListener('input', e => {
  const k = e.target.name; if (!k) return;
  state.dados[k] = e.target.value;
  renderDados();
  persist();
});

el.formEmpresa && el.formEmpresa.addEventListener('input', e => {
  const k = e.target.name; if (!k) return;
  state.emissor[k] = e.target.value;
  renderDados();
  persist();
});

el.formEspecificacoes && el.formEspecificacoes.addEventListener('input', e => {
  const k = e.target.name; if (!k) return;
  state.especificacoes[k] = e.target.value;
  renderDados();
  persist();
});

el.formCondicoes && el.formCondicoes.addEventListener('input', e => {
  const k = e.target.name; if (!k) return;
  state.condicoesComerciais[k] = e.target.value;
  renderDados();
  persist();
});

el.formObservacoes && el.formObservacoes.addEventListener('input', e => {
  const k = e.target.name; if (!k) return;
  state.observacoesGerais[k] = e.target.value;
  renderDados();
  persist();
});

el.formCalculos && el.formCalculos.addEventListener('input', e => {
  const k = e.target.name; if (!k) return;
  state.calculos[k] = e.target.value;
  renderCalculos();
  persist();
});

// NOVO: Upload de imagens para itens
let imagensTemporarias = [];

if (el.uploadImagemItem) {
  el.uploadImagemItem.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        imagensTemporarias.push({
          nome: file.name,
          base64: event.target.result
        });
        renderImagensPreview();
      };
      reader.readAsDataURL(file);
    });
  });
}

function renderImagensPreview() {
  if (!el.imagensItemPreview) return;
  el.imagensItemPreview.innerHTML = '';
  imagensTemporarias.forEach((img, idx) => {
    const div = document.createElement('div');
    div.className = 'imagem-container';
    div.innerHTML = `
      <img src="${img.base64}" alt="${img.nome}" />
      <button type="button" class="remove-img" data-idx="${idx}">×</button>
    `;
    el.imagensItemPreview.appendChild(div);
  });
  
  document.querySelectorAll('.remove-img').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      imagensTemporarias.splice(idx, 1);
      renderImagensPreview();
    });
  });
}

el.btnAdicionar.addEventListener('click', () => {
  const f = el.formItem;
  const it = {
    codigo: `J${state.seq++}`,
    produto: (el.selProduto.value === 'livre' ? (f.descricao.value || 'Produto personalizado') : el.selProduto.options[el.selProduto.selectedIndex].text),
    qtd: Number(f.qtd.value || 1),
    largura: Number(f.largura.value || 0),
    altura: Number(f.altura.value || 0),
    linha: f.linha.value || 'Suprema',
    local: f.local.value || '',
    cor: f.cor.value || '',
    vidro: f.vidro.value || '',
    obs: f.obs.value || '',
    preco: Number(f.preco.value || 0),
    caracteristicas: [],
    imagens: [...imagensTemporarias] // NOVO
  };
  // campos do modelo
  [...el.prodCampos.querySelectorAll('input[data-campo]')].forEach(inp => {
    it.caracteristicas.push({ nome: inp.getAttribute('data-campo'), valor: inp.value });
  });
  // características livres
  [...el.caracteristicasList.querySelectorAll('.attr-row')].forEach(r => {
    const nome = r.querySelector('.attr-nome').value.trim();
    const valor = r.querySelector('.attr-valor').value.trim();
    if (nome || valor) it.caracteristicas.push({ nome, valor });
  });

  state.itens.push(it);
  el.formItem.codigo.value = it.codigo;
  el.statusItem.textContent = `Item ${it.codigo} adicionado.`;
  // limpar campos livres
  el.prodCampos.innerHTML = '';
  el.caracteristicasList.innerHTML = '';
  imagensTemporarias = [];
  if (el.uploadImagemItem) el.uploadImagemItem.value = '';
  if (el.imagensItemPreview) el.imagensItemPreview.innerHTML = '';
  renderItens();
  persist();
});

el.btnNova.addEventListener('click', () => {
  novaProposta();
});

el.btnSalvar.addEventListener('click', () => {
  persist();
  el.btnSalvar.disabled = true;
  setTimeout(() => { el.btnSalvar.disabled = false; }, 800);
});

el.btnPDF.addEventListener('click', () => {
  const element = document.getElementById('propostaPreview');
  const d = state.dados;
  const file = `Proposta_${(d.numero||'0000').replace(/\s+/g,'_')}`;
  html2pdf().from(element).set({
    margin: 10,
    filename: `${file}.pdf`,
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).save();
});

// NOVO: Templates
el.btnAplicarTemplateFormaPagamento && el.btnAplicarTemplateFormaPagamento.addEventListener('click', aplicarTemplateFormaPagamento);
el.btnAplicarTemplateObsComerciais && el.btnAplicarTemplateObsComerciais.addEventListener('click', aplicarTemplateObsComerciais);
el.btnAplicarTemplateObsGerais && el.btnAplicarTemplateObsGerais.addEventListener('click', aplicarTemplateObsGerais);

// NOVO: Propostas
el.btnSalvarProposta && el.btnSalvarProposta.addEventListener('click', salvarProposta);
el.btnNovaProposta && el.btnNovaProposta.addEventListener('click', novaProposta);
el.buscaProposta && el.buscaProposta.addEventListener('input', renderListaPropostas);

// NOVO: Exportar/Importar JSON
el.btnExportarJSON && el.btnExportarJSON.addEventListener('click', exportarJSON);
el.inputImportarJSON && el.inputImportarJSON.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) importarJSON(file);
});
el.btnImportarJSON && el.btnImportarJSON.addEventListener('click', () => {
  el.inputImportarJSON && el.inputImportarJSON.click();
});

/* Desenho de imagem por número de folhas */
function detectFolhas(it) {
  const m = (it.produto || '').match(/(\d+)\s*Folhas?/i);
  if (m) return Number(m[1]);
  const c = (it.caracteristicas || []).find(c => /folhas/i.test(c.nome));
  if (c && c.valor) return Number(c.valor);
  return null;
}

function windowSVG(folhas = 2, W = 200, H = 100) {
  const gap = 6;
  const frame = 4;
  const paneW = (W - frame * 2 - gap * (folhas - 1)) / folhas;
  let panes = '';
  for (let i = 0; i < folhas; i++) {
    const x = frame + i * (paneW + gap);
    panes += `<rect x="${x}" y="${frame}" width="${paneW}" height="${H - frame * 2}" rx="2" ry="2" fill="#fff" stroke="#999"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="${W-2}" height="${H-2}" rx="6" ry="6" fill="#f7f7f7" stroke="#bbb"/>${panes}</svg>`;
}

// Inicialização
restore();
renderDados();
renderItens();
renderCalculos();
// pré-carga de alguns modelos se não houver catálogo
if (!state.catalogo || !state.catalogo.length) {
  state.catalogo = [...catalogoPadrao];
}
updateProdutoSelect();
renderCatalogoLista();
renderListaPropostas();

// Popular templates após DOM estar completamente carregado
setTimeout(() => {
  popularTemplatesFormaPagamento();
  popularTemplatesObsComerciais();
  popularTemplatesObsGerais();
}, 100);

