import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardImage } from './../../../components';
import { ShapesSize } from '../../../interfaces';

interface Props {
  data: any[];
  className?: string;
  labelClassName?: string;
  size?: string;
}

export default class SliderMembersComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { data, className, size } = this.props;
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
      <div className={`slider members ${className}`}>
        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardImage
                labelClassName={this.props.labelClassName}
                image={d.image}
                type={ShapesSize.rounded}
                key={i}
                diameter={size}
                routerLink={d.redirectUrl}
                col={5}
                label={d.name}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
