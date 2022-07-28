import PendingDialog from "./AwaitingConfirmationDialog";
import RejectedDialog from "./RejectedDialog";
import SubmittedDialog from "./SubmittedDialog";
import ConfirmationDialog from './ConfirmationDialog';
import { useAppSelector } from "../../app/hooks";
import { selectPendingTransactionList } from "./dialogSlice";
import PendingStatus from "./PendingStatus";

export function Dialog() {
  return (
    <>
      <PendingDialog />
      <SubmittedDialog />
      <RejectedDialog />
      <ConfirmationDialog />
    </>
  )
}

export function PendingTransactionList() {
  const transactionList = useAppSelector(selectPendingTransactionList);
  return (
  <>
    {transactionList.map((transaction) => 
    <div className="mb-2" key={transaction.txHash}>
      <PendingStatus txHash={transaction.txHash} type={transaction.type}/>
    </div>
    )}
  </>
  );
}
