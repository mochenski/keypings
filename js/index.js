import keyToStart from './utils/keyToStart.js';
import generateInitialText from './utils/generateInitialText.js';
import startTyping from './typing/typing.js';

function main() {
   
    generateInitialText();
    keyToStart();

    const handlePositioning = (e) => {
        let main = document.getElementById('main');
        if (window.scrollY >= main.offsetTop -100) {
            startTyping();
            window.removeEventListener('scroll', handlePositioning);
        }
    } 
    window.addEventListener('scroll', handlePositioning);

}

main();