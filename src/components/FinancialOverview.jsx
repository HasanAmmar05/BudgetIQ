import React, { useState } from 'react';
import { useAppContext } from '../Contexts/AppContext';
import { DollarSign, PiggyBank } from 'lucide-react';

export default function FinancialOverview() {
  const { currency, incomes, addIncome, bankBalance, updateBankBalance } = useAppContext();
  const [newIncome, setNewIncome] = useState('');
  const [newBankBalance, setNewBankBalance] = useState('');

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (newIncome) {
      addIncome({
        id: Date.now(),
        amount: parseFloat(newIncome),
        date: new Date().toISOString().split('T')[0],
      });
      setNewIncome('');
    }
  };

  const handleUpdateBankBalance = (e) => {
    e.preventDefault();
    if (newBankBalance) {
      updateBankBalance(parseFloat(newBankBalance));
      setNewBankBalance('');
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-card text-card-foreground p-4 rounded shadow">
        <h3 className="font-bold mb-2 flex items-center">
          <DollarSign className="mr-2" /> Current Income
        </h3>
        <p className="text-2xl mb-4">{currency} {totalIncome.toFixed(2)}</p>
        <form onSubmit={handleAddIncome} className="flex space-x-2">
          <input
            type="number"
            value={newIncome}
            onChange={(e) => setNewIncome(e.target.value)}
            placeholder="Add new income"
            className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button type="submit" className="p-2 bg-primary text-primary-foreground rounded">
            Add
          </button>
        </form>
      </div>
      <div className="bg-card text-card-foreground p-4 rounded shadow">
        <h3 className="font-bold mb-2 flex items-center">
          <PiggyBank className="mr-2" /> Bank Balance
        </h3>
        <p className="text-2xl mb-4">{currency} {bankBalance.toFixed(2)}</p>
        <form onSubmit={handleUpdateBankBalance} className="flex space-x-2">
          <input
            type="number"
            value={newBankBalance}
            onChange={(e) => setNewBankBalance(e.target.value)}
            placeholder="Update bank balance"
            className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button type="submit" className="p-2 bg-primary text-primary-foreground rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}