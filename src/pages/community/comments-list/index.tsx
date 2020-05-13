import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RecentPostInterface } from '../../../models';
import { ApplicationState } from '../../../reducers';
import { Header, BackgroundImage, CommentIcon } from '../../../components';
import { getCommunityRecentPostsAPI } from '../../../actions';

interface StateProps {
  loading: boolean;
  commentsList: RecentPostInterface[];
}

interface DispatchProps {
  getCommunityRecentPostsAPI: () => void;
}

interface Props extends DispatchProps, StateProps, RouteComponentProps {}

class CommunityCommentsListPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityRecentPostsAPI();
  }
  render(): React.ReactNode {
    if (!this.props.commentsList) return <IonPage />;
    const { commentsList } = this.props;
    return (
      <IonPage id="comments-list-page" className="comments-list-page">
        <Header
          leftBackHref="/profile"
          className="dashboard-page-header"
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={(): void => this.props.history.goBack()}
        />
        <IonContent>
          <BackgroundImage default={true} />
          <div className="comments px-2">
            {commentsList?.map(
              (data, i): React.ReactNode => (
                <div
                  key={i}
                  className="comment flex"
                  onClick={(): void => this.props.history.push(data.commentUrl)}
                >
                  <div className="comment-avatar">
                    <img src={data.userAvatar} alt=" " />
                  </div>
                  <div className="comment-content pl-2">
                    <div className="comment-top">
                      <div>
                        {data.commentsCount > 0 && (
                          <div className="flex" key={data.commentsCount}>
                            <CommentIcon />
                            <span className="comment-counter text-12">
                              {data.commentsCount} comments
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="comment-date text-12 grey-color">
                        {data.date}
                      </span>
                    </div>
                    <div className="text-16 white-color red-icon">
                      {data.comment}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { commentsList } = communityAPI;
  const loading = communityAPI.loading;
  return { loading, commentsList };
};

export default connect(mapStateToProps, {
  getCommunityRecentPostsAPI
})(CommunityCommentsListPage);
