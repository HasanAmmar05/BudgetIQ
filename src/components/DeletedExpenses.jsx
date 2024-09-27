import React, { useState } from 'react';
import { useAppContext } from '../Contexts/AppContext';
import { format } from 'date-fns';
import { Trash2, RefreshCw } from 'lucide-react';

export default function DeletedExpenses() {
  const { deletedExpenses, currency, addExpense } = useAppContext();
  const [showDeleted, setShowDeleted] = useState(false);

  const handleRestore = (expense) => {
    addExpense(expense);
    
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Trash2 className="mr-2" /> Deleted Expenses
      </h2>
      <button
        onClick={() => setShowDeleted(!showDeleted)}
        className="mb-4 p-2 bg-secondary text-secondary-foreground rounded"
      >
        {showDeleted ? 'Hide' : 'Show'} Deleted Expenses
      </button>
      {showDeleted && (
        <ul className="space-y-2">
          {deletedExpenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center p-2 bg-card text-card-foreground rounded shadow"
            >
              <div>
                <h3 className="font-bold">{expense.description}</h3>
                <p className="text-sm text-muted-foreground">
                  {expense.category} - {format(new Date(expense.date), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">
                  {currency} {expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleRestore(expense)}
                  className="p-1 text-primary hover:text-primary-foreground hover:bg-primary rounded"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}