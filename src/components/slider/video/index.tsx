import React from 'react';
import { CardVideo, Button } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { ShapesSize, Colors } from '../../../interfaces';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
}

class SliderVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    scroll: false
  };

  render(): React.ReactNode {
    const { title, viewAll, data } = this.props;
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

        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardVideo
                type={ShapesSize.rounded}
                video={d.video}
                image={d.image}
                title={d.title}
                time={d.time}
                artist={d.artist}
                key={i}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderVideoComponent;
