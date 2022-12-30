const cardContainer = document.querySelector(".card_container");
const searchInput = document.querySelector(".search-box")

let starWarzData = [];
let filteredStarWarzData = []

const cardUILoader = () => {
    for (let i = 1; i < 9; i++) {
        cardContainer.innerHTML += `
    <div class="loader_card" >
      <div class="image"></div>
      <div class="details_container">
        <p class="text"></p>
    </div> `;
    }
};

const updateSearch = (value = "") =>{
    cardContainer.innerHTML =""
    filteredStarWarzData = starWarzData
    .filter(data => data.name.toLowerCase().includes(value.toLowerCase().trim()))
    filteredStarWarzData.map(({name,gender}, i) =>cardUI( name, gender, i ))
}



const cardUI = ( name, gender, i ) => {
    cardContainer.innerHTML += `
            <div class="card">
            <img src="https://robohash.org/${name}" />
            <div class="details_container">
              <h3>${name}</h3>
              <p></p>
            </div>
        </div>`;
};

cardUILoader();


fetch("https://swapi.dev/api/people", { method: "GET", headers: { "Content-Type": "application / json", }, })
    .then((res) => res.json())
    .then((data) => {
        starWarzData = data.results;
        updateSearch("")
        cardContainer.innerHTML =""
        filteredStarWarzData.map(({name,gender}, i) => 
        setTimeout(()=>cardUI(name, gender, i),1000))
    });

    searchInput.addEventListener("input",(e)=>{
        updateSearch(e.target.value)
    })

    // import { TfiHome, TfiNotepad, TfiSettings, TfiUnlink, TfiHeart, TfiPowerOff, TfiBlackboard } from "react-icons/tfi"
