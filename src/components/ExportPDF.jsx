import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileDown } from 'lucide-react';

export default function ExportPDF() {
  const { expenses, incomes, currency } = useAppContext();

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Expense Tracker Report', 14, 22);

    // Add expenses table
    doc.setFontSize(12);
    doc.text('Expenses', 14, 30);
    
    const expenseData = expenses.map(expense => [
      expense.date,
      expense.description,
      expense.category,
      `${currency} ${expense.amount.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 35,
      head: [['Date', 'Description', 'Category', 'Amount']],
      body: expenseData,
    });

    // Add incomes table
    const finalY = doc.lastAutoTable.finalY || 35;
    doc.text('Incomes', 14, finalY + 10);

    const incomeData = incomes.map(income => [
      income.date,
      `${currency} ${income.amount.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: finalY + 15,
      head: [['Date', 'Amount']],
      body: incomeData,
    });

    // Save the PDF
    doc.save('expense-tracker-report.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center justify-center w-full p-2 bg-primary text-primary-foreground rounded"
    >
      <FileDown className="mr-2" size={20} />
      Export to PDF
    </button>
  );
}