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
  Button
} from './../../../components';
import {
  getArtistAPI,
  updateSettingsProperty
} from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonContent } from '@ionic/react';
import { ArtistInterface, PlanInterface } from '../../../interfaces';

interface State {
  condition: boolean;
  plan: PlanInterface | null;
}

interface StateProps {
  current_artist: ArtistInterface | null;
  artists: ArtistInterface[];
  plans: PlanInterface[];
  selected_plan: PlanInterface | null;
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
      condition: false,
      plan: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.current_artist == null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.current_artist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  showDetail(condition = false, plan: PlanInterface | null = null): void {
    this.setState({
      condition,
      plan
    });
  }

  renderDetail(): React.ReactNode {
    return (
      <IonContent
        scrollY={true}
        scrollEvents={true}
        onIonScrollStart={(): any => {}}
        onIonScroll={(): any => {}}
        onIonScrollEnd={(): any => {}}
        style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#281448' }}
      >
        <BackgroundImage
          gradient="180deg, #FCC505 0%, #C16509 100%"
          backgroundBottom
          backgroundTop
        >
          <div className="artist-support-page detail">
            <Header
              rightContent={
                <ButtonIcon
                  icon={<CloseIcon width={14} height={14} />}
                  onClick={(): void => {
                    this.showDetail();
                  }}
                />
              }
            />
            <div className="row p-10">
              <div className="col s12">
                <div className="row">
                  <div className="col s4">
                    <Avatar
                      type={'circle'}
                      width={100}
                      height={100}
                      image={this.props.current_artist?.support_images?.avatar}
                    />
                  </div>
                  <div className="col s8">
                    <h1 className={'title'}>
                      {this.props.current_artist?.name}
                    </h1>
                    <h2 className={'subtitle'}>Support Level</h2>
                    <div className="plan-detail">
                      <div
                        className="price"
                        data-currency={
                          this.state.plan?.price !== undefined &&
                          (this.state.plan?.price < 1 ? '₵' : '$')
                        }
                      >
                        {this.state.plan?.price}
                      </div>
                      <div className="name">{this.state.plan?.name}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 text">
                    {this.state.plan?.description}
                  </div>
                </div>
              </div>
              <div className="row p-10">
                <div className="col s12 footer">
                  <Button
                    color={'support'}
                    type={'normal'}
                    label={'Support Us'}
                    bold
                  />
                </div>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </IonContent>
    );
  }

  renderPlans(): React.ReactNode {
    return (
      <IonContent
        scrollY={true}
        scrollEvents={true}
        onIonScrollStart={(): any => {}}
        onIonScroll={(): any => {}}
        onIonScrollEnd={(): any => {}}
        style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#281448' }}
      >
        <BackgroundImage
          gradient="180deg, #28144800 30%, #281448bf 50%, #281448 100%"
          backgroundImage={
            this.props.current_artist?.support_images?.background
          }
        >
          <div className="artist-support-page">
            <Header
              rightContent={
                <ButtonIcon
                  icon={<CloseIcon width={14} height={14} />}
                  onClick={(): void => {
                    this.props.history.goBack();
                  }}
                />
              }
            />
            <div className="row">
              <div className="col s12 info">
                <h1 className={'title'}>{this.props.current_artist?.name}</h1>
                <h2 className={'subtitle'}>Select A Support Level</h2>
              </div>
            </div>

            <div className="row buttons">
              {_.map(
                this.props.plans,
                (data, i): React.ReactNode => {
                  return (
                    <div className="col s6" key={i}>
                      <ButtonPlan
                        active={this.props.selected_plan?.id === data.id}
                        plan={data}
                        onClickDetail={(event: PlanInterface): void => {
                          this.showDetail(true, event);
                        }}
                        onClick={(event: PlanInterface): void => {
                          this.props.updateSettingsProperty(
                            'selected_plan',
                            event
                          );
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </BackgroundImage>
      </IonContent>
    );
  }

  render(): React.ReactNode {
    if (this.state.condition) {
      return this.renderDetail();
    } else {
      return this.renderPlans();
    }
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { current_artist, artists } = artistAPI;
  const { plans, selected_plan } = settings;
  return { current_artist, artists, plans, selected_plan };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistSupportPage)
);
