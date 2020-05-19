import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from './../../../reducers';
import {
  BackgroundImage,
  Header,
  Avatar,
  HeaderOverlay
} from '../../../components';
import { getCommunityStoriesAPI } from './../../../actions';
import { StorieInterface } from '../../../models';
import { ShapesSize } from '../../../types';
import { RouteComponentProps } from 'react-router';

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
          title="Artist Communities"
          titleClassName="artist-name"
          rightCloseButton={true}
          rightClickGoBack={true}
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
                      key={i}
                      className="col s4 no-padding"
                      onClick={(): void => this.props.history.push(data.url)}
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
  const { stories } = communityAPI;
  return { stories };
};

export default connect(mapStateToProps, {
  getCommunityStoriesAPI
})(CommunityAllArtistsPage);
