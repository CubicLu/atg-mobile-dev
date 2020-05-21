import React from 'react';
import { IonToast, ToastButton } from '@ionic/react';

interface Props {
  showToast: boolean;
  hideToast: () => void;
  clickHandler: (e) => void;
  message: string;
  buttons?: (string | ToastButton)[] | undefined;
  duration?: number;
  classNames?: string | string[];
}

export default class ToastComponent extends React.Component<Props> {
  public static defaultProps = {
    duration: 3000,
    showToast: true,
    message: 'Added to your <span id="vault-toast-link">VAULT</span>'
  };

  setClickHandler = (): void => {
    const el = this.toastRef.current?.shadowRoot?.getElementById(
      'vault-toast-link'
    );
    if (!el) return;
    el.style.textDecoration = 'underline';
    el.style.color = '#0000EE';
    el.onclick = this.props.clickHandler;
  };

  toastRef: React.RefObject<HTMLIonToastElement> = React.createRef();

  render(): React.ReactNode {
    const {
      message,
      showToast,
      duration,
      buttons,
      hideToast,
      classNames
    } = this.props;

    return (
      <IonToast
        ref={this.toastRef}
        isOpen={showToast}
        onDidPresent={this.setClickHandler}
        onDidDismiss={hideToast}
        message={message}
        duration={duration}
        buttons={buttons}
        cssClass={classNames}
      />
    );
  }
}
