import React from "react";
import {
  ButtonIcon,
  ArrowRightIcon,
  BackgroundImage,
  Header
} from "./../../../components";
import { updateSettingsModal } from "../../../actions";
import { Colors } from "../../../interfaces";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { ActionSheetButton } from "@ionic/react";

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
  isSimilar?: boolean;
  background?: string;
  data: ActionSheetButton[];
}

class PublicProfileMenuList extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    isSimilar: false
  };

  render(): React.ReactNode {
    const { data } = this.props;
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
        </div>

        <div className="modal-content">
          <ul>
            {data?.map(
              (item, i): React.ReactNode => {
                const { text, handler } = item;
                return (
                  <li key={i} onClick={handler}>
                    <div className="artist">
                      <div className="f4 dark">{text}</div>
                    </div>
                    <ButtonIcon
                      icon={<ArrowRightIcon color={"#000"} />}
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

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsModal
  })(PublicProfileMenuList)
);
