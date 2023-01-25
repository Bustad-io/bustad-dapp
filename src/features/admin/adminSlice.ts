import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AdminState {  
  createIncentiveForm: CreateIncentiveForm
}

export interface CreateIncentiveForm {
  rewardToken: string;
  pool: string;
  startTime: string;
  endTime: string;
  refundee: string;
  rewardAmount: number;
}

const initialState: AdminState = {    
  createIncentiveForm: {
    rewardAmount: 0,
    rewardToken: "",
    startTime: "",
    endTime: "",
    pool: "",
    refundee: ""
  }
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,  
  reducers: {
    setCreateIncentiveForm: (state, action: PayloadAction<CreateIncentiveForm>) => {
      state.createIncentiveForm = action.payload;
    }
  },  
});

export const { setCreateIncentiveForm } = adminSlice.actions;

export const selectCreateInsentiveForm = (state: RootState) => state.admin.createIncentiveForm;

export default adminSlice.reducer;
