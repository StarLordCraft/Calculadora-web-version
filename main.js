const abaControler = document.querySelector('.aba')

const teclaLimpar = document.getElementById('tlimpar');
const teclaDelete = document.getElementById("tdelete");

const teclasNumericas = [...document.querySelectorAll('.num')];
const teclasOperacionais = [...document.querySelectorAll('.teclaEspecial')]

const teclaResult = document.getElementById('tigual');

const equation = document.querySelector('#display p:nth-child(1)');
const display = document.querySelector('#display h3:nth-child(2)');

let sinal = true;
let decimal = false;

let curlyCounter = 0;

abaControler.addEventListener('click', () => {
    document.getElementById('calc').classList.toggle("calcExibir")
})

teclaLimpar.addEventListener('click', () => {
    display.innerHTML = "0";
    equation.innerHTML = ''
    
    sinal = true;
    decimal = false;
})

teclaDelete.addEventListener('click', () => {
    let deletedDisplay = '';
    for(let i = 0; i < display.innerHTML.length - 1; ++i){
        deletedDisplay += display.innerHTML[i];
    }
    
    const deletedToken = display.innerHTML[display.innerHTML.length - 1];
    if(deletedToken == '*' || deletedToken == '/' || deletedToken == '+' ||
    deletedToken == '-')sinal = true;
    if(deletedToken == '.')decimal = false;

    display.innerHTML = deletedDisplay;
})

teclasNumericas.forEach(element => {
    element.addEventListener('click', (el) => {
        sinal = true;
        if(display.innerHTML == "0"){
            if(el.target.innerHTML == '(')curlyCounter++;
            if(el.target.innerHTML == ')')curlyCounter--;
            display.innerHTML = el.target.innerHTML;
        }else{
            if(el.target.innerHTML == '(')curlyCounter++;
            if(el.target.innerHTML == ')')curlyCounter--;
            display.innerHTML += el.target.innerHTML;
        }
    })
});

teclasOperacionais.forEach(element => {
    element.addEventListener('click', (el) => {
        if(sinal){     
            if(display.innerHTML == '')display.innerHTML = "0";   
            sinal = false;
            if(display.innerHTML == "0"){
                if(el.target.innerHTML == 'x'){
                    display.innerHTML += '*';    
                }else if(el.target.innerHTML == '÷'){
                    display.innerHTML += '/';
                }else if(el.target.innerHTML == ','){
                    if(!decimal){
                        display.innerHTML += '.';
                        decimal = true;
                    }else{
                        display.innerHTML += '';
                    }     
                }else{
                    display.innerHTML = el.target.innerHTML;
                }
            }else{
                if(el.target.innerHTML == 'x'){
                    display.innerHTML += '*';    
                }else if(el.target.innerHTML == '÷'){
                    display.innerHTML += '/';
                }else if(el.target.innerHTML == ','){
                    if(!decimal){
                        display.innerHTML += '.';
                        decimal = true;
                    }else{
                        display.innerHTML += '';
                    }     
                }else{
                    display.innerHTML += el.target.innerHTML;
                }
            }
        }
    })
})

teclaResult.addEventListener('click', () => {
    if(sinal){
        sinal = true;
        decimal = false;

        if(display.innerHTML == '')display.innerHTML = "0";

        for(let i = 0; i < curlyCounter; ++i)display.innerHTML += ')';

        equation.innerHTML = display.innerHTML + '=';
        
        const res = eval(display.innerHTML);
        display.innerHTML = res;
    }
})