
const whoForm = document.querySelector('.whoPkm__try');
const whoTry = document.querySelector('#pkmTry');
const whoNumber = document.querySelector('#pkmNumber');
const whoName = document.querySelector('#pkmName');
const whoImage = document.querySelector('#pkmImage');
const whoTopBar = document.querySelector('.whoPkm__info');
const whoIs = document.querySelector('#who-is');
const tryAgain = document.querySelector('#try-again');
const whoButtons = document.querySelector(".whoPkm__buttons");
const tipButton1 = document.querySelector('#tip1');
const tipButton2 = document.querySelector('#tip2');
const tipButton3 = document.querySelector('#tip3');
const whoTips = document.querySelector(".whoPkm__tips");
const tipText1 = document.querySelector('.whoPkm__tips--p1');
const tipText2 = document.querySelector('.whoPkm__tips--p2');
const tipText3 = document.querySelector('.whoPkm__tips--p3');

//Variável global para armazenar os dados do pokemon a ser adivinhado
let whoData = "";

// Função para buscar os dados de um pokemon passado por argumento na API Oficial
const fetchApi = async (pkmnName) => {
    // Remove o espaço digitado pelo usuário e substitui por "-", pois a API não contempla espaço, somente divide os nomes compostos por "-"
    pkmnNameApi = pkmnName.toString().toLowerCase().split(' ').join('-');
    // Aguarda o retorno da api, que usa a variável anterior para realizar a busca
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameApi);

    // Se a resposta da API for SUCESSO, então...
    if (response.status === 200) {
        // Grava a resposta da API em objeto na variável
        whoData = await response.json();
        // Se o pokemon for algum dos Nidoran Macho ou Fêmea, mudar o nome para nidoran
        if (whoData.name === "nidoran-m" || whoData.name === "nidoran-f"){
            whoData.name = "nidoran"
        }
        //Retorna os dados do pokemon
        return whoData;
    }

    return false;
}

// Função que checa se o usuário acertou o nome do pokemon, recebe o argumento target, que é o input
const checkEndGame = ({ target }) => {
    // Se o que o usuário escreveu no input for a resposta certa, então...
    if (target.value.toString().toLowerCase().split(' ').join('-') === whoData.name) {
        // Ajusta o CSS dos elementos para mostrar a resposta, escondendo alguns, mostrando outros e removendo classes
        whoTry.style.display = "none";
        whoImage.style.filter = "brightness(100%)";
        whoTopBar.classList.remove("hide");
        whoIs.style.display = "none";
        whoButtons.style.display = "none";
        whoTips.style.display = "none";
        tryAgain.style.display = "inline-block";
        return;
    }
}

// Função para blockear o submit do input
const blockEnterSubmit = (event) => {
    // Se a tecla apertada for o ENTER, então previna o comportamento padrão, que é o submit
    if (event.which == 13) {
        event.preventDefault();
    }
}

const revealPokemon = () => {
    // Ajusta o CSS dos elementos para mostrar a resposta, escondendo alguns, mostrando outros e removendo classes
    whoTry.style.display = "none";
    whoIs.style.display = "none";
    whoImage.style.filter = "brightness(100%)";
    whoTopBar.classList.remove("hide");
    tryAgain.style.display = "inline-block";
    tipButton1.style.display = "none";
    tipButton2.style.display = "none";
    tipButton3.style.display = "none";
    tipText1.style.display = "none";
    tipText2.style.display = "none";
    tipText3.style.display = "none";
}

// Função que exibe a dica 1 ao apertar o botão "Dica 1"
const revealTip1 = () => {
    // Quando o botão for pressionado, adicione o atributo disabled
    tipButton1.setAttribute('disabled', '');
    // Escreve o texto no html
    tipText1.innerHTML = `<strong>Dica 1:</strong> A primeira letra é "${whoData.name.split("")[0].toUpperCase()}"`;
    // Remove a classe "hide", que mantinha o parágrafo escondido
    tipText1.classList.remove("hide");
}

// Função que exibe a dica 2 ao apertar o botão "Dica 2"
const revealTip2 = () => {
    // Quando o botão for pressionado, adicione o atributo disabled
    tipButton2.setAttribute('disabled', '');
    // Escreve o texto no html
    tipText2.innerHTML = `<strong>Dica 2:</strong> O pokémon tem ${whoData.name.length} letras`;
    // Remove a classe "hide", que mantinha o parágrafo escondido
    tipText2.classList.remove("hide");
}

// Função que exibe a dica 3 ao apertar o botão "Dica 3"
const revealTip3 = () => {
    // Guarda na variável a quantidade de caracteres do nome do Pokémon
    let len = whoData.name.length;
    // Guarda na variável uma posição sorteada, para mostrar na Dica 3
    let position = Math.floor(Math.random() * len) + 1;
    // Se o número sorteado for 1, faz o incremento, para evitar repetir a dica 1
    if(position == 1){
        position = position + 1;
    }
    // Grava na variável o caracter contido na posição sorteada anteriormente
    let letter = whoData.name.split("")[position -1];
    // Quando o botão for pressionado, adicione o atributo disabled
    tipButton3.setAttribute('disabled', '');
    // Escreve o texto no html
    tipText3.innerHTML = `<strong>Dica 3:</strong> A letra "${letter}" está na posição ${position} `;
    // Remove a classe "hide", que mantinha o parágrafo escondido
    tipText3.classList.remove("hide");
}

// Função para criar os dados do pokemon e exibir na tela
const renderPokemon = async () => {

    // Realiza o sorteio de um id de pokemon entre 1 e 151 (Geração 1)
    const pokemon = Math.floor(Math.random() * 151) + 1;
    // Faz a consulta do pokemon na API, passando o ID
    const pkmnData = await fetchApi(pokemon);

    // Define o nome e o número do pokemon no HTML, que só será exibido no fim do jogo
    whoNumber.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');
    whoName.innerHTML = pkmnData.name.toString().replace('-', ' ');

    // Define a imagem do pokemon, que inicialmente é preta
    whoImage.src = pkmnData.sprites.other["official-artwork"].front_default;
    whoImage.style.display = "block";
}

// Função para recarregar a tela e reiniciar o jogo
const resetGame = () => {
    location.reload();
}

// Função que ao carregar a tela, inicia o jogo
window.onload = () => {
    renderPokemon();
}

// Escutador de evento para monitorar cada letra que o usuário digita no input e checa se ele acertou
whoTry.addEventListener('input', checkEndGame);
// Escutador de evento para monitorar se o ENTER é apertado e inibir o submit
whoTry.addEventListener('keypress', blockEnterSubmit);
// Escutador de evento para monitorar se o usuário clicou no botão para reiniciar o jogo
tryAgain.addEventListener('click', resetGame);
// Escutador de evento para monitorar se o usuário clicou no botão "Não sei qual é o Pokémon"
whoIs.addEventListener('click', revealPokemon);
// Escutador de evento para monitorar se o usuário clicou em algum botão de dica
tipButton1.addEventListener('click', revealTip1);
tipButton2.addEventListener('click', revealTip2);
tipButton3.addEventListener('click', revealTip3);
// Escutador de evento para proibir o usuário de clicar com o botão direito do mouse na imagem e ver qual é a imagem do pokemon em outra guia
whoImage.addEventListener('contextmenu', event => event.preventDefault());