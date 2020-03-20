import React from 'react';
import { connect } from 'react-redux';
import { DotsThreeIcon, MenuArtistList } from './../../../components';
import { updateSettingsModal } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { ArtistInterface } from '../../../interfaces';

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

class BiographyContentComponent extends React.Component<Props> {
  render(): React.ReactNode {
    if (this.props.data !== undefined && this.props.data?.length > 0) {
      return (
        <ul
          className="biography-content-component"
          onClick={(): void =>
            this.props.updateSettingsModal(
              true,
              React.createElement(MenuArtistList, {
                title: 'Biography',
                onClick: this.props.updateSettingsModal.bind(this, false, null)
              }),
              'background-white-base'
            )
          }
        >
          <li>Supported By</li>
          {this.props.data?.slice(0, 3).map(
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
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};
export default connect(mapStateToProps, {
  updateSettingsModal
})(BiographyContentComponent);
