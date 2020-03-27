import React from 'react';
import {
  CardMixtapes,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeRebelRockImage,
  MixtapeMoonLightImage,
  SectionTitle
} from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { MixtapeInterface } from '../../../interfaces';

interface Props {
  title?: string;
  viewAll?: boolean;
  menu?: boolean;
  dots?: boolean;
}

class SliderMixtapesComponent extends React.Component<Props> {
  public static defaultProps = {
    menu: true,
    dots: true
  };
  playlists: MixtapeInterface[] = [
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

  render(): React.ReactNode {
    const { menu, title, viewAll, dots } = this.props;
    const playlists = this.playlists;
    if (!this.playlists) return <div />;

    const settings: Settings = {
      dots: dots,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: false,
      swipe: true,
      arrows: false
    };

    return (
      <div className="slider mixtapes">
        <SectionTitle title={title!} viewAll={viewAll} />

        <Slider {...settings}>
          {playlists.map(
            (data, i): React.ReactNode => (
              <CardMixtapes mixtape={data} key={i} index={i + 1} menu={menu} />
            )
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderMixtapesComponent;
