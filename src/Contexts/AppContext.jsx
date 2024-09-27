import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [expenses, setExpenses] = useState([]);
  const [deletedExpenses, setDeletedExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [bankBalance, setBankBalance] = useState(0);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const savedDeletedExpenses = JSON.parse(localStorage.getItem('deletedExpenses')) || [];
    const savedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || {};
    const savedBankBalance = parseFloat(localStorage.getItem('bankBalance')) || 0;

    setDarkMode(savedDarkMode);
    setCurrency(savedCurrency);
    setExpenses(savedExpenses);
    setDeletedExpenses(savedDeletedExpenses);
    setIncomes(savedIncomes);
    setBudgets(savedBudgets);
    setBankBalance(savedBankBalance);

    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('currency', currency);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('deletedExpenses', JSON.stringify(deletedExpenses));
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('bankBalance', bankBalance.toString());

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, currency, expenses, deletedExpenses, incomes, budgets, bankBalance]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addExpense = (expense) => setExpenses([...expenses, expense]);
  const editExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === id ? updatedExpense : exp));
  };
  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(exp => exp.id === id);
    setDeletedExpenses([...deletedExpenses, expenseToDelete]);
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const addIncome = (income) => setIncomes([...incomes, income]);
  const editIncome = (id, updatedIncome) => {
    setIncomes(incomes.map(inc => inc.id === id ? updatedIncome : inc));
  };
  const deleteIncome = (id) => setIncomes(incomes.filter(inc => inc.id !== id));

  const updateBudget = (category, amount) => {
    setBudgets({ ...budgets, [category]: amount });
  };

  const updateBankBalance = (amount) => {
    setBankBalance(amount);
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      currency,
      setCurrency,
      expenses,
      addExpense,
      editExpense,
      deleteExpense,
      deletedExpenses,
      incomes,
      addIncome,
      editIncome,
      deleteIncome,
      budgets,
      updateBudget,
      bankBalance,
      updateBankBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
};