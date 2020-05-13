import React from 'react';
import { CardRadio } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { ShapesSize, Sizes } from '../../../types';

interface Props {
  viewAll?: boolean;
  scroll?: boolean;
  canEdit: boolean;
  data?: any[];
  size?: Sizes;
  type?: ShapesSize;
  onClick?: (id: number) => void;
}

class SliderRadiosComponent extends React.Component<Props> {
  public static defaultProps = {
    scroll: false,
    canEdit: false,
    size: Sizes.md,
    type: ShapesSize.rounded
  };

  render(): React.ReactNode {
    const { data, size, type, canEdit } = this.props;
    if (!data) return <div />;

    const settings: Settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      variableWidth: true,
      swipe: true
    };
    return (
      <div className="slider video">
        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardRadio
                key={i}
                canEdit={canEdit}
                type={type}
                image={d.image}
                title={d.title}
                artist={d.artist}
                id={i}
                size={size}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderRadiosComponent;
