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
      <div className="list-component">
        <div className="align-bottom row">
          <div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="action">
            {viewAll && (
              <Button color={Colors.transparent} type={ShapesSize.viewAll} />
            )}
          </div>
        </div>

        {data.slice(0, 1).map(
          (data, i): React.ReactNode => (
            <CardImage image={data.image} key={i} type={ShapesSize.rounded} />
          )
        )}
      </div>
    );
  }
}
export default SliderImageComponent;
