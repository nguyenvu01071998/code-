function appendToResult(value) {
    const resultField = document.getElementById('result');
    if (value === '%' && resultField.value !== '') {
        resultField.value = (parseFloat(resultField.value) / 100).toString();
    } else {
        resultField.value = resultField.value + value;
    }
}

function clearResult() {
    document.getElementById('result').value = '';
}

function calculateResult() {
    const resultField = document.getElementById('result');
    try {
        resultField.value = eval(resultField.value.replace(',', '.'));
    } catch (error) {
        resultField.value = 'Lỗi';
    }
}

//nhập số, phép tính, kết quả từ bàn phím
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const resultField = document.getElementById('result');

    if (!isNaN(parseInt(key)) || key === '.') {
        appendToResult(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        resultField.value = resultField.value.slice(0, -1);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToResult(key);
    } else if (key === 'Escape') {
        clearResult();
    }
});
