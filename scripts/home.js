const alertButton = document.getElementById("alertButton");

alertButton.onclick = (() => {
    alert("Olá treinador(a) Pokémon! O botão de abrir o alert irá sumir após o ok!");
    alertButton.style.display = "none";
});

document.getElementById("cardPokedex").onclick = (() => {
    window.location = 'pages/pokedex.html';
});

document.getElementById("cardMemory").onclick = (() => {
    window.location = 'pages/memory.html';
});

document.getElementById("cardWho").onclick = (() => {
    window.location = 'pages/who.html';
});



