import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderProfile,
  Menu
} from './../../components';
import { ApplicationState } from '../../reducers';
import { FriendInterface, MenuInterface } from '../../interfaces';
import { updateSettingsProperty } from '../../actions';
import { withRouter, RouteComponentProps } from 'react-router';
import { getFriendAPI } from '../../actions/api/friendsActions';
import { addEndingToNumber } from '../../utils';

interface State {
  pending: boolean;
}

interface MatchParams {
  id: string;
}
interface StateProps {
  fanTabs: MenuInterface[];
  activeFanTab: string;
  profileFriendTabs: MenuInterface[];
  activeProfileFriendTab: string;
  friends: FriendInterface[];
  currentFriend: FriendInterface | null;
}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getFriendAPI: (friendId: string) => void;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ProfilePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pending: false
    };
  }

  componentDidUpdate(): void {
    const {
      currentFriend,
      getFriendAPI,
      match: {
        params: { id }
      }
    } = this.props;
    if (!currentFriend && id) {
      getFriendAPI(id);
    }
    if (id && currentFriend && currentFriend.name !== id) {
      getFriendAPI(id);
    }
  }

  changeFanTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeFanTab) return;
    this.props.updateSettingsProperty('activeFanTab', event.id);
  };

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
          <HeaderProfile isFriend />
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

  getCurrentFanIsFriend = (): boolean => {
    const id = this.props.match.params.id;
    return !!this.props.friends.find((f): boolean => f.name === id)?.friend;
  };

  togglePendingState = (): void => {
    this.setState((prevState): State => ({ pending: !prevState.pending }));
  };

  renderNonFriendProfile(): React.ReactNode {
    const { history, currentFriend } = this.props;
    const { pending } = this.state;
    const { name, city, followers } = currentFriend || {};
    return (
      <>
        <BackgroundImage
          gradient="180deg,#652ddd,#2c0d5c"
          backgroundTop={false}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.2}
          backgroundImage={
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/profile/background.png'
          }
        >
          <div className={'fan-page-component'} id={'profile-page-non-friend'}>
            <Header
              rightActionOnClick={(): void => {
                if (history.length > 0) {
                  this.props.history.goBack();
                }
              }}
            />
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

  renderMyProfile(): React.ReactNode {
    const { fanTabs, activeFanTab } = this.props;
    return (
      <>
        <BackgroundImage default={true} />
        <div className={'profile-page'}>
          <HeaderProfile />
          <Menu
            tabs={fanTabs}
            activeId={activeFanTab}
            onClick={this.changeFanTab}
          />
          {this.renderActiveTab(fanTabs, activeFanTab, true)};
        </div>
      </>
    );
  }

  render(): React.ReactNode {
    const { match } = this.props;
    const id = match.params.id;
    return (
      <IonPage id="profile-page">
        <IonContent id="profile-page" scrollY={false}>
          {id
            ? this.getCurrentFanIsFriend()
              ? this.renderProfileFriend()
              : this.renderNonFriendProfile()
            : this.renderMyProfile()}
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({
  settings,
  friendAPI
}: ApplicationState): StateProps => {
  const {
    fanTabs,
    activeFanTab,
    activeProfileFriendTab,
    profileFriendTabs
  } = settings;
  const { friends, currentFriend } = friendAPI;
  return {
    fanTabs,
    activeFanTab,
    activeProfileFriendTab,
    profileFriendTabs,
    friends,
    currentFriend
  };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty,
    getFriendAPI
  })(ProfilePage)
);
