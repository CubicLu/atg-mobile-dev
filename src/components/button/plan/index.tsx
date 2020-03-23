import React from 'react';
import {} from './../../';

import { Colors, PlanInterface } from '../../../interfaces';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  onClick: Function;
  onClickDetail?: Function;
  styles?: object;
  plan: PlanInterface;
  active: boolean;
}

class ButtonPlanComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    onClickDetail: (): any => {},
    color: Colors.transparentGray
  };

  render(): React.ReactNode {
    const { onClick, active, styles, plan } = this.props;
    const { color, price, name } = plan;
    if (!plan) return <div />;

    return (
      <div
        className={`btn plan circle ${color} ${active ? 'active' : ''}`}
        style={{ ...styles }}
      >
        <div onClick={onClick.bind(this, plan)}>
          <div className="price" data-currency={'$'}>
            {price}
          </div>
          <div className="name">{name}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ButtonPlanComponent);
