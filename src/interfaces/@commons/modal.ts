import { ModalType } from '../../types';

export interface ModalSlideInterface {
  modalType?: ModalType;
  content: React.ReactNode;
  className?: string;
  height?: number;
  onClick?: Function;
  onClose?: Function;
  onClosing?: Function;
  onOpen?: Function;
}

export interface ModalTypeInterface {
  modalType: string | null;
}
