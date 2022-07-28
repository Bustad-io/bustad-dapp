import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type PendingTransaction = {
  txHash: string;
  type: string;
}

export interface DialogState {
  pendingTransactionList: PendingTransaction[];
  awaitingConfirmation: {
    show: boolean,
    text: string
  },
  submitted: {
    show: boolean,
    txHash: string,
    showAddBustadToWalletButton: boolean,
    showAddGovToWalletButton: boolean,
  },
  rejected: {
    show: boolean
  },
  confirmed: {
    show: boolean
  }
}

const initialState: DialogState = {
  pendingTransactionList: [],
  awaitingConfirmation: {
    show: false,
    text: ''
  },
  submitted: {
    show: false,
    txHash: '',
    showAddBustadToWalletButton: false,
    showAddGovToWalletButton: false,
  },
  rejected: {
    show: false
  },
  confirmed: {
    show: false
  }
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addPendingTransaction: (state, action) => {
      state.pendingTransactionList.push({txHash: action.payload.txHash, type: action.payload.type});
    },
    removePendingTransaction: (state, action) => {
      state.pendingTransactionList = state.pendingTransactionList.filter((transaction) => transaction.txHash !== action.payload);
    },    
    showAwaitingModal: (state, action) => {
      state.awaitingConfirmation.show = true;
      state.awaitingConfirmation.text = action.payload;
    },
    hideAwaitingModal: (state) => {
      state.awaitingConfirmation.show = false;
      state.awaitingConfirmation.text = '';
    },
    showSubmittedModal: (state, action) => {
      state.submitted.show = true;
      state.submitted.txHash = action.payload.txHash;
      state.submitted.showAddBustadToWalletButton = action.payload.showAddBustadToWalletButton ?? false
      state.submitted.showAddGovToWalletButton = action.payload.showAddGovToWalletButton ?? false
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

export const { showAwaitingModal, hideAwaitingModal, showSubmittedModal, hideSubmittedModal, showRejectedModal, hideRejectedModal, showConfirmedModal, hideConfirmedModal, addPendingTransaction, removePendingTransaction } = dialogSlice.actions;

export const selectAwaitingConfirmation = (state: RootState) => state.dialog.awaitingConfirmation;
export const selectSubmitted = (state: RootState) => state.dialog.submitted;
export const selectSubmittedShowAddBustadToWalletButton = (state: RootState) => state.dialog.submitted.showAddBustadToWalletButton;
export const selectSubmittedShowAddGovToWalletButton = (state: RootState) => state.dialog.submitted.showAddGovToWalletButton;
export const selectRejected = (state: RootState) => state.dialog.rejected;
export const selectConfirmed = (state: RootState) => state.dialog.confirmed;
export const selectPendingTransactionList = (state: RootState) => state.dialog.pendingTransactionList;

export default dialogSlice.reducer;
