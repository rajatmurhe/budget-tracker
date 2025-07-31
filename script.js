let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
const descEl = document.getElementById("desc");
const amountEl = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

function updateUI() {
  listEl.innerHTML = "";
  let total = 0;

  transactions.forEach((tx, index) => {
    const li = document.createElement("li");
    li.className = tx.amount >= 0 ? "income" : "expense";
    li.innerHTML = `
      ${tx.desc} <span>₹${tx.amount}</span>
      <button onclick="deleteTransaction(${index})">✖</button>
    `;
    listEl.appendChild(li);
    total += tx.amount;
  });

  balanceEl.textContent = total;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const desc = descEl.value.trim();
  const amount = parseFloat(amountEl.value.trim());

  if (!desc || isNaN(amount)) {
    alert("Enter valid description and amount!");
    return;
  }

  transactions.push({ desc, amount });
  descEl.value = "";
  amountEl.value = "";
  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

addBtn.addEventListener("click", addTransaction);
updateUI();
