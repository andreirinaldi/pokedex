/* ---- Variáveis Globais ---- */
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');
const pokemonImageShiny = document.querySelector('.pokemon_img2');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const typeOne = document.querySelector('.pokemon_type1');
const typeTwo = document.querySelector('.pokemon_type2');
const shiny = document.querySelector('.shiny');

let searchPokemon = 1; /* ---- ID de onde vai começar ---- */

/* ---- Procurando os pokémons na API ---- */
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {  /* ---- Em caso de sucesso, converter a resposta para .json ---- */
        const data = await APIResponse.json();
        return data;
    }
}

/* ---- Renderizando os dados do pokémon ---- */
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';   /* ---- resposta enquanto aguarda busca ---- */
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data) {   /* ---- caso haja dados, renderizar ---- */
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        /* para GIFS colocar -> ['animated'] entre 'black-white' e 'front_default' */
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        pokemonImageShiny.src = data['sprites']['versions']['generation-v']['black-white']['front_shiny'];
        pokemonImageShiny.style.display = 'none';
        input.value = '';  /* ---- Limpando a barra de pesquisa após o uso ---- */
        typeOne.innerHTML = data['types']['0']['type']['name'];
        typeTwo.innerHTML = '';
        typeTwo.innerHTML = data['types']['1']['type']['name'];
        searchPokemon = data.id;
    } else {   /* ---- caso não haja dados (dados inválidos) ---- */
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        typeOne.innerHTML = '';
        typeTwo.innerHTML = '';
        input.value = '';
    }
}

/* ---- Pesquisando os dados do pokémon (Barra de Pesquisa) ---- */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

/* ---- Alterando para pokémons Shiny ---- */
shiny.addEventListener('click', () => {
        pokemonImage.style.display = 'none';
        pokemonImageShiny.style.display = 'block';
});

/* ---- Pesquisando os pokémons (Setas) ---- */
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

/* ---- abrindo a pokédex ---- */
renderPokemon(searchPokemon);