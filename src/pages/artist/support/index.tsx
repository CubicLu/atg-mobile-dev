import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { getArtistAPI, updatePopUpModal } from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonPage, IonContent } from '@ionic/react';
import { ArtistInterface, PlanInterface } from '../../../models';
import {
  BackgroundImage,
  Header,
  ButtonPlan,
  ArrowTopIcon,
  CloseIcon,
  PopUpModal,
  PremiumFeaturesModalContent,
  PauseIcon
} from './../../../components';

interface State {
  plan: PlanInterface | null;
  confirmHandler: () => void;
}
interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
  plans: PlanInterface[];
  popUpModal: string | null;
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number
  ) => void;
  updatePopUpModal: (string: string | null) => void;
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
      plan: null,
      confirmHandler: (): void => {}
    };
  }
  UNSAFE_componentWillReceiveProps(next: Props): void {
    if (next.loading) return;
    if (this.props.loading) return;
    if (
      this.props.currentArtist == null ||
      this.props.currentArtist.username !== next.match.params.id
    ) {
      this.props.getArtistAPI(next.match.params.id);
    }
  }

  handleGoBack = (): void => this.props.history.goBack();

  handlePlanChange(plan: PlanInterface | null = null): void {
    this.setState({ plan });
  }

  upgradeStatus = (newPlan: PlanInterface | null): (() => void) => (): void => {
    const { updatePopUpModal } = this.props;
    const { plan } = this.state;
    if (newPlan?.id !== plan?.id || newPlan === null) {
      updatePopUpModal('confirmPremiumModal');
      this.setState(
        (prevState: State): State => ({
          ...prevState,
          confirmHandler: (): void => {
            this.handlePlanChange(newPlan);
            updatePopUpModal(null);
          }
        })
      );
    }
  };

  render(): React.ReactNode {
    const { currentArtist, popUpModal, updatePopUpModal, plans } = this.props;
    const { plan } = this.state;

    return (
      <IonPage
        id="support-page"
        style={{
          background: 'linear-gradient(180deg, #FDD105, #C16509)'
        }}
        className={'artist-support-page'}
      >
        <BackgroundImage
          gradient="180deg, #2814484d, #281448a8, #281448"
          backgroundImage={currentArtist?.supportImages?.background}
        />
        <Header
          leftBackButton={false}
          centerContent={
            <div className={'artist-support-page__header'}>
              <h1>{currentArtist?.name}</h1>
              <h3>Support packages</h3>
            </div>
          }
          rightCloseButton={true}
          rightCloseOnClick={this.handleGoBack}
        />
        <IonContent fullscreen={true} scrollY={true}>
          <div className={'artist-support-page__content h-100'}>
            <div className="artist-support-page__content--plans-container">
              {plans.map(
                (data, i): React.ReactNode => {
                  return (
                    <div className={`col s6 ${i === 0 ? 'mr-12' : ''}`} key={i}>
                      <ButtonPlan
                        active={!!plan?.id && plan?.id === data?.id}
                        plan={data}
                        onClick={this.upgradeStatus(data)}
                      />
                    </div>
                  );
                }
              )}
            </div>
            <Link
              to={'/support-advantages'}
              className={'artist-support-page__content--explain'}
            >
              Why premium?
            </Link>
            <div className="artist-support-page__content--options">
              <h5>Support Options</h5>
              <div className="artist-support-page__content--options--items-block">
                <div className="artist-support-page__content--options--items-block--item">
                  <div
                    className={`artist-support-page__content--options--items-block--item--icon-container ${
                      !plan || plan?.id === 2 ? 'grey' : ''
                    }`}
                    {...(plan &&
                      plan?.id === 1 && {
                        onClick: this.upgradeStatus(plans[1])
                      })}
                  >
                    <ArrowTopIcon />
                  </div>
                  <p>Upgrade</p>
                </div>
                <div className="artist-support-page__content--options--items-block--item">
                  <div
                    className={`artist-support-page__content--options--items-block--item--icon-container rotate-180 ${
                      !plan || plan?.id === 1 ? 'grey' : 'background-plum'
                    }`}
                    {...(plan &&
                      plan?.id === 2 && {
                        onClick: this.upgradeStatus(plans[0])
                      })}
                  >
                    <ArrowTopIcon />
                  </div>
                  <p>Downgrade</p>
                </div>
                <div className="artist-support-page__content--options--items-block--item">
                  <div
                    className={`artist-support-page__content--options--items-block--item--icon-container ${
                      !plan ? 'grey' : 'background-light-red'
                    }`}
                    {...(plan && {
                      onClick: this.upgradeStatus(null)
                    })}
                  >
                    <PauseIcon color={'#fff'} opacity={1} />
                  </div>
                  <p>Pause</p>
                </div>
                <div className="artist-support-page__content--options--items-block--item">
                  <div
                    className={`artist-support-page__content--options--items-block--item--icon-container ${
                      !plan ? 'grey' : 'background-light-red'
                    }`}
                    {...(plan && {
                      onClick: this.upgradeStatus(null)
                    })}
                  >
                    <CloseIcon />
                  </div>
                  <p>Cancel</p>
                </div>
              </div>
            </div>
            {popUpModal === 'confirmPremiumModal' && (
              <PopUpModal header={'PREMIUM FEATURES'}>
                <PremiumFeaturesModalContent
                  title={`${currentArtist?.name}`}
                  description={<>Do you want to confirm this selection?</>}
                  artistAvatar={currentArtist?.cover.event}
                  onDoneClick={(): void => updatePopUpModal(null)}
                  onSuccessClick={this.state.confirmHandler}
                  confirmButtonContent={'YES'}
                  cancelButtonContent={'NO'}
                />
              </PopUpModal>
            )}
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
  const { currentArtist, loading } = artistAPI;
  const { plans, popUpModal } = settings;
  return { currentArtist, loading, plans, popUpModal };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI, updatePopUpModal })(
    ArtistSupportPage
  )
);
