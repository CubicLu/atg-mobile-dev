import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {
  ButtonIcon,
  Avatar,
  SettingsIcon,
  UserGroupIcon,
  BackIcon
} from './../../../components';
import { IonActionSheet, ActionSheetButton } from '@ionic/react';
import { connect } from 'react-redux';
import { updateAuthProperty } from '../../../actions';
import { ApplicationState } from '../../../reducers';

interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}

interface Props extends RouteComponentProps, DispatchProps {}
interface State {
  showProfileActions: boolean;
}
class HeaderProfileComponent extends React.Component<Props, State> {
  handleLogout(): void {
    this.props.updateAuthProperty('loggedUser', undefined);
    this.props.history.push('/initial');
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
      handler: (): void => {
        console.log('Delete clicked');
      }
    },
    {
      text: 'Edit Profile',
      handler: (): void => {
        console.log('Share clicked');
      }
    },
    {
      text: 'Improve Profile',
      handler: (): void => {
        console.log('Play clicked');
      }
    },
    {
      text: 'Log out',
      handler: this.handleLogout.bind(this)
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: (): void => {
        console.log('Cancel clicked');
      }
    }
  ];

  toggleProfileActions(option: boolean): void {
    this.setState({ showProfileActions: option });
  }

  render(): React.ReactNode {
    return (
      <div className="header profile">
        <div className="row align-items-center content">
          <div className="col s2 h-100 back-col">
            <ButtonIcon
              icon={<BackIcon />}
              onClick={(): any => this.props.history.goBack()}
            />
          </div>

          <div
            className="col s4 h-100 avatar-col"
            onClick={(): any => this.toggleProfileActions(true)}
          >
            <Avatar type="circle" />

            <IonActionSheet
              onDidDismiss={(): any => this.toggleProfileActions(false)}
              isOpen={this.state.showProfileActions}
              buttons={this.profileActions}
            />
          </div>

          <div className="col s6 button h-100">
            <ul className="list inline flex-end">
              <li>
                <ButtonIcon
                  color="transparent"
                  icon={<UserGroupIcon color={'#FFF'} height={23} width={23} />}
                  onClick={(): any => this.props.history.push('/home/feed')}
                />
              </li>

              <li>
                <ButtonIcon
                  color="transparent"
                  icon={<SettingsIcon height={22} width={22} />}
                  onClick={(): any => this.toggleProfileActions(true)}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col s1">
            <div className="w-100"></div>
          </div>
          <div className="col s8 infos">
            <h2 className="subtitle">Rosetta Throp</h2>
            <h1 className="title">Musical Goddess</h1>
          </div>
        </div>
      </div>
    );
  }
}

interface StateProps {}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, { updateAuthProperty })(HeaderProfileComponent)
);
