import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Incentive } from '../../types/IncentiveType';
import { endIncentive, getAllIncentives, postIncentive } from '../../api/incentiveApi';
import { UserStake } from '../../types/UserStakeType';
import { getUserStake, postUserStake, setToUnstaked } from '../../api/stakeApi';
import { PositionView } from '../../types/StakingTypes';
import { formatUnitToNumber, toEther } from '../../utils/format';
import { getContracts } from '../../providers/web3.provider';
import { getContractByAddressHelper } from '../../utils/helper';
import { isAddress } from 'ethers/lib/utils';

export interface IncentiveState {
  incentives: Incentive[]
  userStakes: UserStake[],
  positions: PositionView[],
  totalAccrued: number
}

const initialState: IncentiveState = {
  incentives: [],
  userStakes: [],
  positions: [],
  totalAccrued: 0
};

export const postUnstakedAsync = createAsyncThunk(
  'incentive/postUnstaked',
  async ({ tokenId, incentiveId }: { tokenId: Number, incentiveId: Number },) => {
    await setToUnstaked(tokenId, incentiveId);
    return {
      tokenId
    }
  }
);

export const fetchUserStakesAsync = createAsyncThunk(
  'incentive/fetchUserStakes',
  async (_, { getState }) => {
    const state = getState() as RootState;    

    if (state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    if (state.wallet.account === null || isAddress(state.wallet.account)) {
      throw Error('Wallet address is null or invalid');
    }

    const { data } = await getUserStake(state.wallet.account);
    return {
      data
    }
  }
);

export const fetchTotalAccruedAsync = createAsyncThunk(
  'incentive/fetchTotalAccrued',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const network = state.wallet.network;

    if (state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }
    const { uniswapStaker, govToken } = getContracts(network, true);

    const accrued = await toEther(await uniswapStaker.callStatic.claimReward(govToken.address, state.wallet.account, 0));

    return {
      accrued: Number(accrued)
    }
  }
);

export const fetchUserPositionsAsync = createAsyncThunk(
  'incentive/fetchUserPositions',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const network = state.wallet.network;

    if (state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    const { uniswapLpNft } = getContracts(network, true);

    const numberOfNFT = formatUnitToNumber(await uniswapLpNft.balanceOf(state.wallet.account));

    const pos: any = await Promise
      .all(Array(numberOfNFT)
        .fill('')
        .map(async (_, index) => {
          const tokenId = formatUnitToNumber(await uniswapLpNft.tokenOfOwnerByIndex(state.wallet.account, index));
          const position = await uniswapLpNft.positions(tokenId);

          const res: PositionView = {
            tokenId,
            fee: position.fee / 10000,
            token0Label: getContractByAddressHelper(position.token0, state.wallet.network)?.label ?? '',
            token1Label: getContractByAddressHelper(position.token1, state.wallet.network)?.label ?? '',
            token0Address: position.token0,
            token1Address: position.token1
          }
          return res;
        }));

    return {
      pos
    }
  }
)


export const fetchCreatedIncentivesAsync = createAsyncThunk(
  'incentive/fetchCreatedIncentives',
  async (_,) => {
    const { data } = await getAllIncentives();
    return {
      data
    }
  }
);

export const postIncentiveAsync = createAsyncThunk(
  'incentive/postIncentive',
  async (newIncentive: Incentive) => {
    const res = await postIncentive(newIncentive);

    if (res.status !== 200) {
      throw Error("Could not post new incentive");
    }

    return {
      data: res.data
    }
  }
);

export const postUserStakeAsync = createAsyncThunk(
  'incentive/postUserStake',
  async (userStake: UserStake) => {
    const res = await postUserStake(userStake);

    if (res.status !== 200) {
      throw Error("Could not post userStake");
    }

    return {
      data: res.data
    }
  }
);

export const endIncentiveAsync = createAsyncThunk(
  'incentive/endIncentive',
  async (id: number) => {
    const res = await endIncentive(id);

    if (res.status !== 200) {
      throw Error("Could not end incentive");
    }

    return {
      id
    }
  }
);

export const incentiveSlice = createSlice({
  name: 'incentive',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatedIncentivesAsync.fulfilled, (state, action) => {
        state.incentives = action.payload.data;
      })
      .addCase(postUnstakedAsync.fulfilled, (state, action) => {
        const removeIndex = state.userStakes.findIndex(x => x.tokenId === action.payload.tokenId);
        state.userStakes.splice(removeIndex, 1);
      })
      .addCase(fetchUserStakesAsync.fulfilled, (state, action) => {
        state.userStakes = action.payload.data;
      })
      .addCase(postIncentiveAsync.fulfilled, (state, action) => {
        state.incentives.push(action.payload.data);
      })
      .addCase(postUserStakeAsync.fulfilled, (state, action) => {
        state.userStakes.push(action.payload.data);
      })
      .addCase(endIncentiveAsync.fulfilled, (state, action) => {
        state.incentives = state.incentives.map(incentive => {
          if (action.payload.id === incentive.id) {
            incentive.activelyEnded = true;
          }
          return incentive;
        })
      })
      .addCase(fetchUserPositionsAsync.fulfilled, (state, action) => {
        state.positions = action.payload.pos;
      })
      .addCase(fetchTotalAccruedAsync.fulfilled, (state, action) => {
        state.totalAccrued = action.payload.accrued;
      });
  }
});

export const selectIncentives = (state: RootState) => state.incentive.incentives;
export const selectUserStakes = (state: RootState) => state.incentive.userStakes;
export const selectUserPositions = (state: RootState) => state.incentive.positions;
export const selectTotalAccrued = (state: RootState) => state.incentive.totalAccrued;

export default incentiveSlice.reducer;
