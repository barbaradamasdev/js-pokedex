const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151 //Primeira geracao de pokemons
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id='${pokemon.name}' onclick="openCard(id)">
            <span class="pokemon__number">#${pokemon.number}</span>
            <span class="pokemon__name">${pokemon.name}</span>

            <div class="pokemon__detail">
                <ol class="pokemon__types">
                    ${pokemon.types.map((type) => `<li class="pokemon__type ${type}">${type}</li>`).join('')}
                </ol>

                <img class="pokemon__img" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Load more pokemons
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//Search pokemon
/* const search = document.getElementById('search')
search.addEventListener('keypress', function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById('search').click();
    }
}) */


function searchPokemon(){
    console.log('clicou')
    pokemonName = document.getElementById('pokemonSearch').value;
    openCard(pokemonName)
    document.getElementById('pokemonSearch').value = '';
}

//Open Card
function openCard (pokemonName) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            const card = pokemonToCard(data)
            pokemonList.innerHTML += card
        }).catch((err) => {
            console.log('Pokemon not found!', err)
        })
        ;

}

//Close Card
function closeCard(pokemonCard, pokemonBgOpacity) {
    pokemonCard.remove();
    pokemonBgOpacity.remove();
}

//Add Card to HTML
function pokemonToCard(pokemon) {
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokemon.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    return `
            <div class='bgOpacityHigh' id=${pokemon.name+'CardOpacity'} onclick="closeCard(${pokemon.name+'Card'},${pokemon.name+'CardOpacity'})"></div>

            <div id=${pokemon.name+'Card'} class="pokemon card ${pokemon.type}">
                <span class="pokemon__number">#${pokemon.id}</span>
                <span class="pokemon__name">${pokemon.name}</span>
                <img class="pokemon__img" src="${pokemon.sprites.other.dream_world.front_default}"
                alt="${pokemon.name}">
                <div class="pokemon__detail">
                    <ol class="pokemon__types">
                        ${pokemon.types.map((type) => `<li class="pokemon__type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="pokemon__ability">
                    <ol class="pokemon__abilities"> 
                        <p>Abilities </p>
                        ${pokemon.abilities.map((ability) => `<li class="pokemon__ability ${ability}">${ability}</li>`).join('')}
                    </ol>
                    <div class="flex">
                        <ol class="pokemon__abilities"> 
                            <p>Weight </p>
                            <li>${pokemon.weight}</li>
                        </ol>
                        <ol class="pokemon__abilities"> 
                            <p>Height </p>
                            <li>${pokemon.height}</li>
                        </ol>
                    </div>
                    <hr>
                    <div class="pokemon__stats">
                        <ol class="pokemon__abilities"> 
                            <p>HP </p>
                            <div class="progress">
                                <div style="width: ${pokemon.stats[0].base_stat-20}%;" class="progress-bar ${pokemon.type}">
                                    <p>${pokemon.stats[0].base_stat}</p>
                                </div>
                            </div>
                            
                        </ol>
                        <ol class="pokemon__abilities"> 
                            <p>Attack </p>
                            <div class="progress">
                                <div style="width: ${pokemon.stats[1].base_stat-20}%;" class="progress-bar ${pokemon.type}">
                                    <p>${pokemon.stats[1].base_stat}</p>
                                </div>
                            </div>
                            
                        </ol>
                        <ol class="pokemon__abilities"> 
                            <p>Defense </p>
                            <div class="progress">
                                <div style="width: ${pokemon.stats[2].base_stat-20}%;" class="progress-bar ${pokemon.type}">
                                    <p>${pokemon.stats[2].base_stat}</p>
                                </div>
                            </div>
                            
                        </ol>
                        <ol class="pokemon__abilities"> 
                            <p>Sp. Atk </p>
                            <div class="progress">
                                <div style="width: ${pokemon.stats[3].base_stat-20}%;" class="progress-bar ${pokemon.type}">
                                    <p>${pokemon.stats[3].base_stat}</p>
                                </div>
                            </div>
                            
                        </ol>
                        <ol class="pokemon__abilities"> 
                            <p>Sp. Def </p>
                            <div class="progress">
                                <div style="width: ${pokemon.stats[4].base_stat-20}%;" class="progress-bar ${pokemon.type}">
                                    <p>${pokemon.stats[4].base_stat}</p>
                                </div>
                            </div>
                            
                        </ol>
                        <ol class="pokemon__abilities"> 
                            <p>Speed </p>
                            <div class="progress">
                                <div style="width: ${pokemon.stats[5].base_stat-20}%;" class="progress-bar ${pokemon.type}">
                                    <p>${pokemon.stats[5].base_stat}</p>
                                </div>
                            </div>
                            
                        </ol>
                    </div>
                </div>
            </div>
    `
}

