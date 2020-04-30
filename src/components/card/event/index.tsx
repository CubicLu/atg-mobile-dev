import React from 'react';
import { EventInterface } from '../../../interfaces';
import { ShareIcon, UserGroupIcon, TicketIcon } from '../../icon';
import { IonAlert, IonRouterLink } from '@ionic/react';
import moment from 'moment';

interface State {
  show: boolean;
}

interface Props {
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
    const { artistUsername: username, id, data } = this.props;

    if (!data) return <div />;
    const { name, city, where, date } = data;
    return (
      <div className="card-event row">
        <div className="col s4 no-padding">
          <div className={`calendar flex-column-center ${this.getColor()}`}>
            <div className="f4 l1">{moment(date).format('MMM')}</div>
            <div className="f00 l1">{moment(date).format('DD')}</div>
          </div>
        </div>
        <div className="col s1" />
        <div className="col s7">
          <div className="row">
          <div className="f4 l15 calendar-blue bold">{name}</div>
            <div className="f4 l15">{where}</div>
            <div className="f6 l15">{city}</div>
          </div>
          <div className="row m-0">
            <ul className="list inline white-text">
              <li>
                <ShareIcon width={20} height={35} />
                <div className="l15 f6 text-13 no-wrap">Share</div>
              </li>
              <IonRouterLink routerLink={`/artist/${username}/event/${id}`}>
                <li>
                  <UserGroupIcon width={25} height={35} />
                  <div className="l15 f6 text-13 no-wrap">{"Who's Going"}</div>
                </li>
              </IonRouterLink>
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
          message={"You'll be redirect to external link, are you sure?"}
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
