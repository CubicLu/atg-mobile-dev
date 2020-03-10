import React from 'react';
import { connect } from 'react-redux';
import { DotsThreeIcon, _, MenuArtistsSupporting } from './../../components';
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
}

class SupportByComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    if (this.props.data !== undefined && this.props.data?.length > 0) {
      return (
        <ul
          className="support-by-component"
          onClick={(): void =>
            this.props.updateSettingsModal(
              true,
              React.createElement(MenuArtistsSupporting, {
                onClick: this.props.updateSettingsModal.bind(this, false, null)
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
    return null;
  }
}

const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};
export default connect(mapStateToProps, {
  updateSettingsModal
})(SupportByComponent);
