import React from 'react';
import { Avatar, Header, MenuProfileList } from './../../../components';
import { connect } from 'react-redux';
import { updateSettingsModal } from '../../../actions';
import { ShapesSize, ProfileActionsType } from '../../../interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

interface DispatchProps {
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number,
    onClick?: Function
  ) => void;
}

interface Props extends DispatchProps, RouteComponentProps {
  isFriend?: boolean;
  showFilter?: boolean;
}

class HeaderProfileComponent extends React.Component<Props> {
  public static defaultProps = {
    isFriend: false,
    showFilter: false
  };
  profileActions: ProfileActionsType[] = [
    {
      text: 'View my public profile',
      onClick: (): void => this.props.history.push('/me')
    },
    {
      text: 'Edit my public profile',
      onClick: (): void => this.props.history.push('/settings')
    },
    {
      text: 'Improve my public profile',
      onClick: (): void => console.log('Play clicked')
    }
  ];

  hideMenuListModal = (): void => this.props.updateSettingsModal(null);

  showMenuListModal = (): void => {
    this.props.updateSettingsModal(
      <MenuProfileList
        title={'Public profile'}
        onClick={this.hideMenuListModal}
        background={'background-white-base'}
        data={this.profileActions}
      />,
      'background-white-base'
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
          notificationsNumber={10}
          rightSettingsOnClick={(): void =>
            this.props.history.push('/settings')
          }
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

export default withRouter(
  connect(null, { updateSettingsModal })(HeaderProfileComponent)
);
