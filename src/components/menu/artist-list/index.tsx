import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage,
  Header
} from './../../../components';
import { updateSettingsModal } from './../../../actions';
import { ArtistInterface } from '../../../interfaces';
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
    let data = this.props.isSimilar
      ? this.props.currentArtist?.similarArtist
      : this.props.currentArtist?.supportArtistFans;
    return (
      <div className="menu artist-list">
        <BackgroundImage
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOrange
          backgroundBottomOpacity={1}
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={this.props.onClick.bind(this)}
          color={'transparent'}
        >
          <div className={`row header`}>
            <h1 className="title">{this.props.title}</h1>
            <h2 className="subtitle">
              {this.props.isSimilar && 'to'} {this.props.currentArtist?.name}
            </h2>
          </div>
        </Header>

        <div className={`row header ${this.props.background}`} />
        <div className="row content">
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
                      <div className="name">{data.name}</div>
                    </div>
                    <ButtonIcon
                      icon={<ArrowRightIcon color={'#000'} />}
                      color={'transparent'}
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
