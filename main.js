// Clase Pokémon
class Pokemon {
    constructor(name, type, weight, moves) {
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.moves = moves;
    }

    getFormattedMoves() {
        return this.moves.join(", ");
    }
}


function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h2>${pokemon.name}</h2>
                        <p>Type: ${pokemon.type}</p>`;
    card.addEventListener("click", () => showModal(pokemon));
    return card;
}

  // Función para mostrar el modal con información adicional
function showModal(pokemon) {
    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `<h2>${pokemon.name}</h2>
                                <p>Type: ${pokemon.type}</p>
                                <p>Weight: ${pokemon.weight}</p>
                                <p>Moves: ${pokemon.getFormattedMoves()}</p>`;

    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

    window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function filterPokemonByName(input, pokemonList) {
    const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(input.toLowerCase()));
    displayPokemonList(filteredPokemons);
}


function displayPokemonList(pokemonList) {
    const pokemonListElement = document.getElementById("pokemonList");
    pokemonListElement.innerHTML = "";

    pokemonList.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonListElement.appendChild(card);
    });
}

  // Carga de datos desde el archivo JSON
fetch("pokemons.json")
    .then(response => response.json())
    .then(data => {
    const pokemonList = data.map(pokemonData => {
        const { name, type, weight, moves } = pokemonData;
        return new Pokemon(name, type, weight, moves);
    });

    displayPokemonList(pokemonList);

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => filterPokemonByName(searchInput.value, pokemonList));
    });
