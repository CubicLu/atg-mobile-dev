import React from 'react';
import { CardVideo, Button } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { ShapesSize, Colors, Sizes } from '../../../interfaces';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
  size?: Sizes;
  type?: ShapesSize;
}

class SliderVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    scroll: false,
    size: Sizes.md,
    type: ShapesSize.rounded
  };

  render(): React.ReactNode {
    const { title, viewAll, data, size, type } = this.props;
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
        <div className="list-feature-component align-bottom row">
          <h1 className="title">{title}</h1>
          <div className="align-end">
            {viewAll && (
              <Button color={Colors.transparent} type={ShapesSize.viewAll} />
            )}
          </div>
        </div>

        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardVideo
                type={type}
                video={d.video}
                image={d.image}
                title={d.title}
                time={d.time}
                artist={d.artist}
                key={i}
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
