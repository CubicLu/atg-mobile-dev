import React from 'react';
import { MenuInterface } from './../../interfaces';

interface StateProps {}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps {
  tabs: MenuInterface[];
  activeId: string | number;
  onClick: Function;
  className?: string;
}

class MenuComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {}
  };
  render(): React.ReactNode {
    let scroll = this.props.tabs.length > 4;
    return (
      <div
        id="menu"
        className={this.props.className ? this.props.className : ''}
      >
        <ul className={'list inline menu generic' + (scroll ? ' scroll' : '')}>
          {this.props.tabs.map(
            (data, i): React.ReactNode => {
              return (
                <li
                  className={this.props.activeId === data.id ? 'active' : ''}
                  key={i}
                  onClick={this.props.onClick.bind(this, data)}
                >
                  <span className="circle">
                    <span>{data.icon}</span>
                  </span>
                  <span className="title">{data.label}</span>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}

export default MenuComponent;
