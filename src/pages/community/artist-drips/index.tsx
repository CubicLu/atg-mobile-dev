import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonRouterLink } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import { BackgroundImage, Header, Avatar } from '../../../components';
import { getCommunityByArtistUsernameAPI } from './../../../actions';
import { CommunityArtistInterface } from '../../../models';
import { ShapesSize } from '../../../types';

interface MatchParams {
  artistId: string;
}
interface StateProps {
  currentCommunityArtist: CommunityArtistInterface | null;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}
interface DispatchProps {
  getCommunityByArtistUsernameAPI: (username: string) => void;
}

class CommunityArtistDripsPage extends React.Component<Props> {
  componentDidMount(): void {
    this.loadPostsAndStories(this.props.match!.params);
  }
  loadPostsAndStories(p: MatchParams): void {
    if (p.artistId !== this.props.currentCommunityArtist?.username) {
      this.props.getCommunityByArtistUsernameAPI(p.artistId);
    }
  }

  render(): React.ReactNode {
    if (!this.props.currentCommunityArtist) return null;
    return (
      <IonPage id="community-all-artists-page">
        <BackgroundImage default />
        <Header
          leftBackButton={false}
          title="Daily Drip"
          titleClassName="artist-name"
          rightCloseButton={true}
          rightCloseHref={`/community/artist/${this.props.currentCommunityArtist.username}`}
        />
        <IonContent scrollY={false}>
          <div
            className={
              'mt-5 community-all-artists-page content content-container'
            }
          >
            <div className="row">
              {this.props.currentCommunityArtist.stories.map(
                (data, i): React.ReactNode => {
                  return (
                    <IonRouterLink key={i} routerLink={data.url}>
                      <div className="col s4 no-padding">
                        <div>
                          <Avatar
                            image={data.image}
                            type={ShapesSize.circle}
                            width={96}
                            height={96}
                          />
                          <label>{data.label}</label>
                        </div>
                      </div>
                    </IonRouterLink>
                  );
                }
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { currentCommunityArtist } = communityAPI;
  return { currentCommunityArtist };
};

export default withRouter(
  connect(mapStateToProps, {
    getCommunityByArtistUsernameAPI
  })(CommunityArtistDripsPage)
);
