import React from 'react';
import { useAppContext } from '../Contexts/AppContext';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const { darkMode, toggleDarkMode, currency, setCurrency } = useAppContext();

  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Advanced Expense Tracker</h1>
        <div className="flex items-center space-x-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-secondary text-secondary-foreground p-2 rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-secondary text-secondary-foreground"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}