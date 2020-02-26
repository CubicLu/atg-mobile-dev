import React from 'react';
import {
  CardMixtapes,
  _,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeRebelRockImage,
  MixtapeMoonLightImage
} from './../../../components';
import {} from './../../../actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MixtapeInterface } from '../../../interfaces';

interface Props {}

class SliderMixtapesComponent extends React.Component<Props> {
  settings: any;
  playlists: MixtapeInterface[];
  constructor(props: Props) {
    super(props);

    this.settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      swipe: true
    };

    this.playlists = [
      {
        cover: MixtapeEuroHouseImage,
        name: 'Euro House',
        quantity: 14
      },
      {
        cover: MixtapeKnightImage,
        name: 'KNIGHT',
        quantity: 12
      },
      {
        cover: MixtapeRebelRockImage,
        name: 'Rebel Rock',
        quantity: 10
      },
      {
        cover: MixtapeMoonLightImage,
        name: 'Moonlight',
        quantity: 15
      }
    ];
  }

  render(): React.ReactNode {
    return (
      <Slider {...this.settings}>
        {_.map(
          this.playlists,
          (data, i): React.ReactNode => {
            return <CardMixtapes mixtape={data} key={i} index={i + 1} />;
          }
        )}
      </Slider>
    );
  }
}
export default SliderMixtapesComponent;
