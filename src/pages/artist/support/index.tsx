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
  CirclesIcon,
  Avatar,
  Button
} from './../../../components';
import {
  updateArtistProperty,
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
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
  plans: PlanInterface[];
  selectedPlan: PlanInterface | null;
}

interface DispatchProps {
  updateArtistProperty: (property: string, value: any) => void;
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

  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      let artist = _.find(
        this.props.artists,
        (x): any => x.username === this.props.match.params.id
      );

      if (artist !== undefined) {
        this.props.updateArtistProperty('currentArtist', artist);
      }
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
          top
          bottom
          topIsSvg
          bottomIsSvg
          imageTop={<CirclesIcon color={'#DA9307'} />}
          imageBottom={<CirclesIcon color={'#DA9307'} />}
          unique={false}
          styles={{ height: '100%', backgroundPositionY: 'top' }}
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
                      image={this.props.currentArtist?.supportImages?.avatar}
                    />
                  </div>
                  <div className="col s8">
                    <h1 className={'title'}>
                      {this.props.currentArtist?.name}
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
          gradient="180deg, #281448 0%, #281448 100%"
          image={this.props.currentArtist?.supportImages?.background}
          unique={true}
          styles={{ height: '100%', backgroundPositionY: 'top' }}
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
                <h1 className={'title'}>{this.props.currentArtist?.name}</h1>
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
                        active={this.props.selectedPlan?.id === data.id}
                        plan={data}
                        onClickDetail={(event: PlanInterface): void => {
                          this.showDetail(true, event);
                        }}
                        onClick={(event: PlanInterface): void => {
                          this.props.updateSettingsProperty(
                            'selectedPlan',
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
  const { currentArtist, artists } = artistAPI;
  const { plans, selectedPlan } = settings;
  return { currentArtist, artists, plans, selectedPlan };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty,
    updateSettingsProperty
  })(ArtistSupportPage)
);
