import keyToStart from './utils/keyToStart.js';
import generateInitialText from './utils/generateInitialText.js';
import startTyping from './typing/typing.js';
import timer from './utils/timer.js';

function main() {
   
    const time = new timer(document.getElementById('timer'));


    generateInitialText();
    
    keyToStart();

    const handlePositioning = (e) => {
        let main = document.getElementById('main');
        if (window.scrollY >= main.offsetTop -100) {
            time.start(0);
            startTyping();
            window.removeEventListener('scroll', handlePositioning);
        }
    } 
    window.addEventListener('scroll', handlePositioning);

}

main();