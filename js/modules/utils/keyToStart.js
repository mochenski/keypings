function keyToStart() {
    let div = document.getElementById('main');
    window.addEventListener('keypress', () => {
        div.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, { once: true });

    let keys = document.querySelector('.keys') 
    keys.addEventListener('click', () => {
        div.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, { once: true });
}

export default keyToStart;

