import React from 'react';
import { ButtonIcon } from './../../../components';
import {} from './../../../actions';
import { MixtapeInterface } from '../../../interfaces';
import { PlayIcon, DotsThreeIcon } from './../../icon';

interface Props {
  mixtape: MixtapeInterface;
  index: number;
}

interface State {
  openMenu: any;
}

class CardMixtapesComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      openMenu: false
    };
  }
  render(): React.ReactNode {
    console.log('this.state.openMenu[this.props.index]', this.state.openMenu);
    return (
      <div className="card mixtapes">
        <div className="row">
          <div className="col s12 cover">
            <div
              className="tape"
              data-tapeindex={String(this.props.index).padStart(2, '0')}
            >
              {this.state.openMenu === false && (
                <div
                  className="background"
                  style={{
                    backgroundImage: `url(${this.props.mixtape.cover})`
                  }}
                >
                  <ButtonIcon icon={<PlayIcon />} />

                  <ButtonIcon
                    icon={<DotsThreeIcon />}
                    color="transparent"
                    onClick={(): void => {
                      this.setState({
                        openMenu: !this.state.openMenu
                      });
                    }}
                  />
                </div>
              )}

              {this.state.openMenu === true && (
                <div
                  className="background"
                  style={{
                    backgroundImage: `linear-gradient(90deg, #e9d3a3, #dcd6a7, #d1d7ac, #c6d9b3, #bed9bb, #b7dabf, #b1dbc4, #abdbca, #a1dcd0, #96ded7, #8cdfe0, #82dfe9)`
                  }}
                >
                  <div className="buttons">
                    <div>bla</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 infos">
            <span className="playlist">{this.props.mixtape.name}</span>
            <span className="quantity">
              {this.props.mixtape.quantity} Songs
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CardMixtapesComponent;
