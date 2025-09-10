
function showSpinner() {
  spinner.classList.remove("hidden");
}

// Hide spinner
function hideSpinner() {
  spinner.classList.add("hidden");
}





const categoriesContainer = document.getElementById("categoriesContainer");


const plantsContainer = document.getElementById("plantsContainer")
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.plants);
    const plants = data.plants

 plantsContainer.innerHTML = "";

    plants.forEach(plants => {
      plantsContainer.innerHTML +=`
    
      <img src="${plants.image}"/>
      <h1 class="plant-name">${plants.name}</h1>
       <p>"${plants.description}</p> 
       <p  class="plant-number">${plants.price}</p>
       <div><button class="call-btn">"$Add To Cart"</button></div>`
      
    });
  })
}


const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.categories);
    const categories = data.categories
categoriesContainer.innerHTML +=`<li>All Trees</li>`

    categories.forEach(cat => {
      categoriesContainer.innerHTML +=`
      <li>${cat.category_name}</li>`
    });
 
    })
    .catch(err => {
      console.log(err)
    })
//     Cards
// function renderCards(plants) {
//   plantsContainer.innerHTML = "";

//   if (!plants || plants.length === 0) {
//     plantsContainer.innerHTML = <

      }
loadCategories();
loadAllPlants();

  // ✅ 5. Plant Details (Modal)

async function showDetails(id) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    console.log(`Plant Details [${id}]:`, data);

    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
      <h2>${data.plant_name}</h2>
      <img src="${data.image}" width="200"/>
      <p>${data.description || "No description available"}</p>
      <p><strong>Price:</strong> $${data.price}</p>
    `;

    modal.classList.remove("hidden");

    document.getElementById("close-modal").onclick = () => {
      modal.classList.add("hidden");
    };
  } catch (error) {
    console.error("Error loading plant details:", error);
  }

  }


// ✅ Initial Load
// loadCategories();
// loadAllPlants();











