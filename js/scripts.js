class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');;
        this.reset = 0;
    }

    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
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

    //Resolve a Operação
    resolution() {
        //Explode a String em um Array
        let upperValueArray = (this.upperValue.textContent).split(" ");

        //Resultado da Operação
        let result = 0;

        for(let i = 0; i <= upperValueArray.length; i++) {

            let actualItem = upperValueArray[i];

            if (actualItem == "+") {
                result = parseFloat(upperValueArray[i - 1]) + parseFloat(upperValueArray[i + 1]);
            }

        }

        this.upperValue.textContent = result;
        this.resultValue.textContent = result;
    }

    btnPress() {

        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        //Verificar se há apenas números
        var reg = new RegExp('^\\d+$');

        //Ativa o método de limpar o Display
        if (input == 'AC') {
            console.log('ac');
            calc.clearValues();
        } else if(input == "=") {
            calc.resolution();
        } else {
            //Checa se precisa adicionar Sinal ou não
            if (calc.checkLastDigit(input, upperValue, reg)) {
                return false;
            }

            //Adiciona espaço aos operadores
            if (!reg.test(input)) {
                input = ` ${input} `;
            }

            if (upperValue == "0") {
                calc.upperValue.textContent = input;
            } else {
                calc.upperValue.textContent += input;
            }
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