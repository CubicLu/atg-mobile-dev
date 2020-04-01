import React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../../reducers';
import { Avatar } from '..';
import { ShapesSize } from '../../interfaces';

interface Props {}

class ChatComponent extends React.Component<Props> {
  renderMessage(data, i): React.ReactNode {
    return (
      <div className="row" key={i}>
        <div className="col s2">
          <Avatar width={36} height={36} type={ShapesSize.circle} />
        </div>
        <div className="col s8 info">
          <span className="text-12">@girlpower</span>
          <span className="text-14">
            you guys definitely did the best, you guys definitely did the best
          </span>
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <div className="chat-component">
        <div className="messages">
          {[{}, {}, {}, {}, {}, {}].map(
            (data, i): React.ReactNode => {
              return this.renderMessage(data, i);
            }
          )}
        </div>
        <div className="input"></div>
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(ChatComponent);
