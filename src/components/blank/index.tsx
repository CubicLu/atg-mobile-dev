import React from 'react';
import { connect } from 'react-redux';
import {} from './../../components';
import {} from './../../actions';
import { ApplicationState } from '../../reducers';

interface Props {}

class BlankComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return <div></div>;
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(BlankComponent);
