const answer = document.querySelector('.answer > p');
const btns = document.querySelectorAll('.calc a');

let current = '';
let prev = '';
let op = '';

function updatecalc(value) {
    answer.textContent = value;
}
function clearcalc() {
    current = '';
    prev = '';
    op = '';
    updatecalc('0');
}
function deletechar() {
    current = current.slice(0, -1);
    updatecalc(current || '0');
}
function calculate() {
    const num1 = parseFloat(prev);
    const num2 = parseFloat(current);
    if (isNaN(num1) || isNaN(num2)) return;
    let result;
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '−':
            result = num1 - num2;
            break;
        case '×':
            result = num1 * num2;
            break;
        case '÷':
            result = num2 !== 0 ? num1 / num2 : 'Ошибка';
            break;
        default:
            return;
    }
    current = result.toString();
    prev = '';
    op = '';
    updatecalc(current);
}

btns.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const value = e.target.textContent;
        if (!isNaN(value) || value === '.') {
            if (value === '.' && current.includes('.')) return;
            current += value;
            updatecalc(current);
        } else if (value === '⌫') {
            deletechar();
        } else if (value === '=') {
            calculate();
        } else if (value === '+' || value === '−' || value === '×' || value === '÷') {
            if (current === '' && value === '−') {
                current = '-';
                updatecalc(currentInput);
                return;
            }
            if (prev && current) {
                calculate();
            }
            op = value;
            prev = current;
            current = '';
        } else if (value === 'AC') {
            clearcalc();
        }
    });
});
clearcalc();