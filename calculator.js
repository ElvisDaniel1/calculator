// Globals
let numA = 0;
let numB = 0;
let operator = '';

//Send to appropriate function to operate on
function operate(a, b, operator) {
    if (operator == '+'){
        console.log(add(a, b));
    }
    else if (operator == '-'){
        minus(a, b);
    }
    else if (operator == '*'){
        multiply(a, b);
    }
    else
        divide(a, b); 
}


// Math functions
function add(a, b){''
    return a + b;
}

function minus(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

//a = prompt('Please enter a number:  ');
//operator = prompt('Please enter an operator: ');
//b = prompt('Please enter a second number: ');

//operate(a, b, operator);

// Capturing buttons
let strNumber = '';
document.addEventListener("DOMContentLoaded", () => {
    const numBtn = document.querySelectorAll(".btn-num");
    numBtn.forEach((button) => {
        button.addEventListener("click", () => {
            //console.log(button.textContent) //Print each button press to console
             
            let input = button.textContent;
            strNumber = strNumber + input;
            //inputProcessing(input); run command when u get an equal sign
            if (input === '=')
                evaluate(strNumber);

            //let txtCont = input; 
            const node = document.createTextNode(input);
            
            const para = document.createElement("p");
            para.appendChild(node);

            const element = document.getElementById("output");
            element.appendChild(para);
        })
    });

});

// Capture user input at '=' and handle string
function evaluate(strNumber){
    // Use a filter to determine which operation is taking place
  
// HERE -> test individually    
//    let operator = strsNumber.filter((input) => {
//        return input == '+' ||  input == '-' || input == '/' || input == 'x'})
    alert(operator);
    

    let strsNumber = strNumber.split("+");



    let numA = strsNumber[0];
    let numB = strsNumber[1];
    

    //numB = numB.replace('=', '');

    console.log(numA);
    console.log(numB);
}

