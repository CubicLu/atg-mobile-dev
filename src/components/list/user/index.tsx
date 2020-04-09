import React from 'react';
import { RowUser, ButtonIcon, CloseIcon } from './../../../components';
import { IonList, IonItemSliding, IonItem, IonItemOptions } from '@ionic/react';
import { Colors, ShapesSize, UserInterface } from '../../../interfaces';

interface Props {
  data?: UserInterface[];
  showRemove?: boolean;
  sliding: boolean;
  checkSelected?: Function;
  onSelect?: Function;
  showChat?: boolean;
  showComboBox?: boolean;
  selectAll?: boolean;
  showButtonConnect?: boolean;
  showButtonPending?: boolean;
  selected?: boolean;
  itemClassName?: string;
}

export default class ListComponent extends React.Component<Props> {
  public static defaultProps = {
    onSelect: (): void => {},
    checkSelected: (): void => {},
    showRemove: false,
    sliding: true,
    showChat: false,
    showComboBox: false,
    showButtonConnect: false,
    showButtonPending: false
  };

  ionSlide(item: React.ReactNode): React.ReactNode {
    return (
      <IonItemSliding>
        {item}
        <IonItemOptions side="end">
          {this.props.showRemove && (
            <ButtonIcon
              icon={<CloseIcon strokeWidth={2} />}
              className="no-padding"
              color={Colors.red}
              type={ShapesSize.normal}
            />
          )}
        </IonItemOptions>
      </IonItemSliding>
    );
  }
  ionItem(user): React.ReactElement {
    const {
      showButtonPending,
      showComboBox,
      showChat,
      showButtonConnect,
      itemClassName,
      ...rest
    } = this.props;
    const itemClass = itemClassName ? itemClassName : '';
    return (
      <IonItem className={`my-auto flex-align-items-center ${itemClass}`}>
        <RowUser
          {...rest}
          data={user}
          selected={this.props.selected || this.checkSelected(user)}
          onSelect={this.props.onSelect}
          showButtonConnect={showButtonConnect}
          showButtonPending={showButtonPending}
          showChat={showChat}
          showComboBox={showComboBox}
        />
      </IonItem>
    );
  }
  checkSelected(data): boolean {
    if (this.props.selectAll !== undefined && this.props.selectAll === true) {
      return true;
    }
    if (this.props.selectAll !== undefined && this.props.selectAll === false) {
      return false;
    }
    return this.props.checkSelected ? this.props.checkSelected(data) : false;
  }
  render = (): React.ReactNode => (
    <IonList lines="none" className="list user">
      {this.props.data?.map(
        (user, i): React.ReactNode => (
          <React.Fragment key={i}>
            {this.props.sliding
              ? this.ionSlide(this.ionItem(user))
              : this.ionItem(user)}
          </React.Fragment>
        )
      )}
    </IonList>
  );
}
