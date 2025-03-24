
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { CURRENCY_SYMBOLS } from '@/data/products';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  
  const currencies = [
    { code: 'RON', name: 'Romanian Leu', symbol: CURRENCY_SYMBOLS.RON },
    { code: 'EUR', name: 'Euro', symbol: CURRENCY_SYMBOLS.EUR },
    { code: 'USD', name: 'US Dollar', symbol: CURRENCY_SYMBOLS.USD },
  ];

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select currency"
      >
        <span>{currencies.find(c => c.code === currency)?.symbol}</span>
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 animate-fade-in">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                currency === curr.code ? 'bg-gray-100 font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleCurrencyChange(curr.code)}
            >
              <span className="mr-2">{curr.symbol}</span>
              {curr.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
