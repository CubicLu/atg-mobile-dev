import React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../../reducers';
import { InputText, Button, RowChat } from '..';
import { Colors, MessageInterface } from '../../interfaces';

interface StateProps {
  messagesSearch: MessageInterface[];
}
interface Props extends StateProps {}

class ChatComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="chat-component">
        <div className="messages">
          {this.props.messagesSearch.map(
            (data, i): React.ReactNode => {
              return <RowChat data={data} key={i} avatarSize={48} />;
            }
          )}
        </div>
        <div className="input">
          <InputText type={'text'} placeholder={'Start a chat'} />
          <Button label="Post" color={Colors.grayTransparent} bold={true} />
        </div>
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ profileAPI }: ApplicationState): StateProps => {
  const { messagesSearch } = profileAPI;
  return { messagesSearch };
};
export default connect(mapStateToProps, {})(ChatComponent);
