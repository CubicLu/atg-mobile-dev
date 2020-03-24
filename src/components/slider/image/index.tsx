import React from 'react';
import { CardImage, Button } from './../../../components';
import { Colors, ShapesSize } from '../../../interfaces';

interface Props {
  title: string;
  viewAll?: boolean;
  data?: any[];
}

class SliderImageComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true
  };
  render(): React.ReactNode {
    const { title, viewAll, data } = this.props;
    if (!data) return <div />;

    return (
      <div className="row slider image">
        <div className="list-view-all">
          <div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="action">
            {viewAll && (
              <Button color={Colors.transparent} label={'View All'} />
            )}
          </div>
        </div>

        <div className="row">
          {data.map(
            (data, i): React.ReactNode => {
              return (
                <CardImage
                  image={data.image}
                  key={i}
                  type={ShapesSize.rounded}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
}
export default SliderImageComponent;
