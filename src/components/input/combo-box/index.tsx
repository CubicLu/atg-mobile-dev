import React from 'react';
import { IonCheckbox } from '@ionic/react';
interface Props {
  checked: boolean;
  onSelect?: Function;
  format: 'square' | 'rounded';
}
export default class InputComboBoxComponent extends React.Component<Props> {
  public static defaultProps = {
    format: 'square',
    checked: false,
    onSelect: (): any => {}
  };
  render(): React.ReactNode {
    const { checked } = this.props;
    const onSelect = this.props.onSelect!;
    const className = `my-1 checkbox-icon ${this.props.format} `;
    const mode = this.props.format === 'square' ? 'md' : 'ios';
    return (
      <IonCheckbox
        className={className}
        mode={mode}
        checked={checked}
        onIonChange={(e: CustomEvent): void => onSelect(e)}
      />
    );
  }
}
