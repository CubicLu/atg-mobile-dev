import React from 'react';
import { Avatar, Header, DefaultModal } from './../../../components';
import { ShapesSize, GenericModalInterface } from '../../../interfaces';
import { store } from '../../../store';
import { updateSettingsModal } from '../../../actions';

interface Props {
  isFriend?: boolean;
  showFilter?: boolean;
}

export default class HeaderProfileComponent extends React.Component<Props> {
  public static defaultProps = {
    isFriend: false,
    showFilter: false
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
          onClick={this.hideMenuListModal}
          data={this.profileActions}
        />
      )
    );
  };

  render(): React.ReactNode {
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
          <Avatar type={ShapesSize.circle} onClick={this.showMenuListModal} />
          <div className="f4 l15">Rosetta Throped</div>
          <div className="h00 l1 shadow">Musical Goddess</div>
        </div>
      </div>
    );
  }
}
