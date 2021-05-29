let display = document.querySelector('.calculator-input')
let keys = document.querySelector('.calculator-keys')

let displayValue = '0'
let firstValue = null
let waitingForSecondValue=false
let operator=null

updateDisplay()

function updateDisplay(){
    display.value = displayValue
}

keys.addEventListener('click', (event)=>{
    const elem = event.target
    if(!elem.matches('button'))return;

    if(elem.classList.contains('operator')){
        handleOperator(elem.value)
        updateDisplay()
        document.querySelector('.decimal').disabled=false
        return
    }
    else if(elem.classList.contains('decimal')){
        elem.disabled=true        
    }
    else if(elem.classList.contains('clear')){
        displayValue='0'
        firstValue = null
        display.value='0'
        return
    }
    
    inputNumber(elem.value)
    updateDisplay()
})

function inputNumber(value){
    if(waitingForSecondValue){
        displayValue=value;
        waitingForSecondValue=false;
    }
    else{
        displayValue = displayValue==='0'?value:displayValue+value;
    }
    
}

function handleOperator(nextOperator){
    const value = parseFloat(displayValue)

    if(operator && waitingForSecondValue){
        operator = nextOperator
        return
    }

    if (!firstValue){
        firstValue = value;
    }
    else if(operator){
        const result = calculate(firstValue, value, operator)
        displayValue = result.toFixed(9)
        firstValue = result 

    }
    
    waitingForSecondValue=true;
    operator=nextOperator
    console.log(firstValue, displayValue, operator, waitingForSecondValue)
}

function calculate(first, second, operator){
    switch(operator){
        case "+":
            return first + second
        case "-":
            return first - second
        case "/":
            return first/second
        case "*":
            return first * second
    }
}