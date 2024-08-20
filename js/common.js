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