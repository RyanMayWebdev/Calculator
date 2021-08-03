const app = {}

app.$firstNum = '',
    app.$secondNum = '',
    app.$output = $('#number-log'),
    app.$operator = '',
    app.$log = '';

app.$numBtns = $('.num-btn'),
    app.$opBtns = $('.op-btn')

app.$add = (num1, num2) => num1 + num2;

app.$subtract = (num1, num2) => num1 - num2;

app.$multiply = (num1, num2) => num1 * num2;

app.$divide = (num1, num2) => num1 / num2;

app.$clear = () => {
    app.$firstNum = ''
    app.$secondNum = ''
    app.$operator = ''
    app.$log = ''
    app.$output.text(app.$log);
};

//perform calculation using selected operator and numbers.
app.$calculate = () => {
    app.$firstNum = parseFloat(app.$firstNum);
    app.$secondNum = parseFloat(app.$secondNum);

    switch (app.$operator) {
        case '+':
            app.$output.html(`<p>${app.$add(app.$firstNum, app.$secondNum)}</p>`);
            break;
        case '*':
            app.$output.html(`<p>${app.$multiply(app.$firstNum, app.$secondNum)}</p>`);
            break;
        case '-':
            app.$output.html(`<p>${app.$subtract(app.$firstNum, app.$secondNum)}</p>`);
            break;
        case '/':
            app.$output.html(`<p>${app.$divide(app.$firstNum, app.$secondNum)}</p>`);
            break;

        default:
            break;
    }

    app.$firstNum = app.$output.text()
    app.$secondNum = ''
    app.$operator = ''
}

app.$flash = (value) => {
    let $button = $("button[value='" + value + "']")
    $button.addClass('btn-clicked')
    setTimeout(() => $button.removeClass('btn-clicked'), 200)
}

//keydown events
app.keyDownListner = function () {
    $(document).on('keydown', (e) => {
        let input = e.key;
        let number = input.match(/\d/)
        let opMatch = input.match(/[+\-*/]/)

        app.$flash(number)
        app.$flash(opMatch)

        if (input.match(/[enter]/)) {
            app.$calculate();
            app.$flash('=')
        }

        if (opMatch != null && app.$operator != '' && app.$secondNum != '') {
            app.$calculate()
            app.$operator = opMatch.input
        } else if (opMatch != null && app.$operator === '') {
            app.$operator = opMatch.input;
            app.$log = app.$firstNum + app.$operator
        }

        if (app.$operator === '' && number != null) {
            app.$firstNum += number;
            app.$log = app.$firstNum;
        } else if (number != null) {
            app.$secondNum += number;
        }

        app.$log = app.$firstNum + app.$operator + app.$secondNum
        app.$output.html(`<p>${app.$log}</p>`)
    })
}

//Event listeners for mouse clicks on buttons

//makes a button look like it's being pressed when clicked on
app.buttonFlash = function () {
    $('button').on('click', function () {
        app.$flash(this.value)
    });
}

//listening for clicks on numbers, if an operator hasn't been selected then the number is added to the firstNum variable. Else, add it to the secondNum variable.
app.numButtonListen = function () {
    app.$numBtns.on('click', function () {
        if (app.$operator === '') {
            app.$firstNum += this.value;
            app.$log = app.$firstNum;
        } else {
            app.$secondNum += this.value;
            app.$log = app.$firstNum + app.$operator + app.$secondNum;
        }
        app.$output.html(`<p>${app.$log}</p>`)
    })
}


//Checks which operator is being selected, if an operator has already been selected, then calculate the current equation. Otherwise, assign the selected operator to the operator variable.
app.operatorButtonListen = function () {
    app.$opBtns.on('click', function () {
        if (app.$operator != '') {
            app.$calculate();
        }
        app.$operator = this.value;
        app.$log += app.$operator;
        app.$output.html(`<p>${app.$log}</p>`)
    })
}

//listens for click on clear button which will reset all variables.
app.clearButtonListen = function () {
    $('.clear-btn').on('click', () => app.$clear())
}

//listens for submission/equal button which will perform calculations requested.
app.formSubmit = function () {
    $('form').on('submit', (event) => {
        event.preventDefault();
        app.$calculate();
    })
}

app.init = () => {
    app.keyDownListner()
    app.numButtonListen()
    app.operatorButtonListen()
    app.formSubmit()
    app.clearButtonListen()
    app.buttonFlash()
}

$(document).ready(function () {
    app.init()
})