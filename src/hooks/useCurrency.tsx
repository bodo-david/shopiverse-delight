
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EXCHANGE_RATES, formatPrice, convertPrice } from '@/data/products';

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatProductPrice: (price: number, currencyOverride?: string) => string;
  convertProductPrice: (price: number, fromCurrency: string) => number;
  exchangeRates: typeof EXCHANGE_RATES;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<string>('RON');

  const formatProductPrice = (price: number, currencyOverride?: string): string => {
    return formatPrice(price, currencyOverride || currency);
  };

  const convertProductPrice = (price: number, fromCurrency: string): number => {
    return convertPrice(price, fromCurrency, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatProductPrice,
        convertProductPrice,
        exchangeRates: EXCHANGE_RATES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
