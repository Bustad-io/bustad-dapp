import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AdminState {  
  createIncentiveForm: CreateIncentiveForm
  generatedIncentiveId: string  
}

interface CreateIncentiveForm {
  rewardToken: LabelValue;
  pool: LabelValue;
  startTime: string;
  endTime: string;
  refundee: string;
}

interface LabelValue {
  label: string;
  value: string;
}

const initialState: AdminState = {  
  generatedIncentiveId: "",
  createIncentiveForm: {
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
    },
    setGeneratedIncentiveId: (state, action: PayloadAction<string>) => {
      state.generatedIncentiveId = action.payload;
    }
  },  
});

export const { setCreateIncentiveForm, setGeneratedIncentiveId } = adminSlice.actions;

export const selectCreateInsentiveForm = (state: RootState) => state.admin.createIncentiveForm;
export const selectGeneratedIncentiveId = (state: RootState) => state.admin.generatedIncentiveId;

export default adminSlice.reducer;
