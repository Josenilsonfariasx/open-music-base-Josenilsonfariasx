const albumSection = document.querySelector('.album-section');
const albumCardsList = albumSection.querySelector('.album-cards');
const filterSection = document.querySelector('.filter-section');
const filterButtonsList = filterSection.querySelector('.filter-buttons');
const input = document.querySelector('input[type="range"]');
const priceText = document.querySelector('.filter-text p');

let filteredArray = products;
let categoryIndex = 0;
let inputValue = input.value;

function createAlbumCard(album) {
    const card = document.createElement('li');
    card.classList.add('li');
    const image = document.createElement('img');
    image.classList.add('img-card');
    const bandYear = document.createElement('p');
    bandYear.classList.add('band')
    const albumTitle = document.createElement('h2');
    albumTitle.id = 'title'
    albumTitle.classList.add('title')
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price__container');
    const price = document.createElement('p');
    price.classList.add('price')
    const buyButton = document.createElement('button');
    buyButton.classList.add('btn-1')
    buyButton.id = 'buy'

    image.src = album.img;
    bandYear.textContent = `${album.band} - ${album.year}`;
    albumTitle.textContent = album.title;
    price.textContent = `R$ ${album.price.toFixed(2)}`;
    buyButton.textContent = 'Comprar';

    priceContainer.appendChild(price);
    priceContainer.appendChild(buyButton);

    card.appendChild(image);
    card.appendChild(bandYear);
    card.appendChild(albumTitle);
    card.appendChild(priceContainer);

    return card;
}

function renderFilterButtons(categories) {
    categories.forEach((category) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('btn__category');
        button.style.cursor = 'pointer';
        if (category == 'Todos') {
            button.classList.add('btn__category-active');
        }
    button.textContent = category;
    listItem.appendChild(button);
    filterButtonsList.appendChild(listItem);
    });
}

function renderAlbumCards(products) {
    products.forEach((album) => {
        const card = createAlbumCard(album);
        albumCardsList.appendChild(card);
    });
}

function addEventListeners(categories, products) {
    const buttons = filterButtonsList.querySelectorAll('.btn__category');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('btn__category-active')) {
            return;
            }
        buttons.forEach((otherButton) => {
            if (otherButton !== button) {
                otherButton.classList.remove('btn__category-active');
            }
        });
        button.classList.add('btn__category-active');
        categoryIndex = categories.findIndex((category) => category === button.innerText);

        if (categoryIndex === 0) {
            filteredArray = products.filter((product) => product.price <= inputValue);
        } else {
            filteredArray = products.filter(
            (product) => product.category === categoryIndex && product.price <= inputValue
            );
        }
        albumCardsList.innerHTML = '';
        renderAlbumCards(filteredArray);
        });
    });
    input.addEventListener('input', () => {
        inputValue = input.value;
        priceText.textContent = `Até R$ ${inputValue}`;
        if (categoryIndex === 0) {
            filteredArray = products.filter((product) => product.price <= inputValue);
        } else {
        filteredArray = products.filter(
            (product) => product.category === categoryIndex && product.price <= inputValue
        );
    }
        albumCardsList.innerHTML = '';
        renderAlbumCards(filteredArray);    });
}

    input.addEventListener('input', () => {
        inputValue = input.value;
        priceText.textContent = `Até R$ ${inputValue}`;

    if (categoryIndex === 0) {
        filteredArray = products.filter((product) => product.price <= inputValue);
    } else {
        filteredArray = products.filter(
        (product) => product.category === categoryIndex && product.price <= inputValue);
    }

    albumCardsList.innerHTML = '';
    renderAlbumCards(filteredArray);
    });

function filterProductsByCategories(products, selectedCategories) {
    if (selectedCategories.length === 0) {
        return products;
    }
    return products.filter((product) => selectedCategories.includes(product.category));
}

function filterProductsByPrice(products, maxPrice) {
    return products.filter((product) => product.price <= maxPrice);
}

renderFilterButtons(categories);
renderAlbumCards(products);
addEventListeners(categories, products);