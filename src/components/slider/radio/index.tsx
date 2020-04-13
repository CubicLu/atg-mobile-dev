import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardImage } from './../../../components';
import { ShapesSize } from '../../../interfaces';

interface Props {
  scroll?: boolean;
  data?: any[];
  className?: string;
  diameter?: string;
}

class SliderRadioComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { data, className, diameter } = this.props;
    if (!data) return <div />;
    console.log(data);
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
      <div className={`slider radio ${className}`}>
        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardImage
                image={d.image}
                type={ShapesSize.circle}
                key={i}
                diameter={diameter}
                routerLink={`/radio/${d.id}`}
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
