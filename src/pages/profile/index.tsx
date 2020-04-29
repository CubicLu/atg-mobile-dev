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
import {
  Action,
  FriendInterface,
  GetFriendAPIInterface,
  MenuInterface
} from '../../interfaces';
import { updateSettingsProperty } from '../../actions';
import { withRouter, RouteComponentProps } from 'react-router';
import { getFriendAPI, getFriendsAPI } from '../../actions/api/friendsActions';
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
  getFriendsAPI: () => Action<void>;
  getFriendAPI: (friendId: string) => Action<GetFriendAPIInterface>;
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
  componentDidMount(): void {
    this.props.getFriendsAPI();
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

  renderActiveTab(): React.ReactNode {
    const {
      fanTabs,
      activeFanTab,
      profileFriendTabs,
      activeProfileFriendTab,
      match
    } = this.props;

    if (match.params.id !== undefined) {
      const tab = profileFriendTabs.find(
        (x): boolean => x.id === activeProfileFriendTab
      )!;
      return React.createElement(tab.component, {
        key: tab.id,
        isFriend: true
      });
    } else {
      const tab = fanTabs.find((x): boolean => x.id === activeFanTab)!;
      return React.createElement(tab.component, {
        key: tab.id,
        isFriend: false
      });
    }
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
          {this.renderActiveTab()};
        </div>
      </>
    );
  }

  getCurrentFanIsFriend = (id: string): boolean => {
    const friend = this.props.friends.find((item): boolean => item.name === id);
    return friend ? friend.friend : false;
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
          {this.renderActiveTab()};
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
            ? this.getCurrentFanIsFriend(id)
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
    getFriendsAPI,
    getFriendAPI
  })(ProfilePage)
);
