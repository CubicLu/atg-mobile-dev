import React from 'react';
import {
  ButtonIcon,
  CloseIcon,
  ArrowRightIcon,
  _,
  BackgroundImage
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
      <BackgroundImage
        backgroundBottom
        backgroundBottomDark={false}
        backgroundBottomOrange={true}
        backgroundBottomOpacity={1}
      >
        <div className="menu generic-list">
          <div className={`row header ${this.props.background}`}>
            <div className="col s10">
              <h1 className="title">{this.props.title}</h1>
            </div>
            <div className="col s2 button">
              <ButtonIcon
                styles={{ width: 30, height: 30, minWidth: 30 }}
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
  })(BiographyListComponent)
);
