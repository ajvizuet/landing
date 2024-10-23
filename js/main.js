let ready = () => {
    console.log('DOM está listo');
}

let loaded = () => {
    let myForm = document.getElementById('form');
    debugger
};

window.addEventListener('DOMContentLoaded', ready);
window.addEventListener('load', loaded);