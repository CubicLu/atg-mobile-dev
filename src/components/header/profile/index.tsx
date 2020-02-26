import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {
  ButtonIcon,
  Avatar,
  SettingsIcon,
  UserGroupIcon,
  BackIcon
} from './../../../components';
import {} from './../../../actions';

interface Props extends RouteComponentProps {}

class HeaderProfileComponent extends React.Component<Props> {
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
          <div className="col s4 h-100 avatar-col">
            <Avatar type="circle" />
            <ul>
              <li>Edit Profile</li>
              <li>Improve Profile</li>
            </ul>
          </div>
          <div className="col s6 button h-100">
            <ul className="list inline flex-end">
              <li>
                <ButtonIcon
                  color="transparent"
                  icon={<UserGroupIcon color={'#FFF'} height={23} width={23} />}
                  onClick={(): any => this.props.history.goBack()}
                />
              </li>

              <li>
                <ButtonIcon
                  color="transparent"
                  icon={<SettingsIcon height={22} width={22} />}
                  onClick={(): any => this.props.history.goBack()}
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
export default withRouter(HeaderProfileComponent);
