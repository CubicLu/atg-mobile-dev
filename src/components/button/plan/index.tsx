import React from 'react';
import {} from './../../';
import {} from './../../../actions';
import { Colors, PlanInterface } from '../../../interfaces';
import { DotsThreeIcon } from '../../icon';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  onClick: Function;
  onClickDetail: Function;
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
    let currency = this.props.plan.price < 1 ? '₵' : '$';
    let active = this.props.active ? 'active' : '';
    return (
      <div
        className={`btn plan circle ${this.props.plan.color} ${active}`}
        style={{ ...this.props.styles }}
      >
        <div onClick={this.props.onClick.bind(this, this.props.plan)}>
          <div className="price" data-currency={currency}>
            {this.props.plan.price}
          </div>
          <div className="name">{this.props.plan.name}</div>
        </div>
        <div
          className="dots"
          onClick={this.props.onClickDetail.bind(this, this.props.plan)}
        >
          <DotsThreeIcon />
        </div>
      </div>
    );
  }
}

export default withRouter(ButtonPlanComponent);
