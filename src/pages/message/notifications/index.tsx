import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonList, IonItem } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { ChatRow } from '../../../components';
import { MenuInterface, NotificationInterface } from '../../../interfaces';
import { updateSettingsProperty } from './../../../actions';

interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
}
interface StateProps {
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly notificationsSearch: NotificationInterface[];
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class MessageNotificationsPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="message-notifications-page">
        <IonList lines="none">
          {this.props.notificationsSearch.map(
            (data, i): React.ReactNode => {
              return (
                <IonItem key={i}>
                  <ChatRow data={data} avatarSize={48} showAvatar={false} />
                </IonItem>
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
  const { notificationsSearch } = profileAPI;
  return { messageTabs, activeMessageTab, notificationsSearch };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(MessageNotificationsPage)
);
