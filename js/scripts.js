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

    //Método de Soma
    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2);
    }

    //Método de Subtração
    subtraction(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    //Método de Multiplicação
    multiplication(n1, n2) {
        return parseFloat(n1) * parseFloat(n2);
    }

    //Método de Divisão
    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2);
    }

    //Atualiza Valores
    refreshValues(total) {
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    //Resolve a Operação
    resolution() {
        //Explode a String em um Array
        let upperValueArray = (this.upperValue.textContent).split(" ");

        //Resultado da Operação
        let result = 0;

        for(let i = 0; i <= upperValueArray.length; i++) {

            let operation = 0;
            let actualItem = upperValueArray[i];

            //Faz a Multiplicação
            if (actualItem == "x") {
                result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1])
                operation = 1;
            //Faz a Divisão
            } else if(actualItem == "/") {
                result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1])
                operation = 1;
            //Checa se o array ainda tem multiplicação e divisão a ser feita
            } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')) {
                //Soma e Subtração
                //Faz a Soma
                if (actualItem == "+") {
                    result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1])
                    operation = 1;
                //Faz a Subtração
                } else if (actualItem == "-") {
                    result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1])
                    operation = 1;
                //Faz a Divisão
                }
            }

            //Atualiza valores do array para proxima iteração
            if (operation) {
                //Indice anterior no resultado da operação
                upperValueArray[i - 1] = result;

                //Remove os itens já utilizados para a operação
                upperValueArray.splice(i, 2);

                //Atualizar o valor do índice
                i = 0;
            }
        }

        if (result) {
            calc.reset = 1;
        }

        //Atualizar os Totais
        calc.refreshValues(result)
    }

    btnPress() {

        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        //Verificar se há apenas números
        var reg = new RegExp('^\\d+$');

        //Se precisar resetar, limpa o display
        if (calc.reset && reg.test(input)) {
            upperValue = '0';
        }

        //Limpa a prop de reset
        calc.reset = 0;

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