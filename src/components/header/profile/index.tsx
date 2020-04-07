import React from 'react';
import { Avatar, Header, MenuProfileList } from './../../../components';
import { connect } from 'react-redux';
import { updateSettingsModal } from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { ShapesSize, ProfileActionsType } from '../../../interfaces';

interface StateProps {}

interface DispatchProps {
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number,
    onClick?: Function
  ) => void;
}
interface Props extends DispatchProps {}

class HeaderProfileComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  profileActions: ProfileActionsType[] = [
    {
      text: 'View my public profile',
      onClick: (): void => console.log('Delete clicked')
    },
    {
      text: 'Edit my public profile',
      onClick: (): void => console.log('Share clicked')
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
    return (
      <div>
        <Header rightSettingsButton={true} rightUserGroupButton={true} />
        <div className="profile-center">
          <Avatar type={ShapesSize.circle} onClick={this.showMenuListModal} />
          <div className="f4 l15">Rosetta Throp</div>
          <div className="h00 l1 shadow">Musical Goddess</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default connect(mapStateToProps, {
  updateSettingsModal
})(HeaderProfileComponent);
