import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardImage } from './../../../components';
import { ShapesSize } from '../../../types';

interface Props {
  scroll?: boolean;
  data?: any[];
  className?: string;
  width?: number;
}

export default class SliderRadioComponent extends React.Component<Props> {
  render(): React.ReactNode {
    if (!this.props.data) return null;

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
      <div className={`slider radio ${this.props.className}`}>
        <Slider {...settings}>
          {this.props.data.map(
            (item, i): React.ReactNode => (
              <CardImage
                image={item.image}
                type={ShapesSize.circle}
                key={i}
                width={this.props.width}
                routerLink={`/radio/artist/${item.id}`}
                col={2}
                label={item.label}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
