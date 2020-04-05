import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { BackgroundImage, Header, Avatar } from '../../../components';
import { getCommunityStoriesAPI } from './../../../actions';
import { StorieInterface, ShapesSize } from '../../../interfaces';

interface StateProps {
  isPlaying: boolean;
  stories: StorieInterface[];
  loading: boolean;
}

interface DispatchProps {
  getCommunityStoriesAPI: () => void;
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class CommunityAllArtistsPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="community-all-artists-page">
        <BackgroundImage
          gradient={`180deg,#230541,#180727`}
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.5}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.08}
        />
        <Header
          leftBackButton={true}
          title={'Artist Community'}
          titleClassName={`artist-name`}
          rightCloseButton={true}
          rightCloseHref="/community"
        />
        <div
          className={
            `community-all-artists-page content content-container` +
            (this.props.isPlaying && ' is-playing')
          }
        >
          <IonContent>
            <div className="row">
              {this.props.stories.map(
                (data, i): React.ReactNode => {
                  return (
                    <div key={i} className="col s4">
                      <div>
                        <Avatar
                          image={data.image}
                          type={ShapesSize.circle}
                          width={96}
                          height={96}
                          onClick={(): void => {}}
                        />
                        <label>{data.label}</label>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </IonContent>
        </div>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  settings,
  communityAPI
}: ApplicationState): StateProps => {
  const { isPlaying } = settings;
  const { stories, loading } = communityAPI;
  return { isPlaying, stories, loading };
};

export default withRouter(
  connect(mapStateToProps, {
    getCommunityStoriesAPI
  })(CommunityAllArtistsPage)
);
