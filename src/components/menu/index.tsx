import React from 'react';
import { ContentLoader } from './../../components';
import { MenuInterface } from '../../interfaces';
interface Props {
  tabs: MenuInterface[];
  activeId: string | number;
  onClick: Function;
  className?: string;
  id: string;
}
export default class MenuComponent extends React.Component<Props> {
  public static defaultProps = { onClick: (): void => {}, id: '' };
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };
  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();

    if (!this.props.tabs) return <ul />;
    const { tabs, onClick, activeId, id } = this.props;
    const scroll = tabs.length > 4;

    return (
      <div
        id={id}
        className={'horizontal-menu ' + (scroll ? 'scroll' : 'center')}
      >
        {!this.isReady ? (
          <ContentLoader
            speed={2}
            width={400}
            viewBox="0 0 390 100"
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
          >
            <circle cy="30" cx="40" r="30" />
            <rect x="12" y="70" rx="3" ry="3" width="60" height="16" />
            <circle cy="30" cx="140" r="30" />
            <rect x="112" y="70" rx="3" ry="3" width="60" height="16" />
            <circle cy="30" cx="240" r="30" />
            <rect x="212" y="70" rx="3" ry="3" width="60" height="16" />
            <circle cy="30" cx="340" r="30" />
            <rect x="310" y="70" rx="3" ry="3" width="60" height="16" />
          </ContentLoader>
        ) : (
          tabs.map(
            (data, i): React.ReactNode => {
              return (
                <div
                  key={i}
                  className={activeId === data.id ? 'div active' : 'div'}
                  onClick={(): void => onClick(data)}
                >
                  <span className="circle">{data.icon}</span>
                  <span className="label">{data.label}</span>
                </div>
              );
            }
          )
        )}
      </div>
    );
  }
}
