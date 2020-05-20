import React from 'react';
import { connect } from 'react-redux';
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
  PauseIcon,
  ButtonIcon
} from './../../../components';
import { plans } from '../../../constants';
import { RouteComponentProps } from 'react-router';

interface State {
  plan: PlanInterface | null;
  confirmHandler: () => void;
}
interface StateProps {
  currentArtist: ArtistInterface | null;
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

  componentDidUpdate(): void {
    if (this.props.currentArtist?.username !== this.props.match.params.id) {
      return this.props.getArtistAPI(this.props.match.params.id);
    }
    if (this.props.currentArtist?.support && !this.state.plan) {
      this.setState({ plan: plans[0] });
    }
  }

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
            this.props.history.goBack();
          }
        })
      );
    }
  };

  render(): React.ReactNode {
    const { currentArtist, popUpModal, updatePopUpModal, plans } = this.props;
    const { plan } = this.state;

    const canUpgrade = plan?.id === 1 ? '' : ' disabled';
    const canDowngrade = plan?.id === 2 ? '' : ' disabled';
    const canPause = plan ? '' : ' disabled';

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
              <div className="h2">{currentArtist?.name}</div>
              <div className="f5">Support packages</div>
            </div>
          }
          rightCloseButton={true}
          rightClickGoBack={true}
        />
        <IonContent fullscreen={true} scrollY={true}>
          <div className={'artist-support-page__content h-100'}>
            <div className="flex-compass south h-50 half">
              <div className="flex">
                {plans.map(
                  (data, i): React.ReactNode => {
                    return (
                      <div className={'col s6 mx-15'} key={i}>
                        <ButtonPlan
                          active={plan?.id === data?.id}
                          plan={data}
                          onClick={this.upgradeStatus(data)}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              <div
                //onClick={(): void => this.props.history.push('')}
                className="mt-3 h3 underline"
              >
                Why premium?
              </div>
            </div>

            <div className="artist-support-page__content--options">
              <div className="h00 mb-2">Support Options</div>

              <div
                className={`artist-support-page__content--options--item f4 ${canUpgrade}`}
              >
                <ButtonIcon
                  className="background-lime"
                  onClick={this.upgradeStatus(plans[1])}
                  icon={<ArrowTopIcon />}
                />
                <span className="ml-3">Upgrade</span>
              </div>

              <div
                className={`artist-support-page__content--options--item f4 ${canDowngrade}`}
                onClick={
                  plan?.id === 2 ? this.upgradeStatus(plans[0]) : undefined
                }
              >
                <ButtonIcon
                  className="background-plum rotate-180"
                  onClick={this.upgradeStatus(plans[1])}
                  icon={<ArrowTopIcon />}
                />
                <span className="ml-3">Downgrade</span>
              </div>

              <div
                className={`artist-support-page__content--options--item f4 ${canPause}`}
                onClick={
                  plan?.id === 2 ? this.upgradeStatus(plans[0]) : undefined
                }
              >
                <ButtonIcon
                  className="background-yellow"
                  onClick={this.upgradeStatus(null)}
                  icon={<PauseIcon color={'#000'} opacity={1} />}
                />
                <span className="ml-3">Pause</span>
              </div>

              <div
                className="artist-support-page__content--options--item f4"
                onClick={
                  plan?.id === 2 ? this.upgradeStatus(plans[0]) : undefined
                }
              >
                <ButtonIcon
                  className="background-light-red"
                  onClick={this.upgradeStatus(plans[1])}
                  icon={<CloseIcon />}
                />
                <span className="ml-3">Cancel</span>
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
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  const { plans, popUpModal } = settings;
  return { currentArtist, plans, popUpModal };
};

export default connect(mapStateToProps, { getArtistAPI, updatePopUpModal })(
  ArtistSupportPage
);
