import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCreatedIncentivesAsync, selectIncentives } from "../features/incentive/incentiveSlice";
import { Incentive } from '../types/IncentiveType';

export interface Result  {
    incentives: Incentive[]
}

export function useIncentive(): Result {    
    const incentives = useAppSelector(selectIncentives);
    const dispatch = useAppDispatch();
        
    useEffect(() => {
        if (incentives.length === 0) {
          dispatch(fetchCreatedIncentivesAsync());          
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return {        
        incentives
    }
}