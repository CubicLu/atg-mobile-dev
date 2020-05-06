import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getArtistAPI } from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { IonPage, IonContent } from '@ionic/react';
import {
  ArtistInterface,
  PlanInterface
} from '../../../interfaces';
import {
  ShapesSize,
  Sizes,
  Colors
} from '../../../types';
import {
  BackgroundImage,
  Header,
  ButtonPlan,
  Avatar,
  Button
} from './../../../components';

interface State {
  planDetail: boolean;
  plan: PlanInterface | null;
}
interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
  plans: PlanInterface[];
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
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

  showDetail(plan: PlanInterface | null = null): void {
    this.setState({ plan });
  }
  render(): React.ReactNode {
    if (!this.props.currentArtist) {
      return <IonPage />;
    }

    const { currentArtist, history, match } = this.props;
    const { plan } = this.state;
    const hasPlan = !!plan;
    const planDetailClass = hasPlan ? ' detail mt-10 mx-3' : '';

    const backButton = (): void => this.showDetail();
    const closeButton = (): void => history.goBack();
    const rightButton = hasPlan ? backButton : closeButton;

    const allPlans = (
      <div className="flex-compass fluid south medium h-100">
        <div className="row mt-3">
          <div className="h1 l11 center-align">
            Yeah buddy! So stoked you
            <br />
            want to support us!
          </div>
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
      <div className="flex-column-center">
        <div className="row fluid">
          <div className="col s4">
            <Avatar
              type={ShapesSize.circle}
              width={100}
              height={100}
              image={currentArtist.supportImages?.avatar}
            />
          </div>

          <div className="col s8 px-1 header">
            <div className="h00 dark l1">{currentArtist.name}</div>
            <div className="h1 dark l1">Support Level</div>
            <div className="h1 dark l1">{plan?.name}</div>
            <div className="h2 price dark text-72 l1">
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
          <Button
            size={Sizes.lg}
            label="Support!"
            type={ShapesSize.full}
            color={Colors.support}
            gradient={true}
            onClick={(): void =>
              history.push('/thank-you', { artistId: match.params.id })
            }
          />
        </div>
      </div>
    );

    return (
      <IonPage
        id="support-page"
        style={{
          background: hasPlan
            ? 'linear-gradient(180deg, #FDD105, #C16509)'
            : 'linear-gradient(180deg, #2814484d, #281448a8, #281448)'
        }}
      >
        {hasPlan ? (
          <BackgroundImage
            gradient="180deg, #FDD105, #C16509"
            backgroundTop
            backgroundTopDark={true}
            backgroundBottom
            backgroundBottomDark={false}
            backgroundBottomOpacity={0.33}
          />
        ) : (
          <BackgroundImage
            gradient="180deg, #2814484d, #281448a8, #281448"
            backgroundImage={currentArtist.supportImages?.background}
          />
        )}
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={rightButton}
        />
        <IonContent fullscreen={true} scrollY={true}>
          <div className={`artist-support-page h-100 ${planDetailClass}`}>
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
  const { currentArtist, loading } = artistAPI;
  const { plans } = settings;
  return { currentArtist, loading, plans };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI })(ArtistSupportPage)
);
