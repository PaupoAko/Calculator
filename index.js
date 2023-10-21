let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonPress(value) {
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }else{
                flushOperation(parseInt(buffer));
                previousOperator = null;
                buffer = runningTotal;
                runningTotal = 0;
            }
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(operator){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = operator;
    buffer = "0";
}

function flushOperation(intBuffer){
    if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '+'){
        runningTotal += intBuffer;
    }
}

function handleNumber(number){
    if(buffer === "0"){
        buffer = number;
    }else{
        buffer += number
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonPress(event.target.innerText);     
    })
}

init();