$(document).ready(function () {

    let $firstNum = '',
        $secondNum = '',
        $output = $('#number-log'),
        $operator = '',
        $log = '';

    const $numBtns = $('.num-btn'),
        $opBtns = $('.op-btn')

    const $add = (num1, num2) => num1 + num2;

    const $subtract = (num1, num2) => num1 - num2;

    const $multiply = (num1, num2) => num1 * num2;

    const $divide = (num1, num2) => num1 / num2;

    const $clear = () => {
        $firstNum = ''
        $secondNum = ''
        $operator = ''
        $log = ''
        $output.text($log);
    };

    //perform calculation using selected operator and numbers.
    const $calculate = () => {
        $firstNum = parseFloat($firstNum);
        $secondNum = parseFloat($secondNum);

        switch ($operator) {
            case '+':
                $output.html(`<p>${$add($firstNum, $secondNum)}</p>`);
                break;
            case '*':
                $output.html(`<p>${$multiply($firstNum, $secondNum)}</p>`);
                break;
            case '-':
                $output.html(`<p>${$subtract($firstNum, $secondNum)}</p>`);
                break;
            case '/':
                $output.html(`<p>${$divide($firstNum, $secondNum)}</p>`);
                break;

            default:
                break;
        }

        $firstNum = $output.text()
        $secondNum = ''
        $operator = ''
    }

    const $flash = (value) => {
        let $button = $("button[value='" + value + "']")
        $button.addClass('btn-clicked')
        setTimeout(() => $button.removeClass('btn-clicked'), 200)
    }

    //keydown events

    $(document).on('keydown', (e) => {
        let input = e.key;
        let number = input.match(/\d/)
        let opMatch = input.match(/[+\-*/]/)

        $flash(number)
        $flash(opMatch)

        if (input.match(/[enter]/)) {
            $calculate();
            $flash('=')
        }

        if (opMatch != null && $operator != '' && $secondNum != '') {
            $calculate()
            $operator = opMatch.input
        } else if (opMatch != null && $operator === '') {
            $operator = opMatch.input;
            $log = $firstNum + $operator
        }

        if ($operator === '' && number != null) {
            $firstNum += number;
            $log = $firstNum;
        } else if (number != null) {
            $secondNum += number;
        }

        $log = $firstNum + $operator + $secondNum
        $output.html(`<p>${$log}</p>`)
    })

    //Event listeners for mouse clicks on buttons

    //makes a button look like it's being pressed when clicked on
    $('button').on('click', function () {
        $flash(this.value)
    });

    //listening for clicks on numbers, if an operator hasn't been selected then the number is added to the firstNum variable. Else, add it to the secondNum variable.
    $numBtns.on('click', function () {
        if ($operator === '') {
            $firstNum += this.value;
            $log = $firstNum;
        } else {
            $secondNum += this.value;
            $log = $firstNum + $operator + $secondNum;
        }
        $output.html(`<p>${$log}</p>`)
    })


    //Checks which operator is being selected, if an operator has already been selected, then calculate the current equation. Otherwise, assign the selected operator to the operator variable.
    $opBtns.on('click', function () {
        if ($operator != '') {
            $calculate();
        }
        $operator = this.value;
        $log += $operator;
        $output.html(`<p>${$log}</p>`)
    })

    //listens for click on clear button which will reset all variables.
    $('.clear-btn').on('click', () => $clear())

    //listens for submission/equal button which will perform calculations requested.
    $('form').on('submit', (event) => {
        event.preventDefault();
        $calculate();
    })
})