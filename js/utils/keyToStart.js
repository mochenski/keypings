let div = document.getElementById('main');

window.addEventListener('keypress', () => {div.scrollIntoView({ behavior: 'smooth', block: 'center' })}, {once: true});

