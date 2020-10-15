

let main = document.getElementById('main');

window.addEventListener('keypress', () => {main.scrollIntoView({ behavior: 'smooth', block: 'center' }), start()}, {once: true});

