import React from 'react';
import {
  PauseIcon,
  StarIcon,
  NextIcon,
  ArtistPharrellWilliamsAlbumNumberOneImage
} from './../../components';
import {} from './../../actions';

interface Props {}

class PlayerComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="player">
        <div className="p-relative">
          <div className="row">
            <div className="col s3">
              <div className="cover">
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${ArtistPharrellWilliamsAlbumNumberOneImage})`
                  }}
                >
                  <div className="icon">
                    <PauseIcon />
                  </div>
                </div>
              </div>
              <div className="crop"></div>
            </div>
            <div className="col s9">
              <div className="row">
                <div className="col s7 info">
                  <span className="song">MY MIND</span>
                  <span className="artist">Pharrell Williams</span>
                </div>
                <div className="col s5 commands">
                  <ul className="list inline">
                    <li>
                      <StarIcon />
                    </li>
                    <li>
                      <NextIcon />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="progress">
            <div className="bar" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerComponent;
