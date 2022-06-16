import PendingDialog from "./PendingDialog";
import RejectedDialog from "./RejectedDialog";
import SubmittedDialog from "./SubmittedDialog";

export function Dialog() {
  return (
    <>
      <PendingDialog />
      <SubmittedDialog />
      <RejectedDialog />
    </>
  )
}
