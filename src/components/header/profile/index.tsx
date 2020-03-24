import React from 'react';
import { Avatar, Header } from './../../../components';
import { IonActionSheet, ActionSheetButton } from '@ionic/react';
import { connect } from 'react-redux';
import { updateAuthProperty } from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { ShapesSize } from '../../../interfaces';

interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}

interface Props extends DispatchProps {}
interface State {
  showProfileActions: boolean;
}
class HeaderProfileComponent extends React.Component<Props, State> {
  handleLogout(): void {
    this.props.updateAuthProperty('loggedUser', undefined);
    window.location.href = '/initial';
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      showProfileActions: false
    };
  }

  profileActions: ActionSheetButton[] = [
    {
      text: 'My Public Profile',
      role: 'destructive',
      handler: (): void => console.log('Delete clicked')
    },
    {
      text: 'Edit Profile',
      handler: (): void => console.log('Share clicked')
    },
    {
      text: 'Improve Profile',
      handler: (): void => console.log('Play clicked')
    },
    {
      text: 'Log out',
      handler: this.handleLogout.bind(this)
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (): void => console.log('Cancel clicked')
    }
  ];

  toggleProfileActions(option: boolean): void {
    this.setState({ showProfileActions: option });
    this.forceUpdate();
  }

  render(): React.ReactNode {
    return (
      <Header
        rightSettingsButton={true}
        rightUserGroupButton={true}
        rightSettingsOnClick={(): void => this.toggleProfileActions(true)}
      >
        <div className="profile-center">
          <Avatar
            type={ShapesSize.circle}
            onClick={(): any => this.toggleProfileActions(true)}
          />
          <IonActionSheet
            onDidDismiss={(): any => this.toggleProfileActions(false)}
            isOpen={this.state.showProfileActions}
            buttons={this.profileActions}
          />

          <h2 className="subtitle">Rosetta Throp</h2>
          <h1 className="title">Musical Goddess</h1>
        </div>
        {this.props.children}
      </Header>
    );
  }
}

interface StateProps {}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default connect(mapStateToProps, { updateAuthProperty })(
  HeaderProfileComponent
);
