import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { ButtonIcon, Avatar, SettingsIcon } from './../../../components';
import {} from './../../../actions';
import PlusIcon from '../../icon/plus';

interface Props extends RouteComponentProps {}

class HeaderProfileComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="header profile">
        <div className="row align-items-center content">
          <div className="col s3 h-100">
            <Avatar type="circle" />
          </div>
          <div className="col s7 button h-100">
            <ul className="list inline flex-end">
              <li>
                <ButtonIcon
                  color="green"
                  icon={<PlusIcon />}
                  onClick={(): any => this.props.history.goBack()}
                />
              </li>

              <li>
                <ButtonIcon
                  icon={<SettingsIcon />}
                  onClick={(): any => this.props.history.goBack()}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col s12 infos">
            <h1 className="title">Musical Goddess</h1>
            <h2 className="subtitle">Los Angeles, CA</h2>
            <h3 className="subtitle">
              <b>500</b> Followers
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderProfileComponent);
