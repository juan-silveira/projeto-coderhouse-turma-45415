const search = document.querySelector('#search');
const form = document.querySelector('.form');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
const pokedex = document.querySelector('#pokedexBody');
const controls = document.querySelector('#pokedexHeader');
const number = document.querySelector('#pokemonNumber');
const pokemonName = document.querySelector('#pokemonName');
const pokemonImage = document.querySelector('#pokemonImage');
const types = document.querySelector('#pokemonTypes');

const statNumber = document.querySelectorAll('.stat__number');
const statWeight = document.querySelector('#weight');
const statHeight = document.querySelector('#height');
const statBmi = document.querySelector('.stats__top');
const barInner = document.querySelectorAll('.stat__bar__inner');
const barOuter = document.querySelectorAll('.stat__bar__outer');
const statBar = document.querySelector('.stat__bar');
const statDesc = document.querySelectorAll('.stat__description');

const statTNumber = document.querySelector('.stat__tnumber');
const statTotal = document.querySelector('.stat__total');
const barTOuter = document.querySelector('#bar-touter');
const barTInner = document.querySelector('#bar-tinner');

const baseStats = document.querySelector('#base-stats');

// Cria um objeto para ser a biblioteca de consulta de cores para o UI Theme e tradução dos tipos de pokemon para pt-BR
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

// Faz a chamada na API da Pokeapi e retorna os dados de 1 pokemon
const fetchApi = async (pkmnName) => {
    // Joining Pokémon names that has more than one word
    pkmnNameApi = pkmnName.toString().toLowerCase().split(' ').join('-');

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameApi);

    if (response.status === 200) {
        const pkmnData = await response.json();
        return pkmnData;
    }

    return false;
}

// Faz a chamada no arquivo JSON, retorna os dados de todos os pokemons
const fetchJson = async () => {
    const response = await fetch("../files/pokedex.json");

    if (response.status === 200) {
        const pkmnData = await response.json();
        return pkmnData;
    }

    return false;
}

// Ao dar Enter ou clicar no botão de busca, renderiza o pokemon selecionado na tela
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
});

// Variável para controlar qual pokemon renderizar, usando os botões de seta
let searchPokemon = 0;

// Controla o evento do botão voltar
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        search.value = '';
    }
});

// Controla o evento do botão avançar
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    search.value = '';
});

// Ativa uma snackbar em caso de não localizar um pokemon
const showSnackbar = () => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    setTimeout(function () { location.reload(); }, 3000);
}

//Renderiza o pokemon na tela
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando Pokémon...';
    number.innerHTML = '';

    const pkmnData = await fetchApi(pokemon);

    // Validação quando o pokemon não existe
    if (!pkmnData) {
        showSnackbar();
        return;
    }

    // Variável recebe o id do pokemon
    searchPokemon = pkmnData.id;

    // Define a cor do tema da UI, usando o tipo principal do pokemon como base
    const mainColor = type[pkmnData.types[0].type.name].color;

    statBmi.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    statTotal.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    controls.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

    // Exibe o nome do pokemon no topo da pokedex
    let pData = await fetchJson();
    pokemonName.innerHTML = pData.pokedex[pkmnData.id - 1].name;

    // Exibe o id do pokemon no topo da pokedex
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

    // Define a imagem do pokemon
    pokemonImage.src = pkmnData.sprites.other["official-artwork"].front_default;

    // Exibe o peso do pokemon
    statWeight.innerHTML = (pkmnData.weight / 10).toString();

    // Exibe a altura
    statHeight.innerHTML = (pkmnData.height / 10).toString();

    // Carrega o(s) tipo(s) do pokemon em badges
    types.innerHTML = '';

    pkmnData.types.forEach((t) => {
        let newType = document.createElement('span');
        let poketype = type[t.type.name].trad.toUpperCase();
        let color = type[t.type.name].color;

        newType.innerHTML = poketype;
        newType.classList.add('pokemon__types__type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        types.appendChild(newType);
    });

    // Carrega os status e as barras do pokemon
    let total = 0;
    pkmnData.stats.forEach((s, i) => {

        total = total + +pkmnData.stats[i]["base_stat"];
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat / 2.5}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

    });
    statTNumber.innerHTML = total;
    barTInner.style.width = `${total / 7.2}%`;
    barTInner.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    barTOuter.style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;

    // Apaga o texto do campo de busca
    document.getElementById('search').value = '';
};

    // Essa função carrega um autocompletar para auxiliar na busca por um pokemon
function autocomplete(inp, arr) {
    //O autocomplete recebe 2 argumentos: o input de onde ele vai buscar o valor a cada letra e o array de onde ele fará a busca
    var currentFocus;
    // Executa o autocomplete toda vez que alguém digita algo no input
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        // Fecha todas as listas criadas anteriormente
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        //Cria uma DIV para exibir os valores do array
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        // Faz o append da div como filha do container de autocomplete
        this.parentNode.appendChild(a);
        // Para cada item no array faça...
        var x = 0;
        for (i = 0; i < arr.length; i++) {
            // Checa se já tem 12 elementos a serem exibidos, se sim, para de inserir novos valores
            if (x > 11) {
                return;
            }
            // Checa se o item começa com a mesma letra digitada no input
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                // Cria uma div para cada elemento que coincidir
                b = document.createElement("DIV");
                // Coloca em negrito as letras que coincidem 
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                // Insere um input que vai segurar todos os valores dos items do array
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                // Executa a função quando um clique é executado em um item
                b.addEventListener("click", function (e) {
                    // Busca pelo nome o ID do pokemon no array e atribui a variável
                    pkmnId = pkmnNames.indexOf(this.getElementsByTagName("input")[0].value) + 1;
                    // Verifica se um dos pokemons abaixo foi selecionado e insere o valor correto no input, pois eles contém " ' " no nome e não dá match
                    if (this.getElementsByTagName("input")[0].value === "farfetch") {
                        inp.value = 83;
                    } else if (this.getElementsByTagName("input")[0].value === "sirfetch") {
                        inp.value = 865;
                    } else {
                        inp.value = pkmnId;
                    }
                    
                    // Já carrega automaticamente o pokemon após o clique
                    renderPokemon(inp.value);
                    // Fecha a lista de autocomplete
                    closeAllLists();
                });
                a.appendChild(b);
                x++;
            }
        }
    });
    //Executa a função quando certas teclas forem pressionadas
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            // Se a seta para BAIXO for pressionada, incrementa a variável currentFocus
            currentFocus++;
            // e faz o item atual mais visível
            addActive(x);
        } else if (e.keyCode == 38) {
            // Se a seta para BAIXO for pressionada, diminui o valor da variável currentFocus
            currentFocus--;
            // e faz o item atual mais visível
            addActive(x);
        } else if (e.keyCode == 13) {
            // Se o ENTER for pressionado, faz o submit com o item selecionado
            if (currentFocus > -1) {
                // e simula um clique no item "ativo"
                if (x) x[currentFocus].click();
            }
        }
    });

    // Função para classificar um item como "ativo"
    function addActive(x) {
        if (!x) return false;
        // Começa removendo a classe "active" de todos os items
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        // Adiciona a classe "autocomplete-active"
        x[currentFocus].classList.add("autocomplete-active");
    }

    // Função para remover a classe "active" de todos os items do autocomplete
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    // Fecha todas as lista de autocomplete do documento, com exceção daquela passada como argumento
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    // Executa a função quando alguém clica no documento
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// Cria uma variável global para armazenar o array de nomes dos pokemons
const pkmnNames = [];

// Inicia a função autocomplete no input de busca, e percorre o array de possíveis valores para autocompletar
autocomplete(document.getElementById("search"), pkmnNames);

//Função para exibir na tela um pokemon selecionado na tabela da página Home
const handleTransfer = () => {
    // Se existir um id de pokemon armazenado no localStorage, então...
    if (localStorage.getItem('findPokemon')) {
        // O input recebe o valor armazenado
        search.value = localStorage.getItem('findPokemon');
        // Simula clique no botão de buscar
        document.querySelector(".button__submit").click();
        // Apaga a chave usada na busca do localStorage, para evitar que sempre busque o pokemon ao clicar na Pokedex
        localStorage.removeItem('findPokemon');
      }  
}

// Quando a tela é carregada, executa a função
window.onload = async () => {
    // Verifica se tem que buscar algum pokemon da tabela da Home
    handleTransfer();
    // Monta a coleção de dadps de todos os pokemons do JSON na variável
    const pkmnData = await fetchJson();
    // Para cada item do array pokedex, execute a instrução...
    pkmnData.pokedex.forEach((s, i) => {
        // Insere um novo nome no array de nomes
        pkmnNames.push(pkmnData.pokedex[i].name);
    });
}