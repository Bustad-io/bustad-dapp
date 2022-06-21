import PendingDialog from "./PendingDialog";
import RejectedDialog from "./RejectedDialog";
import SubmittedDialog from "./SubmittedDialog";
import ConfirmationDialog from './ConfirmationDialog';

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
