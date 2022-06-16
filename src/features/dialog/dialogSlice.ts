import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface DialogState {  
  pending: {
    show: boolean,
    text: string
  },
  submitted: {
    show: boolean,
    txHash: string
  }
}

const initialState: DialogState = {  
  pending: {
    show: false,
    text: ''
  },
  submitted: {
    show: false,
    txHash: ''
  }
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,  
  reducers: {    
    showPendingModal: (state, action) => {
      state.pending.show = true;
      state.pending.text = action.payload;
    },
    hidePendingModal: (state) => {
      state.pending.show = false;
      state.pending.text = '';
    },
    showSubmittedModal: (state, action) => {
      state.submitted.show = true;
      state.submitted.txHash = action.payload
    },
    hideSubmittedModal: (state) => {
      state.submitted.show = false;
      state.submitted.txHash = ''
    }
  }
  }
);

export const { showPendingModal, hidePendingModal, showSubmittedModal, hideSubmittedModal } = dialogSlice.actions;

export const selectPending = (state: RootState) => state.dialog.pending;
export const selectSubmitted = (state: RootState) => state.dialog.submitted;

export default dialogSlice.reducer;
