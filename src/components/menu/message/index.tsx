import React from 'react';
import { MenuInterface } from './../../../interfaces';
interface Props {
  tabs: MenuInterface[];
  activeId: string | number;
  onClick: Function;
  className?: string;
  hasMessages?: boolean;
  hasNotifications?: boolean;
}
export default class MenuMessageComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    hasMessages: false,
    hasNotifications: false
  };
  render(): React.ReactNode {
    if (!this.props.tabs) return <ul />;
    const {
      tabs,
      onClick,
      activeId,
      hasNotifications,
      hasMessages
    } = this.props;

    return (
      <div id="horizontal-menu" className={'horizontal-menu tabs'}>
        {tabs.map(
          (data, i): React.ReactNode => {
            let tooltipNotification =
              data.id === 'notifications' && hasNotifications;
            let tooltipMessage = data.id === 'chat' && hasMessages;

            let tooltip =
              tooltipNotification || tooltipMessage ? 'not-read' : '';
            return (
              <div
                key={i}
                className={`div ${
                  activeId === data.id ? 'active' : ''
                } ${tooltip}`}
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
