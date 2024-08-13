const csvFileName = '../data/leggings stock.csv'; // Set the fixed CSV file name here
let imageData = []; // Store the image data
let currentSortOrder = 'high-to-low';

fetch(csvFileName)
    .then(response => response.text())
    .then(data => {
        processCSV(data);
        renderImages();
        restoreData();
    })
    .catch(error => {
        console.error('Error reading CSV file:', error);
    });

//window.addEventListener('load', function () {
//window.onload = function () {
//document.addEventListener('DOMContentloaded', function () {
function restoreData() {
    const input2 = document.querySelector(".cart-count");
    input2.innerHTML = window.sessionStorage.getItem('inputValue1');
    const input3 = document.querySelector(".total");
    input3.innerHTML = window.sessionStorage.getItem('inputValue2');
    if (window.sessionStorage.getItem('cartDataTemp') != null) {
        retJSON = window.sessionStorage.getItem('cartDataTemp')
        cartData = JSON.parse(retJSON);
        cartData.forEach(item => {
            const qty = document.getElementById(item.name);
            qty.value = item.quantity
            const cartItemAmt = qty.parentElement.parentElement.children[7];
            cartItemAmt.innerHTML="Cart: R " + item.price*item.quantity
        });
    }
}

function processCSV(csvData) {
    const rows = csvData.trim().split('\n');
    for (let i = 1; i < rows.length; i++) {
        const [filename, width, height, description, additionalText, priceStr, size, stock] = rows[i].split(',');
        const price = parseFloat(priceStr.trim());
        imageData.push({ filename, width, height, description, additionalText, price: isNaN(price) ? 0 : price, size, stock });
    }
}

function renderImages() {
    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = '';

    imageData.forEach(item => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-container');

        const img = document.createElement('img');
        img.src = item.filename;
        img.width = parseInt(item.width);
        //img.height = parseInt(item.height);
        imageDiv.appendChild(img);

        const descriptionP = document.createElement('div');
        descriptionP.classList.add('description');
        descriptionP.textContent = item.description;
        imageDiv.appendChild(descriptionP);

        const additionalTextP = document.createElement('div');
        additionalTextP.classList.add('additional-text');
        additionalTextP.textContent = item.additionalText;
        imageDiv.appendChild(additionalTextP);

        const sizeP = document.createElement('div');
        sizeP.classList.add('size');
        sizeP.textContent = "Size: " + item.size;
        imageDiv.appendChild(sizeP);

        const priceP = document.createElement('div');
        priceP.classList.add('price');
        priceP.textContent = "Price: R " + item.price.toFixed(0) + " Stock: " + item.stock;
        imageDiv.appendChild(priceP);

        const stockContainer = document.createElement('div');
        stockContainer.classList.add('stock-container');

        const inputQ = document.createElement('input');
        inputQ.setAttribute('type', 'number');
        //inputQ.setAttribute('id', 'quantity1');
        inputQ.setAttribute('name', item.description);
        inputQ.setAttribute('id', item.description);
        inputQ.setAttribute('min', '0');
        inputQ.setAttribute('max', '999');
        inputQ.setAttribute('value', '1');
        //inputQ.textContent = "Qty:";
        stockContainer.appendChild(inputQ);

        const maxbutton = document.createElement('button');
        maxbutton.classList.add('max-qty');
        maxbutton.setAttribute('name', item.description);
        maxbutton.textContent = 'Max';
        maxbutton.addEventListener('click', (e) => {
            const qtyName = e.target.previousElementSibling.name;
            // qty = parseInt(e.target.closest("div").parentElement.children[4].innerHTML.slice(-3, -1).trimStart(), 10);
            qty = parseInt(e.target.parentElement.parentElement.children[4].innerHTML.substring(19).trimStart(), 10);
            e.target.previousElementSibling.value = qty;
        });
        stockContainer.appendChild(maxbutton);

        const resetbutton = document.createElement('button');
        resetbutton.classList.add('reset');
        resetbutton.setAttribute('name', item.description);
        resetbutton.textContent = 'Reset';
        resetbutton.addEventListener('click', (e) => {
            qty = e.target.parentElement.children[0]
            qty.value = 1;
            const name = e.target.dataset.name;
            const index = cartData.findIndex(item => item.name === name);
            cartData.splice(index, 1);
            const cartItemAmt = qty.parentElement.parentElement.children[7];
            cartItemAmt.innerHTML = "Cart: R 0"
            updateCart();
        });
        stockContainer.appendChild(resetbutton);
        imageDiv.appendChild(stockContainer);

        const button = document.createElement('button');
        button.classList.add('add-to-cart');
        button.setAttribute('price', item.price);
        button.setAttribute('name', item.description);
        button.textContent = 'Add to Cart';
        button.addEventListener('click', (e) => {
            const price = e.target.parentElement.children[4].innerHTML.substring(8, 12).trimEnd();
            const name = button.name;
            const quantity = parseInt(e.target.parentElement.children[5].firstChild.value, 10);
            if (quantity > 0) {
                const cartItem = { name, price, quantity };
                const existingItem = cartData.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity = quantity;
                } else {
                    e.target.parentElement.children[7].innerHTML = "Cart: R " + price * quantity
                    cartData.push(cartItem);
                }
                updateCart();
            }
        });
        imageDiv.appendChild(button);

        const cartamt = document.createElement('div');
        cartamt.classList.add('cart-amt');
        //cartamt.setAttribute('id', item.description);
        cartamt.textContent = "Cart: R 0";
        imageDiv.appendChild(cartamt);
        
        imageGrid.appendChild(imageDiv);
    });
}

let cartData = [];
function updateCart() {
    let total = 0;
    const cartTotal = document.querySelector('.total');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    let cartItemCount = 0;
    cartItems.innerHTML = '';
    cartData.forEach(item => {
        const cartItem = document.createElement('p');
        cartItem.innerHTML = `
                  <span>${item.quantity} x ${item.name} - R&nbsp${(item.price * item.quantity).toFixed(0)}</span>
                  <button class="remove-from-cart" data-name="${item.name}">Remove</button>
                `;
        cartItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-from-cart')) {
                const name = e.target.dataset.name;
                const index = cartData.findIndex(item => item.name === name);
                cartData.splice(index, 1);
                const qty = document.getElementById(item.name);
                qty.value = 1
                const cartItemAmt = qty.parentElement.parentElement.children[7];
                cartItemAmt.innerHTML = "Cart: R 0"
                updateCart();
            }
        });
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
        cartItemCount += item.quantity;
    });
    // cartTotal.textContent = `Total: R${total.toFixed(0)}`;
    cartTotal.textContent = "Total: R " + total.toFixed(0);
    cartCount.textContent = "Items: " + cartItemCount;
    window.sessionStorage.setItem('inputValue1', cartCount.textContent);
    window.sessionStorage.setItem('inputValue2', cartTotal.textContent);
    let cartJSON = JSON.stringify(cartData)
    window.sessionStorage.setItem('cartDataTemp', cartJSON);
}
function sortImages(order) {
    currentSortOrder = order;
    updateSortButtonStyles();
    if (order === 'high-to-low') {
        imageData.sort((a, b) => b.price - a.price);
    } else if (order === 'low-to-high') {
        imageData.sort((a, b) => a.price - b.price);
    }
    renderImages();
}

function updateSortButtonStyles() {
    const sortHighToLowButton = document.getElementById('sortHighToLow');
    const sortLowToHighButton = document.getElementById('sortLowToHigh');

    sortHighToLowButton.classList.remove('active');
    sortLowToHighButton.classList.remove('active');

    if (currentSortOrder === 'high-to-low') {
        sortHighToLowButton.classList.add('active');
    } else if (currentSortOrder === 'low-to-high') {
        sortLowToHighButton.classList.add('active');
    }
}
