import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions
} from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { RowChat, ButtonIcon, CloseIcon } from '../../../components';
import {
  MenuInterface,
  Colors,
  ShapesSize,
  MessageInterface
} from '../../../interfaces';
import { updateSettingsProperty } from './../../../actions';

interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
}
interface StateProps {
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly messagesSearch: MessageInterface[];
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class MessageChatPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="message-chat-page">
        <IonList lines="none">
          {this.props.messagesSearch.map(
            (data, i): React.ReactNode => {
              return (
                <IonItemSliding key={i}>
                  <IonItem className="my-auto flex-align-items-center dark">
                    <RowChat
                      data={data}
                      avatarSize={48}
                      showDate={true}
                      colInfo={9}
                      colAvatar={3}
                    />
                  </IonItem>
                  <IonItemOptions side="end">
                    <ButtonIcon
                      className="no-padding"
                      icon={<CloseIcon strokeWidth={2} />}
                      color={Colors.red}
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

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(MessageChatPage)
);
