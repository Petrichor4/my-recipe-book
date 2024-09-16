
const loginBtn = document.getElementById('login-button');

if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Current login info
    // if (username === "username" && password === "password") {
      if (username && password) {
      //   alert("Login successful!");
      window.location.href = "index.html"; 
    } else {
      alert("Invalid username or password!");
    }
  });
}

// Other JavaScript code here...
// For example, create buttons for filtering recipes:
const adjectives = ['All','Delicious', 'Quick', 'Healthy', 'Bad'];

function createAdjectiveButtons() {
  let container = document.getElementById('adjective-buttons');
  
  if (!container) {
    console.error('Container for adjective buttons not found!');
    return;
  }
  
  adjectives.forEach(function(adj) {
    let button = document.createElement('button');
    button.innerText = adj;
    button.className = 'adjective-button';
    
    button.addEventListener('click', function() {
      filterRecipes(adj.toLowerCase());
    });
    
    container.appendChild(button);
  });
}

function filterRecipes(adjective) {
  let cards = document.querySelectorAll('#recipes-cards .card');
  cards.forEach(function(card) {
    let adjectivesAttr = card.getAttribute('data-adjectives');
    let cardAdjectives = adjectivesAttr ? adjectivesAttr.toLowerCase().split(',') : [];
    
    if (cardAdjectives.indexOf(adjective) !== -1) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize buttons when page is loaded
createAdjectiveButtons();
document.addEventListener('DOMContentLoaded', function() {
});

function flipCard(element) {
  const card = element.closest('.card');
  card.classList.toggle('flipped');
}
loadSavedRecipes(); // Load any saved recipes when the page is loaded

document.getElementById('save-recipe').addEventListener('click', function() {
  const title = document.getElementById('recipe-title').value;
  const imgUrl = document.getElementById('recipe-img-url').value;
  const linkUrl = document.getElementById('recipe-link-url').value;
  const description = document.getElementById('recipe-description').value;

  const newRecipe = {
      id: generateRandomNumber(1, 500),
      title: title,
      imgUrl: imgUrl,
      linkUrl: linkUrl,
      description: description,
  };

  // Save to localStorage
  saveRecipeToLocalStorage(newRecipe);

  // Create and insert the new card
  createRecipeCard(newRecipe);

  // Clear the input fields after saving
  document.getElementById('recipe-title').value = '';
  document.getElementById('recipe-img-url').value = '';
  document.getElementById('recipe-link-url').value = '';
  document.getElementById('recipe-description').value = '';
});

function createRecipeCard(recipe) {
  const newRecipeCard = document.createElement('article');
  newRecipeCard.classList.add('my-5', 'card');
  newRecipeCard.setAttribute('data-id', recipe.id); // Add data-id attribute
  newRecipeCard.innerHTML = `
      <div id="front" class="flex justify-start">
        <img src="${recipe.imgUrl}" alt="" />
        <i class=" p-3 fa-solid fa-x fa-2xs" style="color: #dbdfe6;" onclick="deleteCard(${recipe.id})"></i> <!-- Add onclick handler -->
        <div id="info" class="flex items-start flex-col">
          <h2 class="w-full block px-4 py-2 text-3xl text-center">
            ${recipe.title}
          </h2>
          <p class="p-4">${recipe.description}</p>
        </div>
        <div class="flip-icon" onclick="flipCard(this)"><i class="fa-solid fa-repeat fa-rotate-by fa-sm" style="--fa-rotate-angle: 90deg;"></i>
        </div>
      </div>
      <div id="back">
        <h2>Recipe:</h2>
        <p id="recipe" contenteditable="true" class="w-full h-4/5"></p>
        <a href="${recipe.linkUrl}" target="_blank">Go to Recipe</a>
        <div class="flip-icon" onclick="flipCard(this)">
        <i class="fa-solid fa-repeat fa-rotate-by fa-sm" style="--fa-rotate-angle: 90deg;"></i>
        </div>
      </div>
  `;
  // Insert the new recipe card before the "Add New Recipe" card
  const addNewCard = document.getElementById('new-card');
  addNewCard.parentNode.insertBefore(newRecipeCard, addNewCard);
  console.log(recipe)
}
function saveRecipeToLocalStorage(recipe) {
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  
}
function openMenu() {
    const menu = document.querySelector('aside');
    menu.classList.toggle('hidden');
    menu.classList.toggle('open');
}

function loadSavedRecipes() {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.forEach(recipe => createRecipeCard(recipe));
}

function flipCard(element) {
  const card = element.closest('.card');
  card.classList.toggle('flipped');
}

function login() {
  window.location.href = 'login.html'
}

function deleteCard(recipeId) {
  // Retrieve the list of recipes from localStorage
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  // Find the index of the recipe with the given recipeId
  const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
  // If the recipe is found, remove it from the list
  if (recipeIndex !== -1) {
    recipes.splice(recipeIndex, 1);
    // Save the updated list back to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    // Find the card element in the DOM using the recipeId
    const cardElement = document.querySelector(`.card[data-id="${recipeId}"]`);
    // Remove the card element from the DOM
    if (cardElement) {
      cardElement.remove();
    }
  }
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}