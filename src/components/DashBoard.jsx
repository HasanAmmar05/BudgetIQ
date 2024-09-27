import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { expenses, incomes, currency } = useAppContext();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncome - totalExpenses;

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card text-card-foreground p-4 rounded shadow">
          <h3 className="font-bold mb-2">Total Income</h3>
          <p className="text-2xl">{currency} {totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-card text-card-foreground p-4 rounded shadow">
          <h3 className="font-bold mb-2">Total Expenses</h3>
          <p className="text-2xl">{currency} {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-card text-card-foreground p-4 rounded shadow">
          <h3 className="font-bold mb-2">Balance</h3>
          <p className={`text-2xl ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {currency} {balance.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="bg-card text-card-foreground p-4 rounded shadow">
        <h3 className="font-bold mb-4">Expenses by Category</h3>
        <div className="w-full max-w-md mx-auto">
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}