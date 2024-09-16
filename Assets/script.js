
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
const adjectives = ['Delicious', 'Quick', 'Healthy', 'Bad'];

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
      title: title,
      imgUrl: imgUrl,
      linkUrl: linkUrl,
      description: description
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
  newRecipeCard.innerHTML = `
      <div id="front" class="flex justify-start">
        <img src="${recipe.imgUrl}" alt="" />
        <div id="info" class="flex items-start flex-col">
          <h2 class="w-full block px-4 py-2 text-3xl text-center">
            ${recipe.title}
          </h2>
          <p class="p-4">${recipe.description}</p>
        </div>
        <div class="flip-icon" onclick="flipCard(this)"><i class="fa-solid fa-repeat fa-rotate-by fa-sm" style="--fa-rotate-angle: 90deg;""></i>
        </div>
      </div>
      <div id="back">
        <h2>Recipe:</h2>
        <p id="recipe" contenteditable="true" class="w-full h-4/5"${recipe.userRecipe}></p>
        <a href="${recipe.linkUrl}" target="_blank">Go to Recipe</a>
        <div class="flip-icon" onclick="flipCard(this)">
        <i class="fa-solid fa-repeat fa-rotate-by fa-sm" style="--fa-rotate-angle: 90deg;""></i>
        </div>
      </div>
  `;

  // Insert the new recipe card before the "Add New Recipe" card
  const addNewCard = document.getElementById('new-card');
  addNewCard.parentNode.insertBefore(newRecipeCard, addNewCard);
}

function saveRecipeToLocalStorage(recipe) {
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
function openMenu() {
    const menu = document.querySelector('aside');
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
