// Módulo de navegação — menu hambúrguer (o header é persistente, então isto roda uma única vez)

function inicializarMenuHamburguer() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-principal');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const aberto = menu.classList.toggle('menu-aberto');
    toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && menu.classList.contains('menu-aberto')) {
      menu.classList.remove('menu-aberto');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
