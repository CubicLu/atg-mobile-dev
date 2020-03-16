import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  _,
  BackgroundImage,
  Header,
  ButtonIcon,
  CloseIcon,
  ButtonPlan,
  Avatar,
  BackIcon
} from './../../../components';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonPage, IonButton } from '@ionic/react';
import { ArtistInterface, PlanInterface } from '../../../interfaces';

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
    const hasArtist = this.props.currentArtist;
    if (!hasArtist) return <IonPage />; //to render only once, no construct again
    const { planDetail } = this.state;
    const supportClassName = `artist-support-page ${
      planDetail ? 'detail' : ''
    }`;

    return (
      <IonPage>
        {hasArtist && (
          <React.Fragment>
            {planDetail ? (
              <BackgroundImage
                gradient="180deg, #FCC505 0%, #C16509 100%"
                backgroundBottomDark={true}
                backgroundTopDark={true}
              />
            ) : (
              <BackgroundImage
                gradient="180deg, #28144800 30%, #281448bf 50%, #281448 100%"
                backgroundImage={
                  this.props.currentArtist?.supportImages?.background
                }
              />
            )}

            <Header
              type="fixed"
              leftContent={
                planDetail ? (
                  <ButtonIcon
                    onClick={(): void => this.showDetail(false)}
                    icon={<BackIcon />}
                  />
                ) : (
                  <ButtonIcon
                    onClick={(): void =>
                      this.props.history.push(
                        `/home/artist/${this.props.currentArtist?.username}`
                      )
                    }
                    icon={<BackIcon />}
                  />
                )
              }
              rightContent={
                !planDetail && (
                  <ButtonIcon
                    icon={<CloseIcon width={14} height={14} />}
                    onClick={(): void => {
                      this.props.history.push(
                        `/home/artist/${this.props.currentArtist?.username}`
                      );
                    }}
                  />
                )
              }
            />

            <div className={supportClassName}>
              {!planDetail && (
                <React.Fragment>
                  <div className="col s12 info">
                    <h1 className={'title'}>
                      Yeah buddy! So stoked you
                      <br />
                      want to support us!
                    </h1>
                    <h5>Tap an option below for more details</h5>
                  </div>

                  <div className="row buttons">
                    {_.map(
                      this.props.plans,
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
                  </div>
                </React.Fragment>
              )}

              {planDetail && (
                <React.Fragment>
                  <div className="row">
                    <div className="col s4">
                      <Avatar
                        type={'circle'}
                        width={100}
                        height={100}
                        image={this.props.currentArtist?.supportImages?.avatar}
                      />
                    </div>
                    <div className="col s8">
                      <h1 className={'title'}>
                        {this.props.currentArtist?.name}
                      </h1>
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
                    <IonButton
                      id="supportBtn"
                      className="support rounded"
                      routerDirection="forward"
                      routerLink={`/home/artist/${this.props.currentArtist?.username}`}
                    >
                      SUPPORT US
                    </IonButton>
                  </div>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
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
