const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  if (input.value.trim() !== '') { // Verifica se o input não está vazio
    minhaListaDeItens.push({
      tarefa: input.value,
      concluida: false,
    });

    input.value = '';
    mostrarTarefas();
  }
}

function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
        <img src="./imagens/verificado.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
        <p>${item.tarefa}</p>
        <img src="./imagens/lixeira.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();

button.addEventListener('click', adicionarNovaTarefa);

// Adiciona evento para capturar o Enter
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    adicionarNovaTarefa();
  }
});
