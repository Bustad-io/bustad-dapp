import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Incentive } from '../../types/IncentiveType';
import { endIncentive, getAllIncentives, postIncentive } from '../../api/incentiveApi';

export interface IncentiveState {  
  incentives: Incentive[]
}

const initialState: IncentiveState = {  
  incentives: []
};

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

    if(res.status !== 200) {
      throw Error("Could not post new incentive");
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
    .addCase(postIncentiveAsync.fulfilled, (state, action) => {
      state.incentives.push(action.payload.data);
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

export default incentiveSlice.reducer;
