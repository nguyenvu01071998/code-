let history = [];

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
    let expression = resultField.value.replace(',', '.');
    try {
        let result = eval(expression);    
        if (expression && !isNaN(result)) {
            addHistory(expression, result);
        }
        resultField.value = result;
    } catch (error) {
        resultField.value = 'Lỗi';
    }
}

function addHistory(expression, result) {
    history.unshift({ expression, result });
    if (history.length > 50) {
        history.pop();
    }
    renderHistory();
}


function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span class="history-exp">${item.expression} = ${item.result}</span>
            <button class="copy-btn" onclick="copyToResult(${item.result})">Copy</button>
        `;
        historyList.appendChild(li);
    });
}

function copyToResult(value) {
    document.getElementById('result').value = value;
}

// Nhập số, phép tính, kết quả từ bàn phím
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

// Đảm bảo hàm copyToResult có thể gọi từ HTML
window.copyToResult = copyToResult;