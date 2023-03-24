let stack = [];
function rpn(expression){
  expression = expression.toLowerCase()
  if (expression === '') {
    message("Stringa vuota");
    return;
  }
  //message(expression)
  let tokens = expression.match(/\d+.\d+|.\d+|\d+|n|radq|somma|d|[\+\-\*\/\ \^]/g);
  if (!tokens){
    message("Espressione \""+expression+"\" non riconosciuta");
    return;
  }
  if (tokens.length === 0) {
    message("Espressione non riconoscuta: '"+ expression + "'")
  }
  //message(tokens);
  for (let token of tokens) {
    if (token === '' || token === ' ') continue;
    if (isNaN(token)) {
      // Operatori unari
      if (stack.length === 0) {
        message("Stack vuota!");
        return;
      };      
      switch (token) {
        case "d":
            stack.pop();
            continue;
        case "radq":
            let a = stack.pop();
            stack.push(Math.sqrt(a));
            continue;
        case "n":
          stack.push(-stack.pop());
          continue;
        case "somma":
          sommatoria();
          continue;
      };
      // Operatori binari
      if (stack.length < 2) {
        message("Stack insufficiente!");
        return;
        }
      let b = stack.pop();
      let a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
            stack.push(a ** b);
            break;
        default:
            message("Operatore '"+token+"' non riconosciuto.")
      }
    } else {
      stack.push(parseFloat(token));
    }
  }
}

function calculate() {
  let expression = document.getElementById("expression");
  rpn(expression.value);
  expression.value = "" ;
  stack_print();
}
/*
function stack_print() {
  let list = [ "c0", "c1", "c2", "c3"];
  let celle = [];
  const max_rows = 4
  for (let idc of list) { 
    celle.push( document.getElementById(idc))
  };

  mr = Math.min(stack.length, max_rows);
  for (let i = 0; i < mr; i++){
    celle[i].innerHTML = stack[i]
  }
}
*/

function stack_print(){
  var TableBody = document.getElementById("tableBody");
  const rows = TableBody.rows;
  if (rows) {
    while (rows.length>0) {
      TableBody.deleteRow(0)
    }
  }
  for(let i = 0; i < stack.length ; i++ ){
    var row = TableBody.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = Number(stack[i].toFixed(2)).toLocaleString();
  }
  document.getElementById("expression").focus()
}

function message(msg){
    document.getElementById("message").innerHTML = '=> ' + msg 
}

function show(kc){
  message('Keycode = '+kc)
}

function pop(){
  stack.pop()
}

function sommatoria(){
  let acc = 0;
  while (stack.length){
    acc += stack.pop();
  }
  stack.push(acc);
  stack_print();
}

function potenza(){
  if (stack.length < 2){
    message("Stack insufficiente!");
    return;
  }
  let y = stack.pop()
  let x = stack.pop()
  if (y<0 && x===0){
    message("Divisione per 0.")
    return;
  }
  stack.push(x**y);
  stack_print();
}

function inverso(){
  if (stack.length === 0){
    message("Stack vuota!");
    return;
  }
  let x = stack.pop()
  if (x===0){
    message("Divisione per 0.")
    return;
  }
  stack.push(1/x);
  stack_print();
}

function cancella_elemento(){
  if (stack.length > 0){
    stack.pop();
  }
  stack_print();
}

function cancella_stack(){
  while (stack.length){
    stack.pop()
  }
  stack_print();
}

function scambiaxy(){
  x = stack.pop()
  y = stack.pop()
  stack.push(x)
  stack.push(y)
  stack_print();
}

const keyboard = document.querySelector(".keyboard");
const output = document.getElementById("expression");

keyboard.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    const value = event.target.textContent;
    message(value)
    switch (value) {
      case "C":
        output.value = "";
        break;
      case "=":
        try {
          calculate();
        } catch (error) {
          message("Error");
        }
        break;
        case "+":
          output.value += value;
          try {
            calculate();
          } catch (error) {
            message("Error");
          };
          //message('resetting')
          output.value = "";
          output.focus();
          break;
      default:
        output.value += value;
        output.focus()
        break;
    }
  }
});