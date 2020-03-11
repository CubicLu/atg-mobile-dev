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
  current_artist: ArtistInterface | null;
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
  is_similar?: boolean;
}

class MenuArtistList extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    is_similar: false
  };

  render(): React.ReactNode {
    let data = this.props.is_similar
      ? this.props.current_artist?.similar_artist
      : this.props.current_artist?.support_artist_fans;
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
                {this.props.is_similar && 'To'}{' '}
                {this.props.current_artist?.name}
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
  const { current_artist } = artistAPI;
  return { current_artist };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsModal
  })(MenuArtistList)
);
