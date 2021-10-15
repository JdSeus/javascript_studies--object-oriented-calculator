class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');;
        this.reset = 0;
    }

    checkLastDigit(input, upperValue, reg) {
        if((
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        )) {
            return true;
        } else {
            return false;
        }
    }

    btnPress() {

        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        //Verificar se há apenas números
        var reg = new RegExp('^\\d+$');

        //Checa se precisa adicionar Sinal ou não
        if (calc.checkLastDigit(input, upperValue, reg)) {
            return false;
        }

        if (upperValue == "0") {
            calc.upperValue.textContent = input;
        } else {
            calc.upperValue.textContent += input;
        }

    }

}

// Start Obj
let calc = new Calculator;

// Start Btns
let buttons = document.querySelectorAll('.btn');

// Map All Buttons
for (let i=0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', calc.btnPress);
}