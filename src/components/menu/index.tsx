import React from 'react';
import { MenuInterface } from './../../interfaces';
interface Props {
  tabs: MenuInterface[];
  activeId: string | number;
  onClick: Function;
  className?: string;
}
export default class MenuComponent extends React.Component<Props> {
  public static defaultProps = { onClick: (): void => {} };
  render(): React.ReactNode {
    if (!this.props.tabs) return <ul />;
    const { tabs, onClick, activeId } = this.props;
    const scroll = tabs.length > 4;

    return (
      <div
        id="horizontal-menu"
        className={'horizontal-menu ' + (scroll ? ' scroll' : 'center')}
      >
        {tabs.map(
          (data, i): React.ReactNode => {
            return (
              <div
                key={i}
                className={activeId === data.id ? 'div active' : 'div'}
                onClick={onClick.bind(this, data)}
              >
                <span className="circle">{data.icon}</span>
                <span className="label">{data.label}</span>
              </div>
            );
          }
        )}
      </div>
    );
  }
}
