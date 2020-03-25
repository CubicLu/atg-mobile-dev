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
  public static defaultProps = { onClick: (): void => {} };

  render(): React.ReactNode {
    if (!this.props.tabs) return <ul />;
    const { tabs, onClick, activeId } = this.props;
    const scroll = tabs.length > 4;
    return (
      <ul className={'list inline menu ' + (scroll ? ' scroll' : '')}>
        {tabs.map(
          (data, i): React.ReactNode => {
            return (
              <li
                key={i}
                className={activeId === data.id ? 'active' : ''}
                onClick={onClick.bind(this, data)}
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
    );
  }
}

export default MenuComponent;
