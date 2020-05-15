import React from 'react';
import { DotsThreeIcon } from './../../';
import { Colors } from '../../../types';
import { SupportLevelsInterface } from './../../../models';
interface Props {
  onClick: Function;
  onClickDetail?: Function;
  styles?: object;
  plan: SupportLevelsInterface;
  active: boolean;
  color: Colors;
}

class ButtonPlanComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): any => {},
    onClickDetail: (): any => {},
    color: Colors.transparentGray
  };

  render(): React.ReactNode {
    const { onClick, active, styles, plan, color } = this.props;
    const { name, value } = plan;
    if (!plan) return <div />;

    return (
      <div
        className={`btn plan circle ${color} ${active ? 'active' : ''}`}
        style={{ ...styles }}
        onClick={(): void => onClick(plan)}
      >
        <div className="price m-1">
          <div>
            <span className="h0 l1 ">
              <span className="currency">{'$'}</span>
              {value}
            </span>
          </div>
          <span className="f7 mb-05">{name}</span>
          <DotsThreeIcon />
        </div>
      </div>
    );
  }
}

export default ButtonPlanComponent;
