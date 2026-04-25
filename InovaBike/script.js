const bikeImg = 'https://images.unsplash.com/photo-1620802051782-725fa33db067?auto=format&fit=crop&w=900&q=80';
const bikes = [
  {
    nome: 'MC X12 1000W',
    desc: 'Bike elétrica robusta, ideal para deslocamentos diários com conforto, potência e ótima autonomia.',
    img: 'IMG/mcx12.png',
    specs: ['60 km', '32 km/h', 'Bateria Removível', '1000W']
  },
  {
    nome: 'V20 Pro 1000W',
    desc: 'Projetada para entregadores e profissionais que precisam de resistência, autonomia e desempenho no trabalho.',
    img: 'IMG/v20pro.png',
    specs: ['70 km', '32 km/h', '48V 15Ah', '1000W']
  },
  {
    nome: 'G60 1000W',
    desc: 'Mais força e estabilidade para transporte urbano, perfeita para cargas leves e uso intenso.',
    img: 'IMG/g60.png',
    specs: ['55 km', '28 km/h', 'Bateria Removível', '1000W']
  },
  {
    nome: 'BEMMY FXH006 1500W',
    desc: 'Bike elétrica parruda com pneu fat, ideal para ladeiras íngremes e terrenos irregulares. Motor com maior torque da categoria e suspensão hidráulica.',
    img: 'IMG/fxh006.png',
    specs: ['80 km', '45 km/h', '48V 20Ah', '1500W']
  }
];

const plans = [
  {
    nome: '🥉 Plano Bronze',
    preco: 'R$ 199',
    periodo: '/semana',
    adesao: 'R$ 99',
    desc: 'Ideal para quem quer começar com economia e praticidade no dia a dia.',
    itens: [
      'Bike elétrica inclusa',
      'Suporte técnico básico',
      'Reboque 24h',
      'Clube de vantagens básico',
      'Orientação inicial de uso e segurança',
      'Retirada em base parceira',
      'Assistência em caso de problemas mecânicos',
      'Acesso a capacitações básicas'
    ]
  },
  {
    nome: '🥈 Plano Prata',
    preco: 'R$ 299',
    periodo: '/semana',
    adesao: 'R$ 149',
    desc: 'Mais liberdade, benefícios e suporte para quem utiliza a bike com frequência.',
    itens: [
      'Bike elétrica inclusa',
      'Bateria removível',
      'Suporte técnico prioritário',
      'Reboque 24h incluso',
      'Clube de vantagens premium',
      'Capa de chuva exclusiva',
      'Capacitação profissional',
      'Suporte psicológico',
      'Orientação jurídica',
      'Suporte contábil',
      'Cancelamento flexível',
      'Descontos em parceiros e oficinas'
    ]
  },
  {
    nome: '🥇 Plano Ouro',
    preco: 'R$ 399',
    periodo: '/semana',
    adesao: 'R$ 199',
    desc: 'O plano completo para máxima segurança, performance e benefícios exclusivos.',
    itens: [
      'Bike elétrica premium inclusa',
      'Proteção contra roubo e furto',
      'Suporte VIP 24h',
      'Reboque prioritário',
      'Clube de vantagens exclusivo + cashback',
      'Capa de chuva premium',
      'Capacitação profissional avançada',
      'Suporte psicológico premium',
      'Orientação jurídica completa',
      'Suporte contábil prioritário',
      'Atendimento técnico VIP',
      'Bateria removível',
      'Assistência emergencial prioritária',
      'Renovação com benefícios exclusivos',
      'Atendimento empresarial e corporativo'
    ]
  }
];

let selectedBike = 0;

function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const map = { home: 0, bikes: 1, detail: 1, plans: 2, map: 3, account: 4 };
  if (map[id] !== undefined) document.querySelectorAll('.nav-btn')[map[id]].classList.add('active');
  updateQR();
}

function mascaraCPF(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = v;
}

function continuar() {
  const cpf = document.getElementById('cpf').value;
  if (cpf.length < 14) return toast('Digite um CPF válido para continuar.');
  toast('Acesso liberado!');
  setTimeout(() => go('bikes'), 500);
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function renderBikes() {
  const chips = document.getElementById('bikeChips');
  chips.innerHTML = bikes.map((b, i) => `
        <button class="chip ${i === selectedBike ? 'active' : ''}" onclick="selectBike(${i})">
          <img src="${b.img}" alt="${b.nome}"><span>${b.nome}</span>
        </button>`).join('');
  applyBike();
}

function selectBike(i) { selectedBike = i; renderBikes(); }

function applyBike() {
  const b = bikes[selectedBike];
  document.getElementById('bikeName').textContent = b.nome;
  document.getElementById('bikeDesc').textContent = b.desc;
  document.getElementById('bikeImg').src = b.img;
  document.getElementById('detailName').textContent = b.nome;
  document.getElementById('detailImg').src = b.img;
  document.getElementById('activeImg').src = bikes[0].img;
  const labels = ['Autonomia', 'Velocidade máx.', 'Bateria', 'Motor'];
  const specsHTML = b.specs.map((s, i) => `<div class="spec"><small>${labels[i]}</small><b>${s}</b></div>`).join('');
  document.getElementById('bikeSpecs').innerHTML = specsHTML;
  document.getElementById('detailSpecs').innerHTML = specsHTML;
}

function renderPlans() {
  document.getElementById('plansList').innerHTML = plans.map(p => `
        <div class="plan">
          <h2>${p.nome}</h2>
          <p>${p.desc}</p>
          <div class="price">${p.preco} <small>${p.periodo}</small></div>
          <div class="adesao"><small>Taxa de adesão:</small> <b>${p.adesao}</b></div>
          <div class="checks">${p.itens.map(i => `<span>${i}</span>`).join('')}</div>
          <button class="btn" onclick="contratar('${p.nome}')">CONTRATAR AGORA</button>
        </div>`).join('');
}

function contratar(plano) {
  toast(`${plano} selecionado!`);
  setTimeout(() => go('active'), 650);
}

function simularFinanciamento() {
  const valor = Number(document.getElementById('valorBike').value);
  const entrada = Number(document.getElementById('entrada').value);
  const parcelas = Number(document.getElementById('parcelas').value);
  const taxa = 1.019;
  const total = Math.max(valor - entrada, 0) * taxa;
  const parcela = total / parcelas;
  document.getElementById('resultadoFinanciamento').innerHTML = `Entrada de <b>R$ ${entrada.toFixed(2)}</b><br>Parcelas estimadas: <b>${parcelas}x de R$ ${parcela.toFixed(2)}</b>`;
  toast('Simulação gerada!');
}

function updateQR() {
  const link = location.href.split('#')[0];
  document.getElementById('appLink').textContent = link;
  document.getElementById('qrImg').src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(link)}`;
}

async function copiarLink() {
  const link = document.getElementById('appLink').textContent;
  try { await navigator.clipboard.writeText(link); toast('Link copiado!'); }
  catch { toast('Copie o link manualmente.'); }
}

function changeMap() {
  const city = document.getElementById('citySelect').value;
  let query = 'Salvador,BA';
  if (city === 'camacari') query = 'Camaçari,BA';
  if (city === 'lauro') query = 'Lauro de Freitas,BA';
  
  document.getElementById('mapIframe').src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
}

renderBikes();
renderPlans();
updateQR();
