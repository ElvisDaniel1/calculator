// Globals
let numA = 0;
let numB = 0;
let operator = '';
let answer = '';
let count = 0;
let equalPressed = false;
let strNumber = '';
let decCount = 0;
let opPressed = false;
let lastInput = '';
let children = 0;
let discardPressed = false; 

capture();
keyboardAccess();
//console.log(keyboardAccess());
    
/*
if (k != '')
    kCapture(k);
*/
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
            discardPressed = false;
            
            let input = button.textContent;
            
            // Check how many operators are being used
            if (['-', '+', '/', 'x'].some(op => input.includes(op))){
                count = count + 1;
                opPressed = false; // Resets disabled decimal after operator is used
            }
            else if (equalPressed === true){
                answer = '';
                equalPressed = false;
                clearScreen();
            }
            
            // Error checking -decimalPoint 
            if (input === '.'){
                opPressed = true;
                document.getElementById("decimal").disabled = true;
            }

            if (opPressed === false){
                document.getElementById("decimal").disabled = false;                
            }
            

            // Function buttons
            
            if (input === '⌫'){
                const parent = document.getElementById("output");
                
                children = parent.children.length;

                const lastChild = parent.children[children-1];
 
                parent.removeChild(lastChild);
                input = '';
                discardPressed = true;
                
                // Reduce counter if operator was pressed
                //lastInput =  input;
                if (['-', '+', '/', 'x'].some(op => lastInput.includes(op)) && discardPressed == true)
                    count = count - 1;
                
                console.log(strNumber);
                strNumber = strNumber.replace(lastInput, '');
                console.log(strNumber);
            }
            

            if (input === 'C'){
                input = '';
                clearScreen();
            } 
                
            if (input === '='){
                equalPressed = true;
                count = 0;
                evaluate(strNumber);
            }

            // Error checking -operatorCount
            if (count > 1){
                count = count - 1;
                evaluate(strNumber);
                strNumber = answer + input;
            }
            else
                strNumber = strNumber + input;


            //let txtCont = input; 
            if (input != 'C' && input != '=' && discardPressed != true) {
                getElementAppend("output", input);
            }
            lastInput = input;
            console.log(lastInput);
        })
    });

});

}

// Capture from keyboard
function kCapture(input) {
    // How to handle backspace and decimal??

    discardPressed = false;

    // Check how many operators are being used
    if (['-', '+', '/', 'x'].some(op => input.includes(op))){
        count = count + 1;
        opPressed = false; // Resets disabled decimal after operator is used
    }
    else if (equalPressed === true){
        answer = '';
        equalPressed = false;
        clearScreen();
    }

    // Error checking -decimalPoint 
    if (input === '.'){
        opPressed = true;
        document.getElementById("decimal").disabled = true;
    }

    if (opPressed === false){
        document.getElementById("decimal").disabled = false;                
    }

    // Function buttons
            
    // Delete button
    if (input === '⌫'){
        const parent = document.getElementById("output");
        
        children = parent.children.length;

        const lastChild = parent.children[children-1];

        parent.removeChild(lastChild);
        input = '';
        discardPressed = true;
        
        // Reduce counter if operator was pressed
        //lastInput =  input;
        if (['-', '+', '/', 'x'].some(op => lastInput.includes(op)) && discardPressed == true)
            count = count - 1;
    
        strNumber = strNumber.replace(lastInput, ''); 
    }

    if (input === 'C'){
        input = '';
        clearScreen();
    } 
        
    if (input === '='){
        equalPressed = true;
        count = 0;
        evaluate(strNumber);
    }

    // Error checking -operatorCount
    if (count > 1){
        count = count - 1;
        evaluate(strNumber);
        strNumber = answer + input;
    }
    else
        strNumber = strNumber + input;

    //let txtCont = input; 
    if (input != 'C' && input != '=' && discardPressed != true) {
        getElementAppend("output", input);
    }
    lastInput = input;
    console.log(lastInput);
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
    opPressed = false;
}

//keyboardAccess()
function keyboardAccess(){
    //const activeArea = document.getElementById("active");
    
    let n = 0;
    window.addEventListener("keydown", (event) => {
        if (event.shiftKey == true){
            n = '';
        } 
        if (event.key >= 0 && event.key <= 9)
            n = event.key;
        else if (['+', '-', '/', '*', '=', '.'].includes(event.key)){
            n = event.key;
        }
        

        kCapture(n);

        },
    true,
    );
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
