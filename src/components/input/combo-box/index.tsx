import React from 'react';
import { IonCheckbox } from '@ionic/react';
interface Props {
  checked: boolean;
  onSelect?: Function;
}
export default class InputComboBoxComponent extends React.Component<Props> {
  public static defaultProps = {
    checked: false,
    onSelect: (): any => {}
  };
  render(): React.ReactNode {
    const { checked } = this.props;
    const onSelect = this.props.onSelect!;
    return (
      <IonCheckbox
        className="checkbox-icon my-1"
        mode="md"
        checked={checked}
        onIonChange={(e: CustomEvent): void => onSelect(e)}
      />
    );
  }
}
