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
import { ChatRow, ButtonIcon, CloseIcon } from '../../../components';
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
                <IonItemSliding key={i} className="mt-1 mb-1">
                  <IonItem className="flex-align-items-center">
                    <ChatRow
                      data={data}
                      avatarSize={48}
                      showDate={true}
                      colInfo={9}
                      colAvatar={3}
                    />
                  </IonItem>
                  <IonItemOptions side="end">
                    <ButtonIcon
                      icon={
                        <CloseIcon width={15} height={15} strokeWidth={2} />
                      }
                      color={Colors.red}
                      type={ShapesSize.normal}
                    />
                  </IonItemOptions>
                </IonItemSliding>
              );
            }
          )}
        </IonList>
      </IonContent>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ settings, profileAPI }: ApplicationState): StateProps => {
  const { messageTabs, activeMessageTab } = settings;
  const { messagesSearch } = profileAPI;
  return { messageTabs, activeMessageTab, messagesSearch };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(MessageChatPage)
);
