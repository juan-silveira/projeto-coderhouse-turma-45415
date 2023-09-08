const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login');


// Ao carregar a tela, execute...
window.onload = () => {
  // Se já existe o nome de jogador no localStorage, redireciona para a página de jogo
  if (localStorage.getItem('player')) {
    window.location = './memory.html';
  }

  // Função para validar se o usuário digitou mais de 3 caracteres no nome, enquanto não tiver, não habilita o botão "Jogar"
  const validateInput = ({ target }) => {
    // Se o número de caracteres no input for maior do que 3, então remova o atributo disabled do botão
    if (target.value.length > 3) {
      button.removeAttribute('disabled');
      return;
    }
    // Inserir o atributo disabled no botão
    button.setAttribute('disabled', '');
  }

  // Função para gerenciar o evento submit do elemento input
  const handleSubmit = (event) => {
    // Previne o comportamento padrão do submit
    event.preventDefault();

    // Inserir a chave "player" no localStorage, com o valor do elemento input
    localStorage.setItem('player', input.value);
    // Redireciona para a página do jogo
    window.location = './memory.html';
  }

  // Executa a função "validateInput" a cada alteração do elemento
  input.addEventListener('input', validateInput);
  // Executa o submit
  form.addEventListener('submit', handleSubmit);
}