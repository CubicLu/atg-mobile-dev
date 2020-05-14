import React from 'react';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import { updateNavBarTwoActions, toggleNavBarTwoActions } from '../../actions';
import { IonAlert } from '@ionic/react';
interface StateProps {
  status: boolean;
  leftLabel?: string;
  rightLabel?: string;
  leftAction?: Function;
  rightAction?: Function;
}
interface DispatchProps {
  toggleNavBarTwoActions: (activate: boolean) => void;
  updateNavBarTwoActions: (
    leftLabel: string,
    rightLabel: string,
    leftAction: Function,
    rightAction: Function
  ) => void;
}
interface Props extends StateProps, DispatchProps {}

interface State {
  showDelete: boolean;
  showComplete: boolean;
}
class NavBarTwoButtonsComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      showDelete: false,
      showComplete: false
    };
  }

  updateShowDelete(condition: boolean): void {
    this.setState({
      showDelete: condition
    });
  }

  updateShowComplete(condition: boolean): void {
    this.setState({
      showComplete: condition
    });
  }

  updateShowCompleteAndDelete(
    showDelete: boolean,
    showComplete: boolean
  ): void {
    this.setState({
      showComplete: showComplete,
      showDelete: showDelete
    });
  }

  showMessage(item: number): void {
    if (item === 0) {
      this.updateShowDelete(true);
    } else if (item === 1) {
      this.updateShowComplete(true);
    }
  }
  hideMessage(): void {
    this.updateShowCompleteAndDelete(false, false);
  }
  confirmComplete(): React.ReactNode {
    return (
      <IonAlert
        isOpen={this.state.showComplete}
        onDidDismiss={(): void => this.hideMessage()}
        header={this.props.rightLabel}
        message="Do you want to save changes?"
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (): void => this.hideMessage()
          },
          {
            text: 'Yes',
            handler: (): void => {
              console.log('Execute Save action API on rightAction');
              this.props.rightAction!();
              this.hideMessage();
            }
          }
        ]}
      />
    );
  }
  confirmDelete(): React.ReactNode {
    return (
      <IonAlert
        isOpen={this.state.showDelete}
        onDidDismiss={(): void => this.hideMessage()}
        header={this.props.leftLabel}
        message="Do you want to permanently delete?"
        buttons={[
          {
            text: 'Yes',
            handler: (): void => {
              console.log('Execute Delete action API on leftAction');
              this.props.leftAction!();
              this.hideMessage();
            }
          },
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (): void => this.hideMessage()
          }
        ]}
      />
    );
  }
  render(): React.ReactNode {
    if (!this.props.status) {
      return null;
    }
    const { leftLabel, rightLabel } = this.props;
    return (
      <div className="navbar-two-buttons flex-justify-content-center">
        {this.confirmDelete()}
        <div
          onClick={(): void => this.showMessage(0)}
          className="fluid my-auto f6 button-cancel center-align"
        >
          {leftLabel}
        </div>

        {this.confirmComplete()}
        <div
          onClick={(): void => this.showMessage(1)}
          className="fluid my-auto f6 button-confirm center-align"
        >
          {rightLabel}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ navbar }: ApplicationState): StateProps => {
  const { navbarTwoButtons } = navbar;
  const {
    status,
    leftLabel,
    rightLabel,
    leftAction,
    rightAction
  } = navbarTwoButtons;
  return { status, leftLabel, rightLabel, leftAction, rightAction };
};
export default connect(mapStateToProps, {
  toggleNavBarTwoActions,
  updateNavBarTwoActions
})(NavBarTwoButtonsComponent);
