import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EventInterface } from '../../../interfaces';
import { ShareIcon, UserGroupIcon, TicketIcon } from '../../icon';
import { IonAlert } from '@ionic/react';

interface State {
  show: boolean;
}

interface Props extends RouteComponentProps {
  id: number;
  data: EventInterface | null;
  artistUsername: string | undefined;
}

class CardEventComponent extends React.Component<Props, State> {
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
      <div className="card-event row">
        <div className="col s4 no-padding">
          <div className={`calendar flex-column-center ${this.getColor()}`}>
            <div className="f4 l1">FEB</div>
            <div className="f00 l1">21</div>
          </div>
        </div>
        <div className="col s1" />
        <div className="col s7">
          <div className="row">
            <div className="f4 l15 calendar-blue bold">The Happy Tour</div>
            <div className="f4 l15">Microsoft Theatre</div>
            <div className="f6 l15">Los Angeles, CA</div>
          </div>
          <div className="row m-0">
            <ul className="list inline white-text">
              <li>
                <ShareIcon width={20} height={35} />
                <div className="l15 f6 text-13 no-wrap">Share</div>
              </li>
              <li
                onClick={(): void => {
                  this.props.history.push(
                    `/home/artist/${this.props.artistUsername}/event/${this.props.id}`
                  );
                }}
              >
                <UserGroupIcon width={25} height={35} />
                <div className="l15 f6 text-13 no-wrap">{`Who's Going`}</div>
              </li>
              <li onClick={(): void => this.showMessage(true)}>
                <TicketIcon height={35} />
                <div className="l15 f6 text-13 no-wrap">Buy</div>
              </li>
            </ul>
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

export default withRouter(CardEventComponent);
