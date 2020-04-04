import React from 'react';
import { Avatar, Header } from './../../../components';
import { IonActionSheet, ActionSheetButton } from '@ionic/react';
import { connect } from 'react-redux';
import { updateAuthProperty } from '../../../actions';
import { ShapesSize } from '../../../interfaces';

interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}
interface State {
  showProfileActions: boolean;
}
interface Props extends DispatchProps {}
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
      handler: (): void => this.handleLogout()
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (): void => console.log('Cancel clicked')
    }
  ];

  toggleProfileActions(opt: boolean = true): void {
    this.setState({ showProfileActions: opt });
  }

  render(): React.ReactNode {
    return (
      <div>
        <Header
          rightSettingsButton={true}
          rightUserGroupButton={true}
          rightSettingsOnClick={(): void => this.toggleProfileActions()}
        />

        <div className="profile-center">
          <Avatar
            type={ShapesSize.circle}
            onClick={(): any => this.toggleProfileActions()}
          />
          <IonActionSheet
            onDidDismiss={(): any => this.toggleProfileActions(false)}
            isOpen={this.state.showProfileActions}
            buttons={this.profileActions}
          />
          <div className="f4 l15">Rosetta Throp</div>
          <div className="h00 l1 shadow">Musical Goddess</div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateAuthProperty })(HeaderProfileComponent);
