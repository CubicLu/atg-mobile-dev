import React from 'react';
import { MenuInterface } from './../../../interfaces';
interface Props {
  tabs: MenuInterface[];
  activeId: string | number;
  onClick: Function;
  className?: string;
}
export default class MenuMessageComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {}
  };
  render(): React.ReactNode {
    if (!this.props.tabs) return <ul />;
    const { tabs, onClick, activeId } = this.props;

    return (
      <div id="horizontal-menu" className={'horizontal-menu tabs scroll'}>
        {tabs.map(
          (data, i): React.ReactNode => {
            return (
              <div
                key={i}
                className={`div ${activeId === data.id ? 'active' : ''}`}
                onClick={(): void => onClick(data)}
              >
                <span className="label">{data.label}</span>
              </div>
            );
          }
        )}
      </div>
    );
  }
}
