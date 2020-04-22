import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import {
  BackgroundImage,
  Header,
  Avatar,
  HeaderOverlay
} from '../../../components';
import { getCommunityStoriesAPI } from './../../../actions';
import { StorieInterface, ShapesSize } from '../../../interfaces';

interface StateProps {
  stories: StorieInterface[];
  loading: boolean;
}
interface DispatchProps {
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class CommunityAllArtistsPage extends React.Component<Props> {
  private hRef: React.RefObject<any> = React.createRef();
  componentDidMount(): void {
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="community-all-artists-page">
        <BackgroundImage
          gradient={'180deg,#230541,#180727'}
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.5}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.08}
        />
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
                    <div
                      onClick={(): void =>
                        this.props.history.push(
                          '/community/artist/pharrell-williams'
                        )
                      }
                      key={i}
                      className="col s4 no-padding"
                    >
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
  const { stories, loading } = communityAPI;
  return { stories, loading };
};

export default withRouter(
  connect(mapStateToProps, {
    getCommunityStoriesAPI
  })(CommunityAllArtistsPage)
);
