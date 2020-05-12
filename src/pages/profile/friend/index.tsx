import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent, withIonLifeCycle } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderProfile,
  Menu
} from '../../../components';
import { ApplicationState } from '../../../reducers';
import {
  Action,
  FriendInterface,
  GetFriendAPIInterface,
  MenuInterface
} from '../../../models';
import { updateSettingsProperty } from '../../../actions';
import { getFriendAPI } from '../../../actions/api/friendsActions';
import { addEndingToNumber } from '../../../utils';
import { RouteChildrenProps } from 'react-router';
import { Nullable } from '../../../types';

interface State {
  pending: boolean;
}

interface MatchParams {
  id: string;
}
interface StateProps {
  profileFriendTabs: MenuInterface[];
  activeProfileFriendTab: string;
  currentFriend?: Nullable<FriendInterface>;
}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getFriendAPI: (friendId: string) => Action<GetFriendAPIInterface>;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteChildrenProps<MatchParams> {}

class FriendProfilePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pending: false
    };
  }

  ionViewWillEnter(): void {
    this.props.getFriendAPI(this.props.match?.params.id || 'Amanda');
  }

  changeProfileFriendTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeProfileFriendTab) return;
    this.props.updateSettingsProperty('activeProfileFriendTab', event.id);
  };

  renderActiveTab(tabs: MenuInterface[], activeId, isFriend): React.ReactNode {
    const Tab = tabs.find((x): boolean => x.id === activeId)!.component;
    return <Tab isFriend={isFriend} />;
  }

  renderProfileFriend(): React.ReactNode {
    const { profileFriendTabs, activeProfileFriendTab } = this.props;
    return (
      <>
        <BackgroundImage
          gradient="180deg,#652ddd,#2c0d5c"
          backgroundImage={
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/profile/background-2.png'
          }
        />
        <div className={'profile-page'}>
          <HeaderProfile currentFriend={this.props.currentFriend} />
          <Menu
            tabs={profileFriendTabs}
            activeId={activeProfileFriendTab}
            onClick={this.changeProfileFriendTab}
          />
          {this.renderActiveTab(
            profileFriendTabs,
            activeProfileFriendTab,
            false
          )}
          ;
        </div>
      </>
    );
  }

  togglePendingState = (): void => {
    this.setState((prevState): State => ({ pending: !prevState.pending }));
  };

  renderNonFriendProfile(): React.ReactNode {
    const { currentFriend } = this.props;
    const { pending } = this.state;
    const name = currentFriend?.name || this.props.match?.params.id;
    const city = currentFriend?.city || '';
    const followers = currentFriend?.followers || 100;
    const background =
      currentFriend?.background ||
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/profile/background.png';
    return (
      <>
        <BackgroundImage
          gradient="180deg,#652ddd,#2c0d5c"
          backgroundTop={false}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.1}
          backgroundImage={background}
        >
          <div className={'fan-page-component'} id={'profile-page-non-friend'}>
            <Header />
            <div className="fan-page-component__ellipse">
              <div className="fan-page-component__ellipse--content">
                <h1>{name}</h1>
                <p>{city}</p>
                {!pending ? (
                  <button
                    className={'not-connected'}
                    onClick={this.togglePendingState}
                  >
                    <span>CONNECT</span>
                  </button>
                ) : (
                  <button
                    className={'pending'}
                    onClick={this.togglePendingState}
                  >
                    <span>PENDING</span>
                  </button>
                )}
                <p>
                  <span>{followers ? addEndingToNumber(followers) : '0'}</span>{' '}
                  Followers
                </p>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </>
    );
  }

  render(): React.ReactNode {
    return (
      <IonPage id="friend-profile-page">
        <IonContent id="friend-profile-page" scrollY={false}>
          {this.props.currentFriend?.friend
            ? this.renderProfileFriend()
            : this.renderNonFriendProfile()}
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({
  settings,
  friendAPI
}: ApplicationState): StateProps => {
  const { activeProfileFriendTab, profileFriendTabs } = settings;
  const { currentFriend } = friendAPI;
  return {
    activeProfileFriendTab,
    profileFriendTabs,
    currentFriend
  };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  getFriendAPI
})(withIonLifeCycle(FriendProfilePage));
