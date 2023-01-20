import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserStake } from '../types/UserStakeType';
import { useUserStakes } from "./userStakesHook";
import { useWalletConnection } from './walletConnectionHook';
import { useLpPositions } from './lpPositionsHook';
import { useIncentive } from "./incentiveHook";

export interface Result {
  userStakes: UserStake[]
}

export function UserIncentiveUserState(): Result {
  const dispatch = useAppDispatch();

  const { userStakes } = useUserStakes();
  const { positions } = useLpPositions();
  const { incentives } = useIncentive();
  const { address } = useWalletConnection();

  function determineIncentiveUserState() {
    const stakedIncentive = incentives.filter(incentive => {
      return userStakes.some(userStake => userStake.incentiveId === incentive.id);
    });
  }

  return {
    userStakes
  }
}