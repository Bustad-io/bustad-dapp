import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Incentive } from '../../types/IncentiveType';
import { endIncentive, getAllIncentives, postIncentive } from '../../api/incentiveApi';
import { UserStake } from '../../types/UserStakeType';
import { getUserStake, postUserStake, setToUnstaked } from '../../api/stakeApi';

export interface IncentiveState {  
  incentives: Incentive[]
  userStakes: UserStake[]
}

const initialState: IncentiveState = {  
  incentives: [],
  userStakes: []
};

export const postUnstakedAsync = createAsyncThunk(
  'incentive/postUnstaked',
  async (tokenId: number,) => {
    await setToUnstaked(tokenId);
    return {
      tokenId
    }
  }
);

export const fetchCreatedIncentivesAsync = createAsyncThunk(
  'incentive/fetchCreatedIncentives',
  async (_,) => {
    const { data } = await getAllIncentives();
    return {
      data
    }
  }
);

export const fetchUserStakesAsync = createAsyncThunk(
  'incentive/fetchUserStakes',
  async (userAddress: string) => {
    const { data } = await getUserStake(userAddress);
    return {
      data
    }
  }
);

export const postIncentiveAsync = createAsyncThunk(
  'incentive/postIncentive',
  async (newIncentive: Incentive) => {
    const res = await postIncentive(newIncentive);

    if(res.status !== 200) {
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

    if(res.status !== 200) {
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

    if(res.status !== 200) {
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
      state.incentives = [...state.incentives, ...action.payload.data]
    })
    .addCase(postUnstakedAsync.fulfilled, (state, action) => {
      const removeIndex = state.userStakes.findIndex(x => x.tokenId === action.payload.tokenId);
      state.userStakes.splice(removeIndex, 1);
    })
    .addCase(fetchUserStakesAsync.fulfilled, (state, action) => {
      state.userStakes = [...state.userStakes, ...action.payload.data]
    })
    .addCase(postIncentiveAsync.fulfilled, (state, action) => {
      state.incentives.push(action.payload.data);
    })
    .addCase(postUserStakeAsync.fulfilled, (state, action) => {
      state.userStakes.push(action.payload.data);
    })
    .addCase(endIncentiveAsync.fulfilled, (state, action) => {
      state.incentives = state.incentives.map(incentive => {
        if(action.payload.id === incentive.id) {
          incentive.activelyEnded = true;
        }
        return incentive;
      })
    });
  }
});

export const {  } = incentiveSlice.actions;

export const selectIncentives = (state: RootState) => state.incentive.incentives;
export const selectUserStakes = (state: RootState) => state.incentive.userStakes;

export default incentiveSlice.reducer;
