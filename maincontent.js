document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    const toDoList = document.querySelector('.to-do-list');

    function updateCardCount() {
        const cardCount = cardContainer.querySelectorAll('.cardheader-parent').length;
        const cardsCounter = toDoList.querySelector('.cards-number');
        if (cardsCounter) {
            cardsCounter.textContent = cardCount;
        }
    }

    // Initial setup
    updateCardCount();
});