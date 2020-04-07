import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage,
  Header
} from './../../../components';
import { ArtistInterface, Colors } from '../../../interfaces';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { updateSettingsModal } from './../../../actions';
import { IonRouterLink } from '@ionic/react';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}
interface Props extends StateProps, DispatchProps {
  title: string;
  isSimilar?: boolean;
  background?: string;
}
class MenuArtistList extends React.Component<Props> {
  public static defaultProps = {
    title: '',
    background: 'background-white-base',
    isSimilar: false
  };

  closeModal(): void {
    this.props.updateSettingsModal(null);
  }
  render(): React.ReactNode {
    const { currentArtist, isSimilar } = this.props;
    if (!currentArtist) return <div />;

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
          rightCloseOnClick={(): void => this.closeModal()}
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
                  <IonRouterLink
                    key={i}
                    routerLink={`/artist/${data.username}`}
                  >
                    <li onClick={(): void => this.closeModal()}>
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
                  </IonRouterLink>
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

export default connect(mapStateToProps, { updateSettingsModal })(
  MenuArtistList
);
