let word_el = document.querySelector("#word")
let popup = document.querySelector('#popup-container')
let message_el = document.querySelector('#succes-message')
let wrongLetter = document.querySelector("#wrong-letters span")
let items = document.querySelectorAll(".item")
let message = document.querySelector('#message')
let button = document.querySelector('#play-again')

let correctLetters = []
let wrongLetters = new Set()
let selectedWord = getRandomWord()
displayLetter()


function getRandomWord(){
    let words = ['JavaScript', 'Java', 'Python','CSS', 'HTML','Go']
    return words[Math.floor(Math.random()*words.length)]
}


function displayLetter(){
    word_el.innerHTML = selectedWord.split("").map(letter=>`<p class='letter'>${correctLetters.includes(letter)?letter:""}</p>`).join("")
    if(wrongLetters.size>0){
        wrongLetter.innerText = new Array(...wrongLetters).join(",")
        wrongLetter.parentElement.style.display = 'block';
        
    }
    
}

function showMan(){
    items.forEach((item, index)=>{
        if(index<wrongLetters.size){
            item.style.display='block'
        }
    })
}

function showMessage(){
    message.classList.add('show')
    setTimeout(()=>{
        message.className=''
    }, 1500)
}

window.addEventListener('keydown',(event) => {
    if((event.keyCode>=65 && event.keyCode<=90)||['ü',"ə","ş","ç","ö","ğ","ı"].includes(event.key.toLowerCase())){
        let find = selectedWord.match(new RegExp(event.key,'gi'))
        if(find){
            if(correctLetters.includes(find[0])){
                showMessage()    
            }
            else{
                correctLetters=correctLetters.concat(find) 
            } 
        }
        else{
            if (wrongLetters.has(event.key)){
                showMessage()
            }
            else{
                wrongLetters.add(event.key)
            } 
        }
    }
    displayLetter()
    showMan()
    if(wrongLetters.size==items.length){
        popup.style.display='flex'
        message_el.innerText = 'Təəssüf ki Uduzdunuz'
    }
    else if(correctLetters.length==selectedWord.length){
        popup.style.display='flex'
        message_el.innerText = 'Təbriklər Düzgün Təxmin etdiniz'
    }
} )

button.addEventListener('click', ()=>{
    correctLetters = []
    wrongLetters = new Set()
    selectedWord = getRandomWord()
    popup.style.display='none'
    displayLetter()
})