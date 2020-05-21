import React from 'react';
import { Nullable, ShapesSize, Sizes } from '../../../types';
import { EditIcon, RadioPauseButton } from '../..';
import { IonRouterLink } from '@ionic/react';
import { SongInterface } from '../../../models';
import { RadioPlayButton } from '../../icon/player';

interface Props {
  image?: string;
  id: number;
  canEdit: boolean;
  type: ShapesSize;
  size?: Sizes;
  playButton?: boolean;
  label?: string;
  playing?: boolean;
  paused?: boolean;
  song?: SongInterface;
  onPlayClick?: Function;
  onPauseClick?: Function;
  onResumeClick?: Function;
  playingRadioIndex?: Nullable<number>;
}

class CardRadioComponent extends React.Component<Props> {
  public static defaultProps = {
    type: ShapesSize.normal,
    size: Sizes.md,
    canEdit: false
  };

  togglePlayPause = (): void => {
    const {
      song,
      playing,
      onPlayClick,
      onPauseClick,
      onResumeClick,
      paused,
      playingRadioIndex
    } = this.props;
    if ((!song || song?.id !== playingRadioIndex) && onPlayClick) {
      onPlayClick();
    }
    if (playing && onPauseClick) {
      onPauseClick();
    } else if (paused && onResumeClick) {
      onResumeClick(song);
    }
  };

  render(): React.ReactNode {
    const { type, image, size, id } = this.props;
    return (
      <div className="row card-out-content">
        <div
          className={`card video ${type} ${size}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          {this.props.canEdit && (
            <IonRouterLink
              routerDirection="forward"
              routerLink={`/radio/station/edit/${id}`}
            >
              <div className="flex-justify-content-end pt-1 mr-1">
                <EditIcon opacity={0.33} />
              </div>
            </IonRouterLink>
          )}
          {this.props.playButton && (
            <div
              className={'play-button-container'}
              onClick={this.togglePlayPause}
            >
              {this.props.playing ? <RadioPauseButton /> : <RadioPlayButton />}
            </div>
          )}
        </div>
        {this.props.label && (
          <div className={'mt-15 f5 center-align'}>{this.props.label}</div>
        )}
      </div>
    );
  }
}

export default CardRadioComponent;
