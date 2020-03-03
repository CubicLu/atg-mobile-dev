import React from 'react';
import { EventInterface } from '../../../interfaces';
import { ShareIcon } from '../../icon';

interface Props {
  key: number;
  data: EventInterface;
}

class CardEventComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'normal'
  };

  render(): React.ReactNode {
    return (
      <div className="card event">
        <div className="row">
          <div className="col s4">
            <div className="circle calendar">
              <div>FEB</div>
              <div>21</div>
            </div>
          </div>
          <div className="col s8">
            <div className="row">
              <div className="col s12">
                <h1>The Happy Tour</h1>
                <h2>Microsoft Theatre</h2>
                <h3>Los Angeles, CA</h3>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <ul className="list inline">
                  <li>
                    <ShareIcon width={25} height={35} />
                    <div className="label">Share</div>
                  </li>
                  <li>
                    <ShareIcon width={25} height={35} />
                    <div className="label">{`Who's Going`}</div>
                  </li>
                  <li>
                    <ShareIcon width={25} height={35} />
                    <div className="label">Buy</div>
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

export default CardEventComponent;
