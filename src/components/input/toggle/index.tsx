import React from 'react';
import { IonToggle } from '@ionic/react';
interface Props {
  action?: any;
}
class InputToggleComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { action } = this.props;
    return (
      <IonToggle
        checked={true}
        onIonChange={action}
        slot="start"
        color={'secondary'}
        mode={'ios'}
      />
    );
  }
}

export default InputToggleComponent;
