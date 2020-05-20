export interface ActionSheetInterface {
  readonly title?: string;
  readonly description?: string;
  readonly confirmButtons?: boolean;
  readonly shareOption?: boolean;
  readonly onCancel?: Function;
  readonly onConfirm?: Function;
  readonly content?: React.ReactNode;
  readonly className?: string;
}
