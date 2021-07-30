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

    const $calculate = () => {
        $firstNum = parseFloat($firstNum);
        $secondNum = parseFloat($secondNum);
        console.log($firstNum);
        console.log($secondNum)
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

    $('button').on('click',function(){
        this.classList.add('btn-clicked')
        setTimeout(()=>this.classList.remove('btn-clicked'),200)
    });

    $numBtns.on('click', function () {
        if ($operator === '') {
            $firstNum += this.value;
            $log = $firstNum;
        } else {
            $secondNum += this.value;
            $log += $secondNum;
        }
        $output.html(`<p>${$log}</p>`)
    })

    $opBtns.on('click', function () {
        if ($operator != '') {
            $calculate();
        }
        $operator = this.value;
        $log += $operator;
        $output.html(`<p>${$log}</p>`)
    })

    $('.clear-btn').on('click', () => $clear())

    $('form').on('submit', (event) => {
        event.preventDefault();
        $calculate();
    })
})
