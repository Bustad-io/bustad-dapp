import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCreatedIncentivesAsync, fetchUserStakesAsync, selectUserStakes } from "../features/incentive/incentiveSlice";
import { UserStake } from '../types/UserStakeType';
import { useWalletConnection } from './walletConnectionHook';

export interface Result {
  userStakes: UserStake[]
}

export function useUserStakes(): Result {
  const userStakes = useAppSelector(selectUserStakes);
  const dispatch = useAppDispatch();
  const { address } = useWalletConnection();

  useEffect(() => {    
    if (userStakes.length === 0 && address !== null) {      
      dispatch(fetchUserStakesAsync(address));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return {
    userStakes
  }
}