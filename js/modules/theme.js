// Módulo de tema — alterna entre modo claro/escuro e persiste a escolha no localStorage

const CHAVE_TEMA = 'ong_tema';

function aplicarTema(tema) {
  if (tema === 'dark' || tema === 'light') {
    document.documentElement.setAttribute('data-theme', tema);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function temaEstaEscuro() {
  const salvo = localStorage.getItem(CHAVE_TEMA);
  if (salvo) return salvo === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function atualizarBotaoTema(botao, icone, escuro) {
  botao.setAttribute('aria-pressed', escuro ? 'true' : 'false');
  botao.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
  icone.textContent = escuro ? '☀️' : '🌙';
}

function inicializarAlternadorDeTema() {
  const botao = document.getElementById('alternar-tema');
  const icone = document.getElementById('icone-tema');
  if (!botao || !icone) return;

  const salvo = localStorage.getItem(CHAVE_TEMA);
  if (salvo) aplicarTema(salvo);
  atualizarBotaoTema(botao, icone, temaEstaEscuro());

  botao.addEventListener('click', () => {
    const novoTema = temaEstaEscuro() ? 'light' : 'dark';
    localStorage.setItem(CHAVE_TEMA, novoTema);
    aplicarTema(novoTema);
    atualizarBotaoTema(botao, icone, novoTema === 'dark');
  });
}
