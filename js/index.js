const cardContainer = document.querySelector(".card_container");
const searchInput = document.querySelector(".search-box")
const modal = document.querySelector(".modal")

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

const updateSearch = (value = "") => {
    cardContainer.innerHTML = ""
    filteredStarWarzData = starWarzData
        .filter(data => data.name.toLowerCase().includes(value.toLowerCase().trim()))
    filteredStarWarzData.map(({ name, gender }, i) => cardUI(name, gender, i))
}



const cardUI = (name, gender, i) => {
    cardContainer.innerHTML += `
        <div class="card" role="${i}">
            <img src="https://robohash.org/${name}" role="${i}" />
            <div class="details_container" role="${i}">
              <h3 role="${i}">${name}</h3>
            </div>
        </div>`;
};


cardUILoader();

const modalUI = ({name, height, gender}) => {
    modal.innerHTML = `
    <div class="modal_content">
    <span class="material-symbols-outlined close_icon">close</span>
    <img src="https://robohash.org/${name}" alt="">
    <div>
      <div class="details_container"><h4>Name: </h4>${name}</div>
      <div class="details_container"><h4>Gender: </h4>${gender}</div>
      <div class="details_container"><h4>Height: </h4>${height}</div>
    </div>
  </div>
</div>`
}


const fetchData = (pageNumber) => {
    fetch(`https://swapi.dev/api/people?page=${pageNumber}`, { method: "GET", headers: { "Content-Type": "application / json", }, })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            starWarzData = data.results;
            updateSearch("")
            cardContainer.innerHTML = ""
            filteredStarWarzData.map(({ name, gender }, i) =>
                setTimeout(() => cardUI(name, gender, i), 1000))
        });

    searchInput.addEventListener("input", (e) => {
        updateSearch(e.target.value)
    })
}
fetchData(1);

console.log(cardContainer)
cardContainer.addEventListener("click", (e) => {
    const characterIndex = e.target.role;
    if (!isNaN(characterIndex)) modal.style.display = "flex"
    const character = filteredStarWarzData[characterIndex];
    modalUI({...character})
})

modal.addEventListener("click", (e) =>  (e.target.className.includes("close_icon") || e.target.className === "modal") ? modal.style.display = "none" : null)