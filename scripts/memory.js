const grid = document.querySelector('.grid');
const playerName = document.querySelector('.player');
const recordTime = document.querySelector('.record__time');
const recordPlayer = document.querySelector('.record__player');
const timer = document.querySelector('.timer');
const modalBodyP1 = document.querySelector('.modal__body--p1')
const modalBodyP2 = document.querySelector('.modal__body--p2')

// Atribui o modal
const modal = document.getElementById("winModal");

// Atribui o elemento <span> que fecha o modal
const closeModal = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no (x), fechar modal
closeModal.onclick = function () {
  modal.style.display = "none";
}

// Quando o usuário clicar em algum lugar fora do modal, fechar modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Função que cria aleatoriamente um array de 10 ids de pokemons
const populateArray = () => {
  let rNum = 0;
  let characters = [];
  // Para cada posição do array, gera um número pseudo-aleatório
  for (let index = 0; index < 10; index++) {
    // O range dos números é de 1 a 150, definidos pela varíavel abaixo
    rNum = Math.floor(Math.random() * 151) + 1;
    // Se um número não existe no array, então inclui
    if (!characters.includes(rNum)) {
      characters[index] = rNum;
    } else {
      // Senão, diminui o contador e gera um novo número para a posição do array
      index--
    }
  }
  return characters;
}

// Função para auxiliar a criação de elementos html
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Variáveis auxiliares para o jogo, na hora de comparar se uma carta é igual a outra
let firstCard = '';
let secondCard = '';

// Função para checar se o jogo chegou ao final
const checkEndGame = () => {
  // Define se algum elemento já tem a classe "disable-card"
  const disabledCards = document.querySelectorAll('.disabled-card');

  // Se o array de cartas desabilitadas atinge o número total de cartas, é o fim do jogo
  if (disabledCards.length === 20) {
    // Para o timer do jogo
    clearInterval(this.loop);
    // Grava o placar do último jogo no localStorage (Ainda sem uso no html, mas pronto para futuros updates)
    localStorage.setItem('lastGameTime', +timer.innerHTML);
    // Atribui os registros do localStorage na variável
    var items = JSON.parse(localStorage.getItem('record'));
    // Se não existe uma chave "record" ou o tempo do jogo for menor que o record atual, então grave o novo record no localStorage
    if (!localStorage.getItem('record') || +timer.innerHTML < items.time) {
      localStorage.setItem('record', JSON.stringify({ "player": localStorage.getItem('player'), "time": +timer.innerHTML }));
    }
    //Exibe o modal e parabeniza o jogador, convidando para jogar novamente
    modal.style.display = "block";
    modalBodyP1.innerHTML = `Parabéns ${localStorage.getItem('player')}!`;
    modalBodyP2.innerHTML = `Você concluiu o jogo em ${localStorage.getItem('lastGameTime')} segundos, tente bater o recorde.`;
  }
}

// Função para verificar se existe algum recorde no localStorage
const checkRecord = () => {
  var items = JSON.parse(localStorage.getItem('record'));
  // Se existir um recorde, exibir no html
  if (localStorage.getItem('record')) {
    recordTime.innerHTML = items.time;
    recordPlayer.innerHTML = `(${items.player})`;
  }
}

// Função para conferir se uma carta é igual a outra
const checkCards = () => {
  // Quando um elemento html de carta é selecionado, ele recebe a informação do atributo "data-character", que é o ID do pokemon
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  // Se uma carta é igual a outra, então desabilita as 2 cartas, adicionando a classe "disabled-card"
  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    // Define as váriaveis com strings vazias, não carregar as informações das cartas para uma nova checagem
    firstCard = '';
    secondCard = '';

    // Verifica se o jogo chegou ao fim
    checkEndGame();

    // Senão, após meio segundo, desvira as cartas, removendo a classe "reveal-card"
  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      // Define as váriaveis com strings vazias, não carregar as informações das cartas para uma nova checagem
      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

// Função para virar uma carta e coletar os dados dela
const revealCard = ({ target }) => {

  //Se a div "card" contém a classe "reveal-card", então não faça nada e segue o jogo, para evitar que o usuário selecione 2x a mesma carta
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  // Se a variável "firstCard" estiver vazia, então, adicionar a classe "reveal-card" e atribuir à variável card o elemento "card"
  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

    // Se a variável "secondCard" estiver vazia, então, adicionar a classe "reveal-card" e atribuir à variável card o elemento "card"
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    // Verifica se as cartas são iguais
    checkCards();
  }
}

// Função para consultar o arquivo pokedex.json e retornar um array de objetos com todosos atributos dos 1010 pokemons
const fetchJson = async () => {
  const response = await fetch('https://juan-silveira.github.io/projeto-coderhouse-turma-45415/files/pokedex.json');

  // Se a resposta da API for SUCESSO, então grave o resultado na variável e retorne a variável
  if (response.status === 200) {
    const pkmnData = await response.json();
    return pkmnData;
  }
  // Retorna falso, caso tenha algum problema com a chamada do arquivo
  return false;
}

// Função para criar as cartas do jogo
const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');
  const pkmnName = createElement('p', 'name')
  const pkmnImage = createElement('img', 'image')

  // Coloca o nome do pokemon na carta
  pkmnName.innerHTML = pkmnNames[character - 1];
  // Atrbui a imagem do pokemon usando o id
  pkmnImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${character}.png`;

  // Atribui a hierarquia dos elementos, sendo "front" e "back", filhos de "card"
  card.appendChild(front);
  card.appendChild(back);
  // Atribui a hierarquia dos elementos, sendo "pkmnName" e "pkmnImage", filhos de "front"
  front.appendChild(pkmnName);
  front.appendChild(pkmnImage);

  // Quando uma carta receber um clique, revelar a carta
  card.addEventListener('click', revealCard);
  // Define o valor do atributo "data-character" com o ID do pokemon
  card.setAttribute('data-character', character)
  // Escutador de evento para proibir o usuário de clicar com o botão direito do mouse na imagem e ver qual é a imagem do pokemon em outra guia
  card.addEventListener('contextmenu', event => event.preventDefault());

  // Retorna a carta criada
  return card;
}

// Variável que vai guardar um array de nomes de pokemons, para exibir nas cartas
const pkmnNames = [];

// Função para carregar o jogo
const loadGame = async () => {
  // A variável recebe os 10 pokemons que farão parte do jogo
  let characters = populateArray();

  // A variável recebe o array de objetos com atributos dos pokemons
  const pkmnData = await fetchJson();
  // Para cada item do array, grava o nome na variável 
  pkmnData.pokedex.forEach((s, i) => {
    pkmnNames.push(pkmnData.pokedex[i].name);
  });

  // Duplicar o array para conter 20 posições
  const duplicateCharacters = [...characters, ...characters];

  // Embaralhar as posições do array, para as cartas não ficarem sequenciais
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  // Para cada item do array, criar uma carta e fazer a hierarquia com o "grid"
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

// Função para criar o timer do jogo
const startTimer = () => {
  this.loop = setInterval(() => {
    // A variável currentTime recebe o incremento do conteúdo do elemento timer
    const currentTime = +timer.innerHTML;
    // O conteúdo do elemento timer recebe o incremento da variável currentTime
    timer.innerHTML = currentTime + 1;
    // Executa a função a cada segundo
  }, 1000);
}

// Ao carregar a tela execute...
window.onload = () => {
  // Carrega o nome do jogador armazenado no localStorage
  playerName.innerHTML = localStorage.getItem('player');
  // Verifica se existe recorde
  checkRecord();
  // Inicia a contagem de tempo
  startTimer();
  // Carrega o jogo
  loadGame();
}