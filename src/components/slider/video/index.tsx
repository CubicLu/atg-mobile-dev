import React from 'react';
import { CardVideo } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { ShapesSize, Sizes } from '../../../interfaces';

interface Props {
  viewAll?: boolean;
  scroll?: boolean;
  canEdit: boolean;
  data?: any[];
  size?: Sizes;
  type?: ShapesSize;
  onClick?: (id: number) => void;
}

class SliderVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    scroll: false,
    canEdit: false,
    size: Sizes.md,
    type: ShapesSize.rounded
  };

  render(): React.ReactNode {
    const { data, size, type, onClick, canEdit } = this.props;
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
              <CardVideo
                key={i}
                canEdit={canEdit}
                onClick={(id): void => onClick && onClick(id)}
                type={type}
                video={d.video}
                image={d.image}
                title={d.title}
                time={d.time}
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
export default SliderVideoComponent;
