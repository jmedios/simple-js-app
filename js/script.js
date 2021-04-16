const pokemonList = [
    {
    name: 'Bulbasaur',
    height: 0.7,
    types: ['grass', 'poison']
    },
    {
    name: 'Squirtle',
    height: 1,
    types: ['water']
    },
    {
    name: 'Charmander',
    height: 2,
    types: ['fire']
    }
];

// For loop that lists out the Pokemon's name and it's height
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ')
}

// While loop that will call out "Wow, that's big!" for Pokemon's w/ height >= 1
i = 0;

while (i < pokemonList.length) {
// ternary test
    pokemonList[i].height >= 1 ? document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!') : document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    i++;

} 