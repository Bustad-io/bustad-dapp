import { useEffect } from 'react';
import { isIOS } from 'react-device-detect';

function MobileRedirectionPage() {
  useEffect(() => {
    if(isIOS) {
      window.location.replace('https://apps.apple.com/us/app/coinbase-wallet-nfts-crypto/id1278383455');
    } else {
      window.location.replace('https://play.google.com/store/apps/details?id=org.toshi');        
    }
  }, []);
  return (
    <div></div>
  );
}

export default MobileRedirectionPage;
