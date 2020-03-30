import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
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
export default withRouter(CommunityPostPage);
