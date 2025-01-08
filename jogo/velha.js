const casas = document.querySelectorAll('.casa');
const botaoReiniciar = document.getElementById('reiniciar');
let jogadorAtual = 'X'; 
let tabuleiroJogo = ['', '', '', '', '', '', '', '', '']; 

// aqui eu vejo quem ganhou pelas chances possíveis de vitória
function verificarVitoria() {
  // essas são todas as chances
  const padroesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ];

  //aqui eu pego um padrao e verifico com os padroes de vitória para achar um possivel ganhador
  for (const padrao of padroesVitoria) {
    const [a, b, c] = padrao;
    if (tabuleiroJogo[a] && tabuleiroJogo[a] === tabuleiroJogo[b] && tabuleiroJogo[a] === tabuleiroJogo[c]) {
      setTimeout(() => alert(`Jogador ${jogadorAtual} venceu!`), 10);
      return true;
    }
  }
  return false;
}

// esotu verificando se o tabuleiro está cheio com o .includes(''), se ele estiver cheio e não tiver um ganhador entao o resultado é um empate.
function verificarVelha() {
  if (!tabuleiroJogo.includes('')) {
    setTimeout(() => alert('Deu Velha!'), 10);
    return true;
  }
  return false;
}

// o clique sempre vai começar com 'x' 
function manipularClique(evento) {
    const casaSelecionada = evento.target; 
    const indiceCasa = Array.from(casas).indexOf(casaSelecionada); 
    
    //se alguem clicar no mesmo botao ele so retorna sem alterar o valor ou alterar o jogador
    if (tabuleiroJogo[indiceCasa] !== '') return; 
    
    tabuleiroJogo[indiceCasa] = jogadorAtual;
    casaSelecionada.textContent = jogadorAtual;
    

    //verifica se alguem ganhou ou se deu velha
    if (verificarVitoria() || verificarVelha()) {
      return;
    }
    
    //um ternario pra esolher quem vai jogar se for o X troca pro O e vice versa
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
}

// apaga tudo que esta nas casas deixa o jogador como X que é o valor inicial e por ultimo deixa as casas em branco
function reiniciarJogo() {
  tabuleiroJogo = ['', '', '', '', '', '', '', '', ''];
  jogadorAtual = 'X';
  casas.forEach(casa => {
    casa.textContent = '';
  });
}

//eventos de click que chamam as funções de dentro do jogo
casas.forEach(casa => {
  casa.addEventListener('click', manipularClique);
});

botaoReiniciar.addEventListener('click', reiniciarJogo);
