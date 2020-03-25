import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonPage, IonButton } from '@ionic/react';
import {
  ArtistInterface,
  PlanInterface,
  ShapesSize
} from '../../../interfaces';
import {
  BackgroundImage,
  Header,
  ButtonPlan,
  Avatar
} from './../../../components';

interface State {
  planDetail: boolean;
  plan: PlanInterface | null;
}
interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
  plans: PlanInterface[];
  selectedPlan: PlanInterface | null;
  isPlaying: boolean;
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
}
interface MatchParams {
  id: string;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistSupportPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      planDetail: false,
      plan: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  showDetail(plan: PlanInterface | null = null): void {
    this.setState({ plan });
  }
  render(): React.ReactNode {
    if (!this.props.currentArtist) {
      return <IonPage />;
    }

    const { currentArtist, history } = this.props;
    const { username } = currentArtist;
    const { plan } = this.state;
    const hasPlan = !!plan;
    const planDetailClass = hasPlan ? ' detail h-100' : '';

    const backButton = (): void => this.showDetail();
    const closeButton = (): void => history.push(`/home/artist/${username}`);
    const rightButton = hasPlan ? backButton : closeButton;

    const allPlans = (
      <div className="flex-compass south medium">
        <BackgroundImage
          gradient="180deg, #28144800 30%, #281448 60%, #281448 100%"
          backgroundImage={currentArtist.supportImages?.background}
        />
        <div className="row">
          <h1 className="title center-align">
            Yeah buddy! So stoked you
            <br />
            want to support us!
          </h1>
        </div>
        <div className="row">
          {this.props.plans.map(
            (data, i): React.ReactNode => {
              return (
                <div className="col s6" key={i}>
                  <ButtonPlan
                    active={false}
                    plan={data}
                    onClick={(e: PlanInterface): void => this.showDetail(e)}
                  />
                </div>
              );
            }
          )}
          <div className="h-16 flex-compass half medium">
            <h5>Tap an option below for more details</h5>
          </div>
        </div>
      </div>
    );
    const detailPlan = (
      <div className="space-between h-100">
        <BackgroundImage
          gradient="180deg, #FCC505 0%, #C16509 100%"
          backgroundTop={true}
          backgroundTopDark={true}
          backgroundBottom={true}
          backgroundBottomOpacity={0.3}
          backgroundBottomDark={false}
        />
        <div className="row fluid">
          <div className="col s4">
            <Avatar
              type={ShapesSize.circle}
              width={100}
              height={100}
              image={currentArtist.supportImages?.avatar}
            />
          </div>

          <div className="col s8 header">
            <div className="title">{currentArtist.name}</div>
            <div className="subtitle">Support Level</div>
            <div className="subtitle">{plan?.name}</div>
            <div className="price">
              <span>
                <span className="currency">{'$'}</span>
                {plan?.price}
                <span className="price-after">
                  per
                  <br />
                  Month
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="row body">{this.state.plan?.description}</div>

        <div className="mt-40 margin-footer row fluid">
          <div className="ion-button button-large">
            <IonButton
              className="support"
              size="large"
              routerLink={`/home/artist/${username}`}
              expand="full"
            >
              Support Us
            </IonButton>
          </div>
        </div>
      </div>
    );

    return (
      <IonPage>
        <React.Fragment>
          <Header
            leftBackButton={false}
            rightCloseButton={true}
            rightCloseOnClick={rightButton}
          />

          <div className={`artist-support-page ${planDetailClass}`}>
            {hasPlan ? detailPlan : allPlans}
          </div>
        </React.Fragment>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, artists } = artistAPI;
  const { plans, selectedPlan, isPlaying } = settings;
  return { currentArtist, artists, plans, selectedPlan, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistSupportPage)
);
