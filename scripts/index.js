const popbox        = document.querySelector("#popbox");
const popboxContent = document.querySelector("#popbox-content");
const infoAbout     = document.querySelector("#info-about");

const openInfo = (id) => {
    popbox.style.display    = 'flex';
    popboxContent.innerHTML = getPagesData()[id]
}

popbox.addEventListener('click', (event) => {
    if (event.target.id !== "popbox") return;
    popbox.style.display = 'none';
})