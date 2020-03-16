import React from 'react';
import { PauseIcon, StarIcon, NextIcon } from './../../components';
import {} from './../../actions';

interface Props {}

class PlayerComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="player">
        <div className="progress">
          <div className="bar" style={{ width: '40%' }}></div>
        </div>

        <div className="cover">
          <div
            className="img"
            style={{
              backgroundImage: `url(https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png)`
            }}
          >
            <div className="icon">
              <PauseIcon />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s3" />
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
      </div>
    );
  }
}

export default PlayerComponent;
