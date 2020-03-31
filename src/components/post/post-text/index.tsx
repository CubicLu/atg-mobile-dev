import React from 'react';
import { connect } from 'react-redux';
import {} from '../../index';
import {} from '../../../actions';
import { ApplicationState } from '../../../reducers';

interface Props {}
class PostText extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className={'post-text'}>
        GET THE MONEY - Cross The Line is the first song from Taylor Hawkins &
        The Coattail Riders new Album. Support Us and listen to the whole album.
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(PostText);
