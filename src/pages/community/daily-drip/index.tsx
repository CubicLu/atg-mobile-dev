import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import {
  BackgroundImage,
  Avatar,
  CloseIcon,
  ButtonIcon,
  ShareLineIcon,
  BalloonIcon,
  StarIcon,
  DotsThreeIcon
} from '../../../components';
import { ShapesSize } from '../../../interfaces';

interface StateProps {
  isPlaying: boolean;
}
interface Props extends RouteComponentProps, StateProps {}

class CommunityDailyDripPage extends React.Component<Props> {
  renderDots(): React.ReactNode {
    let dots = [] as any;
    let quantity = ((window.innerWidth - 32) / 62) * 10;
    for (let i = 0; i < quantity; i++) {
      dots.push(<li key={i}></li>);
    }
    return dots;
  }

  renderHeader(): React.ReactNode {
    return (
      <div className="header">
        <div className="row">
          <div className="col s12">
            <ul className="list stories">{this.renderDots()}</ul>
          </div>
        </div>
        <div className="row">
          <div className="col s8 user-info">
            <Avatar
              image={'https://loremflickr.com/50/50'}
              type={ShapesSize.circle}
              width={36}
              height={36}
            />
            <span>panthrpicks</span>
          </div>
          <div className="col s4 flex-justify-content-end">
            <ButtonIcon
              onClick={(): void => this.props.history.goBack()}
              icon={<CloseIcon />}
              styles={{ width: 32, height: 32 }}
            />
          </div>
        </div>
      </div>
    );
  }

  renderFooter(): React.ReactNode {
    return (
      <div className="footer">
        <div className="row">
          <div className="col s12 flex-justify-content-center buttons">
            <ButtonIcon icon={<ShareLineIcon />} />
            <ButtonIcon icon={<BalloonIcon />} />
            <ButtonIcon icon={<StarIcon />} />
            <ButtonIcon icon={<DotsThreeIcon />} />
          </div>
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <IonPage id="community-daily-drip-page">
        <BackgroundImage
          backgroundImage={'https://loremflickr.com/1000/2000'}
        />
        <IonContent>
          <div
            className={`community-daily-drip-page space-between h-100 ${this
              .props.isPlaying && `is-playing`}`}
          >
            {this.renderHeader()}
            {this.renderFooter()}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  const { isPlaying } = settings;
  return { isPlaying };
};

export default withRouter(connect(mapStateToProps, {})(CommunityDailyDripPage));
