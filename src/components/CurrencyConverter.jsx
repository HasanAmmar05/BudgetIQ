import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../contexts/AppContext';
import { RefreshCw } from 'lucide-react';



export default function CurrencyConverter() {
  const { currency, setCurrency } = useAppContext();
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(currency);
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`
        );
        setExchangeRate(response.data.data[toCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleConvert = () => {
    setCurrency(toCurrency);
  };

  return (
    <div className="bg-card text-card-foreground p-4 rounded shadow">
      <h3 className="font-bold mb-4 flex items-center">
        <RefreshCw className="mr-2" /> Currency Converter
      </h3>
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded flex-grow dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        <span className="p-2">=</span>
        <input
          type="number"
          value={convertedAmount}
          readOnly
          className="p-2 border rounded flex-grow dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-white"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <button
        onClick={handleConvert}
        className="w-full p-2 bg-primary text-primary-foreground rounded"
      >
        Set as Default Currency
      </button>
    </div>
  );
}