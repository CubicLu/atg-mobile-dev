import React from 'react';
interface Props {
  checked: boolean;
  onSelect?: Function;
}
class InputComboBoxComponent extends React.Component<Props> {
  public static defaultProps = {
    checked: false,
    onSelect: (): void => {}
  };

  render(): React.ReactNode {
    const { checked, onSelect, ...rest } = this.props;
    return (
      <input
        {...rest}
        type="checkbox"
        className="filled-in"
        checked={checked}
        onClick={(event): void => {
          if (onSelect) {
            onSelect(event);
          }
        }}
      />
    );
  }
}

export default InputComboBoxComponent;
