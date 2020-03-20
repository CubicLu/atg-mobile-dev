import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CardImage } from './../../../components';
import {} from './../../../actions';

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
  settings: any;
  constructor(props: Props) {
    super(props);

    this.settings = {
      dots: false,
      infinite: false,
      speed: 500,
      centerMode: false,
      variableWidth: true,
      swipe: true,
      arrows: false
    };
  }
  render(): React.ReactNode {
    return (
      <div className="slider radio">
        <div className="row">
          <div className="col s12">
            {this.props.title && (
              <div className={'row content'}>
                <div className="col s12">
                  <h1 className="title">{this.props.title}</h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <Slider {...this.settings}>
          {this.props.data?.map(
            (data, i): React.ReactNode => {
              return (
                <CardImage
                  image={data.image}
                  type={'circle'}
                  key={i}
                  col={2}
                  label={data.label}
                />
              );
            }
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderRadioComponent;
