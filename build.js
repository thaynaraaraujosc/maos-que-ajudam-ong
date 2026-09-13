// Script de build de produção: minifica CSS/JS e copia HTML/imagens para dist/,
// mantendo exatamente a mesma estrutura de pastas (para os caminhos relativos
// do index.html continuarem funcionando sem nenhuma alteração).

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const RAIZ = __dirname;
const DIST = path.join(RAIZ, 'dist');

function tamanho(caminho) {
  return fs.statSync(caminho).size;
}

function formatarBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

function listarArquivos(dir, extensao) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const caminho = path.join(dir, item.name);
    if (item.isDirectory()) return listarArquivos(caminho, extensao);
    return caminho.endsWith(extensao) ? [caminho] : [];
  });
}

function garantirPasta(caminho) {
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
}

async function minificarArquivos(extensao, loader) {
  const arquivos = [
    ...listarArquivos(path.join(RAIZ, 'css'), extensao === 'css' ? '.css' : '.nunca'),
    ...listarArquivos(path.join(RAIZ, 'js'), extensao === 'js' ? '.js' : '.nunca'),
  ];

  const relatorio = [];

  for (const origem of arquivos) {
    const relativo = path.relative(RAIZ, origem);
    const destino = path.join(DIST, relativo);
    garantirPasta(destino);

    const resultado = await esbuild.build({
      entryPoints: [origem],
      minify: true,
      write: false,
      loader: { [path.extname(origem)]: loader },
      target: extensao === 'css' ? undefined : ['es2018'],
    });

    fs.writeFileSync(destino, resultado.outputFiles[0].contents);

    const antes = tamanho(origem);
    const depois = tamanho(destino);
    relatorio.push({ arquivo: relativo, antes, depois });
  }

  return relatorio;
}

function copiarArquivo(origem, destinoRelativo) {
  const destino = path.join(DIST, destinoRelativo);
  garantirPasta(destino);
  fs.copyFileSync(origem, destino);
}

async function build() {
  fs.rmSync(DIST, { recursive: true, force: true });

  const relatorioCSS = await minificarArquivos('css', 'css');
  const relatorioJS = await minificarArquivos('js', 'js');

  // HTML é copiado sem transformação (fora do escopo desta build simples)
  copiarArquivo(path.join(RAIZ, 'html', 'index.html'), 'html/index.html');

  // Imagens já otimizadas manualmente (JPEG comprimido + variantes WebP/responsivas)
  // são apenas copiadas — a otimização/conversão em si foi feita uma vez com Pillow
  const IMAGENS = [
    'equipe-voluntarios.jpg',
    'equipe-voluntarios.webp',
    'equipe-voluntarios-480w.jpg',
    'equipe-voluntarios-480w.webp',
  ];
  IMAGENS.forEach((nome) => {
    copiarArquivo(path.join(RAIZ, 'img', nome), path.join('img', nome));
  });

  const todos = [...relatorioCSS, ...relatorioJS];
  const totalAntes = todos.reduce((s, r) => s + r.antes, 0);
  const totalDepois = todos.reduce((s, r) => s + r.depois, 0);
  const reducao = (((totalAntes - totalDepois) / totalAntes) * 100).toFixed(1);

  console.log('\nBuild de produção concluído em dist/\n');
  console.log('Arquivo'.padEnd(35), 'Antes'.padEnd(12), 'Depois'.padEnd(12), 'Redução');
  todos.forEach((r) => {
    const red = (((r.antes - r.depois) / r.antes) * 100).toFixed(1);
    console.log(
      r.arquivo.padEnd(35),
      formatarBytes(r.antes).padEnd(12),
      formatarBytes(r.depois).padEnd(12),
      red + '%'
    );
  });
  console.log('\nTOTAL:', formatarBytes(totalAntes), '->', formatarBytes(totalDepois), `(-${reducao}%)`);
}

build();
