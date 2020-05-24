import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardImage } from './../../../components';
import { ShapesSize } from '../../../types';

interface Props {
  data: any[];
  className?: string;
  labelClassName?: string;
  width: number;
}

export default class SliderMembersComponent extends React.Component<Props> {
  render(): React.ReactNode {
    if (!this.props.data) return <div />;
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
      <div className={`slider members ${this.props.className}`}>
        <Slider {...settings}>
          {this.props.data.map(
            (member, i): React.ReactNode => (
              <CardImage
                labelClassName={this.props.labelClassName}
                image={member.image}
                type={ShapesSize.rounded}
                key={i}
                width={this.props.width}
                routerLink={member.redirectUrl}
                col={5}
                label={member.name}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
