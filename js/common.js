

function gotoCart() {
    const cartQty = document.querySelector(".cart-count").innerHTML.substring(7);
    const modal = document.querySelector("#modal");
    if (cartQty != "0") {
        window.location.href = "cart.html";
    }
    else {
        modal.showModal();
        const closeModal = document.querySelector(".modalbutton");
        closeModal.addEventListener("click", () => {
            modal.close();
        });
    }
}

function confirmMsg() {
    let cartStatus = cartChanges();
    if (cartStatus == true) {
        updateList();
    }
    const modal = document.querySelector("#modalMsg");
    modal.showModal();
    const closeModal = document.querySelector(".modalbutton");
    closeModal.addEventListener("click", () => {
        modal.close();
    });
}

function confirmOrder() {
    const modal = document.querySelector("#modalOrder");
    modal.showModal();
    const closeModal = document.querySelector(".modalbtn");
    closeModal.addEventListener("click", () => {
        modal.close();
    });
}

function checkCartMsg(pageSelect) {
    let cartStatus=cartChanges();
    if (cartStatus == true) {
        const modal = document.querySelector("#modalCheckCart");
        modal.showModal();
        const closeModal = document.querySelector(".modalbtn2");
        closeModal.addEventListener("click", () => {
            modal.close();
            updateList();
            window.location.href = pageSelect;
        });
        const closeModal2 = document.querySelector(".modalbtn4");
        closeModal2.addEventListener("click", () => {
            modal.close();
            window.location.href = pageSelect;
        });
    }
    else {
        window.location.href = pageSelect;
    }
}



function cartChanges() {
    const carttable = document.querySelector('.cart-itemlist');
    const rows = Array.from(carttable.querySelector('tbody').querySelectorAll('tr')); // Convert NodeList to array
    cartUpdate = false;
    rows.forEach((row, rowIndex) => {
        if (rowIndex < rows.length - 1) {
            const cells = row.querySelectorAll('td');
            const inputElement = cells[3].querySelector('input').value; // Get the input element
            const dataQty=cartData[rowIndex].quantity; // get the data qty
            const checkbox = cells[5].querySelector('input[type="checkbox"]');
            if (!checkbox.checked || dataQty != inputElement) {
                rowIndex = rows.length;
                cartUpdate = true;
            }
        }
    });
    return cartUpdate;
}