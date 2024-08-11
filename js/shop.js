
//document.addEventListener('DOMContentLoaded', function () {
window.onload = function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotal = document.querySelector('.cart p');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const maxQtyButtons = document.querySelectorAll('.max-qty');
    let total = 0;
    let cartItemCount = 0;
    let cartData = [];
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const price = parseFloat(button.dataset.price);
        const name = button.dataset.name;
        qtyName = e.target.parentElement.children[3].name;
        const quantity = document.getElementById(qtyName).value;
        if (quantity > 0) {
            const cartItem = { name, price, quantity };
            const existingItem = cartData.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                cartData.push(cartItem);
            }
            updateCart();
        }
    });
});

maxQtyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        curButton = e.target.dataset.name;
        stkName = e.target.parentElement.children[0].name;
        qty = document.getElementById(stkName).value;
        qtyName = e.target.previousElementSibling.name;
        document.getElementById(qtyName).value = parseInt(qty);
    });
});

function updateCart() {
    total = 0;
    cartItemCount = 0;
    cartItems.innerHTML = '';
    cartData.forEach(item => {
        const cartItem = document.createElement('p');
        cartItem.innerHTML = `
                  <span>${item.quantity} x ${item.name} - R${(item.price * item.quantity).toFixed(0)}</span>
                  <button class="remove-from-cart" data-name="${item.name}">Remove</button>
                `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
        cartItemCount += item.quantity;
    });
    cartTotal.textContent = `Total: R${total.toFixed(0)}`;
    cartCount.textContent = cartItemCount;
}

cartItems.addEventListener('click', event => {
    if (event.target.classList.contains('remove-from-cart')) {
        const name = event.target.dataset.name;
        const index = cartData.findIndex(item => item.name === name);
        cartData.splice(index, 1);
        updateCart();
    }
});