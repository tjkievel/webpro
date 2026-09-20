class Aluno {
  constructor(nome, nota1, nota2, nota3, nota4, id = null) {
    this.id = id ?? `aluno-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    this.nome = nome;
    this.nota1 = Number(nota1);
    this.nota2 = Number(nota2);
    this.nota3 = Number(nota3);
    this.nota4 = Number(nota4);
    this.resultadoFinal = this.calcularMedia();
    this.avaliacao = this.definirAvaliacao();
  }

  calcularMedia() {
    const soma = this.nota1 + this.nota2 + this.nota3 + this.nota4;
    return Number((soma / 4).toFixed(2));
  }

  definirAvaliacao() {
    if (this.resultadoFinal < 6) {
      return 'Reprovado';
    }

    if (this.resultadoFinal >= 6 && this.resultadoFinal <= 8) {
      return 'Recuperação';
    }

    return 'Aprovado';
  }
}

const STORAGE_KEY = 'alunosRelatorio';
const DARK_MODE_KEY = 'alunosDarkMode';
const alunos = carregarAlunos();

const form = document.getElementById('alunoForm');
const listaAlunos = document.getElementById('listaAlunos');
const limparLista = document.getElementById('limparLista');
const cancelarEdicao = document.getElementById('cancelarEdicao');
const submitAluno = document.getElementById('submitAluno');
const alunoIdInput = document.getElementById('alunoId');
const ordenarPor = document.getElementById('ordenarPor');
const themeToggle = document.getElementById('themeToggle');
let alunoEmEdicao = null;

function aplicarTemaDarkMode() {
  const temaAtivo = localStorage.getItem(DARK_MODE_KEY) === 'true';
  document.body.classList.toggle('dark-mode', temaAtivo);

  if (themeToggle) {
    const icon = themeToggle.querySelector('.icon');
    const text = themeToggle.querySelector('.theme-text');

    if (temaAtivo) {
      icon.textContent = '🌙';
      text.textContent = 'Modo escuro';
    } else {
      icon.textContent = '☀️';
      text.textContent = 'Modo claro';
    }
  }
}

function alternarTema() {
  const temaAtivo = document.body.classList.contains('dark-mode');
  const novoTema = !temaAtivo;
  localStorage.setItem(DARK_MODE_KEY, String(novoTema));
  aplicarTemaDarkMode();
}

aplicarTemaDarkMode();

function carregarAlunos() {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);

  if (!dadosSalvos) {
    return [];
  }

  try {
    const alunosSalvos = JSON.parse(dadosSalvos);
    return alunosSalvos.map((aluno) => new Aluno(aluno.nome, aluno.nota1, aluno.nota2, aluno.nota3, aluno.nota4, aluno.id));
  } catch (error) {
    console.error('Erro ao carregar alunos do localStorage:', error);
    return [];
  }
}

function salvarAlunos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function obterAlunosOrdenados() {
  const copia = [...alunos];

  copia.sort((a, b) => {
    if (ordenarPor.value === 'resultadoFinal') {
      return b.resultadoFinal - a.resultadoFinal;
    }

    return a.nome.localeCompare(b.nome);
  });

  return copia;
}

function obterClasseAvaliacao(avaliacao) {
  switch (avaliacao) {
    case 'Reprovado':
      return 'avaliacao-reprovado';
    case 'Recuperação':
      return 'avaliacao-recuperacao';
    case 'Aprovado':
      return 'avaliacao-aprovado';
    default:
      return '';
  }
}

function renderizarAlunos() {
  listaAlunos.innerHTML = '';

  if (alunos.length === 0) {
    const vazio = document.createElement('div');
    vazio.className = 'sem-alunos';
    vazio.textContent = 'Nenhum aluno cadastrado ainda.';
    listaAlunos.appendChild(vazio);
    return;
  }

  const tabela = document.createElement('table');
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Nota 1</th>
        <th>Nota 2</th>
        <th>Nota 3</th>
        <th>Nota 4</th>
        <th>Resultado Final</th>
        <th>Avaliação</th>
        <th>Ações</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement('tbody');
  const alunosOrdenados = obterAlunosOrdenados();

  alunosOrdenados.forEach((aluno) => {
    const linha = document.createElement('tr');
    const classeAvaliacao = obterClasseAvaliacao(aluno.avaliacao);

    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.nota1}</td>
      <td>${aluno.nota2}</td>
      <td>${aluno.nota3}</td>
      <td>${aluno.nota4}</td>
      <td>${aluno.resultadoFinal}</td>
      <td><span class="avaliacao-badge ${classeAvaliacao}">${aluno.avaliacao}</span></td>
      <td>
        <div class="acoes">
          <button type="button" class="btn-acao btn-editar" data-id="${aluno.id}">Editar</button>
          <button type="button" class="btn-acao btn-excluir" data-id="${aluno.id}">Excluir</button>
        </div>
      </td>
    `;

    tbody.appendChild(linha);
  });

  tabela.appendChild(tbody);
  listaAlunos.appendChild(tabela);
}

function preencherFormulario(aluno) {
  alunoIdInput.value = aluno.id;
  document.getElementById('nomeAluno').value = aluno.nome;
  document.getElementById('nota1').value = aluno.nota1;
  document.getElementById('nota2').value = aluno.nota2;
  document.getElementById('nota3').value = aluno.nota3;
  document.getElementById('nota4').value = aluno.nota4;
  alunoEmEdicao = aluno.id;
  submitAluno.textContent = 'Salvar alterações';
  cancelarEdicao.classList.remove('hidden');
}

function resetarFormulario() {
  form.reset();
  alunoIdInput.value = '';
  alunoEmEdicao = null;
  submitAluno.textContent = 'Adicionar aluno';
  cancelarEdicao.classList.add('hidden');
  document.getElementById('nomeAluno').focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nomeAluno').value.trim();
  const nota1 = document.getElementById('nota1').value;
  const nota2 = document.getElementById('nota2').value;
  const nota3 = document.getElementById('nota3').value;
  const nota4 = document.getElementById('nota4').value;

  if (!nome) {
    alert('Digite o nome do aluno.');
    return;
  }

  if (alunoEmEdicao) {
    const aluno = alunos.find((item) => item.id === alunoEmEdicao);

    if (aluno) {
      const alunoAtualizado = new Aluno(nome, nota1, nota2, nota3, nota4, aluno.id);
      const indice = alunos.findIndex((item) => item.id === aluno.id);
      alunos[indice] = alunoAtualizado;
      salvarAlunos();
      renderizarAlunos();
      resetarFormulario();
      return;
    }
  }

  const aluno = new Aluno(nome, nota1, nota2, nota3, nota4);
  alunos.push(aluno);
  salvarAlunos();
  renderizarAlunos();
  resetarFormulario();
});

listaAlunos.addEventListener('click', (event) => {
  const botaoEditar = event.target.closest('.btn-editar');
  const botaoExcluir = event.target.closest('.btn-excluir');

  if (botaoEditar) {
    const aluno = alunos.find((item) => item.id === botaoEditar.dataset.id);

    if (aluno) {
      preencherFormulario(aluno);
    }
  }

  if (botaoExcluir) {
    const id = botaoExcluir.dataset.id;
    const indice = alunos.findIndex((item) => item.id === id);

    if (indice >= 0) {
      alunos.splice(indice, 1);
      salvarAlunos();

      if (alunoEmEdicao === id) {
        resetarFormulario();
      }

      renderizarAlunos();
    }
  }
});

limparLista.addEventListener('click', () => {
  alunos.length = 0;
  localStorage.removeItem(STORAGE_KEY);
  resetarFormulario();
  renderizarAlunos();
});

cancelarEdicao.addEventListener('click', () => {
  resetarFormulario();
});

ordenarPor.addEventListener('change', () => {
  renderizarAlunos();
});

themeToggle.addEventListener('click', alternarTema);

renderizarAlunos();
