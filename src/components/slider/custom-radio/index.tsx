import React from 'react';
import { CardRadio } from './../../../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { Nullable, ShapesSize, Sizes } from '../../../types';
import { SongInterface } from '../../../models/@commons';

interface State {
  playingRadioIndex: Nullable<number>;
}

interface Props {
  viewAll?: boolean;
  scroll?: boolean;
  canEdit: boolean;
  data?: { image: string }[];
  size?: Sizes;
  type?: ShapesSize;
  onClick?: (id: number) => void;
  playButton?: boolean;
  playing?: boolean;
  paused?: boolean;
  song?: SongInterface;
  onPlayClick?: Function;
  onPauseClick?: Function;
  onResumeClick?: Function;
}

class SliderRadiosComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { playingRadioIndex: null };
  }

  public static defaultProps = {
    scroll: false,
    canEdit: false,
    size: Sizes.md,
    type: ShapesSize.rounded
  };

  handleOnPlayClick = (i: number): (() => void) => (): void => {
    this.setState({ playingRadioIndex: i });
    if (this.props.onPlayClick) {
      this.props.onPlayClick();
    }
  };

  render(): React.ReactNode {
    const {
      data,
      size,
      type,
      canEdit,
      song,
      playing,
      paused,
      onPauseClick,
      onResumeClick,
      playButton
    } = this.props;
    const { playingRadioIndex } = this.state;
    if (!data) return <div />;

    const settings: Settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      variableWidth: true,
      swipe: true
    };
    const playerProps = {
      ...(playButton && { song }),
      ...(playButton && { paused }),
      ...(playButton && { onPauseClick }),
      ...(playButton && { onResumeClick })
    };
    return (
      <div className="slider video">
        <Slider {...settings}>
          {data.map(
            (d, i): React.ReactNode => (
              <CardRadio
                key={i}
                canEdit={canEdit}
                type={type}
                image={d.image}
                id={i}
                size={size}
                playButton={playButton}
                playing={playingRadioIndex === i && playing}
                onPlayClick={this.handleOnPlayClick(i)}
                playingRadioIndex={playingRadioIndex}
                {...playerProps}
              />
            )
          )}
        </Slider>
      </div>
    );
  }
}
export default SliderRadiosComponent;
