import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AdminState {  
  createIncentiveForm: CreateIncentiveForm
}

export interface CreateIncentiveForm {
  rewardToken: LabelValue;
  pool: LabelValue;
  startTime: string;
  endTime: string;
  refundee: string;
  rewardAmount: number;
}

interface LabelValue {
  label: string;
  value: string;
}

const initialState: AdminState = {    
  createIncentiveForm: {
    rewardAmount: 0,
    rewardToken: {
      label: "",
      value: ""
    },
    startTime: "",
    endTime: "",
    pool: {
      label: "",
      value: ""
    },
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
