import React from 'react';
import { MenuInterface } from './../../../models';
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
    const {
      tabs,
      onClick,
      activeId,
      hasNotifications,
      hasMessages
    } = this.props;

    return (
      <div className={'horizontal-menu tabs'}>
        {tabs?.map(
          (data, i): React.ReactNode => {
            let ntf = data.id === 'notifications' && hasNotifications;
            let msg = data.id === 'chat' && hasMessages;
            let has = msg || ntf ? 'not-read' : '';
            return (
              <div
                key={i}
                onClick={(): void => onClick(data)}
                className={`div ${has} ${activeId === data.id ? 'active' : ''}`}
              >
                <div className="label">{data.label}</div>
              </div>
            );
          }
        )}
      </div>
    );
  }
}
