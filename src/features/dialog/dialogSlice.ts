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
  },
  rejected: {
    show: boolean
  },
  confirmed: {
    show: boolean
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
  },
  rejected: {
    show: false
  },
  confirmed: {
    show: true
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
    },
    showRejectedModal: (state) => {
      state.rejected.show = true;      
    },
    hideRejectedModal: (state) => {
      state.rejected.show = false;      
    },
    showConfirmedModal: (state) => {
      state.confirmed.show = true
    },
    hideConfirmedModal: (state) => {
      state.confirmed.show = false
    },
  }
  }
);

export const { showPendingModal, hidePendingModal, showSubmittedModal, hideSubmittedModal, showRejectedModal, hideRejectedModal, showConfirmedModal, hideConfirmedModal } = dialogSlice.actions;

export const selectPending = (state: RootState) => state.dialog.pending;
export const selectSubmitted = (state: RootState) => state.dialog.submitted;
export const selectRejected = (state: RootState) => state.dialog.rejected;
export const selectConfirmed = (state: RootState) => state.dialog.confirmed;

export default dialogSlice.reducer;
