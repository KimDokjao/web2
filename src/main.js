const amountInput = document.querySelector('.amount');
const currencyFromSelect = document.querySelector('.currency-from');
const currencyToSelect = document.querySelector('.currency-to');
const convertButton = document.querySelector('.convert-button');
const resultDiv = document.querySelector('.result');

async function fetchCurrencies() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        currencyFromSelect.appendChild(optionFrom.cloneNode(true));
        
        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        currencyToSelect.appendChild(optionTo.cloneNode(true));
    });
}

async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = currencyFromSelect.value;
    const toCurrency = currencyToSelect.value;

    if (!amount) {
        resultDiv.textContent = 'Введите сумму';
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const result = (amount * rate).toFixed(2);
    resultDiv.textContent = `Результат: ${result} ${toCurrency}`;
}

convertButton.addEventListener('click', convertCurrency);
fetchCurrencies();