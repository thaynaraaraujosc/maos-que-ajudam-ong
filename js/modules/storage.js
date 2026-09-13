// Módulo de armazenamento — encapsula o acesso ao localStorage

const CHAVE_CADASTROS = 'ong_cadastros';

function obterCadastros() {
  try {
    const dados = localStorage.getItem(CHAVE_CADASTROS);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    return [];
  }
}

function salvarCadastro(cadastro) {
  const lista = obterCadastros();
  lista.push(cadastro);
  localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(lista));
}

function contarCadastros() {
  return obterCadastros().length;
}
