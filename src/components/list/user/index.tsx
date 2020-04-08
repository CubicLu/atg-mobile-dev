import React from 'react';
import { RowUser, ButtonIcon, CloseIcon } from './../../../components';
import { IonList, IonItemSliding, IonItem, IonItemOptions } from '@ionic/react';
import { Colors, ShapesSize, UserInterface } from '../../../interfaces';

interface Props {
  data?: UserInterface[];
  showRemove?: boolean;
  checkSelected?: Function;
  onSelect?: Function;
  showChat?: boolean;
  showComboBox?: boolean;
  showButtonConnect?: boolean;
  showButtonPending?: boolean;
  selected?: boolean;
}

export default class ListComponent extends React.Component<Props> {
  public static defaultProps = {
    showRemove: false,
    onSelect: (): void => {},
    checkSelected: (): void => {},
    showChat: false,
    showComboBox: false,
    showButtonConnect: false,
    showButtonPending: false,
    selected: false
  };

  checkSelected(data): boolean {
    if (this.props.checkSelected) {
      let check = this.props.checkSelected(data);
      return check;
    }

    return false;
  }
  render(): React.ReactNode {
    const {
      data,
      showButtonPending,
      showComboBox,
      showChat,
      showButtonConnect,
      ...rest
    } = this.props;
    if (!data) return <div />;
    return (
      <IonList lines="none" className="list user">
        {data.map(
          (data, i): React.ReactNode => {
            let selected = this.checkSelected(data);
            return (
              <IonItemSliding className="mt-1 mb-1" key={i}>
                <IonItem className="flex-align-items-center">
                  <RowUser
                    {...rest}
                    data={data}
                    key={i}
                    selected={selected}
                    showButtonConnect={showButtonConnect}
                    showButtonPending={showButtonPending}
                    showChat={showChat}
                    showComboBox={showComboBox}
                  />
                </IonItem>
                <IonItemOptions side="end">
                  {this.props.showRemove && (
                    <ButtonIcon
                      icon={
                        <CloseIcon width={15} height={15} strokeWidth={2} />
                      }
                      color={Colors.red}
                      type={ShapesSize.normal}
                    />
                  )}
                </IonItemOptions>
              </IonItemSliding>
            );
          }
        )}
      </IonList>
    );
  }
}
