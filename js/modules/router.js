// Módulo de roteamento — implementa a navegação de página única (SPA) via hash da URL

const ROTAS = {
  inicio: { render: renderHome, titulo: 'Mãos que Ajudam | Início' },
  projetos: { render: renderProjetos, titulo: 'Mãos que Ajudam | Projetos Sociais' },
  cadastro: { render: renderCadastro, titulo: 'Mãos que Ajudam | Cadastro' },
};

function obterRotaAtual() {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  return ROTAS[hash] ? hash : 'inicio';
}

function atualizarLinkAtivo(rotaAtual) {
  document.querySelectorAll('#menu-principal > li > a[data-rota]').forEach((link) => {
    if (link.dataset.rota === rotaAtual) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Executa a inicialização de JS específica da página recém-renderizada
function inicializarPagina(rotaAtual) {
  if (rotaAtual === 'inicio') {
    inicializarModalHistoria();
  }
  if (rotaAtual === 'cadastro') {
    inicializarFormularioCadastro();
  }
}

// Elementos do shell (persistentes entre rotas) que precisam ser "resetados"
// antes de trocar de página, para não vazar estado de uma rota para a outra
function fecharModaisAbertos() {
  document.querySelectorAll('dialog[open]').forEach((dialog) => dialog.close());
}

function roteador() {
  const rotaAtual = obterRotaAtual();
  const app = document.getElementById('app');

  fecharModaisAbertos();

  app.innerHTML = ROTAS[rotaAtual].render();
  document.title = ROTAS[rotaAtual].titulo;

  atualizarLinkAtivo(rotaAtual);
  inicializarPagina(rotaAtual);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', roteador);
window.addEventListener('DOMContentLoaded', roteador);
