import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import DashBoard from './components/DashBoard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FinancialOverview from './components/FinancialOverview';
import DeletedExpenses from './components/DeletedExpenses';
import CurrencyConverter from './components/CurrencyConverter';
import ExportPDF from './components/ExportPDF';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto p-4 space-y-8">
          <DashBoard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <FinancialOverview />
              <CurrencyConverter />
              <div>
                <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
                <ExpenseForm />
              </div>
              <ExportPDF />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Expense List</h2>
                <ExpenseList />
              </div>
              <DeletedExpenses />
            </div>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;