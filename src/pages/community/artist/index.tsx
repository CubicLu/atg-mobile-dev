import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  SectionTitle
} from './../../../components';
import { ApplicationState } from './../../../reducers';
import { getCommunityByArtistUsernameAPI } from './../../../actions';
import { IonPage, IonContent, withIonLifeCycle } from '@ionic/react';
import { connect } from 'react-redux';
import { CommunityArtistInterface } from '../../../models';
import { RouteChildrenProps } from 'react-router-dom';
interface MatchParams {
  artistId: string;
}
interface StateProps {
  currentCommunityArtist: CommunityArtistInterface | null;
}
interface DispatchProps {
  getCommunityByArtistUsernameAPI: (username: string) => void;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteChildrenProps<MatchParams> {}
interface State {
  joined: boolean;
}

//USED WHEN WE DO HAVE ARTIST
class CommunityArtistPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { joined: false };
  }
  ionViewWillEnter(): void {
    const artistId = this.props.match?.params.artistId;
    console.log('ionViewDidLoad');
    console.log(artistId);
    if (!artistId) return;
    console.log(this.props.currentCommunityArtist?.username);
    if (artistId !== this.props.currentCommunityArtist?.username) {
      this.props.getCommunityByArtistUsernameAPI(artistId);
    }
  }

  // renderJoinButton(): React.ReactNode {
  //   return (
  //     <div className="flex-justify-content-center mb-2">
  //       <ButtonIcon
  //         color={Colors.support}
  //         type={ShapesSize.rounded}
  //         icon={<ChatMessageIcon />}
  //         label={'\u00A0 JOIN CHAT'}
  //         onClick={(): void => this.setState({ joined: true })}
  //       />
  //     </div>
  //   );
  // }

  renderBackground(): React.ReactNode {
    const art = this.props.currentCommunityArtist!;
    let color1 =
      art.backgroundGradient !== null ? art.backgroundGradient?.color1 : '';
    let color2 =
      art.backgroundGradient !== null ? art.backgroundGradient?.color1 : '';
    const useArtistBackground = false;
    return useArtistBackground && art.backgroundGradient !== null ? (
      <BackgroundImage
        gradient={`180deg,${color1},${color2}`}
        backgroundTopDark
        backgroundTop
        backgroundTopOpacity={0.5}
        backgroundBottom
        backgroundBottomDark={false}
        backgroundBottomOpacity={0.08}
      />
    ) : (
      <BackgroundImage default />
    );
  }

  render(): React.ReactNode {
    //const { joined } = this.state;
    const { currentCommunityArtist } = this.props;
    if (!currentCommunityArtist) return <IonPage id="community-page" />;

    return (
      <IonPage id="community-page">
        {this.renderBackground()}
        <Header fixed={false}>
          <div className="h2 absolute-logo-left single">
            {currentCommunityArtist.fullname}
          </div>
        </Header>

        <IonContent>
          <div className={'mt-3'} />
          {/* DISABLED FOR BETA */}
          {/* {!joined && this.renderJoinButton()} */}

          {currentCommunityArtist.stories &&
            currentCommunityArtist.stories.length > 0 && (
              <React.Fragment>
                <SectionTitle
                  title={'DAILY DRIP'}
                  viewAll={true}
                  className="mt-1 mx-3"
                  viewAllUrl={`/community/artist/${currentCommunityArtist.username}/daily-drip`}
                />

                <SliderStories
                  labelKey="label"
                  imageKey="image"
                  data={currentCommunityArtist.stories}
                />
              </React.Fragment>
            )}

          <div className="row filter mx-3 flex">
            <div className="h1 p-0 letter-spacing-2 align-start my-auto">
              EXCLUSIVES
            </div>
          </div>

          {currentCommunityArtist.posts?.map(
            (data, i): React.ReactNode => (
              <CardPost
                clickToOpen={true}
                key={i}
                post={data}
                showUser={false}
                showOptions={false}
              />
            )
          )}
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { currentCommunityArtist } = communityAPI;
  return { currentCommunityArtist };
};

export default connect(mapStateToProps, {
  getCommunityByArtistUsernameAPI
})(withIonLifeCycle(CommunityArtistPage));
