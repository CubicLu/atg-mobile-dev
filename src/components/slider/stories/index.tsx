import React from 'react';
import { Avatar } from './../../../components';
import { ShapesSize } from '../../../interfaces';

interface Props {
  scroll?: boolean;
  data?: any[];
  labelKey?: string;
  imageKey?: string;
  onClickViewAll?: Function;
}

class SliderStoriesComponent extends React.Component<Props> {
  public static defaultProps = {
    scroll: false,
    labelKey: 'label',
    imageKey: 'image',
    onClickViewAll: (): void => {}
  };

  render(): React.ReactNode {
    const { data, imageKey, labelKey } = this.props;
    if (!data) return <div />;
    const image = imageKey ? 'image' : '';
    const label = labelKey ? 'label' : '';

    return (
      <div className="row slider stories">
        <ul className="list inline">
          {data?.map(
            (d, i): React.ReactNode => {
              return (
                <li key={i}>
                  <div>
                    <Avatar
                      image={d[image]}
                      type={ShapesSize.circle}
                      width={110}
                      height={110}
                      onClick={(): void => {}}
                    />
                    <label>{d[label]}</label>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
export default SliderStoriesComponent;
