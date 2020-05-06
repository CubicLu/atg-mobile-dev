import React from 'react';
import { ButtonIcon, DotsThreeIcon } from './../../';
import { Colors } from '../../../types';
import { PlanInterface } from './../../../interfaces';
interface Props {
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
        onClick={(): void => onClick(plan)}
      >
        <div className="price m-1">
          <div>
            <span className="h00 text-66 l1">
              <span className="currency">{'$'}</span>
              {price}
            </span>
          </div>
          <span className="f4">{name}</span>
          <ButtonIcon
            className="m-0"
            icon={<DotsThreeIcon />}
            color={Colors.transparent}
          />
        </div>
      </div>
    );
  }
}

export default ButtonPlanComponent;
