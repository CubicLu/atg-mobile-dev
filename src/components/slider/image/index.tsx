import React from 'react';
import { CardImage, SectionTitle } from './../../../components';
import { ShapesSize } from '../../../interfaces';

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
      <div className="slider images">
        <SectionTitle title={title} viewAll={viewAll} />
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
