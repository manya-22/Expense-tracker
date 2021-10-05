const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   {id : 1, text : 'Flower', amount : -20},
//   {id : 2, text : 'Flower', amount : +20},
//   {id : 3, text : 'Flower', amount : -200},
//   {id : 4, text : 'Flower', amount : +310}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add the text and amount');
    }else{
        const transaction = {
            id : generateID(),
            text : text.value,
            amount : +amount.value

        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

// generate id
function generateID(){
    return Math.floor(Math.random() * 100000000);
}
// add transaction to DOM list

function addTransactionDOM(transaction){
    const sign = transaction.amount > 0 ? '+' : '-';
    const item = document.createElement('li');

    // add class based on value
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick = "removeTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(item);
}

// update the balacne income and expense

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)*(-1)).toFixed(2);
    balance.innerText = `$${total}`;
    money_minus.innerText = `$${expense}`;
    money_plus.innerText = `$${income}`;


}
// remove transaction by id
function removeTransaction(id){
     transactions = transactions.filter(transaction => transaction.id !== id);
     updateLocalStorage();
     init();
}

// update local storage
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
function init(){
    list.innerHTML = ``;
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();
form.addEventListener('submit', addTransaction);