import { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = 12500 + transactions.reduce((acc, t) => acc + t.amount, 0);

  const addTransaction = () => {
    if (!description || !amount) return;
    const newTransaction: Transaction = { 
      id: Date.now(), 
      description, 
      amount: parseFloat(amount) 
    };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Finance Manager</h1>
        <p className="text-gray-400">Track your money efficiently.</p>
      </header>

      {/* Balance Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#1f2028] rounded-xl border border-[#2e303a]">
          <h2 className="text-sm uppercase font-semibold text-gray-400">Total Balance</h2>
          <p className="text-3xl font-bold text-white">${balance.toLocaleString()}</p>
        </div>
      </section>

      {/* Transaction Form Section */}
      <section className="mt-8 p-6 bg-[#1f2028] rounded-xl border border-[#2e303a]">
        <h2 className="text-xl font-bold text-white mb-4">Add Transaction</h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description" 
            className="p-2 bg-[#2e303a] border border-[#3e404a] rounded text-white w-full" 
          />
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount" 
            className="p-2 bg-[#2e303a] border border-[#3e404a] rounded text-white w-full" 
          />
          <button 
            onClick={addTransaction}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium"
          >
            Add
          </button>
        </div>
      </section>

      {/* Recent Transactions List */}
      <section className="mt-8 p-6 bg-[#1f2028] rounded-xl border border-[#2e303a]">
        <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li key={t.id} className="flex justify-between p-3 bg-[#2e303a] rounded text-white border border-[#3e404a]">
              <span>{t.description}</span>
              <span className={`font-bold ${t.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {t.amount >= 0 ? '+' : ''}${t.amount.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;