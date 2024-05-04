import { usePurchaseContext } from '@repo/security';
import { useEffect } from 'react';

export default function SecurityContextShare() {
  const {updatePurchase} = usePurchaseContext();

  useEffect(() => {
    updatePurchase('quantity', 10);
  }, [updatePurchase]);

  return (
    <div>hi</div>
  );

}
