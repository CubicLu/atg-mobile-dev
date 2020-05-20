import React from 'react';
import { Avatar, ContentLoader } from './../../../components';
import { ShapesSize } from '../../../types';
import { RouteComponentProps, withRouter } from 'react-router';
import { IonImg } from '@ionic/react';
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

interface State {
  storiesIsReady: boolean;
}

class SliderStoriesComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      storiesIsReady: false
    };
  }

  public static defaultProps = {
    scroll: false,
    labelKey: 'label',
    imageKey: 'image',
    onClickViewAll: (): void => {}
  };

  render(): React.ReactNode {
    return (
      <div className="row slider stories" style={{ height: 140 }}>
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
            this.state.storiesIsReady
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
            this.state.storiesIsReady
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }
        >
          {this.props.data?.slice(0, 5).map(
            (d, i): React.ReactNode => {
              return (
                <li key={i}>
                  <IonImg
                    onIonImgDidLoad={(): void => {
                      this.setState({
                        storiesIsReady: true
                      });
                    }}
                    src={d.image}
                    style={{ width: 0, height: 0, visibility: 'hidden' }}
                  />
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
