// Cria um array de objetos com as cores para os span de tipos de pokemon e traduções 
const type = {
    "rock": { "color": [182, 158, 49], "trad": "pedra" },
    "ghost": { "color": [112, 85, 155], "trad": "fantasma" },
    "steel": { "color": [183, 185, 208], "trad": "aço" },
    "water": { "color": [100, 147, 235], "trad": "água" },
    "grass": { "color": [116, 203, 72], "trad": "grama" },
    "psychic": { "color": [251, 85, 132], "trad": "psíquico" },
    "ice": { "color": [154, 214, 223], "trad": "gelo" },
    "dark": { "color": [117, 87, 76], "trad": "sombrio" },
    "fairy": { "color": [230, 158, 172], "trad": "fada" },
    "normal": { "color": [170, 166, 127], "trad": "normal" },
    "fighting": { "color": [193, 34, 57], "trad": "lutador" },
    "flying": { "color": [168, 145, 236], "trad": "voador" },
    "poison": { "color": [164, 62, 158], "trad": "veneno" },
    "ground": { "color": [222, 193, 107], "trad": "terrestre" },
    "bug": { "color": [167, 183, 35], "trad": "inseto" },
    "fire": { "color": [245, 125, 49], "trad": "fogo" },
    "electric": { "color": [249, 207, 48], "trad": "elétrico" },
    "dragon": { "color": [112, 55, 255], "trad": "dragão" }
}

// Função assíncrona para retornar os dados de um arquivo json
const fetchJson = async () => {
    // Váriável aguarda a resposta da chamada ao arquivo json
    const response = await fetch("../files/pokedex.json");

    // Se o status da resposta for SUCESSO, então...
    if (response.status === 200) {
        // Aguarda até receber os dados do arquivo e armazena na variável
        const pkmnData = await response.json();
        // Retorna o array de objetos com os dados de todos os pokemons
        return pkmnData;
    }
    // Se a resposta não for sucesso, retorna falso
    return false;
}

// Função para carregar os dados do pokemon de destaque no início da página, recebe um argumento ID
const createSpotPokemon = async (id) => {
    // Variável recebe os dados de todos os pokemons
    const res = await fetchJson();
    // Variável recebe os dados do pokemon solicitado
    const pokemon = res.pokedex[id];
    // Variáveis usadas caso o pokemon tenha um segundo tipo
    let type2 = "";
    let mc2 = "";
    // Variável recebe o tipo principal do pokemon
    const type1 = pokemon.type1;
    // Variável recebe o array de cor rgb baseado no tipo principal
    const mc1 = type[type1].color;
    // Se pokemon tiver um segundo tipo, então...
    if (pokemon.type2) {
        // Variável recebe o tipo secundário do pokemon
        type2 = pokemon.type2;
        // Variável recebe o array de cor rgb baseado no tipo secundário
        mc2 = type[type2].color;
    }

    // Atribui uma variável aos elementos
    const pkmnImage = document.getElementById("pokeImage");
    const pkmnName = document.getElementById("pokeName");
    const pkmnDesc = document.getElementById("pokeDesc");
    // Cria os elementos para exibir os tipos do pokémon
    const pkmnTypes = document.getElementById("types");
    const pkmnType1 = document.createElement('span');
    const pkmnType2 = document.createElement('span');

    // Define a imagem do pokemon no html
    pkmnImage.src = pokemon.image;
    // Define o nome do pokemon no html
    pkmnName.innerHTML = pokemon.name;
    // Define a descrição do pokemon no html
    pkmnDesc.innerHTML = pokemon.description;
    // Define o tipo principal traduzido do pokemon no html
    pkmnType1.innerHTML = type[type1].trad.toUpperCase();
    // Adiciona as classes do elemento do tipo principal
    pkmnType1.classList.add('featuredPkmon__typeBadge', 'type__badge', 'text-white');
    // Estiliza as cores do elemento do tipo principal
    pkmnType1.style.backgroundColor = `rgb(${mc1[0]}, ${mc1[1]}, ${mc1[2]})`;
    //Se o pokemon tem um tipo secundário, então...
    if (pokemon.type2) {
        // Adiciona as classes do elemento do tipo secundário
        pkmnType2.classList.add('featuredPkmon__typeBadge', 'type__badge', 'text-white');
        // Estiliza as cores do elemento do tipo secundário
        pkmnType2.style.backgroundColor = `rgb(${mc2[0]}, ${mc2[1]}, ${mc2[2]})`;
        // Define o tipo secundário traduzido do pokemon no html
        pkmnType2.innerHTML = type[type2].trad.toUpperCase();
    }
    // Atribui a hirarquia dos elementos filhos ao elemento pai
    pkmnTypes.appendChild(pkmnType1);
    pkmnTypes.appendChild(pkmnType2);
}

// Função para criar uma linha da tabela de pokemons, que recebe um objeto de argumento, contendo as informações daquele pokemon
const createTableRow = (pokemon) => {

    // Variáveis usadas caso o pokemon tenha um segundo tipo
    let type2 = "";
    let mc2 = "";
    // Variável recebe o tipo principal do pokemon
    const type1 = pokemon.type1;
    // Variável recebe o array de cor rgb baseado no tipo principal
    const mc1 = type[type1].color;
    // Se pokemon tiver um segundo tipo, então...
    if (pokemon.type2) {
        // Variável recebe o tipo secundário do pokemon
        type2 = pokemon.type2;
        // Variável recebe o array de cor rgb baseado no tipo secundário
        mc2 = type[type2].color;
    }

    // Cria os elementos necessários para a nova linha da tabela 
    const pokeTable = document.querySelector("tbody");
    const tableRow = document.createElement('tr');
    const tableCell1 = document.createElement('td');
    const tableCell2 = document.createElement('td');
    const tableCell3 = document.createElement('td');
    const tableCell4 = document.createElement('td');
    const tableCell5 = document.createElement('td');
    const pkmnId = document.createElement('p');
    const pkmnImage = document.createElement('img');
    const pkmnName = document.createElement('p');
    const pkmnType1 = document.createElement('span');
    const pkmnType2 = document.createElement('span');

    // Define o id do pokemon no html
    pkmnId.innerHTML = pokemon.id.toString().padStart(3, '0');
    // Define a imagem do pokemon no html
    pkmnImage.src = pokemon.image;
    // Atribui uma classe para o elemento
    pkmnImage.setAttribute("class", 'pkmonTable__pkmonImage');
    // Define o nome do pokemon no html
    pkmnName.innerHTML = pokemon.name;
    // Atribui uma classe para o elemento
    pkmnName.setAttribute("class", 'pkmnName');
    // Define o tipo principal traduzido do pokemon no html
    pkmnType1.innerHTML = type[type1].trad.toUpperCase();
    // Atribui uma classe para o elemento
    pkmnType1.setAttribute("class", 'type__badge');
    // Estiliza as cores do elemento do tipo principal
    pkmnType1.style.backgroundColor = `rgb(${mc1[0]}, ${mc1[1]}, ${mc1[2]})`;
    if (pokemon.type2) {
        // Atribui uma classe para o elemento
        pkmnType2.setAttribute("class", 'type__badge');
        // Estiliza as cores do elemento do tipo secundário
        pkmnType2.style.backgroundColor = `rgb(${mc2[0]}, ${mc2[1]}, ${mc2[2]})`;
        // Define o tipo secundário traduzido do pokemon no html
        pkmnType2.innerHTML = type[type2].trad.toUpperCase();
    }

    // Atribui a hierarquia entre os elementos
    pokeTable.appendChild(tableRow);
    tableRow.appendChild(tableCell1);
    tableRow.appendChild(tableCell2);
    tableRow.appendChild(tableCell3);
    tableRow.appendChild(tableCell4);
    tableRow.appendChild(tableCell5);
    tableCell1.appendChild(pkmnId);
    tableCell2.appendChild(pkmnImage);
    tableCell3.appendChild(pkmnName);
    tableCell4.appendChild(pkmnType1);
    tableCell5.appendChild(pkmnType2);

    // Quando uma linha receber um clique, abrir a pokedex com aquele pokemon
    tableRow.addEventListener('click', handlePokedex);

    //Retorna a nova linha
    return tableRow;
}

// Função assíncrona que cria todas as linhas da tabela de pokemons 
const gottaCatchThemAll = async () => {
    // Variável recebe os dados de todos os pokemons
    const pkData = await fetchJson();
    // Para cada repetição, criar uma linha na tabela, até que atinja o limite do array
    for (i = 0; i < pkData.pokedex.length; i++) {
        createTableRow(pkData.pokedex[i]);
    }
}

// Função que monitora clique em alguma linha da tabela de pokemon
const handlePokedex = ({ target }) => {
    // Ao clicar em uma linha, grava o id do pokemon no localStorage
    localStorage.setItem('findPokemon', target.parentNode.parentNode.firstChild.firstChild.innerHTML*1)
    // Redireciona o usuário para a pagina da Pokedex
    window.location = 'pages/pokedex.html';
}

// Quando a tela é carregada, executa a função
window.onload = async () => {
    // Cria um número aleatório entre 1 e 1010, e serve como argumento para a função de criar um Pokemon de destaque
    createSpotPokemon(Math.floor(Math.random() * 1010) + 1);
    // Cria todas as linhas da tabela
    gottaCatchThemAll();
}