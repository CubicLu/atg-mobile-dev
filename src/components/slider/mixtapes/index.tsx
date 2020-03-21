import React from 'react';
import {
  CardMixtapes,
  MixtapeEuroHouseImage,
  MixtapeKnightImage,
  MixtapeRebelRockImage,
  MixtapeMoonLightImage,
  Button
} from './../../../components';
import {} from './../../../actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { MixtapeInterface } from '../../../interfaces';

interface Props {
  title?: string;
  viewAll?: boolean;
  menu?: boolean;
  dots?: boolean;
}

class SliderMixtapesComponent extends React.Component<Props> {
  settings: any = {
    dots: this.props.dots,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: false,
    swipe: true,
    arrows: false
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
  public static defaultProps = {
    menu: true,
    dots: true
  };

  render(): React.ReactNode {
    return (
      <div className="row slider mixtapes">
        <div className="list-view-all">
          <div>
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="action">
            {this.props.viewAll && (
              <Button color={'transparent'} label={'View All'} />
            )}
          </div>
        </div>

        <Slider {...this.settings}>
          {this.playlists.map(
            (data, i): React.ReactNode => {
              return (
                <CardMixtapes
                  mixtape={data}
                  key={i}
                  index={i + 1}
                  menu={this.props.menu}
                />
              );
            }
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderMixtapesComponent;
