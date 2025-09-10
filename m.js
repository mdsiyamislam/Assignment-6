// ⬇️ এখানে categoriesContainer (HTML এ ul এর id) use হয়েছে
const categoriesContainer = document.getElementById("categoriesContainer");  

// ⬇️ এখানে plantsContainer (HTML এ div এর id) use হয়েছে
const plantsContainer = document.getElementById("plantsContainer");  
  

// Load Categories  
const loadCategories = () => {  
  fetch("https://openapi.programming-hero.com/api/categories")  
    .then((res) => res.json())  
    .then((data) => {  
      const categories = data.categories;  

      // First option "All Trees"  
      // ⬇️ categoriesContainer.innerHTML এ category গুলো বসানো হচ্ছে
      categoriesContainer.innerHTML = <li data-id="all">All Trees</li>;  

      // Add all categories  
      categories.forEach(cat => {  
        categoriesContainer.innerHTML += <li data-id="${cat.category_id}">${cat.category_name}</li>;  
      });  

      // Add click event for each category  
      // ⬇️ আবার categoriesContainer থেকে সব li select করা হচ্ছে
      const allLis = categoriesContainer.querySelectorAll("li");  
      allLis.forEach(li => {  
        li.addEventListener("click", () => {  
          const catId = li.getAttribute("data-id");  
          loadCategoryPlants(catId);  
        });  
      });  

      // Load all plants initially  
      loadCategoryPlants("all");  
    })  
    .catch((err) => console.error("Error loading categories:", err));  
};  
  

// Load plants by category  
const loadCategoryPlants = (catId) => {  
  let url = "";  

  if (catId === "all") {  
    url = "https://openapi.programming-hero.com/api/plants";  
  } else {  
    url =`https://openapi.programming-hero.com/api/category/${catId}`
  } 

  fetch(url)  
    .then(res => res.json())  
    .then(data => {  
      const plants = data.data || data;   
      displayPlants(plants);  
    })  
    .catch(err => console.error("Error loading plants:", err));  
};  
  

// Display plants as cards  
const displayPlants = (plants) => {  
  // ⬇️ এখানে plantsContainer clear করা হচ্ছে
  plantsContainer.innerHTML = "";  

  plants.forEach(plant => {  
    const card = document.createElement("div");  
    card.classList.add("card");  

    card.innerHTML = `  
      <img src="${plant.image}" alt="${plant.name}" />  
      <h3>${plant.name}</h3>  
      <p>Category: ${plant.category}</p>  
      <button onclick="showDetails('${plant.plantId}')">See Details</button>  
      <button>Add to Cart</button>  
    `;  

    // ⬇️ নতুন তৈরি কার্ড গুলো plantsContainer এ যোগ হচ্ছে
    plantsContainer.appendChild(card);  
  });  
};  
  

// Dummy details function  
const showDetails = (id) => {  
  alert("Clicked on plant ID: " + id);  
};  

loadCategories();