import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage
} from './../../../components';
import { ArtistInterface } from '../../../models';
import { Colors } from '../../../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { IonRouterLink } from '@ionic/react';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface Props extends StateProps {
  onClick: Function;
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

  render(): React.ReactNode {
    const { currentArtist, isSimilar } = this.props;
    if (!currentArtist) return <div />;

    let data = isSimilar
      ? currentArtist.similarArtist
      : currentArtist.supportArtistFans;
    return (
      <div className="menu-generic-list">
        <BackgroundImage
          backgroundBottom={true}
          backgroundBottomOrange={false}
          backgroundBottomDark={true}
          backgroundBottomOpacity={0.15}
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
                    <li onClick={(): void => this.props.onClick()}>
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

export default connect(mapStateToProps)(MenuArtistList);
