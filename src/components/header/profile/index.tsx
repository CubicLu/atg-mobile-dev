import React from 'react';
import {
  Avatar,
  Header,
  DefaultModal,
  ContentLoader
} from './../../../components';
import {
  ShapesSize,
  GenericModalInterface,
  FriendInterface
} from '../../../interfaces';
import { store } from '../../../store';
import { updateSettingsModal } from '../../../actions';
interface DispatchProps {
  updateSettingsModal?: (
    content: React.ReactNode,
    className?: string,
    height?: number,
    onClick?: Function
  ) => void;
}
interface StateProps {
  loading?: boolean;
}
interface Props extends DispatchProps {
  showFilter?: boolean;
  currentFriend?: FriendInterface;
}
export default class HeaderProfileComponent extends React.Component<Props> {
  public static defaultProps = {
    showFilter: false
  };
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };
  profileActions: GenericModalInterface[] = [
    {
      name: 'View my public profile',
      url: '/profile/Rosetta'
    },
    {
      name: 'Edit my public profile',
      url: '/settings'
    },
    {
      name: 'Improve my public profile'
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

  hideMenuListModal = (): void => store.dispatch(updateSettingsModal(false));
  hideArtistListModal = (): void => store.dispatch(updateSettingsModal(false));

  showArtistListModal = (): void => {
    store.dispatch(
      updateSettingsModal(
        <DefaultModal
          title="Select a Band"
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
          onClick={(): void => this.hideMenuListModal()}
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
    if (!this.isReady) this.displayContent();
    const { showFilter } = this.props;
    return (
      <div>
        <Header
          rightFilterButton={showFilter}
          rightChatButton={!showFilter}
          rightConnectedButton={!showFilter}
          rightFanFeedButton={!showFilter}
          leftBackHref={'/profile'}
          routerDirection="forward"
        />
        <div className="profile-center">
          {!this.isReady ? (
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
            >
              <circle cx="30" cy="30" r="30" />
              <rect x="0" y="65" rx="3" ry="3" width="164" height="20" />
              <rect x="0" y="100" rx="3" ry="3" width="200" height="31" />
            </ContentLoader>
          ) : (
            <div>
              <Avatar
                type={ShapesSize.circle}
                image={this.props.currentFriend?.image}
              />
              <div className="f4 l15">{this.props.currentFriend?.name}</div>
              <div className="h00 l1 shadow">
                {this.props.currentFriend?.nickname}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  renderMe(): React.ReactNode {
    if (!this.isReady) this.displayContent();
    const { showFilter } = this.props;
    return (
      <div>
        <Header
          rightSettingsButton={!showFilter}
          rightUserGroupButton={!showFilter}
          rightNotificationButton={!showFilter}
          rightDashboardButton={!showFilter}
          rightDashboardOnClick={this.showArtistListModal}
          rightActionHref={'/settings'}
          notificationsNumber={10}
          routerDirection="forward"
        />
        <div className="profile-center">
          {!this.isReady ? (
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
            >
              <circle cx="30" cy="30" r="30" />
              <rect x="0" y="65" rx="3" ry="3" width="164" height="20" />
              <rect x="0" y="100" rx="3" ry="3" width="200" height="31" />
            </ContentLoader>
          ) : (
            <div>
              <Avatar
                type={ShapesSize.circle}
                image="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/rosetta.png"
                onClick={this.showMenuListModal}
              />
              <div className="f4 l15">Rosetta</div>
              <div className="h00 l1 shadow">Musical Goddess</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
