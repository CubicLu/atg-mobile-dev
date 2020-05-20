import React from 'react';
import { CardVideo } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { ShapesSize, Sizes } from '../../../types';
import { IonRouterLink } from '@ionic/react';

interface Props {
  viewAll?: boolean;
  showFooter: boolean;
  scroll?: boolean;
  canEdit: boolean;
  data?: any[];
  size?: Sizes;
  type?: ShapesSize;
}

class SliderVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    scroll: false,
    viewAll: false,
    showFooter: false,
    canEdit: false,
    size: Sizes.md,
    type: ShapesSize.rounded
  };

  render(): React.ReactNode {
    const { data, size, type, canEdit } = this.props;
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
        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <IonRouterLink
                key={i}
                routerLink={
                  d.artist?.username
                    ? `/artist/${d.artist?.username}/video/${i}`
                    : undefined
                }
              >
                <CardVideo
                  type={type}
                  video={d.video}
                  image={d.image}
                  title={d.title}
                  time={d.time}
                  artist={d.artist}
                  showFooter={this.props.showFooter}
                  id={i}
                  size={size}
                />
              </IonRouterLink>
            )
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderVideoComponent;
