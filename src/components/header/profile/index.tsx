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
          <div className="col s3 h-100 avatar-col">
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
            <h2 className="subtitle">Rosetta Throp</h2>
            <h1 className="title">Musical Goddess</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderProfileComponent);
