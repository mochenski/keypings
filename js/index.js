import keyToStart from './utils/keyToStart.js';

function generateInitialText() {
    
    // const text = "What, is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"

    const text = "eh bla"

    let tokens = text.match(/[^ ]+/g)

    let line = document.createElement("div");
    line.classList.add("line")

    function createToken(token) {
        let newToken = document.createElement("div");
        newToken.classList.add("token")
        

        let tokenUnits = token.split("").map(unit => {
            return `<span class="token-unit">${unit}</span>`
        }).join(""); 

        
        newToken.innerHTML = tokenUnits;

        let space = document.createElement("span")
        space.innerHTML += String.fromCharCode(160);
        space.classList.add("token-unit");
        newToken.appendChild(space)

        return newToken; 
    }

    tokens.map(token => {line.appendChild(createToken(token));})

    line.lastChild.removeChild(line.lastChild.lastChild)

    let typingContainer = document.querySelector(".typing-container");

    typingContainer.appendChild(line)

    return true;
}

function startTyping() {
    let tokens = document.querySelectorAll(".token");

    let cursor = {}

    function initializeCursor(cursor) {
        // initialize structure
        cursor.tokenPtr = 0;
        cursor.tokenUnitPtr = 0;
        cursor.token = tokens[0];
        cursor.tokenUnit = tokens[0].children[0];

        // initialize display
        cursor.token.classList.add("active")
        cursor.tokenUnit.classList.add("active")
    }

    function updateCursor(cursor, key) {

        cursor.tokenUnit.classList.remove("active");
        let el = cursor.tokenUnit.innerHTML;

        if (key == "Backspace") {
            if (cursor.tokenPtr >= 0 && cursor.tokenUnitPtr > 0) {
                cursor.tokenUnitPtr--;
            } else if (cursor.tokenPtr > 0 && cursor.tokenUnitPtr == 0) {
                cursor.tokenPtr--;
                cursor.token.classList.remove('active')
                cursor.token = tokens[cursor.tokenPtr];
                cursor.token.classList.add('active')
                cursor.tokenUnitPtr = cursor.token.childElementCount - 1
            }
            
            cursor.token = tokens[cursor.tokenPtr];
            cursor.tokenUnit = tokens[cursor.tokenPtr].children[cursor.tokenUnitPtr];

            cursor.tokenUnit.classList.remove("done");
            if (cursor.tokenUnit.classList.contains("fail")) {
                cursor.tokenUnit.classList.add("warn")
            }
            cursor.tokenUnit.classList.remove("fail");



        } else if (el == key || (key == " " && el == "&nbsp;")) {
            cursor.tokenUnit.classList.add("done");
            cursor.tokenUnitPtr++;
        } else if (key != "Shift") {
            cursor.tokenUnit.classList.add("fail");
            cursor.tokenUnitPtr++;
        }

        if (endTyping(cursor)) {
            return false   
        } else {

            
            if (cursor.token.childElementCount - 1 === cursor.tokenUnitPtr - 1) {
                cursor.tokenPtr++;
                cursor.tokenUnitPtr = 0;
                
                cursor.token.classList.remove("active");
                cursor.token = tokens[cursor.tokenPtr];
                cursor.token.classList.add("active")
            }
            
            
            cursor.tokenUnit = tokens[cursor.tokenPtr].children[cursor.tokenUnitPtr];
            cursor.tokenUnit.classList.add("active")
        }

        return true;
    }
    
    initializeCursor(cursor)
    
    /* A event listener that removes itself
     *  > dont work with anonymous fuctions
     *  > needs a handler 
     *  > needs : this.removeEventListener("yourevent", arguments.callee)
     */
    function handleScrollOffset(tpContainer, cursor) {

        let offset = tpContainer.clientHeight + tpContainer.scrollTop - cursor.token.offsetTop - 100;

        let scrolling = false;

        if ((offset < 0) && !scrolling) {
            scrolling = true;
            tpContainer.scrollTo({ top: cursor.token.offsetTop + 150, behavior: 'smooth', block: 'center' });
            scrolling = false;
        }
    }

    function handleScrollOffsetBack(tpContainer, cursor) {

        let offset = tpContainer.scrollTop > (cursor.token.offsetTop - tpContainer.offsetTop - 100);

        console.log(tpContainer.scrollTop ,cursor.token.offsetTop)

        let scrolling = false;

        if (offset && !scrolling) {
            scrolling = true;
            tpContainer.scrollTo({ top: cursor.token.offsetTop - 150, behavior: 'smooth', block: 'center' });
            scrolling = false;
        }
    }
    
    const handle = function handleTyping(keyboard) {
        handleScrollOffset(document.querySelector(".typing-container"), cursor)
        handleScrollOffsetBack(document.querySelector(".typing-container"), cursor)

        if (keyboard.key === " ") {
            
            keyboard.preventDefault();
        }
        if (!updateCursor(cursor, keyboard.key)) {
            window.removeEventListener("keydown", handle)}
    }

    window.addEventListener("keydown", handle)
}

function endTyping(cursor) {
        let tokens = document.querySelectorAll(".token");
        let max = tokens.length;
        
        if (cursor.tokenPtr == max-1 && cursor.tokenUnitPtr == tokens[max-1].childElementCount) {
            return true;
        }
        return false;
    }


function start() {
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

    return
}

start();