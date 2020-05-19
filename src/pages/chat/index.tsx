import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  Avatar,
  ChatBalloon,
  InputChat,
  HeaderOverlay
} from '../../components';
import { ShapesSize } from '../../types';
import { chatFriends } from '../../constants';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {}

class ChatPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  private messagesEndRef: React.RefObject<any> = React.createRef();

  renderHeaderAvatares(): React.ReactNode {
    return (
      <ul className="list inline chat-page--header-friends">
        {chatFriends.friends.map(
          (data, i): React.ReactNode => {
            return (
              <li
                key={i}
                onClick={(): void =>
                  this.props.history.push(`/profile/friend/${data.username}`)
                }
              >
                <Avatar
                  type={ShapesSize.circle}
                  width={48}
                  height={48}
                  image={data.image}
                />
              </li>
            );
          }
        )}
      </ul>
    );
  }

  renderMessages(): React.ReactNode {
    return (
      chatFriends.messages &&
      chatFriends.messages.map(
        (message, i): React.ReactNode => {
          return (
            <React.Fragment key={i}>
              <ChatBalloon
                isReply={message.isReply}
                message={message.message}
                key={`${i}`}
                date={message.date}
                avatar={message.image}
              />
            </React.Fragment>
          );
        }
      )
    );
  }

  render(): React.ReactNode {
    return (
      <IonPage id="chat-page">
        <Header
          rightCloseButton
          className="chat-page--header"
          centerContent={
            <div>
              {this.renderHeaderAvatares()}
              <div className="f6">{chatFriends.friends.length} friends</div>
            </div>
          }
        />
        <HeaderOverlay
          ref={this.headerRef}
          className="chat-page--header-overlay"
        />
        <BackgroundImage default />
        <IonContent
          className="chat-page--content"
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div
            className="chat-page--content content-container"
            ref={this.messagesEndRef}
          >
            {this.renderMessages()}
          </div>
        </IonContent>
        <InputChat placeholder="Add comment..." label="Send" />
      </IonPage>
    );
  }
}

export default ChatPage;
