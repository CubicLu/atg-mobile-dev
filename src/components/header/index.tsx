import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {} from './../../actions';

interface Props extends RouteComponentProps {
  rightContent?: React.ReactNode | null;
  leftContent?: React.ReactNode | null;
  centerContent?: React.ReactNode | null;
}

class HeaderComponent extends React.Component<Props> {
  public static defaultProps = {
    buttonRight: null,
    leftContent: null,
    centerContent: null
  };
  render(): React.ReactNode {
    return (
      <div className="header default">
        <div className="row content">
          <div className="col s2 h-100 left-col">{this.props.leftContent}</div>
          <div className="col s8 h-100 center-col">
            {this.props.centerContent}
          </div>
          <div className="col s2 h-100 right-col">
            {this.props.rightContent}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderComponent);
