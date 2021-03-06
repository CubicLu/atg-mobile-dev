import React from 'react';
import {
  Avatar,
  Header,
  DefaultModal,
  ContentLoader
} from './../../../components';
import { store } from '../../../store';
import { updateSettingsModal } from '../../../actions';
import { ShapesSize, Nullable } from '../../../types';
import {
  GenericModalInterface,
  FriendInterface,
  SettingsActionType,
  Action,
  UpdateModalInterface
} from '../../../models';
interface DispatchProps {
  updateSettingsModal?: (
    content: React.ReactNode,
    className?: string,
    height?: number,
    onClick?: Function
  ) => void;
}

interface Props extends DispatchProps {
  showFilter?: boolean;
  currentFriend?: Nullable<FriendInterface>;
}

interface State {
  isReady: boolean;
}
export default class HeaderProfileComponent extends React.Component<
  Props,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  public static defaultProps = {
    showFilter: false
  };

  private _unmounted: boolean = false;
  componentWillUnmount(): void {
    this._unmounted = true;
  }
  displayContent = (): void => {
    setTimeout((): void => {
      !this._unmounted && this.setState({ isReady: true });
    }, 2000);
  };

  profileActions: GenericModalInterface[] = [
    {
      name: 'View my public profile',
      url: '/profile/friend/Rosetta'
    },
    {
      name: 'Edit my public profile',
      url: '/profile/settings'
    },
    {
      name: 'Improve my public profile',
      url: '/profile/wizard'
    }
  ];
  artistActions: GenericModalInterface[] = [
    {
      name: 'Rival Sons',
      url: '/dashboard/menu/rival-sons'
    },
    {
      name: 'Pharrell Williams',
      url: '/dashboard/menu/pharrell-williams'
    }
  ];

  hideMenuListModal = (): Action<
    SettingsActionType.UPDATE_MODAL,
    UpdateModalInterface
  > => store.dispatch(updateSettingsModal(false));
  hideArtistListModal = (): Action<
    SettingsActionType.UPDATE_MODAL,
    UpdateModalInterface
  > => store.dispatch(updateSettingsModal(false));

  showArtistListModal = (): void => {
    store.dispatch(
      updateSettingsModal(
        <DefaultModal
          title="Select an Artist"
          onClick={this.hideArtistListModal}
          data={this.artistActions}
          overrideClick={true}
        />
      )
    );
  };
  showMenuListModal = (): void => {
    store.dispatch(
      updateSettingsModal(
        <DefaultModal
          title="Public Profile"
          onClick={(): Action<
            SettingsActionType.UPDATE_MODAL,
            UpdateModalInterface
          > => this.hideMenuListModal()}
          data={this.profileActions}
          overrideClick={true}
        />
      )
    );
  };

  render(): React.ReactNode {
    return this.props.currentFriend ? this.renderFriend() : this.renderMe();
  }
  renderFriend(): React.ReactNode {
    if (!this.state.isReady) this.displayContent();
    const { showFilter, currentFriend } = this.props;
    return (
      <div>
        <Header
          rightFilterButton={showFilter}
          rightChatButton={!showFilter}
          rightFanFeedButton={!showFilter}
          rightFanFeedUrl={
            currentFriend?.isArtist
              ? `/community/artist/${currentFriend?.username}`
              : `/community/feed/${currentFriend?.username}`
          }
          routerDirection="forward"
        />
        <div className="profile-center">
          <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
            style={
              this.state.isReady
                ? { visibility: 'hidden', display: 'none' }
                : { visibility: 'visible' }
            }
          >
            <circle cx="30" cy="30" r="30" />
            <rect x="0" y="65" rx="3" ry="3" width="164" height="20" />
            <rect x="0" y="100" rx="3" ry="3" width="200" height="31" />
          </ContentLoader>
          <div
            style={
              this.state.isReady
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
          >
            <Avatar
              type={ShapesSize.circle}
              image={this.props.currentFriend?.image}
            />
            <div className="f4 l15">{this.props.currentFriend?.name}</div>
            <div className="h00 l1 shadow">
              {this.props.currentFriend?.nickname}
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderMe(): React.ReactNode {
    if (!this.state.isReady) this.displayContent();
    const { showFilter } = this.props;
    return (
      <div>
        <Header
          leftBackButton={false}
          rightSettingsButton={!showFilter}
          rightNotificationButton={!showFilter}
          rightDashboardButton={!showFilter}
          rightDashboardOnClick={this.showArtistListModal}
          rightActionHref={'/profile/settings'}
          notificationsNumber={10}
          routerDirection="forward"
        />
        <div className="profile-center">
          <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
            style={
              this.state.isReady
                ? { visibility: 'hidden', display: 'none' }
                : { visibility: 'visible' }
            }
          >
            <circle cx="30" cy="30" r="30" />
            <rect x="0" y="65" rx="3" ry="3" width="164" height="20" />
            <rect x="0" y="100" rx="3" ry="3" width="200" height="31" />
          </ContentLoader>
          <div
            style={
              this.state.isReady
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
          >
            <Avatar
              type={ShapesSize.circle}
              image="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/rosetta.png"
              onClick={this.showMenuListModal}
            />
            <div className="f4 l15">Rosetta</div>
            <div className="h00 l1 shadow">Musical Goddess</div>
          </div>
        </div>
      </div>
    );
  }
}
