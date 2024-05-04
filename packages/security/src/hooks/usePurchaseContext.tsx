import { useContext } from 'react';
import {PurchaseContext} from './PurchaseProvider';

export default function usePurchaseContext() {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error(
      'usePurchaseContext must be used within a PurchaseProvider',
    );
  }
  return context;
}
