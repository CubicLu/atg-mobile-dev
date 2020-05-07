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

  hideMenuListModal = (): void => store.dispatch(updateSettingsModal(false));

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
          rightChatButton={isFriend && showFilter === false}
          rightConnectedButton={isFriend && showFilter === false}
          rightFanFeedButton={isFriend && showFilter === false}
          rightFilterButton={isFriend && showFilter === true}
          rightActionHref={'/settings'}
          notificationsNumber={10}
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
