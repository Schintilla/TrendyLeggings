csvFileName = '/myCodes/data/leggings stock.csv'; // Set the fixed CSV file name here
let imageData = []; // Store the image data
let currentSortOrder = 'high-to-low';
let cartData = [];

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

function restoreData() {
    const input2 = document.querySelector(".cart-count");
    input2.innerHTML = window.sessionStorage.getItem('inputValue1');
    const input3 = document.querySelector(".total");
    input3.innerHTML = window.sessionStorage.getItem('inputValue2');
    if (window.sessionStorage.getItem('cartDataTemp') != null) {
        retJSON = window.sessionStorage.getItem('cartDataTemp');
        cartData = JSON.parse(retJSON);
        cartData.forEach(item => {
            const qty = document.getElementById(item.name);
            qty.value = item.quantity;
            const cartItemAmt = qty.parentElement.parentElement.children[6];
            cartItemAmt.innerHTML="Cart: R " + item.price*item.quantity;
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

        const sizeP = document.createElement('div');
        sizeP.classList.add('size');
        sizeP.textContent = "Size: " + item.size;
        imageDiv.appendChild(sizeP);

        const priceP = document.createElement('div');
        // priceP.classList.add('price');
        const priceS1 = document.createElement('span');
        priceS1.classList.add('left');
        priceS1.textContent = "R " + item.price.toFixed(0);
        const priceS2 = document.createElement('span');
        priceS2.classList.add('right');
        priceS2.textContent = "Stock: " + item.stock;

        priceP.appendChild(priceS1);
        priceP.appendChild(priceS2);

        imageDiv.appendChild(priceP);

        const stockContainer = document.createElement('div');
        stockContainer.classList.add('stock-container');

        const inputQ = document.createElement('input');
        inputQ.setAttribute('type', 'number');
        inputQ.setAttribute('name', item.description);
        inputQ.setAttribute('id', item.description);
        inputQ.setAttribute('min', '0');
        inputQ.setAttribute('max', '999');
        inputQ.setAttribute('value', '1');
        stockContainer.appendChild(inputQ);

        const maxbutton = document.createElement('button');
        maxbutton.classList.add('max-qty');
        maxbutton.setAttribute('name', item.description);
        maxbutton.textContent = 'Max';
        maxbutton.addEventListener('click', (e) => {
            qty = parseInt(e.target.parentElement.parentElement.children[3].children[1].innerHTML.substring(6).trimStart(), 10);
            e.target.previousElementSibling.value = qty;
        });
        stockContainer.appendChild(maxbutton);

        const resetbutton = document.createElement('button');
        resetbutton.classList.add('reset');
        resetbutton.setAttribute('name', item.description);
        resetbutton.textContent = 'Reset';
        resetbutton.addEventListener('click', (e) => {
            qty = e.target.parentElement.children[0];
            qty.value = 1;
            const name = e.target.dataset.name;
            const index = cartData.findIndex(item => item.name === name);
            cartData.splice(index, 1);
            const cartItemAmt = qty.parentElement.parentElement.children[6];
            cartItemAmt.innerHTML = "-";
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
            const fileLink = e.target.parentElement.children[0].src;
            var pos = fileLink.lastIndexOf("/");
            const fileNm = fileLink.substring(pos);
            const price = e.target.parentElement.children[3].children[0].innerHTML.substring(1).trimStart();
            const name = button.name;
            const quantity = parseInt(e.target.parentElement.children[4].firstChild.value, 10);
            if (quantity > 0) {
                const cartItem = { name, price, quantity, fileNm };
                const existingItem = cartData.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity = quantity;
                } else {
                    e.target.parentElement.children[6].innerHTML = "Cart: R " + (price * quantity).toLocaleString();
                    cartData.push(cartItem);
                }
                updateCart();
            }
        });
        imageDiv.appendChild(button);

        const cartamt = document.createElement('div');
        cartamt.classList.add('cart-amt');
        cartamt.textContent = "-";
        imageDiv.appendChild(cartamt);
        
        imageGrid.appendChild(imageDiv);
    });
}


function updateCart() {
    let total = 0;
    const cartTotal = document.querySelector('.total');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    let cartItemCount = 0;
    cartItems.innerHTML = '';
    cartData.forEach(item => {
        //const cartItem = document.createElement('p');
        //cartItem.innerHTML = `
        //          <span>${item.quantity} x ${item.name} - R&nbsp${(item.price * item.quantity).toFixed(0)}</span>
        //          <button class="remove-from-cart" data-name="${item.name}">Remove</button>
        //        `;
        //cartItem.addEventListener('click', (e) => {
        //    if (e.target.classList.contains('remove-from-cart')) {
        //        const name = e.target.dataset.name;
        //        const index = cartData.findIndex(item => item.name === name);
        //        cartData.splice(index, 1);
        //        const qty = document.getElementById(item.name);
        //        qty.value = 1
        //        const cartItemAmt = qty.parentElement.parentElement.children[6];
        //        cartItemAmt.innerHTML = "Cart: R 0"
        //        updateCart();
        //    }
        //});
        //cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
        cartItemCount += item.quantity;
    });
    cartTotal.textContent = "Total: R " + total.toFixed(0);
    cartCount.textContent = "Items: " + cartItemCount;
    window.sessionStorage.setItem('inputValue1', cartCount.textContent);
    window.sessionStorage.setItem('inputValue2', cartTotal.textContent);
    let cartJSON = JSON.stringify(cartData);
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

function matchAndModifyCSV(csvFile, arrayData) {
    // Read the CSV file
    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data into an array of rows
            const rows = data.split('\n').map(row => row.split(','));

            // Create a new array to store the modified rows
            const modifiedRows = [];

            // Iterate over each row in the CSV
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const column1Value = row[0];

                // Find a matching row in the array data based on the 'name' property
                const matchingRow = arrayData.find(arrayRow => arrayRow.name === column1Value);

                // If a match is found, replace column 3 and add the row to the modified rows
                if (matchingRow) {
                    row[2] = matchingRow.quantity;
                    modifiedRows.push(row);
                }
            }

            // Convert the modified rows back into a CSV string
            const modifiedCSV = modifiedRows.map(row => row.join(',')).join('\n');

            // Download the modified CSV as a file
            const blob = new Blob([modifiedCSV], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'modified_csv.csv';
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error reading CSV file:', error));
}

//// Replace 'your_csv_file.csv' with the actual path to your CSV file
//const csvFile = 'your_csv_file.csv';

//// Your array data
//const arrayData = [
//    { name: 'SKU: Leggings1', price: '199', quantity: 1, fileNm: '/Leggings%20Black.jpeg', spare: "" },
//    { name: 'SKU: Leggings2', price: '299', quantity: 1, fileNm: '/Leggings%20Red.jpeg', spare: "" },
//    { name: 'SKU: Leggings3', price: '149', quantity: 1, fileNm: '/Leggings1.jpeg', spare: "" }
//];

//// Call the function to perform the matching and modification
//matchAndModifyCSV(csvFile, arrayData);
//const csvFileName = '../data/leggings stock.csv';


