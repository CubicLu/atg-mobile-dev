import React, { CSSProperties } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  BackgroundImage,
  Header,
  SliderStories,
  SectionTitle,
  ContentLoader
} from './../../components';
import { ApplicationState } from '../../reducers';
import { getCommunityByArtistUsernameAPI } from '../../actions';
import { IonPage, IonContent, IonImg, IonSlides, IonSlide } from '@ionic/react';
import { connect } from 'react-redux';
import { CommunityArtistInterface } from '../../models';
import { discoveryMock } from '../../constants/mocks';

interface StateProps {
  currentCommunityArtist: CommunityArtistInterface | null;
}
interface DispatchProps {
  getCommunityByArtistUsernameAPI: (username: string) => void;
}
interface Props extends RouteComponentProps, StateProps, DispatchProps {}

interface State {
  isReady: boolean;
}
class DiscoveryPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  componentDidMount(): void {
    this.props.getCommunityByArtistUsernameAPI('pharrell-williams');
  }

  displayContent = (): void => {
    setTimeout((): void => {
      this.setState({
        isReady: true
      });
    }, 2000);
  };

  stylizePost(url: string, rounded: boolean = true): CSSProperties {
    return {
      height: '290px',
      position: 'relative',
      backgroundImage: `url(${url}), linear-gradient(#5f5f5f80, #8f8f8f80)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: rounded ? '20px' : 0,
      overflowY: 'hidden'
    };
  }

  render(): React.ReactNode {
    if (!this.state.isReady) this.displayContent();
    return (
      <IonPage id="discovery-page" className="discovery-page">
        <BackgroundImage default={true} />

        {!this.state.isReady && (
          <ContentLoader
            speed={2}
            width={'100vw'}
            height={'100vh'}
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
          >
            <rect x="24" y="36" rx="0" ry="0" width="175" height="42" />
            <rect x="24" y="100" rx="0" ry="0" width="105" height="45" />
            <rect x="20" y="180" rx="55" ry="55" width="110" height="110" />
            <rect x="155" y="180" rx="55" ry="55" width="110" height="110" />
            <rect x="290" y="180" rx="55" ry="55" width="110" height="110" />
            <rect x="30" y="300" rx="0" ry="0" width="90" height="16" />
            <rect x="165" y="300" rx="0" ry="0" width="90" height="16" />
            <rect x="300" y="300" rx="0" ry="0" width="90" height="16" />
            <rect x="24" y="360" rx="0" ry="0" width="125" height="45" />
            <rect x="24" y="429" rx="0" ry="0" width="43%" height="34%" />
            <rect x="52%" y="429" rx="0" ry="0" width="42.5%" height="14.5%" />
            <rect x="52%" y="539" rx="0" ry="0" width="42.5%" height="18%" />
          </ContentLoader>
        )}
        {this.state.isReady && (
          <React.Fragment>
            <Header leftBackButton={false}>
              <div className="feed mx-3 mt-45">
                <div className="brand-title text-42">panthr</div>
              </div>
            </Header>
            <IonContent>
              <SectionTitle
                className="mt-4 mx-3"
                title={'DAILY DRIP'}
                viewAll={false}
              />
              <SliderStories
                labelKey="label"
                imageKey="image"
                data={this.props.currentCommunityArtist?.stories}
              />
              <SectionTitle
                className="mt-4 mx-3"
                title="WHAT'S HOT"
                viewAll={false}
              />
              <div className="row px-2 pb-0 flex">
                <div className="col s6 p-1 discovery-col">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/1.png" />
                </div>
                <div className="col s6 p-1 discovery-col">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/2.png" />
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/3.png" />
                </div>
              </div>
              <div className="row px-2 pb-0 flex">
                <div className="col s6 p-1 discovery-col">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/4.png" />
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/6.png" />
                </div>
                <div className="col s6 p-1 discovery-col">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/5.png" />
                </div>
              </div>
              <SectionTitle
                className="mt-4 mx-3"
                title="FRESH & NEW"
                viewAll={false}
              />
              <div className="row px-2 pb-0 flex">
                <div className="col s6 p-1 discovery-col">
                  <div className="discovery-fresh fresh-one">
                    <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/9.png" />
                    <div className="p-10">
                      Critics are raving LMAO new release as the epitome of
                      “woke” culture. Hitting the airwaves this week.
                    </div>
                  </div>
                </div>
                <div className="col s6 p-1 discovery-col">
                  <div className="discovery-fresh fresh-two">
                    <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/8.png" />
                    <div className="p-10">
                      On the record with Rival Sons. The band speaks out on
                      music, politics and a new mix of sound that is pure chaos
                      & creation.
                    </div>
                  </div>
                </div>
              </div>
              <SectionTitle
                className="mt-4 mx-3"
                title="VIDEOS"
                viewAll={false}
              />
              <div className="row px-2 pb-0">
                <IonSlides pager={true} style={this.stylizePost('', true)}>
                  {discoveryMock.map(
                    (item, index): React.ReactNode => (
                      <IonSlide
                        key={index}
                        style={this.stylizePost(item.image, true)}
                        onClick={(): void => this.props.history.push(item.url)}
                      />
                    )
                  )}
                </IonSlides>
              </div>
              <SectionTitle
                className="mt-4 mx-3"
                title="WHAT IS PANTHR?"
                viewAll={false}
              />
              <div className="row px-2 pb-0">
                <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/11.png" />
              </div>
            </IonContent>
          </React.Fragment>
        )}
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
})(DiscoveryPage);
