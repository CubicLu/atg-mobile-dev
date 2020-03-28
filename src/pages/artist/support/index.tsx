import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonPage, IonButton, IonContent } from '@ionic/react';
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

    const { currentArtist, history, match } = this.props;
    const { username } = currentArtist;
    const { plan } = this.state;
    const hasPlan = !!plan;
    const planDetailClass = hasPlan ? ' detail ' : '';

    const backButton = (): void => this.showDetail();
    const closeButton = (): void => history.push(`/home/artist/${username}`);
    const rightButton = hasPlan ? backButton : closeButton;

    const allPlans = (
      <div className="flex-compass south medium" style={{ height: 'inherit' }}>
        <div className="row">
          <h1 className="h1 l11 center-align">
            Yeah buddy! So stoked you
            <br />
            want to support us!
          </h1>
        </div>
        <div className="row mx-1">
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
        </div>
        <div className="m-0 h-16 flex-compass half medium">
          <div className="row f4">Tap an option below for more details</div>
          <br />
          <br />
        </div>
      </div>
    );
    const detailPlan = (
      <div className="space-between h-75">
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
            <div className="h00 dark l1">{currentArtist.name}</div>
            <div className="h1 dark l1">Support Level</div>
            <div className="h1 dark l1">{plan?.name}</div>
            <div className="price text-72 l1">
              <span>
                <span className="h2 dark currency">{'$'}</span>
                {plan?.price}
                <span className="price-after f6 l11 dark">
                  per
                  <br />
                  Month
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* <div className="row body">{this.state.plan?.description}</div> */}
        <div className="row body">
          <span className="l1">Here’s what you receive with your support</span>
          <ul>
            <li>• Benefit 1</li>
            <li>• Benefit 2</li>
            <li>• Benefit 3</li>
            <li>• Benefit 4</li>
            <li>• Benefit 5</li>
            <li>• Benefit 6</li>
            <li>• Benefit 7</li>
            <li>• Benefit 8</li>
            <li>• Benefit 9</li>
            <li>• Benefit 10</li>
          </ul>
          <span className="l1">You can change at anytime.</span>
          <br />
        </div>

        <div className="margin-footer row fluid">
          <div
            className="ion-button button-large"
            onClick={(): void =>
              history.push(`/home/thank-you`, { artistId: match.params.id })
            }
          >
            <IonButton className="support" size="large" expand="full">
              Support Us
            </IonButton>
          </div>
        </div>
      </div>
    );

    return (
      <IonPage>
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={rightButton}
        />
        <IonContent scrollY={true}>
          <div className={`artist-support-page h-100 ${planDetailClass}`}>
            {hasPlan ? (
              <BackgroundImage
                gradient="180deg, #FDD105 0%, #C16509 100%"
                backgroundTop
                backgroundTopDark={true}
                backgroundBottom
                backgroundBottomDark={false}
                backgroundBottomOpacity={0.33}
              />
            ) : (
              <BackgroundImage
                gradient="180deg, #28144800 30%, #281448 60%, #281448 100%"
                backgroundImage={currentArtist.supportImages?.background}
              />
            )}
            {hasPlan ? detailPlan : allPlans}
          </div>
        </IonContent>
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
