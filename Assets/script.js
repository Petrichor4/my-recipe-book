document.getElementById('save-recipe').addEventListener('click', function() {
    const title = document.getElementById('recipe-title').value;
    const imgUrl = document.getElementById('recipe-img-url').value;
    const linkUrl = document.getElementById('recipe-link-url').value;
    const description = document.getElementById('recipe-description').value;

    const newRecipeCard = document.createElement('article');
    newRecipeCard.classList.add('my-5', 'card');
    newRecipeCard.innerHTML = `
        <div id="front" class="flex justify-start">
          <img src="${imgUrl}" alt="" />
          <div id="info" class="flex items-start flex-col">
            <h2 class="title w-full block px-4 py-2 text-3xl text-center">
              ${title}
            </h2>
            <p class="p-4">${description}</p>
          </div>
          <div class="flip-icon" onclick="flipCard(this)">
          <i class="fa-solid fa-repeat fa-rotate-by fa-sm" style="--fa-rotate-angle: 90deg;""></i>
          </div>
        </div>
        <div id="back">
          <h2 class="title">Recipe:</h2>
          <p contenteditable='true' class="w-full p-4 h-4/5 overflow-auto">Copy Your Recipe Here!</p>
          <a href="${linkUrl}" target="_blank">Go to Recipe</a>
          <div class="flip-icon" onclick="flipCard(this)"><i class="fa-solid fa-repeat fa-rotate-by fa-sm" style="--fa-rotate-angle: 90deg;""></i></div>
        </div>
    `;

    // Insert the new recipe card before the "Add New Recipe" card
    const addNewCard = document.getElementById('new-card');
    addNewCard.parentNode.insertBefore(newRecipeCard, addNewCard);
    
    // Clear the input fields after saving
    document.getElementById('recipe-title').value = '';
    document.getElementById('recipe-img-url').value = '';
    document.getElementById('recipe-link-url').value = '';
    document.getElementById('recipe-description').value = '';
});

function flipCard(element) {
    const card = element.closest('.card');
    card.classList.toggle('flipped');
}

function openMenu() {
    const menu = document.querySelector('aside');
    menu.classList.toggle('open');
}


// const addNew = document.getElementById('add-new');
// const card = document.querySelectorAll('#card');

// // Function for adding a new recipe card to the page
// function createCard() {
//     const div = document.createElement('div');
//     const img = document.createElement('img');
//     const h2 = document.createElement('h2');
//     const p = document.createElement('p');
//     const a = document.createElement('a');
//     const section = document.getElementById('recipes');    
// }
// card.forEach(card => card.addEventListener('click', () =>  {
//     if (card.classList.contains('flipped')) {
//         card.classList.remove('flipped');
//     } else {
//         card.classList.add('flipped');
//     }
// }))
