// Control dark mode in the root element
let checkbox = document.getElementById('dark-switch');

checkbox.addEventListener('change', (event) => switchDarkMode(event))

function switchDarkMode (e) {
    let root = document.getElementById('root');
    if (e.target.checked) {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }
}
