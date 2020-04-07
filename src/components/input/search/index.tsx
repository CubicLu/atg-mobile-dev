import React from 'react';
import { IonSearchbar } from '@ionic/react';
interface Props {
  readonly onChange: Function;
  readonly placeholder: string;
  readonly debounce: number;
  readonly value: string;
}
class InputSearchComponent extends React.Component<Props> {
  public static defaultProps = {
    onChange: (): void => {}
  };

  render(): React.ReactNode {
    const { debounce, placeholder, onChange, value } = this.props;
    return (
      <IonSearchbar
        className="input-search atg-search px-4"
        mode="ios"
        placeholder={placeholder}
        clearIcon="close-sharp"
        debounce={debounce}
        searchIcon="search-sharp"
        value={value}
        onIonChange={(e): void => onChange(e)}
      />
    );
  }
}

export default InputSearchComponent;
