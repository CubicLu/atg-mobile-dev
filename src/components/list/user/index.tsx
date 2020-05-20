import React from 'react';
import { RowUser, ButtonIcon, CloseIcon } from './../../../components';
import { IonList, IonItemSliding, IonItem, IonItemOptions } from '@ionic/react';
import { Colors, ShapesSize } from '../../../types';
import { UserInterface } from './../../../models';
import { store } from '../../../store';
import { updateActionSheet } from '../../../actions';

interface Props {
  users: UserInterface[];
  showRemove?: boolean;
  sliding: boolean;
  checkSelected?: Function;
  onSelect?: Function;
  showChat?: boolean;
  showComboBox?: boolean;
  selectAll?: boolean;
  showButtonConnect?: boolean;
  showButtonPending?: boolean;
  selected?: number[];
  itemClassName?: string;
}

export default class ListComponent extends React.Component<Props> {
  public static defaultProps = {
    onSelect: (): void => {},
    checkSelected: (): void => {},
    users: [],
    showRemove: false,
    sliding: true,
    showChat: false,
    showComboBox: false,
    showButtonConnect: false,
    showButtonPending: false
  };

  confirmDelete(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Remove Item',
        confirmButtons: true,
        cannotDismiss: true
      })
    );
  }

  ionSlide(item: React.ReactNode): React.ReactNode {
    return (
      <IonItemSliding>
        {item}
        <IonItemOptions side="end">
          {this.props.showRemove && (
            <ButtonIcon
              onClick={(): void => this.confirmDelete()}
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
  ionItem(user: UserInterface): React.ReactNode {
    const {
      showButtonPending,
      showComboBox,
      showChat,
      showButtonConnect,
      itemClassName,
      selected,
      ...rest
    } = this.props;
    const itemClass = itemClassName ? itemClassName : '';
    let checked = selected?.findIndex((x): boolean => x === user.id) !== -1;
    return (
      <IonItem className={`my-auto flex-align-items-center ${itemClass}`}>
        <RowUser
          {...rest}
          user={user}
          selected={checked}
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
      {this.props.users?.map(
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
