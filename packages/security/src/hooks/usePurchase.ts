import { useCallback, useEffect, useState } from 'react';

export interface Purchase {
  quantity: number; //보유수량
  averagePrice: number; //매수 평균가
  amount: number; // 매수 금액
}

export const defaultPurchase: Purchase = {
  quantity: 0,
  averagePrice: 0,
  amount: 0,
};

export function usePurchase() {
  const [purchase, setPurchase] = useState<Purchase>(defaultPurchase);

  const updatePurchase = useCallback((key: keyof Purchase, value: number) => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      [key]: value,
    }));
  }, []);

  useEffect(() => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      amount: !Number.isNaN(prevPurchase.averagePrice) && !Number.isNaN(prevPurchase.quantity) ? prevPurchase.quantity * prevPurchase.averagePrice : prevPurchase.amount,
    }));
  }, [purchase.quantity, purchase.averagePrice]);

  return { purchase, updatePurchase };
}
