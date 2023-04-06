import { ReactNode } from "react";

import "./modal.css";

type ModalProps = {
  children: ReactNode;
};
const Modal = ({ children }: ModalProps) => {
  return (
    <div className="modal-background">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
