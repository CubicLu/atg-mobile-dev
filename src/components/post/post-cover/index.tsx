import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { CommentCoverInterface } from '../../../interfaces';
import {
  ButtonIcon,
  CloseIcon,
  ShareLineIcon,
  BalloonIcon,
  HeartIcon
} from '../../index';

interface Props {
  cover: CommentCoverInterface;
}

class PostCover extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { cover } = this.props;
    return (
      <div
        className="post-cover"
        style={{
          backgroundImage: `linear-gradient(transparent, black), url(${cover.url})`
        }}
      >
        <div className="close-btn">
          <ButtonIcon icon={<CloseIcon />} />
        </div>
        <div className="row button-container">
          <div className="col s10">
            <div className="action-btns row">
              <div className="col s6 cover-btns">
                <ButtonIcon icon={<ShareLineIcon />} />
                <ButtonIcon icon={<BalloonIcon />} label={3} />
                <ButtonIcon icon={<HeartIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(PostCover);
