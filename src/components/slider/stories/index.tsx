import React from 'react';
import { Avatar, ContentLoader } from './../../../components';
import { ShapesSize } from '../../../types';
import { RouteComponentProps, withRouter } from 'react-router';
interface Props extends RouteComponentProps<MatchParams> {
  scroll?: boolean;
  data?: any[];
  labelKey?: string;
  imageKey?: string;
  onClickViewAll?: Function;
}
interface MatchParams {
  id: string;
}

class SliderStoriesComponent extends React.Component<Props> {
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };
  public static defaultProps = {
    scroll: false,
    labelKey: 'label',
    imageKey: 'image',
    onClickViewAll: (): void => {}
  };

  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();

    return (
      <div className="row slider stories">
        <ContentLoader
          className="mt-3"
          speed={2}
          viewBox="0 0 400 140"
          baseUrl={window.location.pathname}
          backgroundColor="rgb(255,255,255)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.05}
          foregroundOpacity={0.15}
          style={
            this.isReady
              ? { visibility: 'hidden', display: 'none' }
              : { visibility: 'visible' }
          }
        >
          <circle cx="90" cy="60" r="58" />
          <circle cx="240" cy="60" r="58" />
          <circle cx="390" cy="60" r="58" />

          <rect x="50" y="130" width="85" height="40" />
          <rect x="200" y="130" width="85" height="30" />
          <rect x="350" y="130" width="85" height="30" />
        </ContentLoader>
        <ul
          className="list inline"
          style={
            this.isReady ? { visibility: 'visible' } : { visibility: 'hidden' }
          }
        >
          {this.props.data?.slice(0, 5).map(
            (d, i): React.ReactNode => {
              return (
                <li key={i}>
                  <Avatar
                    image={d.image}
                    type={ShapesSize.circle}
                    width={110}
                    height={110}
                    avatarUrl={`/daily-drip/${d.id}`}
                  />
                  <label>{d.label}</label>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
export default withRouter(SliderStoriesComponent);
