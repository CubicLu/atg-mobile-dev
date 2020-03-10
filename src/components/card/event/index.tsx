import React from 'react';
import { EventInterface } from '../../../interfaces';
import { ShareIcon, UserGroupIcon, TicketIcon } from '../../icon';
import { IonAlert } from '@ionic/react';

interface State {
  show: boolean;
}

interface Props {
  id: number;
  data: EventInterface;
}

class CardEventComponent extends React.Component<Props, State> {
  public static defaultProps = {
    type: 'normal'
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false
    };
  }

  getColor(): any {
    if (this.props.id === 0) {
      return 'color-quartenary-base';
    } else if (this.props.id === 1) {
      return 'color-secondary-base';
    } else if (this.props.id % 2 === 0 && this.props.id !== 0) {
      return 'color-green-base';
    } else if (this.props.id % 3 === 0 && this.props.id !== 0) {
      return 'color-quartenary-base';
    } else {
      return 'color-quartenary-base';
    }
  }

  showMessage(condition = false): void {
    this.setState({
      show: condition
    });
  }

  render(): React.ReactNode {
    return (
      <div className="card event">
        <div className="row">
          <div className="col s4">
            <div className={`circle calendar ${this.getColor()}`}>
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
                    <ShareIcon width={20} height={35} />
                    <div className="label">Share</div>
                  </li>
                  <li>
                    <UserGroupIcon width={25} height={35} />
                    <div className="label">{`Who's Going`}</div>
                  </li>
                  <li
                    onClick={(): void => {
                      this.showMessage(true);
                    }}
                  >
                    <TicketIcon height={35} />
                    <div className="label">Buy</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <IonAlert
          isOpen={this.state.show}
          onDidDismiss={(): void => this.showMessage(false)}
          header={'Atention!'}
          message={`You'll be redirect to external link, are you sure?`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (): void => {
                this.showMessage();
              }
            },
            {
              text: 'Yes',
              handler: (): void => {
                window.open('https://google.com', '_blank');
                this.showMessage();
              }
            }
          ]}
        />
      </div>
    );
  }
}

export default CardEventComponent;
