import React from 'react';
import {
  ButtonIcon,
  ArrowRightIcon,
  _,
  BackgroundImage,
  Header
} from './../../../components';
import { updateSettingsModal } from './../../../actions';
import { BiographyInterface } from '../../../interfaces';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { RouteComponentProps, withRouter } from 'react-router';
import { LockedIcon } from '../../icon';
interface StateProps {}
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
  username: string;
  background?: string;
  items?: BiographyInterface[];
}
class BiographyListComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {}
  };
  render(): React.ReactNode {
    return (
      <div className="menu generic-list">
        <BackgroundImage
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOrange={true}
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
          </div>
        </Header>
        <div className={`row header ${this.props.background}`} />
        <div className="row content">
          <ul>
            {_.map(
              this.props.items,
              (data, i): React.ReactNode => {
                return (
                  <li
                    key={i}
                    onClick={(): void => {
                      this.props.history.push(
                        `/home/artist/${this.props.username}`
                      );
                      this.props.onClick();
                    }}
                  >
                    <div className="artist">
                      <div className="name">{data.name}</div>
                    </div>
                    {data.accessLevel && data.accessLevel > 0 ? (
                      <ButtonIcon
                        icon={<LockedIcon color={'#000'} />}
                        color={'transparent'}
                        styles={{ padding: '0 9px' }}
                      />
                    ) : (
                      <ButtonIcon
                        icon={<ArrowRightIcon color={'#000'} />}
                        color={'transparent'}
                      />
                    )}
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
  })(BiographyListComponent)
);
