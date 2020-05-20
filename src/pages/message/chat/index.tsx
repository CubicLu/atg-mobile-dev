import React from 'react';
import { connect } from 'react-redux';
import {
  IonContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions
} from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { RowChat, ButtonIcon, CloseIcon } from '../../../components';
import { MenuInterface, MessageInterface } from '../../../models';
import { Colors, ShapesSize } from '../../../types';
import { updateSettingsProperty, updateActionSheet } from './../../../actions';
import { store } from '../../../store';

interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
}
interface StateProps {
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly messagesSearch: MessageInterface[];
}

interface Props extends StateProps, DispatchProps {}

class MessageChatPage extends React.Component<Props> {
  confirmDelete(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Remove Conversation',
        confirmButtons: true,
        cannotDismiss: true
      })
    );
  }
  render(): React.ReactNode {
    return (
      <IonContent className="message-chat-page">
        <IonList lines="none">
          {this.props.messagesSearch.map(
            (user, i): React.ReactNode => {
              return (
                <IonItemSliding key={i}>
                  <IonItem className="my-auto flex-align-items-center dark">
                    <RowChat
                      user={user}
                      avatarSize={48}
                      showDate={true}
                      colInfo={9}
                      colAvatar={3}
                      routerLink={`/chat/${i}`}
                    />
                  </IonItem>
                  <IonItemOptions side="end">
                    <ButtonIcon
                      className="no-padding"
                      icon={<CloseIcon strokeWidth={2} />}
                      color={Colors.red}
                      onClick={(): void => this.confirmDelete()}
                      type={ShapesSize.normal}
                    />
                  </IonItemOptions>
                </IonItemSliding>
              );
            }
          )}
          <IonItem />
          <IonItem />
          <IonItem />
        </IonList>
      </IonContent>
    );
  }
}

const mapStateToProps = ({
  settings,
  profileAPI
}: ApplicationState): StateProps => {
  const { messageTabs, activeMessageTab } = settings;
  const { messagesSearch } = profileAPI;
  return { messageTabs, activeMessageTab, messagesSearch };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(MessageChatPage);
