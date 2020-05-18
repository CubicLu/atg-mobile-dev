import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  getArtistAPI,
  updatePopUpModal,
  getSupportLevelsAPI,
  postSubscribeArtistAPI
} from 'actions';
import { ApplicationState } from 'reducers';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import {
  SupportLevelsInterface,
  ArtistBetaInterface,
  PostSubscriptionInterface
} from 'models';
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
} from 'components';
import { Nullable, Colors } from 'types';

interface State {
  plan: Nullable<SupportLevelsInterface>;
  confirmHandler: () => void;
}
interface StateProps {
  artist: Nullable<ArtistBetaInterface>;
  supportLevels: SupportLevelsInterface[];
  popUpModal: Nullable<string>;
}
interface DispatchProps {
  getArtistAPI: (artistId: string) => void;
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number
  ) => void;
  updatePopUpModal: (string: Nullable<string>) => void;
  getSupportLevelsAPI: () => void;
  postSubscribeArtistAPI: (data: PostSubscriptionInterface) => void;
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
    if (this.props.artist?.id !== next.match.params.id) {
      this.props.getArtistAPI(next.match.params.id);
    }
  }

  componentDidMount(): void {
    this.props.getArtistAPI(this.props.match.params.id);
    this.props.getSupportLevelsAPI();
  }

  handlePlanChange(plan: Nullable<SupportLevelsInterface> = null): void {
    this.setState({ plan });
    this.props.postSubscribeArtistAPI({
      artistId: this.props.artist!.id,
      subscriberId: '1',
      subscriptionLevelId: plan!.id.toString()
    });
  }

  upgradeStatus = (
    newPlan: Nullable<SupportLevelsInterface>
  ): (() => void) => (): void => {
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
    const { artist, popUpModal, updatePopUpModal, supportLevels } = this.props;
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
          backgroundImage={artist?.backgroundImage}
        />
        <Header
          leftBackButton={false}
          centerContent={
            <div className={'artist-support-page__header'}>
              <div className="h2">{artist?.name}</div>
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
                {supportLevels.map(
                  (data, i): React.ReactNode => {
                    let color = i === 0 ? Colors.lightBlue : Colors.green;
                    return (
                      <div className={'col s6 mx-15'} key={i}>
                        <ButtonPlan
                          active={plan?.id === data?.id}
                          plan={data}
                          onClick={this.upgradeStatus(data)}
                          color={color}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              <IonRouterLink routerLink={undefined}>
                <div className="mt-3 h3 underline">Why premium?</div>
              </IonRouterLink>
            </div>

            <div className="artist-support-page__content--options">
              <div className="h00 mb-2">Support Options</div>

              <div
                className={`artist-support-page__content--options--item f4 ${canUpgrade}`}
              >
                <ButtonIcon
                  className="background-lime"
                  onClick={this.upgradeStatus(supportLevels[1])}
                  icon={<ArrowTopIcon />}
                />
                <span className="ml-3">Upgrade</span>
              </div>

              <div
                className={`artist-support-page__content--options--item f4 ${canDowngrade}`}
                onClick={
                  plan?.id === 2
                    ? this.upgradeStatus(supportLevels[0])
                    : undefined
                }
              >
                <ButtonIcon
                  className="background-plum rotate-180"
                  onClick={this.upgradeStatus(supportLevels[1])}
                  icon={<ArrowTopIcon />}
                />
                <span className="ml-3">Downgrade</span>
              </div>

              <div
                className={`artist-support-page__content--options--item f4 ${canPause}`}
                onClick={
                  plan?.id === 2
                    ? this.upgradeStatus(supportLevels[0])
                    : undefined
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
                onClick={(): void => this.props.history.goBack()}
              >
                <ButtonIcon
                  className="background-light-red"
                  onClick={this.upgradeStatus(supportLevels[1])}
                  icon={<CloseIcon />}
                />
                <span className="ml-3">Cancel</span>
              </div>
            </div>
          </div>

          {popUpModal === 'confirmPremiumModal' && (
            <PopUpModal header={'PREMIUM FEATURES'}>
              <PremiumFeaturesModalContent
                title={`${artist?.name}`}
                description={<>Do you want to confirm this selection?</>}
                artistAvatar={artist?.thumbnail}
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
  const { artist, supportLevels } = artistAPI;
  const { popUpModal } = settings;
  return { artist, supportLevels, popUpModal };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updatePopUpModal,
    getSupportLevelsAPI,
    postSubscribeArtistAPI
  })(ArtistSupportPage)
);
