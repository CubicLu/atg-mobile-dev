import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  SectionTitle,
  ContentLoader
} from './../../components';
import { ApplicationState } from '../../reducers';
import { getCommunityByArtistUsernameAPI } from '../../actions';
import { IonPage, IonContent, IonImg } from '@ionic/react';
import { connect } from 'react-redux';
import { CommunityArtistInterface } from '../../models';

interface StateProps {
  currentCommunityArtist: CommunityArtistInterface | null;
}
interface DispatchProps {
  getCommunityByArtistUsernameAPI: (username: string) => void;
}
interface Props extends StateProps, DispatchProps {}

class DiscoveryPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityByArtistUsernameAPI('pharrell-williams');
  }

  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };

  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();
    return (
      <IonPage id="discovery-page" className="discovery-page">
        <BackgroundImage default={true} />

        {!this.isReady && (
          <div style={{ position: 'fixed', left: 0, right: 0 }}>
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
              <rect
                x="52%"
                y="429"
                rx="0"
                ry="0"
                width="42.5%"
                height="14.5%"
              />
              <rect x="52%" y="539" rx="0" ry="0" width="42.5%" height="17%" />
            </ContentLoader>
          </div>
        )}
        {this.isReady && (
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
              <div className="row px-2 pb-0">
                <div className="col s6 p-1">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/1.png" />
                </div>
                <div className="col s6 p-1">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/2.png" />
                </div>
                <div className="col s6 p-1">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/3.png" />
                </div>
              </div>
              <div className="row px-2 pb-0">
                <div className="col s6 p-1">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/4.png" />
                </div>
                <div className="col s6 p-1">
                  <IonImg src="https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/discovery/5.png" />
                </div>
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
