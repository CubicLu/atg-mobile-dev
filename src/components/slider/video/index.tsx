import React from 'react';
import { CardVideo, Button } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {} from './../../../actions';
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
        <div className="list-view-all">
          <div>
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="action">
            {this.props.viewAll && (
              <Button color={Colors.transparent} label={'View All'} />
            )}
          </div>
        </div>

        <Slider {...this.settings}>
          {this.props.data?.map(
            (data, i): React.ReactNode => {
              return (
                <CardVideo
                  type={ShapesSize.rounded}
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
