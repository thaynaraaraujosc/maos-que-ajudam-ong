// Ponto de entrada da aplicação — inicializa os elementos persistentes do shell (header/menu)
// O roteamento (js/modules/router.js) já cuida de renderizar o conteúdo de <main id="app">

document.addEventListener('DOMContentLoaded', function () {
  inicializarMenuHamburguer();
});
