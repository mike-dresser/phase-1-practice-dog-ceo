console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', () => {

const imageContainer = document.querySelector('#dog-image-container');
const breedsList = document.querySelector('#dog-breeds');
const alphaSelect = document.querySelector('#breed-dropdown');
let breedListData = {};

fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(res => res.json())
    .then(data => {
        // console.log(data.message);
        data.message.forEach(link => {
            let image = document.createElement('img');
            image.src = link;
            imageContainer.append(image);
        })
    })

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(data => {
            console.log(Object.keys(data.message));
            createBreedList(Object.keys(data.message));
            breedListData = data.message;
        })

    function createBreedList(breeds) {
       breedsList.innerHTML = '';
        for (let breed of breeds) {
            let listItem = document.createElement('li');
            listItem.textContent = breed;

            // Challenge 3
            listItem.addEventListener('click', () => {
                listItem.style.color = 'red';
            })
            // --- end ---

            breedsList.append(listItem);
        }
    }

    // Challenge 4

    alphaSelect.addEventListener('change', () => {
        let breedArray = Object.keys(breedListData);
        let firstLetter = alphaSelect.value;
        let result = breedArray.filter((item) => {
            return item[0] === firstLetter;
        })
        createBreedList(result);

    })

    function createAlphaDropdown() {
        let alpha = 'abcdefghijklmnopqrstuvwxyz';
        for (let char of alpha) {
            let letter = document.createElement('option');
            letter.value = char;
            letter.textContent = char;
            alphaSelect.append(letter);
        }
    }
    
    createAlphaDropdown();

})