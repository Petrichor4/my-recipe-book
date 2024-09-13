document.addEventListener('DOMContentLoaded', function() {
  loadSavedRecipes(); // Load any saved recipes when the page is loaded
});

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
        <div class="flip-icon" onclick="flipCard(this)">🔄</div>
      </div>
      <div id="back">
        <h2>Recipe</h2>
        <a href="${recipe.linkUrl}" target="_blank">Go to Recipe</a>
        <div class="flip-icon" onclick="flipCard(this)">🔄</div>
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

function loadSavedRecipes() {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.forEach(recipe => createRecipeCard(recipe));
}

function flipCard(element) {
  const card = element.closest('.card');
  card.classList.toggle('flipped');
}
