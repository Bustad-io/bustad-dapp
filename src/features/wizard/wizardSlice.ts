import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRampPurchaseStatus } from '../../api/rampApi';
import { RootState } from '../../app/store';
import { RampPurchaseStatus } from '../../types/RampPurchaseStatus';

export type WalletChoice = 'coinbase' | 'metamask';

export interface WizardState {  
  chosenWallet: WalletChoice,
  rampPurchaseStatus: RampPurchaseStatus,
  rampPurchaseId: string | null
}

const initialState: WizardState = {  
  chosenWallet: 'coinbase',
  rampPurchaseStatus: RampPurchaseStatus.None,
  rampPurchaseId: null
  
};

export const fetchLatestRampPurchaseStatusAsync = createAsyncThunk(
  'wizard/fetchLatestRampPurchaseStatus',
  async (_, { getState }) => {
    const state = getState() as RootState;

    if(!state.wallet.account) {      
      throw Error('Account not connected');      
    }

    if(!state.wizard.rampPurchaseId) {      
      throw Error('RampPurchaseId not found');      
    }

    const res = await getRampPurchaseStatus(state.wallet.account, state.wizard.rampPurchaseId);

    if(res.status !== 200) {
      throw Error('Could not get rampPurchaseStatus');
    }
    
    return {
      rampPurchaseId: res.data
    }
  }
);

export const wizardSlice = createSlice({
  name: 'wizard',
  initialState,  
  reducers: {
    setChosenWallet: (state, action: PayloadAction<WalletChoice>) => {
      state.chosenWallet = action.payload;
    },
    setRampPuchaseId: (state, action: PayloadAction<string>) => {
      state.rampPurchaseId = action.payload;
    },
    setRampPuchaseStatus: (state, action: PayloadAction<RampPurchaseStatus>) => {
      state.rampPurchaseStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLatestRampPurchaseStatusAsync.fulfilled, (state, action) => {
      state.rampPurchaseStatus = action.payload.rampPurchaseId;
    })
    .addCase(fetchLatestRampPurchaseStatusAsync.rejected, (state) => {
      state.rampPurchaseStatus = RampPurchaseStatus.None;
    });
  }
});

export const { setChosenWallet, setRampPuchaseId, setRampPuchaseStatus } = wizardSlice.actions;

export const selectChosenWallet = (state: RootState) => state.wizard.chosenWallet;
export const selectRampPurchaseStatus = (state: RootState) => state.wizard.rampPurchaseStatus;

export default wizardSlice.reducer;
