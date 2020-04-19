import React from 'react';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';
interface Props {
  label?: string;
  action?: any;
}
class InputChipComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { label, action } = this.props;
    return (
      <IonChip outline className={'chip mt-2'}>
        <IonLabel>{label}</IonLabel>
        <IonIcon
          name="close-circle"
          className={'close-button'}
          onClick={(): void => action}
        />
      </IonChip>
    );
  }
}

export default InputChipComponent;
