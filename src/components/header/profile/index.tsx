import React from 'react';
import {
  Avatar,
  Header,
  DefaultModal,
  ContentLoader
} from './../../../components';
import { store } from '../../../store';
import { updateSettingsModal } from '../../../actions';
import { ShapesSize } from '../../../types';
import { GenericModalInterface } from '../../../interfaces';

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
  isFriend?: boolean;
  showFilter?: boolean;
}

export default class HeaderProfileComponent extends React.Component<Props> {
  public static defaultProps = {
    isFriend: false,
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
      url: '/me'
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
    },
    {
      name: 'Bono Vox',
      url: '/dashboard/menu/bono-vox'
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
          onClick={this.hideMenuListModal}
          data={this.profileActions}
        />
      )
    );
  };

  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();
    const { isFriend, showFilter } = this.props;
    return (
      <div>
        <Header
          rightSettingsButton={!isFriend && showFilter === false}
          rightUserGroupButton={!isFriend && showFilter === false}
          rightNotificationButton={!isFriend && showFilter === false}
          rightDashboardButton={!isFriend && showFilter === false}
          rightDashboardOnClick={this.showArtistListModal}
          rightChatButton={isFriend && showFilter === false}
          rightConnectedButton={isFriend && showFilter === false}
          rightFanFeedButton={isFriend && showFilter === false}
          rightFilterButton={isFriend && showFilter === true}
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
              backgroundColor="#ffffff0d"
              foregroundColor="#ffffff26"
            >
              <circle cx="30" cy="30" r="30" />
              <rect x="0" y="65" rx="3" ry="3" width="164" height="20" />
              <rect x="0" y="100" rx="3" ry="3" width="200" height="31" />
            </ContentLoader>
          ) : (
            <div>
              <Avatar
                type={ShapesSize.circle}
                onClick={this.showMenuListModal}
              />
              <div className="f4 l15">Rosetta Throped</div>
              <div className="h00 l1 shadow">Musical Goddess</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
