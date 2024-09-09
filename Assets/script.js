const addNew = document.getElementById('add-new');
const card = document.getElementById('card');

// Function for adding a new recipe card to the page
function createCard() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const a = document.createElement('a');
    const section = document.getElementById('recipes');    
}
card.addEventListener('click', function() {
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    } else {
        card.classList.add('flipped');
    }
})