import React from 'react';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';
interface Props {
  label?: string;
  action?: any;
  clickable: boolean;
}
class InputChipComponent extends React.Component<Props> {
  public static defaultProps = {
    clickable: false
  };
  render(): React.ReactNode {
    const { label, action, clickable } = this.props;
    return (
      <IonChip outline className={'chip mt-2'}>
        {!clickable ? (
          <>
            <IonLabel>{label}</IonLabel>
            <IonIcon
              name="close-circle"
              className={'close-button'}
              onClick={action}
            />
          </>
        ) : (
          <IonLabel onClick={action}>{label}</IonLabel>
        )}
      </IonChip>
    );
  }
}

export default InputChipComponent;
