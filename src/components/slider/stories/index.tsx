import React from 'react';
import { _, Button, Avatar } from './../../../components';
import {} from './../../../actions';
import { ShapesSize, Colors } from '../../../interfaces';

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
    return (
      <div className="row slider stories">
        <div className="list-view-all">
          <div>
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="action">
            {this.props.viewAll && (
              <Button color={Colors.transparent} label={'View All'} />
            )}
          </div>
        </div>

        <div className="row">
          <ul className="list inline">
            {_.map(
              this.props.data,
              (data, i): React.ReactNode => {
                let image =
                  this.props.imageKey !== undefined
                    ? this.props.imageKey
                    : 'image';
                let label =
                  this.props.labelKey !== undefined
                    ? this.props.labelKey
                    : 'label';
                return (
                  <li key={i}>
                    <div>
                      <Avatar
                        image={data[image]}
                        type={ShapesSize.circle}
                        width={110}
                        height={110}
                        onClick={(): void => {}}
                      />
                      <label>{data[label]}</label>
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
