import React from 'react';
import { Avatar } from './../../../components';
import { ShapesSize } from '../../../types';

interface Props {
  scroll?: boolean;
  data?: any[];
  labelKey?: string;
  imageKey?: string;
  onPressItem?: (id) => void;
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
    const { data, imageKey, labelKey, onPressItem } = this.props;
    if (!data) return <div />;
    const image = imageKey ? 'image' : '';
    const label = labelKey ? 'label' : '';

    return (
      <div className="row slider stories">
        <ul className="list inline">
          {data.slice(0, 5).map(
            (d, i): React.ReactNode => {
              return (
                <li key={i}>
                  <div key={i}>
                    <Avatar
                      image={d[image]}
                      type={ShapesSize.circle}
                      width={110}
                      height={110}
                      onClick={(): void => {
                        onPressItem && onPressItem(i);
                      }}
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
