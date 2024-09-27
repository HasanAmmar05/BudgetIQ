import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { categorizeExpense } from '../utils/expenseCategories';

export default function ExpenseForm() {
  const { addExpense, currency } = useAppContext();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPeriod, setRecurringPeriod] = useState('monthly');

  const handleSubmit = (e) => {
    e.preventDefault();
    const suggestedCategory = categorizeExpense(description);
    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category: category || suggestedCategory,
      date,
      isRecurring,
      recurringPeriod: isRecurring ? recurringPeriod : null,
    };
    addExpense(newExpense);
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
    setIsRecurring(false);
    setRecurringPeriod('monthly');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Amount (${currency})`}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">Select Category (or leave blank for auto-categorization)</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
        <option value="utilities">Utilities</option>
        <option value="healthcare">Healthcare</option>
        <option value="shopping">Shopping</option>
        <option value="education">Education</option>
        <option value="travel">Travel</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          id="isRecurring"
          className="dark:bg-gray-700"
        />
        <label htmlFor="isRecurring" className="text-sm">Recurring Expense</label>
      </div>
      {isRecurring && (
        <select
          value={recurringPeriod}
          onChange={(e) => setRecurringPeriod(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      )}
      <button type="submit" className="w-full p-2 bg-primary text-primary-foreground rounded">
        Add Expense
      </button>
    </form>
  );
}