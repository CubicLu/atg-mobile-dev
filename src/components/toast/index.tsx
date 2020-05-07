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
  clickId: string;
}

class ToastComponent extends React.Component<Props> {
  public static defaultProps = {
    duration: 3000,
    showToast: true
  };

  setClickHandler = (): void => {
    const { clickId, clickHandler } = this.props;
    const superUltraRoot = document.querySelector('ion-toast')?.shadowRoot;
    if (superUltraRoot) {
      const el = superUltraRoot.getElementById(clickId);
      if (el) {
        el.addEventListener('click', clickHandler);
      }
    }
  };

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

export default ToastComponent;
