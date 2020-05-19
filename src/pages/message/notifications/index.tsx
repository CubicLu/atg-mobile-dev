import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonList, IonItem } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { MenuInterface, NotificationInterface } from '../../../models';
import { updateSettingsProperty } from './../../../actions';
import moment from 'moment';
import { RouteComponentProps, withRouter } from 'react-router';
interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
}
interface StateProps {
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly notificationsSearch: NotificationInterface[];
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class MessageNotificationsPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="message-notifications-page" scrollY={true}>
        <IonList lines="none">
          {this.props.notificationsSearch.map(
            (data, i): React.ReactNode => {
              let needAccept = i % 2 === 0;
              return (
                <IonItem
                  key={i}
                  style={{ maxHeight: 84, height: 84 }}
                  onClick={(): void =>
                    this.props.history.push(`/message/notification/${i}`, {
                      needAccept: needAccept
                    })
                  }
                >
                  <div className={`row w-100 ${data.read ? '' : 'not-read'}`}>
                    <div className={'col s12 info'}>
                      <span
                        className="f5 bold"
                        data-date={moment(data.sendAt).format('MM/DD/YY')}
                      >
                        {data.username}
                      </span>
                      <span className="f6">
                        {data.subject}
                        <br />
                        {data.message}
                      </span>
                    </div>
                  </div>
                </IonItem>
              );
            }
          )}
          <IonItem />
          <IonItem />
        </IonList>
      </IonContent>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({
  settings,
  profileAPI
}: ApplicationState): StateProps => {
  const { messageTabs, activeMessageTab } = settings;
  const { notificationsSearch } = profileAPI;
  return { messageTabs, activeMessageTab, notificationsSearch };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty
  })(MessageNotificationsPage)
);
