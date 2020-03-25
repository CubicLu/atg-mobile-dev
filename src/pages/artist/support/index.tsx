import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  BackgroundImage,
  Header,
  ButtonPlan,
  Avatar,
  ButtonSupport
} from './../../../components';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonPage } from '@ionic/react';
import {
  ArtistInterface,
  PlanInterface,
  ShapesSize
} from '../../../interfaces';

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

  showDetail(planDetail = false, plan: PlanInterface | null = null): void {
    this.setState({ planDetail, plan });
  }
  render(): React.ReactNode {
    if (!this.props.currentArtist) return <IonPage />; //to render only once, no construct again
    const { planDetail } = this.state;
    const planDetailClass = planDetail ? ' detail' : '';

    const backButton = (): void => this.showDetail(false);
    const closeButton = (): void =>
      this.props.history.push(
        `/home/artist/${this.props.currentArtist?.username}`
      );
    const leftButton = planDetail ? backButton : closeButton;
    const { currentArtist } = this.props;
    return (
      <IonPage>
        <React.Fragment>
          {planDetail ? (
            <BackgroundImage
              gradient="180deg, #FCC505 0%, #C16509 100%"
              backgroundBottomDark={true}
              backgroundTopDark={true}
            />
          ) : (
            <BackgroundImage
              gradient="180deg, #28144800 30%, #281448 60%, #281448 100%"
              backgroundImage={currentArtist.supportImages?.background}
            />
          )}

          <Header
            leftBackOnClick={leftButton}
            rightCloseButton={!planDetail}
            rightCloseOnClick={closeButton}
          />

          <div className={`artist-support-page h-100${planDetailClass}`}>
            {!planDetail && (
              <React.Fragment>
                <div className="h-33" />
                <div className="flex-compass south medium row">
                  <h1 className="title">
                    Yeah buddy! So stoked you
                    <br />
                    want to support us!
                  </h1>
                </div>

                <div className="buttons row">
                  {this.props.plans.map(
                    (data, i): React.ReactNode => {
                      return (
                        <div className="col s6" key={i}>
                          <ButtonPlan
                            active={false}
                            plan={data}
                            onClick={(event: PlanInterface): void => {
                              this.showDetail(true, event);
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                  <div className="h-16 flex-compass half medium row">
                    <h5>Tap an option below for more details</h5>
                  </div>
                </div>
              </React.Fragment>
            )}

            {planDetail && (
              <React.Fragment>
                <div className="row">
                  <div className="col s4">
                    <Avatar
                      type={ShapesSize.circle}
                      width={100}
                      height={100}
                      image={currentArtist.supportImages?.avatar}
                    />
                  </div>
                  <div className="col s8">
                    <h1 className={'title'}>{currentArtist.name}</h1>
                    <h2 className={'subtitle'}>Support Level</h2>
                    <div className="plan-detail">
                      <div className="price" data-currency={'$'}>
                        {this.state.plan?.price}
                      </div>
                      <div className="name">{this.state.plan?.name}</div>
                    </div>
                  </div>
                </div>

                <div className="col s12 text">
                  {this.state.plan?.description}
                </div>

                <div className="col s12 footer">
                  <ButtonSupport
                    type={ShapesSize.normal}
                    buttonType={'text'}
                    onClick={(): void =>
                      this.props.history.push(
                        `/home/artist/${currentArtist.username}`
                      )
                    }
                  />
                </div>
              </React.Fragment>
            )}
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
