const pokemonRepository = (function () {
    
    // Pokemon array
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

    return {
        getAll: function(){
            return pokemonList;
        },

        // Taking a stab at this. Not sure if it works.
        add: function(pokemon){
            typeof pokemon === 'object' && Object.keys(pokemon) === Object.keys(pokemonList) ? pokemonList.push(pokemon) : alert("Not an object.");
        },

        // Also trying this one out. Doesn't seem to work.
        filter: function(query){
            return pokemonList.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        }
    };

})();

// creating new array test to duplicate pokemonList array. Didn't work.
//const newArr = [...pokemonRepository.getAll()];

// The original for loop that was inside the IIFE
/*   // For loop that lists out the Pokemon's name and it's height
    for (let i = 0; i < pokemonList.length; i++) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ')
    } */

// console.log test to see what pokemon is pulling
// pokemonRepository.getAll().forEach(pokemon => {
//     console.log(pokemon)
// });

pokemonRepository.getAll().forEach(pokemon => {
    document.write(`${pokemon.name} (height: ${pokemon.height}) `)
});

// The original while loop that was inside the IIFE
   /*  // While loop that will call out "Wow, that's big!" for Pokemon's w/ height >= 1
    i = 0;

    while (i < pokemonList.length) {
    // ternary test
        pokemonList[i].height >= 1 ? document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!') : document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
        i++;

    }  */