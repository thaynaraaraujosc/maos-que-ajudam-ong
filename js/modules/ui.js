// Módulo de UI — modal "Nossa história" (dialog nativo) e toasts de notificação

// Chamada pelo roteador toda vez que a página inicial é renderizada
function inicializarModalHistoria() {
  const modal = document.getElementById('modal-historia');
  const abrir = document.getElementById('abrir-modal-historia');
  const fechar = document.getElementById('fechar-modal-historia');
  const fecharRodape = document.getElementById('fechar-modal-historia-rodape');

  if (!modal || !abrir) return;

  abrir.addEventListener('click', () => modal.showModal());
  fechar.addEventListener('click', () => modal.close());
  fecharRodape.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

function mostrarToast(mensagem, tipo) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + tipo;
  toast.textContent = mensagem;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visivel'));

  setTimeout(() => {
    toast.classList.remove('toast-visivel');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
