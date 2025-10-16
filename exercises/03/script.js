const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const addButton = document.getElementById('add');
const list = document.getElementById('list');
const totalDisplay = document.getElementById('total');

let expenses = [];

addButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount <= 0) return;

  expenses.push({ name, amount });
  renderList();
  updateTotal();

  nameInput.value = '';
  amountInput.value = '';
});

function renderList() {
  list.innerHTML = '';
  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.name}: ${exp.amount} €`;
    list.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}