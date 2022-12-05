import { useEffect } from 'react';
import { isIOS } from 'react-device-detect';
import { coinbaseAndroidUrl, coinbaseIosUrl } from '../../config';

function MobileRedirectionPage() {
  useEffect(() => {
    if(isIOS) {
      window.location.replace(coinbaseIosUrl);
    } else {
      window.location.replace(coinbaseAndroidUrl);
    }
  }, []);
  return (
    <div></div>
  );
}

export default MobileRedirectionPage;
