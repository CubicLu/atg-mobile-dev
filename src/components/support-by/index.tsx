import React from 'react';
import { connect } from 'react-redux';
import { DotsThreeIcon, MenuArtistList } from './../../components';
import { updateSettingsModal } from './../../actions';
import { ApplicationState } from '../../reducers';
import { ArtistInterface } from '../../interfaces';

interface StateProps {}

interface DispatchProps {
  updateSettingsModal: (
    visible: boolean,
    content: React.ReactNode,
    className?: string
  ) => void;
}

interface Props extends StateProps, DispatchProps {
  data?: ArtistInterface[];
  className?: string;
}

class SupportByComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { data, className, updateSettingsModal } = this.props;
    if (!data) return <ul />;

    return (
      <ul
        id={'support-bar'}
        className={`support-by-component ${className}`}
        onClick={(): void =>
          updateSettingsModal(
            true,
            React.createElement(MenuArtistList, {
              title: 'Artists Supporting',
              onClick: (): void => this.props.updateSettingsModal(false, null),
              background: 'background-white-base'
            }),
            'background-white-base'
          )
        }
      >
        <li>I´m Supported By</li>
        {data.slice(0, 3)?.map(
          (d, i): React.ReactNode => (
            <li
              key={i}
              className="avatar"
              style={{ backgroundImage: `url(${d.cover})` }}
            ></li>
          )
        )}
        <li>
          <DotsThreeIcon />
        </li>
      </ul>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};
export default connect(mapStateToProps, {
  updateSettingsModal
})(SupportByComponent);
