import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { format } from 'date-fns';
import { Edit, Trash2, Save, X } from 'lucide-react';

export default function ExpenseList() {
  const { expenses, deleteExpense, editExpense, currency } = useAppContext();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(filter.toLowerCase()) ||
      expense.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedExpenses = filteredExpenses.sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleSave = () => {
    editExpense(editingId, editForm);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter expenses"
          className="p-2 border rounded flex-grow dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2 bg-secondary text-secondary-foreground rounded"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <ul className="space-y-2">
        {sortedExpenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center p-2 bg-card text-card-foreground rounded shadow"
          >
            {editingId === expense.id ? (
              <div className="flex-grow flex items-center space-x-2">
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="p-1 border rounded flex-grow dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                  className="p-1 border rounded w-24 dark:bg-gray-700 dark:border-gray-600"
                />
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <button onClick={handleSave} className="p-1 text-green-500 hover:text-green-600">
                  <Save size={16} />
                </button>
                <button onClick={handleCancel} className="p-1 text-red-500 hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-bold">{expense.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    {expense.category} - {format(new Date(expense.date), 'MMM d, yyyy')}
                  </p>
                  {expense.isRecurring && (
                    <p className="text-xs text-muted-foreground">
                      Recurring: {expense.recurringPeriod}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">
                    {currency} {expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleEdit(expense)}
                    className="p-1 text-primary hover:text-primary-foreground hover:bg-primary rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="p-1 text-destructive hover:text-destructive-foreground hover:bg-destructive rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}