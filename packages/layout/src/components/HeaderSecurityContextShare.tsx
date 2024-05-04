import { usePurchaseContext } from '@repo/security';

export default function HeaderSecurityContextShare() {
  const {purchase} = usePurchaseContext();

  console.log('purchase ===>', purchase);

  return (
    <>
      헤더
    </>
  );
}
