// Módulo de validação — máscaras de entrada e verificação do formulário de cadastro

function aplicarMascaraCPF(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
}

function aplicarMascaraCEP(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');
}

// Validação de idade mínima usando Day.js (cálculo de datas que o HTML5 puro não resolve)
const IDADE_MINIMA = 16;

function inicializarValidacaoIdade() {
  const nascimentoInput = document.getElementById('nascimento');
  if (!nascimentoInput) return;

  nascimentoInput.addEventListener('input', () => {
    if (!nascimentoInput.value) {
      nascimentoInput.setCustomValidity('');
      return;
    }

    const idade = dayjs().diff(dayjs(nascimentoInput.value), 'year');

    if (idade < IDADE_MINIMA) {
      nascimentoInput.setCustomValidity(
        `É preciso ter pelo menos ${IDADE_MINIMA} anos para se cadastrar.`
      );
    } else {
      nascimentoInput.setCustomValidity('');
    }
  });
}

// Chamada pelo roteador toda vez que a página de cadastro é renderizada
function inicializarFormularioCadastro() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const cepInput = document.getElementById('cep');
  const mensagemEnvio = document.getElementById('mensagem-envio');

  cpfInput.addEventListener('input', (e) => {
    e.target.value = aplicarMascaraCPF(e.target.value);
  });

  telefoneInput.addEventListener('input', (e) => {
    e.target.value = aplicarMascaraTelefone(e.target.value);
  });

  cepInput.addEventListener('input', (e) => {
    e.target.value = aplicarMascaraCEP(e.target.value);
  });

  inicializarValidacaoIdade();

  const camposDeTexto = form.querySelectorAll(
    'input:not([type="radio"]):not([type="checkbox"])'
  );

  camposDeTexto.forEach((campo) => {
    campo.addEventListener('blur', () => {
      const preenchido = campo.value !== '';
      const valido = campo.checkValidity();

      campo.classList.toggle('campo-invalido', preenchido && !valido);
      campo.classList.toggle('campo-valido', preenchido && valido);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      mensagemEnvio.textContent = 'Verifique os campos destacados antes de enviar.';
      mensagemEnvio.classList.add('mensagem-erro');
      return;
    }

    const dados = Object.fromEntries(new FormData(form).entries());
    salvarCadastro(dados);

    mensagemEnvio.classList.remove('mensagem-erro');
    mensagemEnvio.textContent = 'Cadastro enviado com sucesso! Em breve entraremos em contato.';
    mostrarToast('Cadastro enviado com sucesso!', 'sucesso');

    form.reset();
    camposDeTexto.forEach((campo) => campo.classList.remove('campo-valido', 'campo-invalido'));
  });
}
