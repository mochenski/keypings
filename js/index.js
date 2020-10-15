
function generateInitialText() {
    
    const text = "What,             is  Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"

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
        space.innerHTML = "&nbsp;";
        space.classList.add("token-unit");
        newToken.appendChild(space)

        return newToken; 
    }

    tokens.map(token => {line.appendChild(createToken(token));})

    line.lastChild.removeChild(line.lastChild.lastChild)

    let typingContainer = document.querySelector(".typing-container");

    console.log(typingContainer)
    typingContainer.appendChild(line)
}


function start() {
    generateInitialText();

    // Start Typing

    // End Typing 
}
