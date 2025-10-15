/* Estado principal da proposta */
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
  itens: [],
  catalogo: [],
  seq: 1
};

const el = {
  formDados: document.getElementById('formDados'),
  formEmpresa: document.getElementById('formEmpresa'),
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
    empEnd: document.getElementById('pv-emp-end')
  },
  statusItem: document.getElementById('statusItem'),
  btnAdicionar: document.getElementById('btnAdicionar'),
  btnNova: document.getElementById('btnNova'),
  btnSalvar: document.getElementById('btnSalvar'),
  btnPDF: document.getElementById('btnPDF'),
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
}

function renderItens() {
  // tabela de edição
  el.tabela.innerHTML = '';
  state.itens.forEach((it, idx) => {
    const row = document.createElement('div');
    row.className = 'linha';
    row.innerHTML = `
      <div class="codigo">${it.codigo}</div>
      <div>${it.produto}</div>
      <div>${it.qtd}</div>
      <div>${numBR.format(it.largura)}</div>
      <div>${numBR.format(it.altura)}</div>
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
    card.innerHTML = `
      <div class="desc">${it.produto}</div>
      ${fig}
      <div class="sub">Cor: ${it.cor || '—'} · Vidros: ${it.vidro || '—'}</div>
      ${it.caracteristicas && it.caracteristicas.length ? `<div class="sub">Caract.: ${it.caracteristicas.map(c=>`${c.nome}: ${c.valor}`).join(' · ')}</div>` : ''}
      <div class="grid">
        <div><strong>Tipo:</strong> ${it.codigo}</div>
        <div><strong>Qtd:</strong> ${it.qtd}</div>
        <div><strong>L:</strong> ${numBR.format(it.largura)}</div>
        <div><strong>H:</strong> ${numBR.format(it.altura)}</div>
        <div><strong>Linha:</strong> ${it.linha}</div>
        <div><strong>Localização:</strong> ${it.local}</div>
      </div>
      ${it.obs ? `<div class="muted">Obs.: ${it.obs}</div>` : ''}
    `;
    el.pv.itens.appendChild(card);
  });

  el.pv.totalItens.textContent = state.itens.length;
  const total = state.itens.reduce((sum, it) => sum + (Number(it.preco) || 0), 0);
  el.pv.valorTotal.textContent = (currencyBR.format(total)).replace('R$', '').trim();

  // Remover handlers
  document.querySelectorAll('.btn-remover').forEach(b => {
    b.addEventListener('click', () => {
      const idx = Number(b.getAttribute('data-idx'));
      state.itens.splice(idx, 1);
      renderItens();
      persist();
    });
  });
}

function persist() {
  localStorage.setItem('proposta.esquadrias', JSON.stringify(state));
}

function restore() {
  const raw = localStorage.getItem('proposta.esquadrias');
  if (!raw) return;
  try {
    const s = JSON.parse(raw);
    Object.assign(state.dados, s.dados || {});
    Object.assign(state.emissor, s.emissor || {});
    state.itens = s.itens || [];
    state.catalogo = s.catalogo || [];
    state.seq = s.seq || 1;
    // preencher form dados
    [...el.formDados.elements].forEach(input => {
      if (!input.name) return;
      input.value = state.dados[input.name] || '';
    });
    // preencher form empresa
    if (el.formEmpresa) {
      [...el.formEmpresa.elements].forEach(input => {
        if (!input.name) return;
        input.value = state.emissor[input.name] || '';
      });
    }
    renderDados();
    renderItens();
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

/* Eventos */
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
    caracteristicas: []
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
  renderItens();
  persist();
});

el.btnNova.addEventListener('click', () => {
  state.dados = { cliente:'', cpfcnpj:'', contato:'', telefone:'', email:'', endereco:'', cidade:'', cep:'', numero:'', obra:'', prazo:'' };
  state.emissor = { empresa:'', cnpj:'', ie:'', telefone:'', email:'', endereco:'', cidade:'', cep:'', logo:'' };
  state.itens = []; state.seq = 1;
  [...el.formDados.elements].forEach(input => { if (input.name) input.value=''; });
  if (el.formEmpresa) {
    [...el.formEmpresa.elements].forEach(input => { if (input.name) input.value=''; });
    const logoInp = el.formEmpresa.querySelector('input[name="logo"]');
    if (logoInp) logoInp.value = '';
  }
  [...el.formItem.elements].forEach(input => { if (input.name && input.name!=='codigo') input.value=''; });
  renderDados(); renderItens(); persist();
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
// pré-carga de alguns modelos se não houver catálogo
if (!state.catalogo || !state.catalogo.length) {
  state.catalogo = [
    { nome: 'Janela de Correr - 4 Folhas - Linha Suprema', campos: [] },
    { nome: 'Janela de Correr - 2 Folhas - Linha Suprema', campos: [] },
    { nome: 'Porta de Correr - 2 Folhas - Linha Suprema', campos: [] },
    { nome: 'Porta Balcão - Linha Suprema', campos: [] }
  ];
}
updateProdutoSelect();
renderCatalogoLista();
renderCamposDoModelo();