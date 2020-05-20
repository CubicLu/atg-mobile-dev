import { ModalType, Nullable } from '../../types';

export interface ModalSlideInterface {
  readonly modalType?: ModalType;
  readonly content: React.ReactNode;
  readonly className?: string;
  readonly height?: number;
  readonly onClick?: Function;
  readonly onClose?: Function;
  readonly onClosing?: Function;
  readonly onOpen?: Function;
  readonly wrapperClassName?: Nullable<string>;
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
  readonly wrapperClassName?: string;
}

export interface UpdateModalWrapperClassName {
  readonly wrapperClassName: string;
}
