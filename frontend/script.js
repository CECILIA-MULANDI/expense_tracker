const apiUrl = "http://localhost:8000/api/transactions";

// Fetch transactions
async function fetchTransactions() {
  const response = await fetch(apiUrl);
  const transactions = await response.json();

  const list = document.getElementById("transactions-list");
  list.innerHTML = "";

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.textContent = `${transaction.name}: $${transaction.amount}`;
    list.appendChild(li);
  });
}

// Add a new transaction
document
  .getElementById("transaction-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;

    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount }),
    });

    fetchTransactions();
  });

// Load transactions on page load
fetchTransactions();
