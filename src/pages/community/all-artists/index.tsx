import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonRouterLink } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import {
  BackgroundImage,
  Header,
  Avatar,
  HeaderOverlay
} from '../../../components';
import { getCommunityStoriesAPI } from './../../../actions';
import { StorieInterface } from '../../../interfaces';
import { ShapesSize } from '../../../types';

interface StateProps {
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class CommunityAllArtistsPage extends React.Component<Props> {
  private hRef: React.RefObject<any> = React.createRef();
  componentDidMount(): void {
    if (this.props.stories && this.props.stories.length > 0) return;
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="community-all-artists-page">
        <BackgroundImage default />
        <Header
          leftBackButton={true}
          title="Artist Community"
          titleClassName="artist-name"
          rightCloseButton={true}
          rightCloseHref="/community"
        />
        <HeaderOverlay ref={this.hRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void => this.hRef.current?.handleParentScroll(e)}
        >
          <div
            className={
              'mt-5 community-all-artists-page content content-container'
            }
          >
            <div className="row">
              {this.props.stories.map(
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
  const { stories } = communityAPI;
  return { stories };
};

export default withRouter(
  connect(mapStateToProps, {
    getCommunityStoriesAPI
  })(CommunityAllArtistsPage)
);
