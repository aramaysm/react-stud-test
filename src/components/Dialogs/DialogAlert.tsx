import { Button } from "../Button";

interface DialogProps {
  title: string;
  content: string;
  openDialog: boolean;
  closeDialog: () => void;
  color: string;
}

export const DialogAlert: React.FC<DialogProps> = ({
  openDialog,
  closeDialog,
  title,
  content,
  color,
}: DialogProps) => {
  return openDialog ? (
    <div className="dialog-alert ">
      <div id={"header-dialog"} className={"row w-full bg-"+color}>
        <h4 className="ms-1 color-white">{title}</h4>
      </div>
      <div className="column items-center gap-2">
        <div className="mt-2 mb-2">
            <h5>{content}</h5>
        </div>
        <div className="row just-center">
            <Button label={"Close"} onClick={closeDialog} color={color} />
        </div>
      </div>
    </div>
  ) : null;
};
