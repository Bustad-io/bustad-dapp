import { useWeb3Connector } from "../hooks/web3Hook";
import { useEffect, useState } from 'react';
import { formatNumberToSpaces, parseToNumber } from "../utils/format";
import { ReactComponent as Spinner } from '../assets/icons/SpinnerSmallWide.svg';

function CounterPage() {  
  const { contracts } = useWeb3Connector();
  const [totalSupply, setTotalSupply] = useState('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runAsync() {      
      const totalSupply = await contracts.bustadToken.totalSupply();
      setTotalSupply(formatNumberToSpaces(parseToNumber(totalSupply), 0));          
      setLoading(false);
    }
    runAsync();
  });
  return(
    <div className="-top-32 relative">
      <div className="bg-Negroni flex flex-col py-4 px-8 rounded-2xl">
        <span className="text-2xl font-semibold text-stone-800">Total minted</span>
        {loading ?
        <span className="flex justify-center h-16 items-center animate-spin">
          <Spinner/>
        </span> : 
        <span className="font-medium text-9xl">
          {totalSupply}
        </span>}        
      </div>
    </div>
  );
}

export default CounterPage;
