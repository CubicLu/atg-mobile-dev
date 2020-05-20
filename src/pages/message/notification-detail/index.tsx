import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { MenuInterface, NotificationInterface } from '../../../models';
import { Colors, ShapesSize } from '../../../types';
import { updateSettingsProperty, updateActionSheet } from './../../../actions';
import {
  BackgroundImage,
  Header,
  TrashIcon,
  Button,
  HeaderOverlay,
  ButtonIcon
} from '../../../components';
import { HistoryProps } from '../../../models/@commons/routeProps';
interface DispatchProps {
  updateSettingsProperty: (property, value) => void;
  updateActionSheet: (e) => void;
}
interface StateProps {
  readonly messageTabs: MenuInterface[];
  readonly activeMessageTab: string;
  readonly notificationsSearch: NotificationInterface[];
}
interface Props extends StateProps, DispatchProps, HistoryProps {
  readonly needAccept?: boolean;
}

class MessageNotificationDetailPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  public static defaultProps = {
    needAccept: false
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }
  renderNeedAccept(): React.ReactNode {
    return (
      <div className="row">
        <div className="col s12">
          <span className="text-16">
            You have been approved can’t wait to start chatting with you
          </span>
        </div>
      </div>
    );
  }

  renderContent(): React.ReactNode {
    return (
      <>
        <div className="row">
          <div className="col s12 images">
            <div
              className={'image'}
              style={{
                backgroundImage: 'url(https://loremflickr.com/200/200/music)'
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <span className="text-16">
              Dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>
        </div>
      </>
    );
  }
  confirmDelete(): void {
    this.props.updateActionSheet({
      title: 'Remove Notification',
      confirmButtons: true,
      cannotDismiss: true
    });
  }
  render(): React.ReactNode {
    let props: any = this.props.history.location.state || {};
    let labelButton = props.needAccept ? 'Start Chat' : 'Start';

    return (
      <IonPage id="message-notification-detail-page">
        <Header
          leftBackButton
          rightContent={
            <ButtonIcon
              icon={<TrashIcon />}
              color={Colors.transparent}
              onClick={(): void => this.confirmDelete()}
            />
          }
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <BackgroundImage default />
          <div className="message-notification-detail-page content-container">
            <div className="row">
              <div className="col s12">
                <p className="text-18">Tell us more about you</p>
              </div>
            </div>

            <div className="row">
              <div className="col s12 email-info">
                <div className={'circle-letter'}>
                  <span className="text">e</span>
                </div>
                <div className="ml-1 infos">
                  <span className="subject text-18">Email Name 1</span>
                  <span className="to text-16">To: You</span>
                </div>
              </div>
            </div>

            {props.needAccept ? this.renderNeedAccept() : this.renderContent()}

            <div className="row">
              <div className="col s12 flex-justify-content-center mt-7">
                <Button
                  className="start-chat"
                  label={labelButton}
                  gradient
                  color={Colors.primary}
                  type={ShapesSize.normal}
                  bold
                  onClick={(): void => this.props.history.push('/chat')}
                />
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  settings,
  profileAPI
}: ApplicationState): StateProps => {
  const { messageTabs, activeMessageTab } = settings;
  const { notificationsSearch } = profileAPI;
  return { messageTabs, activeMessageTab, notificationsSearch };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateActionSheet
})(MessageNotificationDetailPage);
