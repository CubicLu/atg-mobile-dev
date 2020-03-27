import React from 'react';
import { ButtonIcon, DotsThreeIcon } from './../../';

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
        onClick={onClick.bind(this, plan)}
      >
        <div className="price">
          <div>
            <span>
              <span className="currency">{'$'}</span>
              {price}
            </span>
          </div>
          <span className="f4">{name}</span>
          <ButtonIcon icon={<DotsThreeIcon />} color={Colors.transparent} />
        </div>
      </div>
    );
  }
}

export default withRouter(ButtonPlanComponent);
