import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../reducers';
import {
  Header,
  BackgroundImage,
  InputSearch,
  MenuMessage,
  ButtonIcon
} from '../../components';
import {
  MenuInterface,
  MessageInterface,
  NotificationInterface
} from '../../interfaces';
import { ShapesSize, Colors } from '../../types';
import { updateSettingsProperty, updateProfileProperty } from './../../actions';
import PlusIcon from '../../components/icon/plus';

interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
  updateProfileProperty: (property, value) => void;
}
interface StateProps {
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly messages: MessageInterface[];
  readonly notifications: NotificationInterface[];
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class MessagePage extends React.Component<Props> {
  onSearchOnNotificationsAndChat(e): void {
    let value = String(e.detail.value).toLocaleLowerCase();
    let searchNotifications = this.props.notifications.filter(
      (data): boolean => {
        return data.username.includes(value);
      }
    );
    let searchChat = this.props.messages.filter((data): boolean => {
      return data.username.includes(value);
    });

    this.props.updateProfileProperty('messagesSearch', searchChat);
    this.props.updateProfileProperty(
      'notificationsSearch',
      searchNotifications
    );
  }

  render(): React.ReactNode {
    const {
      messageTabs,
      activeMessageTab,
      updateSettingsProperty
    } = this.props;

    return (
      <IonPage id="message-page">
        <Header
          title="Messages"
          leftBackHref={'/profile'}
          rightContent={
            activeMessageTab === 'chat' ? (
              <ButtonIcon
                styles={{ width: 30, height: 30 }}
                type={ShapesSize.circle}
                color={Colors.tertiary}
                icon={<PlusIcon color={'#000'} width={20} height={20} />}
                onClick={(): void => {
                  this.props.history.push('/message/select-contact');
                }}
              />
            ) : null
          }
        />
        <IonContent className="mb-50" scrollY={false}>
          <BackgroundImage default />
          <div className="message-page content-fixed" slot="fixed">
            <div className="m-3">
              <InputSearch
                onChange={(e): void => {
                  this.onSearchOnNotificationsAndChat(e);
                }}
                value={''}
                placeholder="Search"
                debounce={150}
              />
            </div>
            <div className="row">
              <div className="fluid">
                <MenuMessage
                  onClick={(data): void => {
                    updateSettingsProperty('activeMessageTab', data.id);
                  }}
                  className=""
                  activeId={activeMessageTab}
                  tabs={messageTabs}
                  hasMessages={false}
                  hasNotifications={true}
                />
              </div>
            </div>

            {messageTabs?.map(
              (data, i): React.ReactNode =>
                data.id === activeMessageTab &&
                React.createElement(data.component, { key: i })
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({
  settings,
  profileAPI
}: ApplicationState): StateProps => {
  const { messageTabs, activeMessageTab } = settings;
  const { messages, notifications } = profileAPI;
  return { messageTabs, activeMessageTab, messages, notifications };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty,
    updateProfileProperty
  })(MessagePage)
);
