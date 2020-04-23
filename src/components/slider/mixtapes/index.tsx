import React from 'react';
import {
  CardMixtapes,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeRebelRockImage,
  MixtapeMoonLightImage
} from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { MixtapeInterface, PlaylistInterface } from '../../../interfaces';
import {
  guitarPlaylist,
  popPlaylist,
  bluesPlaylist
} from '../../../reducers/playerReducer';
import { setPlaylist } from './../../../actions/playerActions';
import { connect } from 'react-redux';

interface Props extends DispatchProps {
  title?: string;
  viewAll?: boolean;
  menu?: boolean;
  dots?: boolean;
  playlists?: MixtapeInterface[];
}
interface DispatchProps {
  setPlaylist: (playlist: PlaylistInterface) => void;
}

class SliderMixtapesComponent extends React.Component<Props> {
  public static defaultProps = {
    menu: true,
    dots: true
  };
  playlists: MixtapeInterface[] = [
    {
      cover: guitarPlaylist.cover,
      name: guitarPlaylist.name,
      quantity: guitarPlaylist.items.length,
      playlist: guitarPlaylist
    },
    {
      cover: popPlaylist.cover,
      name: popPlaylist.name,
      quantity: popPlaylist.items.length,
      playlist: popPlaylist
    },
    {
      cover: bluesPlaylist.cover,
      name: bluesPlaylist.name,
      quantity: bluesPlaylist.items.length,
      playlist: bluesPlaylist
    },
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
    if (!this.playlists) return <div />;

    const { menu, dots, setPlaylist } = this.props;
    const playlists = this.playlists;

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
      <Slider {...settings}>
        {playlists.map(
          (data, i): React.ReactNode => (
            <CardMixtapes
              onClick={(): void => data.playlist && setPlaylist(data.playlist)}
              mixtape={data}
              key={i}
              index={i + 1}
              menu={menu}
            />
          )
        )}
      </Slider>
    );
  }
}
export default connect(null, { setPlaylist })(SliderMixtapesComponent);
