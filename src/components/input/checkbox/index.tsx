import React from 'react';
import { IonCheckbox } from '@ionic/react';
interface Props {
  color?: string;
  action?: any;
  checked?: boolean;
  indeterminate?: boolean;
}

class InputCheckboxComponent extends React.Component<Props> {
  public static defaultProps = {
    color: 'primary',
    checked: false,
    indeterminate: false
  };

  render(): React.ReactNode {
    const { color, action, checked, indeterminate } = this.props;
    return (
      <IonCheckbox
        slot="end"
        color={color}
        onClick={action}
        mode={'md'}
        className={'checkbox-outline'}
        checked={checked}
        indeterminate={indeterminate}
      />
    );
  }
}

export default InputCheckboxComponent;
