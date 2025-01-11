$(document).ready(function() {
  const $casas = $('.casa');
  const $botaoReiniciar = $('#reiniciar');
  let jogadorAtual = 'X'; 
  let tabuleiroJogo = ['', '', '', '', '', '', '', '', '']; 

  // vendo todas as possiveis chances de vitoria
  function verificarVitoria() {
    const padroesVitoria = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6] 
    ];
    // crio uma variavel chamada padrao que vai percorrer por todas as possiveis chances de vitoria
    for (const padrao of padroesVitoria) {
      const [a, b, c] = padrao;
      if (tabuleiroJogo[a] && tabuleiroJogo[a] === tabuleiroJogo[b] && tabuleiroJogo[a] === tabuleiroJogo[c]) {
        setTimeout(() => alert(`Jogador ${jogadorAtual} venceu!`), 10);
        return true;
      }
    }
    return false;
  }

  // se todos os campos ja foram preenchidos e ele nao satisfez a condição de vitoria ele imprime a velha
  function verificarVelha() {
    if (!tabuleiroJogo.includes('')) {
      setTimeout(() => alert('Deu Velha!'), 10);
      return true;
    }
    return false;
  }

  // Manipulando o clique para toda vez que o jogador selecionar o casa
  function manipularClique(evento) {
    const $casaSelecionada = $(evento.target);
    const indiceCasa = $casas.index($casaSelecionada);

    // Se a casa já foi clicada, não faz nada nem altera o jogador nem marca a casa
    if (tabuleiroJogo[indiceCasa] !== '') return; 
    
    tabuleiroJogo[indiceCasa] = jogadorAtual;
    $casaSelecionada.text(jogadorAtual);

    if (verificarVitoria() || verificarVelha()) {
      return;
    }
    
    // se o jogador atual é X ele vira O se nao ele vira X
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
  }

  // vamos deixar todas as casas vazias e fazer com que o jogador inicial volte a ser o X
  function reiniciarJogo() {
    tabuleiroJogo = ['', '', '', '', '', '', '', '', ''];
    jogadorAtual = 'X';
    $casas.text('');
  }

  $casas.on('click', manipularClique);
  $botaoReiniciar.on('click', reiniciarJogo);
});
