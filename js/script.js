const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    button.innerHTML = `
    <img width="60px" style="float:left;" src="${
      pokemon.imageUrl
    }"> <p class="button-text">${
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }</p>`;

    //sets button class to button-class
    button.classList.add("btn-4");
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
          json.results.forEach(function (item, index) {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`,
            };
            //uses the add function to push the pokemon object into the pokemonList array
            add(pokemon);
            //also logs each new object to the console
            //console.log(pokemon);
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
      //modal
      //selects the modal-container div
      const modalContainer = document.querySelector("#modal-container");

      function showModal(title) {
        modalContainer.innerHTML = "";

        const modal = document.createElement("div");
        modal.classList.add("modal");

        const closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "X";
        closeButtonElement.addEventListener("click", hideModal);

        const titleElement = document.createElement("h1");
        titleElement.innerText = title;

        const contentElement = document.createElement("p");
        contentElement.innerText = `
        Height: ${item.height}
        Weight: ${item.weight}
        Types: ${item.types}
        Abilities: ${item.abilities}`;

        const pokeImage = document.createElement("img");
        pokeImage.src = `${item.imageUrl}`;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokeImage);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");
      }

      function hideModal() {
        modalContainer.classList.remove("is-visible");
      }

      window.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          hideModal();
        }
      });

      modalContainer.addEventListener("click", (e) => {
        const target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      document.querySelector(".pokemon-list").addEventListener("click", () => {
        showModal(`${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`);
      });
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
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          //item.types = [...details.types]; <-- this doesn't work
          //item.abilities = [...details.abilities]; <-- this doesn't work either
          item.types = [];
          for (let i = 0; i < details.types.length; i++) {
            item.types.push(details.types[i].type.name);
          }

          item.abilities = [];
          for (let i = 0; i < details.abilities.length; i++) {
            item.abilities.push(details.abilities[i].ability.name);
          }
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
