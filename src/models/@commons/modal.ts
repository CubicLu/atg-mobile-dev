import { ModalType } from '../../types';

export interface ModalSlideInterface {
  readonly modalType?: ModalType;
  readonly content: React.ReactNode;
  readonly className?: string;
  readonly height?: number;
  readonly onClick?: Function;
  readonly onClose?: Function;
  readonly onClosing?: Function;
  readonly onOpen?: Function;
}

export interface ModalTypeInterface {
  readonly modalType: string | null;
}

export interface GenericModalInterface {
  readonly name: string;
  readonly url?: string;
}

export interface UpdateModalInterface {
  readonly content: React.ReactNode;
  readonly className?: string;
  readonly height?: number;
  readonly onClick?: Function;
}
