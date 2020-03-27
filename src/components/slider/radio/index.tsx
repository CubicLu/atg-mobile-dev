import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardImage } from './../../../components';
import { ShapesSize } from '../../../interfaces';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
}

class SliderRadioComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true
  };

  render(): React.ReactNode {
    const { title, data } = this.props;
    if (!data) return <div />;

    const settings: any = {
      dots: false,
      infinite: false,
      speed: 500,
      centerMode: false,
      variableWidth: true,
      swipe: true,
      arrows: false
    };

    return (
      <div className="slider radio">
        <div className="list-feature-component align-bottom row">
          <h1 className="title">{title}</h1>
        </div>

        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardImage
                image={d.image}
                type={ShapesSize.circle}
                key={i}
                col={2}
                label={d.label}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderRadioComponent;
