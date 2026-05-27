import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const saveExpenses = (updatedExpenses) => {
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const addExpense = () => {
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
    };

    saveExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    saveExpenses(updatedExpenses);
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8", padding: "40px", fontFamily: "Arial" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>💰 Expense Tracker</h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Expense Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "120px", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <button onClick={addExpense} style={{ padding: "12px 18px", background: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Add
          </button>
        </div>

        <h2>Total Spending: ${total}</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {expenses.map((expense) => (
            <li key={expense.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f9fa", padding: "12px", borderRadius: "6px", marginBottom: "10px" }}>
              <span>{expense.title} - ${expense.amount}</span>

              <button onClick={() => deleteExpense(expense.id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;