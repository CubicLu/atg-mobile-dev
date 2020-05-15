import React from 'react';
import { CardVideo } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { ShapesSize, Sizes } from '../../../types';
import { IonRouterLink } from '@ionic/react';
import { VideoBetaInterface } from 'models';

interface Props {
  viewAll?: boolean;
  scroll?: boolean;
  canEdit: boolean;
  data?: any[];
  size?: Sizes;
  type?: ShapesSize;
  onClick?: (id: number) => void;
}

class SliderVideoComponent extends React.Component<Props> {
  public static defaultProps = {
    scroll: false,
    canEdit: false,
    size: Sizes.md,
    type: ShapesSize.rounded
  };

  render(): React.ReactNode {
    const { data, size, type, onClick, canEdit } = this.props;
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
            (d: VideoBetaInterface, i): React.ReactNode => (
              <IonRouterLink
                key={i}
                routerLink={`/artist/${d.artistId}/video/${i}`}
              >
                <CardVideo
                  canEdit={canEdit}
                  onClick={(id): void => onClick && onClick(id)}
                  type={type}
                  video={d.url}
                  image={d.thumbnail}
                  title={d.name}
                  time={d.duration}
                  // artist={d.artistId}
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
