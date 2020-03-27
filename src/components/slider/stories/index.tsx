import React from 'react';
import { Button, Avatar, SectionTitle } from './../../../components';
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
        <SectionTitle title={title} viewAll={viewAll} />

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
