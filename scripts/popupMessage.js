// Script for showing popup message
const popupMessage = document.querySelector(".popup-message");
// Function for showing popup message
const showPopupMessage = (message) => {
    popupMessage.querySelector('.popup-message-text').textContent = message;
    popupMessage.classList.remove("transparent");
    setTimeout(() => {
        popupMessage.classList.add("transparent");
    }, 3000);
}
// Close popup message
popupMessage.querySelector('.popup-message-close').addEventListener('click',(e) => {
    popupMessage.classList.add("transparent");
});