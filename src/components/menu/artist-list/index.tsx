import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage,
  Header
} from './../../../components';
import { updateSettingsModal } from './../../../actions';
import { ArtistInterface, Colors } from '../../../interfaces';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { RouteComponentProps, withRouter } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {
  updateSettingsModal: (
    visible: boolean,
    content: React.ReactNode,
    className?: string
  ) => void;
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {
  onClick: Function;
  title: string;
  isSimilar?: boolean;
  background?: string;
}

class MenuArtistList extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    isSimilar: false
  };

  render(): React.ReactNode {
    const { currentArtist, isSimilar } = this.props;
    if (!currentArtist) return <div></div>;

    let data = isSimilar
      ? currentArtist.similarArtist
      : currentArtist.supportArtistFans;
    return (
      <div className="menu-artist-list">
        <BackgroundImage
          backgroundBottom={true}
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={(): void => this.props.onClick()}
          color={Colors.transparent}
        />

        <div className={`modal-header ${this.props.background}`}>
          <span className="h3 dark baskerville text-28">
            {this.props.title}
          </span>
          <br />
          <span className="f5 dark sub l1">
            {this.props.isSimilar && 'to'} {currentArtist.name}
          </span>
          <br />
        </div>

        <div className="modal-content">
          <ul>
            {data?.map(
              (data, i): React.ReactNode => {
                return (
                  <li
                    key={i}
                    onClick={(): void => {
                      this.props.history.push(`/home/artist/${data.username}`);
                      this.props.onClick();
                    }}
                  >
                    <div className="artist">
                      <div
                        className="avatar"
                        style={{ backgroundImage: `url(${data.cover})` }}
                      ></div>
                      <div className="f4 dark">{data.name}</div>
                    </div>
                    <ButtonIcon
                      icon={<ArrowRightIcon color={'#000'} />}
                      color={Colors.transparent}
                    />
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsModal
  })(MenuArtistList)
);
