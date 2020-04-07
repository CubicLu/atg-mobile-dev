import React from "react";
import { Avatar, Header, MenuProfileList } from "./../../../components";
import { IonActionSheet, ActionSheetButton } from "@ionic/react";
import { connect } from "react-redux";
import { updateAuthProperty, updateSettingsModal } from "../../../actions";
import { ApplicationState } from "../../../reducers";
import { ShapesSize } from "../../../interfaces";

interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number,
    onClick?: Function
  ) => void;
}
interface State {
  showProfileActions: boolean;
}
interface Props extends DispatchProps {}
class HeaderProfileComponent extends React.Component<Props, State> {
  handleLogout(): void {
    this.props.updateAuthProperty("loggedUser", undefined);
    window.location.href = "/initial";
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      showProfileActions: false
    };
  }

  profileActions: ActionSheetButton[] = [
    {
      text: "View my public profile",
      role: "destructive",
      handler: (): void => console.log("Delete clicked")
    },
    {
      text: "Edit my public profile",
      handler: (): void => console.log("Share clicked")
    },
    {
      text: "Improve my public profile",
      handler: (): void => console.log("Play clicked")
    },
    {
      text: "Log out",
      handler: (): void => this.handleLogout()
    },
    {
      text: "Cancel",
      role: "cancel",
      handler: (): void => console.log("Cancel clicked")
    }
  ];

  toggleProfileActions(opt: boolean = true): void {
    this.setState({ showProfileActions: opt });
  }

  hideMenuListModal = () => this.props.updateSettingsModal(null);

  showMenuListModal = () => {
    this.props.updateSettingsModal(
      <MenuProfileList
        title={"Public profile"}
        onClick={this.hideMenuListModal}
        background={"background-white-base"}
        data={this.profileActions.slice(0, 3)}
      />,
      "background-white-base"
    );
  };

  render(): React.ReactNode {
    return (
      <div>
        <Header
          rightSettingsButton={true}
          rightUserGroupButton={true}
          rightSettingsOnClick={(): void => this.toggleProfileActions()}
        />

        <div className="profile-center">
          <Avatar type={ShapesSize.circle} onClick={this.showMenuListModal} />
          <div className="f4 l15">Rosetta Throp</div>
          <div className="h00 l1 shadow">Musical Goddess</div>
        </div>
        <IonActionSheet
          onDidDismiss={(): any => this.toggleProfileActions(false)}
          isOpen={this.state.showProfileActions}
          buttons={this.profileActions}
        />
      </div>
    );
  }
}

interface StateProps {}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default connect(mapStateToProps, {
  updateAuthProperty,
  updateSettingsModal
})(HeaderProfileComponent);
