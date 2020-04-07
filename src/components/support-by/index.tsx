import React from 'react';
import { connect } from 'react-redux';
import { DotsThreeIcon, MenuArtistList } from './../../components';
import { updateSettingsModal } from './../../actions';
import { ArtistInterface } from '../../interfaces';

interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}

interface Props extends DispatchProps {
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
            <MenuArtistList
              onClick={(): void => updateSettingsModal(false)}
              title="Artists Supporting"
            />,
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
export default connect(null, { updateSettingsModal })(SupportByComponent);
