import React from 'react';
import {
  CardMixtapes,
  _,
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
  settings: any;
  playlists: MixtapeInterface[];
  public static defaultProps = {
    menu: true,
    dots: true
  };
  constructor(props: Props) {
    super(props);

    this.settings = {
      dots: this.props.dots,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: false,
      swipe: true,
      arrows: false
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
      <div className="row slider mixtapes">
        <div className="col s12">
          {this.props.title && (
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
          )}
        </div>
        <Slider {...this.settings}>
          {_.map(
            this.playlists,
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
