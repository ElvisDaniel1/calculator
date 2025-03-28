// Globals
let numA = 0;
let numB = 0;
let operator = '';
let answer = '';
let count = 0;

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
        return (parseFloat(a) / parseFloat(b)); 
}


// Capturing buttons
function capture() {
    let strNumber = '';
    document.addEventListener("DOMContentLoaded", () => {
    const numBtn = document.querySelectorAll(".btn-num");
    numBtn.forEach((button) => {
        button.addEventListener("click", () => {
                 
            let input = button.textContent;

            // Check how many operators are being used
            if (['-', '+', '/', 'x'].some(op => input.includes(op))){
                count = count + 1;
                //alert(count);
            }

                

            if (count > 1){
                count = count - 1;
                evaluate(strNumber);
                strNumber = answer + input;
            }
            else{
                strNumber = strNumber + input;
            }
            

            
            //inputProcessing(input); run command when u get an equal sign
            if (input === 'C'){
                clearScreen();
                strNumber = '';
            } 
                
            
            
            if (input === '=')
                evaluate(strNumber);

            //let txtCont = input; 
            if (input != 'C' && input != '=') {
                const para = drawToScreen(input);

                const outElement = document.getElementById("output");
                outElement.appendChild(para);
            }
            
        })
    });

});

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
    const target = document.getElementById("output");
    
    const para = drawToScreen(answer);

    
    target.appendChild(para);
}

