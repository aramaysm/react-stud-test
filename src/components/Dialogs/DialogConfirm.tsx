import { Button } from "../Button";

interface DialogProps {
  title: string;
  content: string;
  openDialog: boolean;
  closeDialog: () => void;
  saveInfo: (data: any) => void;
  color: string;
}

export const DialogConfirm: React.FC<DialogProps> = ({
  openDialog,
  closeDialog,
  saveInfo,
  title,
  content,
  color,
}: DialogProps) => {
  return openDialog ? (
    <div className="dialog-alert ">
      <div id="header-dialog" className={"row w-full bg-"+color}>
        <h4 className="ms-1 color-white">{title}</h4>
      </div>
      <div className="column items-center gap-2">
        <div>
            <h5>{content}</h5>
        </div>
        <div className="row gap-1 just-around">
            <Button label={"Cancel"} onClick={closeDialog} color={'secondary'} />
            <Button label={"Confirm"} onClick={()=>saveInfo(true)} color={'warning'} />
        </div>
      </div>
    </div>
  ) : null;
};
