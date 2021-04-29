let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    typeof pokemon === "object" && "name" in pokemon
      ? pokemonList.push(pokemon)
      : console.log("pokemon is not correct");
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    //to select pokemon-list class
    const pokemonList = document.querySelector(".pokemon-list");
    //to create list
    const listpokemon = document.createElement("li");
    //to create button
    const button = document.createElement("button");
    //sets button name to pokemon name
    button.innerText = pokemon.name;
    //sets button class to button-class
    button.classList.add("button-class");
    //adds a button to the end of list
    listpokemon.appendChild(button);
    //adds list to the ul section
    pokemonList.appendChild(listpokemon);
    //button behaviour
    button.addEventListener("click", function (event) {
      //triggers showDetails function
      showDetails(pokemon);
    });
  }

  function loadList() {
    //promise to get pokeapi data from url
    return (
      fetch(apiUrl)
        .then(function (response) {
          //converts response to json
          return response.json();
        })
        //drills down into the response to grab the data
        .then(function (json) {
          //for each result, gathers only the name and itemurl into an object called pokemon
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            //uses the add function to push the pokemon object into the pokemonList array
            add(pokemon);
            //also logs each new object to the console
            console.log(pokemon);
          });
        })
        //if unsuccessful, logs the error to console
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  function showDetails(item) {
    //calls loadDetails function
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //function for drill down detail of pokemon after button click
  function loadDetails(item) {
    const url = item.detailsUrl;
    //drill down promise fetch for info from each pokemon's detailsUrl
    return (
      fetch(url)
        .then(function (response) {
          //converts response to json
          return response.json();
        })
        //drills down into the response to grab the data that's needed
        .then(function (details) {
          // what in the world does this do??
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        //logs error to the console
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//--------------------------------------------------

//function to compile array from the external pokemon api data
pokemonRepository
  .loadList()
  //get obj in arr and for each obj, add it to the list
  .then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
