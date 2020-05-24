import React from 'react';
import { Avatar } from './../../../components';
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
class SliderStoriesComponent extends React.PureComponent<Props> {
  public static defaultProps = {
    scroll: false,
    labelKey: 'label',
    imageKey: 'image',
    onClickViewAll: (): void => {}
  };

  render(): React.ReactNode {
    return (
      <div className="row slider stories" style={{ height: 140 }}>
        <ul className="list inline">
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
