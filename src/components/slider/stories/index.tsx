import React from 'react';
import { Button, Avatar } from './../../../components';
import { Colors, ShapesSize } from '../../../interfaces';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
  labelKey?: string;
  imageKey?: string;
}

class SliderStoriesComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    scroll: false,
    labelKey: 'label',
    imageKey: 'image'
  };
  render(): React.ReactNode {
    const { title, viewAll, data, imageKey, labelKey } = this.props;
    if (!data) return <div />;
    const image = imageKey ? 'image' : '';
    const label = labelKey ? 'label' : '';

    return (
      <div className="row slider stories">


        <div className="list-feature-component align-bottom row">
          <h1 className="title">{title}</h1>
          <div className="align-end action">
            {viewAll && (
              <Button color={Colors.transparent} type={ShapesSize.viewAll} />
            )}
          </div>
        </div>

        <div className="row">
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
      </div>
    );
  }
}
export default SliderStoriesComponent;
