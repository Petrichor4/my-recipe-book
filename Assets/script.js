const addNew = document.getElementById('add-new');
const card = document.querySelectorAll('#card');

// Function for adding a new recipe card to the page
function createCard() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const a = document.createElement('a');
    const section = document.getElementById('recipes');    
}
card.forEach(card => card.addEventListener('click', () =>  {
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    } else {
        card.classList.add('flipped');
    }
}))