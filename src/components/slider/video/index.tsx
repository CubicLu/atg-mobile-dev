import React from 'react';
import { CardVideo, _, Button } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {} from './../../../actions';

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
  settings: any;
  constructor(props: Props) {
    super(props);

    this.settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      variableWidth: true,
      swipe: true
    };
  }

  render(): React.ReactNode {
    return (
      <div className="slider video">
        <div className="row">
          <div className="col s12">
            <div className={'row content'}>
              <div className="col s8">
                <h1 className="title">{this.props.title}</h1>
              </div>
              <div className="col s4 view-all">
                {this.props.viewAll && (
                  <Button color={'transparent'} label={'View All'} />
                )}
              </div>
            </div>
          </div>
        </div>
        <Slider {...this.settings}>
          {_.map(
            this.props.data,
            (data, i): React.ReactNode => {
              return (
                <CardVideo
                  type={'rounded'}
                  video={data.video}
                  image={data.image}
                  title={data.title}
                  time={data.time}
                  artist={data.artist}
                  key={i}
                />
              );
            }
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderVideoComponent;
