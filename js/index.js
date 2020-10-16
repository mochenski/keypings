import keyToStart from './modules/utils/keyToStart.js';
import generateInitialText from './modules/utils/generateInitialText.js';
import {startTyping, endTyping} from './modules/typing/typing.js';

export default function main() {
   
    generateInitialText();

    const handlePositioning = (e) => {
        let main = document.getElementById('main');
        if (window.scrollY >= main.offsetTop -100) {
            startTyping()
            window.removeEventListener('scroll', handlePositioning);
        }
    } 
    window.addEventListener('scroll', handlePositioning);

    function restart() {
        generateInitialText();
        startTyping()
    }

    let resetButton = document.getElementById('generate')
    resetButton.addEventListener('click', restart)

}



keyToStart();
main();