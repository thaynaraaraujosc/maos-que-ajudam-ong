// Módulo de templates — gera o HTML de cada "página" da SPA dinamicamente

function renderHome() {
  const totalCadastrados = contarCadastros();

  return `
    <section class="hero" aria-labelledby="hero-titulo">
      <div class="container">
        <div class="alerta alerta-info" role="status">
          <span aria-hidden="true">ℹ️</span>
          <p>Campanha do inverno em andamento: estamos arrecadando cobertores e agasalhos até o fim do mês.</p>
        </div>

        <h2 id="hero-titulo">Transformando comunidades através da solidariedade</h2>
        <p>Há mais de 10 anos levando educação, alimentação e acolhimento a quem mais precisa.</p>
        <a class="botao" href="#/cadastro">Quero ser voluntário(a)</a>
      </div>
    </section>

    <section class="sobre" aria-labelledby="sobre-titulo">
      <div class="container sobre-grid">
        <picture>
          <source
            type="image/webp"
            srcset="../img/equipe-voluntarios-480w.webp 480w, ../img/equipe-voluntarios.webp 960w"
            sizes="(min-width: 700px) 480px, 100vw">
          <img
            src="../img/equipe-voluntarios.jpg"
            srcset="../img/equipe-voluntarios-480w.jpg 480w, ../img/equipe-voluntarios.jpg 960w"
            sizes="(min-width: 700px) 480px, 100vw"
            alt="Grupo de voluntários da ONG Mãos que Ajudam sorrindo e se abraçando durante uma ação social ao ar livre"
            width="480"
            height="320"
            loading="lazy"
            class="sobre-imagem">
        </picture>

        <div class="sobre-texto">
          <h2 id="sobre-titulo">Quem somos</h2>
          <p>
            A <strong>Mãos que Ajudam</strong> é uma organização não governamental sem fins lucrativos
            que atua diretamente com comunidades em situação de vulnerabilidade social. Nosso trabalho
            é possível graças à rede de voluntários e doadores que acreditam em um futuro mais justo.
          </p>
          <button type="button" class="botao botao-secundario" id="abrir-modal-historia">
            Saiba mais sobre nossa história
          </button>
        </div>

        <div class="cards">
          <article class="card">
            <h3>Missão</h3>
            <p>Promover dignidade e oportunidades através de ações sociais contínuas.</p>
          </article>
          <article class="card">
            <h3>Visão</h3>
            <p>Ser referência em impacto social sustentável na região até 2030.</p>
          </article>
          <article class="card">
            <h3>Valores</h3>
            <p>Transparência, empatia, respeito e compromisso com a comunidade.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="numeros" aria-labelledby="numeros-titulo">
      <div class="container">
        <h2 id="numeros-titulo">Nosso impacto em números</h2>
        <ul class="lista-numeros">
          <li><strong>3.200+</strong><span>pessoas atendidas</span></li>
          <li><strong>150</strong><span>voluntários ativos</span></li>
          <li><strong>12</strong><span>projetos sociais</span></li>
          <li><strong>${totalCadastrados}</strong><span>cadastros feitos por este navegador</span></li>
        </ul>
      </div>
    </section>

    <section class="cta" aria-labelledby="cta-titulo">
      <div class="container">
        <h2 id="cta-titulo">Faça parte dessa transformação</h2>
        <p>Seu cadastro é o primeiro passo para ajudar quem mais precisa.</p>
        <a class="botao botao-secundario" href="#/cadastro">Cadastrar agora</a>
      </div>
    </section>
  `;
}

// Dados de origem dos projetos — a fonte que alimenta o template dinamicamente.
// Trocar/adicionar um projeto aqui é suficiente para atualizar a tela, sem tocar em HTML.
const PROJETOS = [
  {
    id: 'alimento-solidario',
    badgeClasse: 'badge-secondary',
    badgeTexto: 'Alimentação',
    titulo: 'Alimento Solidário',
    descricao: 'Distribuição semanal de cestas básicas para famílias em situação de vulnerabilidade, beneficiando mais de 400 famílias por mês.',
    comoAjudar: [
      'Doação de alimentos não perecíveis',
      'Voluntariado na triagem e entrega',
      'Doação financeira mensal',
    ],
  },
  {
    id: 'educacao-para-todos',
    badgeClasse: 'badge-primary',
    badgeTexto: 'Educação',
    titulo: 'Educação para Todos',
    descricao: 'Reforço escolar gratuito e oficinas de leitura para crianças e adolescentes de 6 a 15 anos, em parceria com escolas da rede pública.',
    comoAjudar: [
      'Voluntariado como educador(a)',
      'Doação de materiais escolares',
      'Apadrinhamento de turma',
    ],
  },
  {
    id: 'acolhimento-e-saude',
    badgeClasse: 'badge-success',
    badgeTexto: 'Saúde',
    titulo: 'Acolhimento e Saúde',
    descricao: 'Atendimento psicológico e encaminhamento à rede de saúde pública para pessoas em situação de rua e famílias de baixa renda.',
    comoAjudar: [
      'Voluntariado na área da saúde e psicologia',
      'Doação de itens de higiene pessoal',
      'Divulgação da campanha',
    ],
  },
];

// Gera o <article> de um único projeto a partir do objeto de dados
function renderCardProjeto(projeto) {
  const itensComoAjudar = projeto.comoAjudar
    .map((item) => `<li>${item}</li>`)
    .join('');

  return `
    <article class="projeto" id="${projeto.id}">
      <span class="badge ${projeto.badgeClasse}">${projeto.badgeTexto}</span>
      <h3>${projeto.titulo}</h3>
      <p>${projeto.descricao}</p>
      <h4>Como ajudar</h4>
      <ul>${itensComoAjudar}</ul>
    </article>
  `;
}

function renderProjetos() {
  const cardsHtml = PROJETOS.map(renderCardProjeto).join('');

  return `
    <section class="pagina-intro" aria-labelledby="projetos-titulo">
      <div class="container">
        <h2 id="projetos-titulo">Nossos Projetos Sociais</h2>
        <p>Iniciativas que mudam vidas todos os dias em nossa comunidade.</p>
      </div>
    </section>

    <section class="lista-projetos" aria-label="Lista de projetos sociais">
      <div class="container">
        ${cardsHtml}
      </div>
    </section>

    <section class="cta" aria-labelledby="cta-projetos-titulo">
      <div class="container">
        <h2 id="cta-projetos-titulo">Quer apoiar algum desses projetos?</h2>
        <p>Cadastre-se e escolha como deseja contribuir.</p>
        <a class="botao botao-secundario" href="#/cadastro">Fazer meu cadastro</a>
      </div>
    </section>
  `;
}

function renderCadastro() {
  return `
    <section class="pagina-intro" aria-labelledby="cadastro-titulo">
      <div class="container">
        <h2 id="cadastro-titulo">Cadastro de Voluntário(a) / Doador(a)</h2>
        <p>Preencha o formulário abaixo. Os campos marcados com * são obrigatórios.</p>
      </div>
    </section>

    <section class="form-section" aria-label="Formulário de cadastro">
      <div class="container container-form">
        <div class="alerta alerta-info" role="note">
          <span aria-hidden="true">🔒</span>
          <p>Seus dados são usados apenas para contato da ONG e tratados conforme a LGPD.</p>
        </div>

        <form id="form-cadastro" novalidate>
          <fieldset>
            <legend>Dados pessoais</legend>

            <div class="campo">
              <label for="nome">Nome completo *</label>
              <input type="text" id="nome" name="nome" required minlength="3" autocomplete="name">
            </div>

            <div class="campo">
              <label for="cpf">CPF *</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                required
                inputmode="numeric"
                placeholder="000.000.000-00"
                maxlength="14"
                pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
                title="Formato esperado: 000.000.000-00"
                autocomplete="off">
            </div>

            <div class="campo">
              <label for="nascimento">Data de nascimento *</label>
              <input type="date" id="nascimento" name="nascimento" required autocomplete="bday">
            </div>
          </fieldset>

          <fieldset>
            <legend>Contato</legend>

            <div class="campo">
              <label for="email">E-mail *</label>
              <input type="email" id="email" name="email" required autocomplete="email">
            </div>

            <div class="campo">
              <label for="telefone">Telefone / WhatsApp *</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                inputmode="numeric"
                placeholder="(00) 00000-0000"
                maxlength="15"
                pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}"
                title="Formato esperado: (00) 00000-0000"
                autocomplete="tel">
            </div>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>

            <div class="campo">
              <label for="cep">CEP *</label>
              <input
                type="text"
                id="cep"
                name="cep"
                required
                inputmode="numeric"
                placeholder="00000-000"
                maxlength="9"
                pattern="\\d{5}-\\d{3}"
                title="Formato esperado: 00000-000"
                autocomplete="postal-code">
            </div>

            <div class="campo">
              <label for="cidade">Cidade *</label>
              <input type="text" id="cidade" name="cidade" required autocomplete="address-level2">
            </div>
          </fieldset>

          <fieldset>
            <legend>Como você quer ajudar? *</legend>

            <div class="campo campo-radio">
              <input type="radio" id="opcao-voluntario" name="participacao" value="voluntario" required>
              <label for="opcao-voluntario">Quero ser voluntário(a)</label>
            </div>
            <div class="campo campo-radio">
              <input type="radio" id="opcao-doador" name="participacao" value="doador">
              <label for="opcao-doador">Quero ser doador(a)</label>
            </div>
            <div class="campo campo-radio">
              <input type="radio" id="opcao-ambos" name="participacao" value="ambos">
              <label for="opcao-ambos">Quero ser voluntário(a) e doador(a)</label>
            </div>
          </fieldset>

          <div class="campo campo-checkbox">
            <input type="checkbox" id="termos" name="termos" required>
            <label for="termos">Li e aceito os termos de uso e a política de privacidade *</label>
          </div>

          <button type="submit" class="botao">Enviar cadastro</button>
          <p id="mensagem-envio" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
}
