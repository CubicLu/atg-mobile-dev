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
  activeBioFriendTab: string;
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

class FriendProfilePage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = { pending: false };
  }

  ionViewWillEnter(): void {
    this.props.getFriendAPI(this.props.match!.params.id);
  }

  changeFriendTab = (event: MenuInterface): void => {
    if (event.id === this.props.activeBioFriendTab) return;
    this.props.updateSettingsProperty('activeBioFriendTab', event.id);
  };

  friendBackground =
    'https://frontend-mocks.s3-us-west-1.amazonaws.com/profile/background-2.png';
  nonFrdbackground =
    'https://frontend-mocks.s3-us-west-1.amazonaws.com/profile/background.png';

  renderProfileFriend(): React.ReactNode {
    const tabs = this.props.profileFriendTabs;
    const active = this.props.activeBioFriendTab;
    const Tab = tabs.find((x): boolean => x.id === active)!.component;

    return (
      <React.Fragment>
        <BackgroundImage
          gradient="180deg,#652ddd99,#2c0d5c99"
          gradientOverlay={true}
          backgroundImage={this.props.currentFriend?.background}
        />
        <div className={'profile-page'}>
          <HeaderProfile currentFriend={this.props.currentFriend} />
          <Menu tabs={tabs} activeId={active} onClick={this.changeFriendTab} />
          {<Tab />}
        </div>
      </React.Fragment>
    );
  }

  togglePendingState = (): void => {
    this.setState((prevState): State => ({ pending: !prevState.pending }));
  };

  renderNonFriendProfile(): React.ReactNode {
    return (
      <>
        <BackgroundImage
          gradient="180deg,#652ddd,#2c0d5c"
          backgroundTop={false}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.1}
          backgroundImage={this.props.currentFriend?.background}
        />
        <div className={'fan-page-component'} id={'profile-page-non-friend'}>
          <Header />
          <div className="fan-page-component__ellipse">
            <div className="fan-page-component__ellipse--content">
              <h1>{this.props.currentFriend?.name}</h1>
              <p>{this.props.currentFriend?.city}</p>

              {!this.state.pending ? (
                <button
                  className={'not-connected'}
                  onClick={this.togglePendingState}
                >
                  <span>CONNECT</span>
                </button>
              ) : (
                <button className={'pending'} onClick={this.togglePendingState}>
                  <span>PENDING</span>
                </button>
              )}
              <p>
                <span>
                  {addEndingToNumber(this.props.currentFriend?.followers || 0)}
                </span>{' '}
                Followers
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  render(): React.ReactNode {
    return (
      <IonPage id="friend-profile-page">
        <IonContent id="friend-profile-page" scrollY={false}>
          {!this.props.currentFriend && (
            <BackgroundImage
              gradient="180deg,#652ddd,#2c0d5c"
              backgroundTop={false}
              backgroundBottom
              backgroundBottomDark={false}
              backgroundBottomOpacity={0.1}
              backgroundImage={this.nonFrdbackground}
            />
          )}
          {this.props.currentFriend !== null &&
          this.props.currentFriend?.isFriend
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
  const { activeBioFriendTab, profileFriendTabs } = settings;
  const { currentFriend } = friendAPI;
  return {
    activeBioFriendTab,
    profileFriendTabs,
    currentFriend
  };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  getFriendAPI
})(withIonLifeCycle(FriendProfilePage));
