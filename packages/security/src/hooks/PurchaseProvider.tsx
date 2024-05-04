import { createContext } from 'react';
import { Purchase, usePurchase } from './usePurchase';

export interface PurchaseContextType {
  purchase: Purchase;
  updatePurchase: (key: keyof Purchase, value: number) => void;
}

export const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export default function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const { purchase, updatePurchase } = usePurchase();

  return (
    <PurchaseContext.Provider value={{ purchase, updatePurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
}
