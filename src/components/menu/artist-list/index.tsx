import React from 'react';
import {
  ButtonIcon,
  CloseIcon,
  ArrowRightIcon,
  _,
  BackgroundImage
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
}

class MenuArtistList extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    isSimilar: false
  };

  render(): React.ReactNode {
    let data = this.props.isSimilar ? this.props.currentArtist?.similarArtist : this.props.currentArtist?.supportArtistFans;
    return (
      <BackgroundImage
        backgroundBottom
        backgroundBottomDark={false}
        backgroundBottomOrange
        backgroundBottomOpacity={1}
      >
        <div className="container menu artist-list">
          <div className="row header">
            <div className="col s10">
              <h1 className="title">{this.props.title}</h1>
              <h2 className="subtitle">
                {this.props.isSimilar && 'To'} {this.props.currentArtist?.name}
              </h2>
            </div>
            <div className="col s2 button">
              <ButtonIcon
                styles={{ width: 30, height: 30 }}
                icon={<CloseIcon width={12} height={12} strokeWidth={2} />}
                onClick={(): any => {
                  this.props.onClick();
                }}
              />
            </div>
          </div>
          <div className="row content">
            <div className="col s12">
              <ul>
                {_.map(
                  data,
                  (data, i): React.ReactNode => {
                    return (
                      <li key={i}>
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
                          onClick={(): void => {
                            this.props.history.push(
                              `/home/artist/${data.username}`
                            );
                            this.props.onClick();
                          }}
                        />
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </BackgroundImage>
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
