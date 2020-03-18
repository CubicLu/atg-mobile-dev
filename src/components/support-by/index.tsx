import React from 'react';
import { connect } from 'react-redux';
import { DotsThreeIcon, _, MenuArtistList } from './../../components';
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
    if (this.props.data !== undefined && this.props.data?.length > 0) {
      return (
        <ul
          className={`support-by-component ${this.props.className}`}
          onClick={(): void =>
            this.props.updateSettingsModal(
              true,
              React.createElement(MenuArtistList, {
                title: 'Artists Supporting',
                onClick: this.props.updateSettingsModal.bind(this, false, null),
                background: 'background-white-base'
              }),
              'background-white-base'
            )
          }
        >
          <li>Supported By</li>
          {_.map(
            this.props.data?.slice(0, 3),
            (data, i): React.ReactNode => {
              return (
                <li
                  key={i}
                  className="avatar"
                  style={{ backgroundImage: `url(${data.cover})` }}
                ></li>
              );
            }
          )}

          <li>
            <DotsThreeIcon />
          </li>
        </ul>
      );
    }
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};
export default connect(mapStateToProps, {
  updateSettingsModal
})(SupportByComponent);
