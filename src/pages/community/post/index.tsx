import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from '../../../reducers';
import { ArtistPost } from '../../../components';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

class CommunityPostPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="community-comment-page">
        <IonContent className={'post-comments'}>
          <ArtistPost id={this.props.match.params.id} />
        </IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};

export default withRouter(CommunityPostPage);
