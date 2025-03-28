// Globals
let numA = 0;
let numB = 0;
let operator = '';
let answer = '';
let count = 0;
let equalPressed = false;
let strNumber = '';

capture();

//Send to appropriate function to operate on
function operate(a, b, operator) {
    if (operator == '+'){
        return(a + b);
    }
    else if (operator == '-'){
        return(a - b);
    }
    else if (operator == '*'){
        return (a * b);
    }
    else
        return ((parseFloat(a) / parseFloat(b)).toFixed(4)); 
}

// Capturing buttons
function capture() {
    document.addEventListener("DOMContentLoaded", () => {
    const numBtn = document.querySelectorAll(".btn-num");
    numBtn.forEach((button) => {
        button.addEventListener("click", () => {
                 
            let input = button.textContent;
            console.log(input);
            // Check how many operators are being used
            if (['-', '+', '/', 'x'].some(op => input.includes(op))){
                //getElementAppend("output", input);
                count = count + 1;
            }
            else if (equalPressed === true){
                answer = '';
                equalPressed = false;
                clearScreen();
            }
            

            if (count > 1){
                count = count - 1;
                evaluate(strNumber);
                strNumber = answer + input;
            }
            else
                strNumber = strNumber + input;

            if (input === 'C'){
                clearScreen();
            } 
                
            if (input === '='){
                equalPressed = true;
                count = 0;
                evaluate(strNumber);
            }

            //let txtCont = input; 
            if (input != 'C' && input != '=') {
                getElementAppend("output", input);
            }
            
        })
    });

});

}

function getElementAppend(eName, answer) {
    const target = document.getElementById(eName);

    const para = drawToScreen(answer);

    target.appendChild(para);
}

function drawToScreen(nodeIn){
    const node = document.createTextNode(nodeIn);

    const para = document.createElement("p");
    para.appendChild(node);

    return para;
}

function clearScreen(){
    const element = document.getElementById("output");
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
    numA = 0;
    numB = 0;
    operator = '';
    strNumber = '';
}

// Capture user input at '=' and handle string
function evaluate(strNumber){   

    // Use a filter to determine which operation is taking place
    let strsNumber = strNumber.split("");
    let operator = strsNumber.filter((input) => {
        return input == '+' ||  input == '-' || input == '/' || input == 'x'})
    
    
    // How do we determine what to split on???
    let operands = strNumber.split(operator);

    // Removed declarations
    numA = Number(operands[0]);
    numB = operands[1];
    
    numB = numB.replace('=', '');
    numB = Number(numB);

    answer = operate(numA, numB, operator);

    // Output calculated answer
    clearScreen();

    //Error checking
    if (answer == 'Infinity')
        answer = 'Nice try lol';
    if (answer == 'NaN')
        answer = '0';

    getElementAppend("output", answer);
    
}

