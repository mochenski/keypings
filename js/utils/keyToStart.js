function keyToStart() {
    let div = document.getElementById('main');
    return window.addEventListener('keypress', () => {
        div.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, { once: true });
}

export default keyToStart;

